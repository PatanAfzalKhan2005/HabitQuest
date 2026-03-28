import { Router } from "express";
import { db } from "@workspace/db";
import {
  userStatsTable,
  aptitudeAttemptsTable,
  activityLogTable,
} from "@workspace/db/schema";
import { getQuestions, getTopics, topicDisplayNames, availableTopics } from "../data/aptitudeQuestions";
import { eq, and } from "drizzle-orm";

const router = Router();

router.get("/topics", async (req, res) => {
  const topics = getTopics();
  let solvedMap: Record<string, number> = {};

  if (req.isAuthenticated()) {
    try {
      const attempts = await db.select().from(aptitudeAttemptsTable)
        .where(eq(aptitudeAttemptsTable.userId, req.user!.id));

      for (const attempt of attempts) {
        const key = `${attempt.topic}-${attempt.level}`;
        solvedMap[key] = (solvedMap[key] || 0) + attempt.score;
      }
    } catch (_e) {}
  }

  const result = topics.map(topic => ({
    id: topic,
    name: topicDisplayNames[topic] || topic,
    totalQuestions: 36,
    solvedQuestions: availableTopics.has(topic) ? (solvedMap[topic] || 0) : 0,
    available: availableTopics.has(topic),
  }));

  res.json({ topics: result });
});

router.get("/questions", (req, res) => {
  const { topic, level } = req.query as { topic: string; level: string };
  if (!topic || !level) {
    res.status(400).json({ error: "topic and level required" });
    return;
  }

  const questions = getQuestions(topic, level);
  res.json({ questions });
});

router.post("/submit", async (req, res) => {
  const { topic, level, answers } = req.body as {
    topic: string;
    level: string;
    answers: { questionId: string; selectedAnswer: string }[];
  };

  const questions = getQuestions(topic, level);
  let score = 0;
  for (const answer of answers) {
    const q = questions.find(q => q.id === answer.questionId);
    if (q && q.correctAnswer === answer.selectedAnswer) {
      score++;
    }
  }

  const total = questions.length;
  let pointsEarned = score * 10;
  let streakBonus = false;

  if (score === total) {
    pointsEarned += 50;
  }

  if (req.isAuthenticated()) {
    try {
      await db.insert(aptitudeAttemptsTable).values({
        userId: req.user!.id,
        topic,
        level,
        score,
        total,
        pointsEarned,
      });

      const today = new Date().toISOString().split("T")[0];

      const existing = await db.select().from(activityLogTable)
        .where(and(
          eq(activityLogTable.userId, req.user!.id),
          eq(activityLogTable.activityType, "aptitude"),
          eq(activityLogTable.activityDate, today)
        ));

      if (existing.length === 0) {
        await db.insert(activityLogTable).values({
          userId: req.user!.id,
          activityType: "aptitude",
          activityDate: today,
          count: 1,
        });
      } else {
        await db.update(activityLogTable)
          .set({ count: existing[0].count + 1 })
          .where(eq(activityLogTable.id, existing[0].id));
      }

      const existingStats = await db.select().from(userStatsTable)
        .where(eq(userStatsTable.userId, req.user!.id));

      if (existingStats.length === 0) {
        await db.insert(userStatsTable).values({
          userId: req.user!.id,
          totalPoints: pointsEarned,
          aptitudeStreak: 1,
          longestAptitudeStreak: 1,
          lastAptitudeActivity: new Date(),
          problemsAttempted: 1,
          problemsSolved: score === total ? 1 : 0,
        });
      } else {
        const stats = existingStats[0];
        const lastDate = stats.lastAptitudeActivity;
        let newStreak = stats.aptitudeStreak;

        if (lastDate) {
          const dayDiff = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          if (dayDiff === 1) {
            newStreak++;
            if (newStreak % 7 === 0) {
              pointsEarned += 100;
              streakBonus = true;
            }
          } else if (dayDiff > 1) {
            newStreak = 1;
          }
        }

        await db.update(userStatsTable)
          .set({
            totalPoints: stats.totalPoints + pointsEarned,
            aptitudeStreak: newStreak,
            longestAptitudeStreak: Math.max(stats.longestAptitudeStreak, newStreak),
            lastAptitudeActivity: new Date(),
            problemsAttempted: stats.problemsAttempted + 1,
            problemsSolved: score === total ? stats.problemsSolved + 1 : stats.problemsSolved,
            updatedAt: new Date(),
          })
          .where(eq(userStatsTable.userId, req.user!.id));
      }
    } catch (e) {
      req.log.error({ err: e }, "Failed to save aptitude attempt");
    }
  }

  const message = score === total
    ? "Perfect Score! You're on fire! 🔥"
    : score >= total * 0.75
    ? "Great job! Keep it up! 🌟"
    : score >= total * 0.5
    ? "Good effort! Keep practicing! 💪"
    : "Keep practicing! You'll improve! 📚";

  res.json({ score, total, pointsEarned, streakBonus, message });
});

router.get("/streak", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const stats = await db.select().from(userStatsTable)
      .where(eq(userStatsTable.userId, req.user!.id));

    const activities = await db.select().from(activityLogTable)
      .where(and(
        eq(activityLogTable.userId, req.user!.id),
        eq(activityLogTable.activityType, "aptitude")
      ));

    const heatmapData = activities.map(a => ({ date: a.activityDate, count: a.count }));

    res.json({
      currentStreak: stats[0]?.aptitudeStreak || 0,
      longestStreak: stats[0]?.longestAptitudeStreak || 0,
      lastActivity: stats[0]?.lastAptitudeActivity?.toISOString() || null,
      heatmapData,
    });
  } catch (e) {
    res.json({ currentStreak: 0, longestStreak: 0, heatmapData: [] });
  }
});

export default router;
