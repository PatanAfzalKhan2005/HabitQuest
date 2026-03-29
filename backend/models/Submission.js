import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: String,
    selectedAnswer: String,
  },
  { _id: false },
);

const submissionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    submissionType: { type: String, enum: ["aptitude", "coding"], required: true, index: true },
    topic: { type: String, default: null },
    level: { type: String, default: null },
    answers: { type: [answerSchema], default: [] },
    score: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    pointsEarned: { type: Number, default: 0 },
    problemId: { type: String, default: null },
    language: { type: String, default: null },
    code: { type: String, default: null },
    passed: { type: Boolean, default: false },
    testsPassed: { type: Number, default: 0 },
    testsTotal: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Submission", submissionSchema);
