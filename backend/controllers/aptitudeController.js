import Aptitude from "../models/Aptitude.js";
import Submission from "../models/Submission.js";
import Streak from "../models/Streak.js";
import User from "../models/User.js";
import {
  availableTopics,
  getTopics,
  topicDisplayNames,
} from "../data/aptitudeData.js";
import {
  calculateNextStreak,
  mergeHeatmapEntry,
} from "../utils/calculateStreak.js";
import { calculateAptitudePoints } from "../utils/calculatePoints.js";

function buildResultMessage(score, total) {
  if (score === total) return "Perfect Score! You're on fire! 🔥";
  if (score >= total * 0.75) return "Great job! Keep it up! 🌟";
  if (score >= total * 0.5) return "Good effort! Keep practicing! 💪";
  return "Keep practicing! You'll improve! 📚";
}

export async function getAptitudeTopics(req, res) {
  const topics = getTopics();
  const counts = await Aptitude.aggregate([
    { $group: { _id: "$topic", totalQuestions: { $sum: 1 } } },
  ]);
  const totalMap = Object.fromEntries(counts.map((entry) => [entry._id, entry.totalQuestions]));

  let solvedMap = {};
  if (req.user) {
    const attempts = await Submission.find({
      userId: req.user._id,
      submissionType: "aptitude",
    }).lean();

    solvedMap = attempts.reduce((acc, attempt) => {
      acc[attempt.topic] = (acc[attempt.topic] || 0) + attempt.score;
      return acc;
    }, {});
  }

  res.json({
    topics: topics.map((topic) => ({
      id: topic,
      name: topicDisplayNames[topic] || topic,
      totalQuestions: totalMap[topic] || 0,
      solvedQuestions: availableTopics.has(topic) ? solvedMap[topic] || 0 : 0,
      available: availableTopics.has(topic),
    })),
  });
}

export async function getAptitudeQuestions(req, res) {
  const { topic, level } = req.query;

  if (!topic || !level) {
    return res.status(400).json({ error: "topic and level required" });
  }

  const questions = await Aptitude.find({ topic, level }).lean();
  return res.json({ questions });
}

export async function submitAptitudeQuiz(req, res) {
  const { topic, level, answers = [] } = req.body;

  if (!topic || !level) {
    return res.status(400).json({ error: "topic and level required" });
  }

  const questions = await Aptitude.find({ topic, level }).lean();
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.selectedAnswer]));
  let score = 0;

  for (const question of questions) {
    if (answerMap.get(question.id) === question.correctAnswer) {
      score += 1;
    }
  }

  const total = questions.length;
  let pointsEarned = score * 10;
  let streakBonus = false;

  if (req.user) {
    const streakDoc = (await Streak.findOne({ userId: req.user._id })) || new Streak({
      userId: req.user._id,
      activityLog: [],
    });

    const nextStreak = calculateNextStreak(req.user.lastAptitudeActivity, req.user.aptitudeStreak);
    const points = calculateAptitudePoints(score, total, nextStreak);
    pointsEarned = points.pointsEarned;
    streakBonus = points.streakBonus;

    await Submission.create({
      userId: req.user._id,
      submissionType: "aptitude",
      topic,
      level,
      answers,
      score,
      total,
      pointsEarned,
    });

    streakDoc.activityLog = mergeHeatmapEntry(
      streakDoc.activityLog,
      "aptitude",
      new Date().toISOString().split("T")[0],
    );
    await streakDoc.save();

    req.user.totalPoints += pointsEarned;
    req.user.aptitudeStreak = nextStreak;
    req.user.longestAptitudeStreak = Math.max(req.user.longestAptitudeStreak, nextStreak);
    req.user.lastAptitudeActivity = new Date();
    req.user.problemsAttempted += 1;
    if (score === total) {
      req.user.problemsSolved += 1;
    }
    await req.user.save();
  } else if (score === total) {
    pointsEarned += 50;
  }

  return res.json({
    score,
    total,
    pointsEarned,
    streakBonus,
    message: buildResultMessage(score, total),
  });
}

export async function getAptitudeStreak(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const streakDoc = await Streak.findOne({ userId: req.user._id }).lean();
  const heatmapData = (streakDoc?.activityLog || [])
    .filter((entry) => entry.activityType === "aptitude")
    .map((entry) => ({ date: entry.activityDate, count: entry.count }));

  return res.json({
    currentStreak: req.user.aptitudeStreak || 0,
    longestStreak: req.user.longestAptitudeStreak || 0,
    lastActivity: req.user.lastAptitudeActivity || null,
    heatmapData,
  });
}
