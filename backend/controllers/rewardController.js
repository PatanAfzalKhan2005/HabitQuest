import Reward from "../models/Reward.js";

const REWARDS = [
  { id: "badge-beginner", name: "Beginner Badge", type: "badge", cost: 100, description: "Starter badge for new learners" },
  { id: "badge-pro", name: "Pro Badge", type: "badge", cost: 500, description: "Badge for intermediate learners" },
  { id: "badge-master", name: "Master Badge", type: "badge", cost: 1000, description: "Badge for expert learners" },
  { id: "cert-aptitude", name: "Aptitude Certificate", type: "certificate", cost: 2000, description: "Certificate of aptitude mastery" },
  { id: "premium-unlock", name: "Premium Questions", type: "premium", cost: 300, description: "Unlock premium practice questions" },
];

export function getRewards(_req, res) {
  res.json({ rewards: REWARDS });
}

export async function redeemReward(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { rewardId } = req.body;
  const reward = REWARDS.find((entry) => entry.id === rewardId);

  if (!reward) {
    return res.status(404).json({ success: false, message: "Reward not found", newBalance: req.user.totalPoints || 0 });
  }

  if ((req.user.totalPoints || 0) < reward.cost) {
    return res.json({ success: false, message: "Not enough Geekbits", newBalance: req.user.totalPoints || 0 });
  }

  const alreadyRedeemed = await Reward.findOne({ userId: req.user._id, rewardId });
  if (alreadyRedeemed) {
    return res.json({ success: false, message: "Already redeemed", newBalance: req.user.totalPoints || 0 });
  }

  req.user.totalPoints -= reward.cost;
  if (reward.type === "badge") {
    req.user.badges = [...(req.user.badges || []), reward.id];
  }
  await req.user.save();

  await Reward.create({
    userId: req.user._id,
    rewardId: reward.id,
    rewardType: reward.type,
    rewardName: reward.name,
    cost: reward.cost,
  });

  return res.json({
    success: true,
    message: `Successfully redeemed ${reward.name}!`,
    newBalance: req.user.totalPoints,
    badge: reward.type === "badge" ? reward.id : undefined,
  });
}
