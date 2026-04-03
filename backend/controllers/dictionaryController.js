import DictionaryDay from "../models/DictionaryDay.js";
import UserProgress from "../models/UserProgress.js";
import Streak from "../models/Streak.js";
import User from "../models/User.js";
import { dictionaryDays } from "../data/dictionaryData.js";
import { calculateNextStreak, mergeHeatmapEntry } from "../utils/calculateStreak.js";

function toDayString(date = new Date()) {
  return new Date(date).toISOString().split("T")[0];
}

function resolveDictionaryDay(targetDate) {
  if (!targetDate) return null;

  const exactMatch = (dictionaryDays || []).find((day) => day.date === targetDate);
  if (exactMatch) {
    return exactMatch;
  }

  if (!dictionaryDays?.length) {
    return null;
  }

  const sortedDays = [...dictionaryDays].sort((a, b) => new Date(a.date) - new Date(b.date));
  const baseDate = new Date(sortedDays[0].date);
  const requestedDate = new Date(targetDate);
  const diffDays = Math.floor((requestedDate.getTime() - baseDate.getTime()) / 86400000);
  const index = ((diffDays % sortedDays.length) + sortedDays.length) % sortedDays.length;
  const templateDay = sortedDays[index];

  return {
    date: targetDate,
    words: templateDay.words,
  };
}

export async function getTodayDictionary(req, res) {
  const today = toDayString();

  // Try DB first
  let day = await DictionaryDay.findOne({ date: today }).lean();

  // Fallback to bundled data
  if (!day) {
    day = resolveDictionaryDay(today);
  }

  if (!day) return res.json({ date: today, words: [] });

  let completed = false;
  if (req.user) {
    const prog = await UserProgress.findOne({ userId: req.user._id, date: today }).lean();
    completed = Boolean(prog?.completed);
  }

  return res.json({ date: day.date, words: day.words, completed });
}

export async function getDictionaryByDate(req, res) {
  const { date } = req.params;
  if (!date) return res.status(400).json({ error: "date required" });

  const today = toDayString();
  const requested = date;

  // locked if requested > today
  if (new Date(requested) > new Date(today)) {
    return res.json({ locked: true, date: requested });
  }

  let day = await DictionaryDay.findOne({ date: requested }).lean();
  if (!day) {
    day = resolveDictionaryDay(requested);
  }

  if (!day) return res.status(404).json({ error: "Not found" });

  let completed = false;
  if (req.user) {
    const prog = await UserProgress.findOne({ userId: req.user._id, date: requested }).lean();
    completed = Boolean(prog?.completed);
  }

  return res.json({ date: day.date, words: day.words, completed });
}

export async function completeDictionaryDay(req, res) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const { date } = req.body;
  if (!date) return res.status(400).json({ error: "date required" });

  const today = toDayString();
  // Do not allow completing future dates
  if (new Date(date) > new Date(today)) {
    return res.status(400).json({ error: "Cannot complete future date" });
  }

  // Upsert user progress
  await UserProgress.findOneAndUpdate(
    { userId: req.user._id, date },
    { userId: req.user._id, date, completed: true },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  // Update streak and user fields
  const streakDoc = (await Streak.findOne({ userId: req.user._id })) || new Streak({ userId: req.user._id, activityLog: [] });

  const nextStreak = calculateNextStreak(req.user.lastDictionaryActivity, req.user.dictionaryStreak || 0);

  streakDoc.activityLog = mergeHeatmapEntry(
    streakDoc.activityLog,
    "dictionary",
    date,
  );

  await streakDoc.save();

  // Update user counters
  req.user.totalPoints = (req.user.totalPoints || 0) + 10; // small reward
  req.user.dictionaryStreak = nextStreak;
  req.user.longestDictionaryStreak = Math.max(req.user.longestDictionaryStreak || 0, req.user.dictionaryStreak || 0);
  req.user.lastDictionaryActivity = new Date();
  await req.user.save();

  return res.json({ success: true, date });
}
