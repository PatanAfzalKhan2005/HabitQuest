import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    activityType: { type: String, enum: ["aptitude", "coding"], required: true },
    activityDate: { type: String, required: true },
    count: { type: Number, default: 1 },
  },
  { _id: false },
);

const streakSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    activityLog: { type: [activityLogSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Streak", streakSchema);
