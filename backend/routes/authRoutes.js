import { Router } from "express";
import {
  demoLogin,
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/authController.js";

const router = Router();

router.get("/auth/user", getCurrentUser);
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/login", demoLogin);
router.get("/logout", logout);

export default router;
