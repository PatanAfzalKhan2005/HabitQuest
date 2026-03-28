import { Router } from "express";
import { db } from "@workspace/db";
import { userStatsTable, activityLogTable, rewardsTable } from "@workspace/db/schema";
import { usersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

const REWARDS = [
  { id: "badge-beginner", name: "Beginner Badge", type: "badge", cost: 100, description: "Starter badge for new learners" },
  { id: "badge-pro", name: "Pro Badge", type: "badge", cost: 500, description: "Badge for intermediate learners" },
  { id: "badge-master", name: "Master Badge", type: "badge", cost: 1000, description: "Badge for expert learners" },
  { id: "cert-aptitude", name: "Aptitude Certificate", type: "certificate", cost: 2000, description: "Certificate of aptitude mastery" },
  { id: "premium-unlock", name: "Premium Questions", type: "premium", cost: 300, description: "Unlock premium practice questions" },
];

router.get("/profile", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const stats = await db.select().from(userStatsTable)
      .where(eq(userStatsTable.userId, req.user!.id));

    const activities = await db.select().from(activityLogTable)
      .where(eq(activityLogTable.userId, req.user!.id));

    const heatmapData = activities.map(a => ({ date: a.activityDate, count: a.count }));

    const s = stats[0];
    const attempted = s?.problemsAttempted || 0;
    const solved = s?.problemsSolved || 0;
    const accuracy = attempted > 0 ? Math.round((solved / attempted) * 100) : 0;

    res.json({
      id: req.user!.id,
      firstName: req.user!.firstName,
      lastName: req.user!.lastName,
      profileImageUrl: req.user!.profileImageUrl,
      totalPoints: s?.totalPoints || 0,
      aptitudeStreak: s?.aptitudeStreak || 0,
      codingStreak: s?.codingStreak || 0,
      longestAptitudeStreak: s?.longestAptitudeStreak || 0,
      longestCodingStreak: s?.longestCodingStreak || 0,
      problemsAttempted: attempted,
      problemsSolved: solved,
      accuracy,
      badges: s?.badges || [],
      heatmapData,
    });
  } catch (e) {
    req.log.error({ err: e }, "Profile fetch failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/leaderboard", async (_req, res) => {
  try {
    const stats = await db.select().from(userStatsTable)
      .orderBy(desc(userStatsTable.totalPoints))
      .limit(20);

    const leaderboard = await Promise.all(stats.map(async (s, i) => {
      const users = await db.select().from(usersTable).where(eq(usersTable.id, s.userId));
      const u = users[0];
      const displayName = u?.firstName
        ? `${u.firstName}${u.lastName ? " " + u.lastName : ""}`
        : u?.email?.split("@")[0] || "Unknown";
      return {
        rank: i + 1,
        userId: s.userId,
        username: displayName,
        profileImageUrl: u?.profileImageUrl || null,
        totalPoints: s.totalPoints,
        aptitudeStreak: s.aptitudeStreak,
        codingStreak: s.codingStreak,
      };
    }));

    res.json({ leaderboard });
  } catch (e) {
    res.json({ leaderboard: [] });
  }
});

router.post("/redeem", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { rewardId } = req.body as { rewardId: string };
  const reward = REWARDS.find(r => r.id === rewardId);

  if (!reward) {
    res.status(404).json({ success: false, message: "Reward not found", newBalance: 0 });
    return;
  }

  try {
    const stats = await db.select().from(userStatsTable)
      .where(eq(userStatsTable.userId, req.user!.id));

    const currentPoints = stats[0]?.totalPoints || 0;

    if (currentPoints < reward.cost) {
      res.json({ success: false, message: "Not enough Geekbits", newBalance: currentPoints });
      return;
    }

    const alreadyRedeemed = await db.select().from(rewardsTable)
      .where(eq(rewardsTable.userId, req.user!.id));

    if (alreadyRedeemed.some(r => r.rewardId === rewardId)) {
      res.json({ success: false, message: "Already redeemed", newBalance: currentPoints });
      return;
    }

    const newBalance = currentPoints - reward.cost;

    await db.update(userStatsTable)
      .set({
        totalPoints: newBalance,
        badges: reward.type === "badge"
          ? [...(stats[0]?.badges || []), reward.id]
          : stats[0]?.badges || [],
      })
      .where(eq(userStatsTable.userId, req.user!.id));

    await db.insert(rewardsTable).values({
      userId: req.user!.id,
      rewardId,
      rewardType: reward.type,
    });

    res.json({
      success: true,
      message: `Successfully redeemed ${reward.name}!`,
      newBalance,
      badge: reward.type === "badge" ? reward.id : undefined,
    });
  } catch (e) {
    req.log.error({ err: e }, "Redeem failed");
    res.status(500).json({ success: false, message: "Redemption failed", newBalance: 0 });
  }
});

router.get("/rewards", async (_req, res) => {
  res.json({ rewards: REWARDS });
});

export default router;
