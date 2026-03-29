import { Router } from "express";
import { getAllStreaks } from "../controllers/streakController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", requireAuth, getAllStreaks);

export default router;
