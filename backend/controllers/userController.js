import User from "../models/User.js";
import Streak from "../models/Streak.js";

export async function getProfile(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const streakDoc = await Streak.findOne({ userId: req.user._id }).lean();
  const attempted = req.user.problemsAttempted || 0;
  const solved = req.user.problemsSolved || 0;

  return res.json({
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profileImageUrl: req.user.profileImageUrl,
    totalPoints: req.user.totalPoints || 0,
    aptitudeStreak: req.user.aptitudeStreak || 0,
    codingStreak: req.user.codingStreak || 0,
    longestAptitudeStreak: req.user.longestAptitudeStreak || 0,
    longestCodingStreak: req.user.longestCodingStreak || 0,
    problemsAttempted: attempted,
    problemsSolved: solved,
    accuracy: attempted ? Math.round((solved / attempted) * 100) : 0,
    badges: req.user.badges || [],
    heatmapData: (streakDoc?.activityLog || []).map((entry) => ({
      date: entry.activityDate,
      count: entry.count,
    })),
  });
}

export async function getLeaderboard(_req, res) {
  const users = await User.find({})
    .sort({ totalPoints: -1, updatedAt: 1 })
    .limit(20)
    .lean();

  res.json({
    leaderboard: users.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      username: user.firstName
        ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`
        : user.email?.split("@")[0] || "Unknown",
      profileImageUrl: user.profileImageUrl || null,
      totalPoints: user.totalPoints || 0,
      aptitudeStreak: user.aptitudeStreak || 0,
      codingStreak: user.codingStreak || 0,
    })),
  });
}
