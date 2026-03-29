import { Router } from "express";
import { getRewards, redeemReward } from "../controllers/rewardController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/rewards", getRewards);
router.post("/redeem", requireAuth, redeemReward);

export default router;
