import { Router } from "express";
import {
  getAptitudeQuestions,
  getAptitudeStreak,
  getAptitudeTopics,
  submitAptitudeQuiz,
} from "../controllers/aptitudeController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/topics", getAptitudeTopics);
router.get("/questions", getAptitudeQuestions);
router.post("/submit", submitAptitudeQuiz);
router.get("/streak", requireAuth, getAptitudeStreak);

export default router;
