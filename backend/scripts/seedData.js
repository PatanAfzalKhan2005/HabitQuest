import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { connectDB } from "../config/db.js";
import Aptitude from "../models/Aptitude.js";
import Coding from "../models/Coding.js";
import { getQuestions, getTopics } from "../data/aptitudeData.js";
import { getUserQuestions } from "../data/aptitudeUserQuestions.js";
import { codingProblems } from "../data/codingData.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

async function seed() {
  await connectDB();

  const aptitudeQuestions = getTopics().flatMap((topic) =>
    ["simple", "hard", "difficult"].flatMap((level) => getQuestions(topic, level)),
  );

  // include user-provided questions (unique IDs prefixed with u-)
  const userQs = getUserQuestions();
  const merged = aptitudeQuestions.concat(userQs || []);

  await Aptitude.deleteMany({});
  await Coding.deleteMany({});

  if (merged.length) {
    await Aptitude.insertMany(merged);
  }

  if (codingProblems.length) {
    await Coding.insertMany(codingProblems);
  }

  console.log(`Seeded ${aptitudeQuestions.length} aptitude questions`);
  console.log(`Seeded ${codingProblems.length} coding problems`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
