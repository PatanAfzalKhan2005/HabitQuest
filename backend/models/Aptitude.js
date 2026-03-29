import mongoose from "mongoose";

const aptitudeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    topic: { type: String, required: true, index: true },
    level: { type: String, required: true, index: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Aptitude", aptitudeSchema);
