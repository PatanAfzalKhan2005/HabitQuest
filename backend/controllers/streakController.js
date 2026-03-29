import Streak from "../models/Streak.js";

export async function getAllStreaks(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const streakDoc = await Streak.findOne({ userId: req.user._id }).lean();
  res.json({
    aptitudeStreak: req.user.aptitudeStreak || 0,
    codingStreak: req.user.codingStreak || 0,
    activityLog: streakDoc?.activityLog || [],
  });
}
