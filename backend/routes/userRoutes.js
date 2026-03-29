import { Router } from "express";
import { getLeaderboard, getProfile } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", requireAuth, getProfile);
router.get("/leaderboard", getLeaderboard);

export default router;
