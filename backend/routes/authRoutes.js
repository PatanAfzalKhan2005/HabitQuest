import { Router } from "express";
import passport from "../config/passport.js";
import { isGoogleAuthConfigured } from "../config/passport.js";
import {
  demoLogin,
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { buildClientRedirectUrl, setAuthCookie, signToken } from "../utils/auth.js";

const router = Router();

function googleAuthDisabled(_req, res) {
  return res.status(503).json({
    error: "Google auth is not configured",
    message: "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in backend/.env to enable Google login.",
  });
}

router.get("/auth/user", getCurrentUser);
router.post("/auth/register", register);
router.post("/auth/login", login);

if (isGoogleAuthConfigured()) {
  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      prompt: "select_account",
    }),
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/api/auth/google/failure",
    }),
    (req, res) => {
      const token = signToken(req.user._id);
      setAuthCookie(res, token);

      res.redirect(buildClientRedirectUrl(req, "/login-success", { token }));
    },
  );
} else {
  router.get("/auth/google", googleAuthDisabled);
  router.get("/auth/google/callback", googleAuthDisabled);
}

router.get("/auth/google/failure", (req, res) => {
  res.redirect(
    buildClientRedirectUrl(req, "/login-success", {
      error: "google_auth_failed",
    }),
  );
});
router.get("/login", demoLogin);
router.get("/logout", logout);

export default router;
