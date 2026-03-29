import { Router } from "express";
import {
  getDailyProblem,
  getCodingProblems,
  getCodingStreak,
  getCodingTopics,
  submitCodingProblem,
} from "../controllers/codingController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/topics", getCodingTopics);
router.get("/problems", getCodingProblems);
router.get("/daily", getDailyProblem);
router.post("/submit", submitCodingProblem);
router.get("/streak", requireAuth, getCodingStreak);

export default router;
