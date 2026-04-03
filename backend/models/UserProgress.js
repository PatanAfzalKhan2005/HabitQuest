import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("UserProgress", userProgressSchema);
