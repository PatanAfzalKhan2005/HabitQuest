import jwt from "jsonwebtoken";

export function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

export function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function publicUser(user) {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
  };
}

export function getClientBaseUrl(req) {
  return (
    process.env.CLIENT_URL ||
    `${req.protocol}://${req.get("host")}`.replace(/:\d+$/, ":5173")
  ).replace(/\/+$/, "");
}

export function buildClientRedirectUrl(req, pathname = "/", query = {}) {
  const safePath = typeof pathname === "string" && pathname.startsWith("/") ? pathname : "/";
  const redirectUrl = new URL(`${getClientBaseUrl(req)}${safePath}`);

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      redirectUrl.searchParams.set(key, String(value));
    }
  }

  return redirectUrl.toString();
}
