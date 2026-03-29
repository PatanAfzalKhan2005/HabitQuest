import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    rewardId: { type: String, required: true },
    rewardType: { type: String, required: true },
    rewardName: { type: String, required: true },
    cost: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Reward", rewardSchema);
