import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

function isRealOAuthValue(value) {
  return Boolean(value) && !String(value).startsWith("your-");
}

export function isGoogleAuthConfigured() {
  return (
    isRealOAuthValue(process.env.GOOGLE_CLIENT_ID) &&
    isRealOAuthValue(process.env.GOOGLE_CLIENT_SECRET)
  );
}

function splitName(displayName = "") {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "Google",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : null,
  };
}

export function configurePassport() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user || null);
    } catch (error) {
      done(error);
    }
  });

  if (!isGoogleAuthConfigured()) {
    console.warn("Google OAuth is disabled: set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable it.");
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL || "http://127.0.0.1:5000/api/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();

          if (!email) {
            return done(new Error("Google account email is required"));
          }

          const googleId = profile.id;
          const photo = profile.photos?.[0]?.value || null;
          let user = await User.findOne({
            $or: [{ googleId }, { email }],
          });

          if (!user) {
            const { firstName, lastName } = splitName(profile.displayName);
            user = await User.create({
              googleId,
              email,
              firstName,
              lastName,
              profileImageUrl: photo,
              authProvider: "google",
            });
          } else {
            user.googleId = user.googleId || googleId;
            user.authProvider = "google";
            user.profileImageUrl = user.profileImageUrl || photo;

            if (!user.firstName || !user.lastName) {
              const { firstName, lastName } = splitName(profile.displayName);
              user.firstName = user.firstName || firstName;
              user.lastName = user.lastName || lastName;
            }

            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
}

export default passport;
