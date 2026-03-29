import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
  {
    input: String,
    expected: String,
  },
  { _id: false },
);

const codingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    inputFormat: { type: String, required: true },
    outputFormat: { type: String, required: true },
    constraints: { type: String, required: true },
    sampleInput: { type: String, required: true },
    sampleOutput: { type: String, required: true },
    topic: { type: String, required: true, index: true },
    level: { type: String, required: true, index: true },
    isDaily: { type: Boolean, default: false },
    testCases: { type: [testCaseSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("Coding", codingSchema);
