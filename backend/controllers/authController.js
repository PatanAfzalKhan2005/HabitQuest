import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function getClientBaseUrl(req) {
  return (
    process.env.CLIENT_URL ||
    `${req.protocol}://${req.get("host")}`.replace(/:\d+$/, ":5173")
  ).replace(/\/+$/, "");
}

function buildClientRedirectUrl(req, returnTo = "/") {
  const safePath = typeof returnTo === "string" && returnTo.startsWith("/") ? returnTo : "/";
  return `${getClientBaseUrl(req)}${safePath}`;
}

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function publicUser(user) {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
  };
}

export async function getCurrentUser(req, res) {
  res.json({ user: req.user ? publicUser(req.user) : null });
}

export async function register(req, res) {
  const { email, password, firstName = null, lastName = null } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  const token = signToken(user._id);
  setAuthCookie(res, token);

  return res.status(201).json({ token, user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken(user._id);
  setAuthCookie(res, token);

  return res.json({ token, user: publicUser(user) });
}

export async function demoLogin(req, res) {
  const returnTo = typeof req.query.returnTo === "string" ? req.query.returnTo : "/";

  let user = await User.findOne({ email: "demo@gain-discipline.dev" });
  if (!user) {
    user = await User.create({
      email: "demo@gain-discipline.dev",
      firstName: "Demo",
      lastName: "Learner",
      profileImageUrl: null,
      authProvider: "demo",
    });
  }

  const token = signToken(user._id);
  setAuthCookie(res, token);

  res.redirect(buildClientRedirectUrl(req, returnTo));
}

export function logout(req, res) {
  res.clearCookie("token");
  res.redirect(buildClientRedirectUrl(req, "/"));
}
