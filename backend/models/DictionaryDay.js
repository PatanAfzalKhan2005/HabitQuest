import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    explanation: { type: String, required: true },
    example: { type: String, required: true },
  },
  { _id: false },
);

const dictionaryDaySchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true },
    words: { type: [wordSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("DictionaryDay", dictionaryDaySchema);
