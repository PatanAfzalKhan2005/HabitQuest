import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, default: null, index: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    profileImageUrl: { type: String, default: null },
    authProvider: { type: String, default: "jwt" },
    totalPoints: { type: Number, default: 0 },
    aptitudeStreak: { type: Number, default: 0 },
    longestAptitudeStreak: { type: Number, default: 0 },
    lastAptitudeActivity: { type: Date, default: null },
    dictionaryStreak: { type: Number, default: 0 },
    longestDictionaryStreak: { type: Number, default: 0 },
    lastDictionaryActivity: { type: Date, default: null },
    codingStreak: { type: Number, default: 0 },
    longestCodingStreak: { type: Number, default: 0 },
    lastCodingActivity: { type: Date, default: null },
    problemsAttempted: { type: Number, default: 0 },
    problemsSolved: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
