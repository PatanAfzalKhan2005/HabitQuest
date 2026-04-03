import authRoutes from "./authRoutes.js";
import aptitudeRoutes from "./aptitudeRoutes.js";
import codingRoutes from "./codingRoutes.js";
import dictionaryRoutes from "./dictionaryRoutes.js";
import rewardRoutes from "./rewardRoutes.js";
import streakRoutes from "./streakRoutes.js";
import userRoutes from "./userRoutes.js";

export default function registerRoutes(app) {
  app.use("/api", authRoutes);
  app.use("/api/aptitude", aptitudeRoutes);
  app.use("/api/coding", codingRoutes);
  app.use("/api/dictionary", dictionaryRoutes);
  app.use("/api/streak", streakRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/user", rewardRoutes);
}
