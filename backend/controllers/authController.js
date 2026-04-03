import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { buildClientRedirectUrl, publicUser, setAuthCookie, signToken } from "../utils/auth.js";

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
