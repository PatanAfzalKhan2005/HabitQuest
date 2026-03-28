import { pgTable, text, serial, integer, timestamp, boolean, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./auth";

export const userStatsTable = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => usersTable.id),
  totalPoints: integer("total_points").notNull().default(0),
  aptitudeStreak: integer("aptitude_streak").notNull().default(0),
  longestAptitudeStreak: integer("longest_aptitude_streak").notNull().default(0),
  lastAptitudeActivity: timestamp("last_aptitude_activity"),
  codingStreak: integer("coding_streak").notNull().default(0),
  longestCodingStreak: integer("longest_coding_streak").notNull().default(0),
  lastCodingActivity: timestamp("last_coding_activity"),
  problemsAttempted: integer("problems_attempted").notNull().default(0),
  problemsSolved: integer("problems_solved").notNull().default(0),
  badges: text("badges").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const aptitudeAttemptsTable = pgTable("aptitude_attempts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id),
  topic: text("topic").notNull(),
  level: text("level").notNull(),
  score: integer("score").notNull(),
  total: integer("total").notNull(),
  pointsEarned: integer("points_earned").notNull().default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const codingAttemptsTable = pgTable("coding_attempts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id),
  problemId: text("problem_id").notNull(),
  language: text("language").notNull(),
  passed: boolean("passed").notNull().default(false),
  pointsEarned: integer("points_earned").notNull().default(0),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const activityLogTable = pgTable("activity_log", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id),
  activityType: text("activity_type").notNull(), // 'aptitude' | 'coding'
  activityDate: text("activity_date").notNull(), // YYYY-MM-DD format
  count: integer("count").notNull().default(1),
});

export const rewardsTable = pgTable("rewards", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id),
  rewardId: text("reward_id").notNull(),
  rewardType: text("reward_type").notNull(), // 'badge' | 'certificate' | 'premium'
  redeemedAt: timestamp("redeemed_at").defaultNow(),
});

export const insertUserStatsSchema = createInsertSchema(userStatsTable).omit({ id: true });
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type UserStats = typeof userStatsTable.$inferSelect;

export const insertAptitudeAttemptSchema = createInsertSchema(aptitudeAttemptsTable).omit({ id: true });
export type InsertAptitudeAttempt = z.infer<typeof insertAptitudeAttemptSchema>;
export type AptitudeAttempt = typeof aptitudeAttemptsTable.$inferSelect;

export const insertCodingAttemptSchema = createInsertSchema(codingAttemptsTable).omit({ id: true });
export type InsertCodingAttempt = z.infer<typeof insertCodingAttemptSchema>;
export type CodingAttempt = typeof codingAttemptsTable.$inferSelect;

export const insertActivityLogSchema = createInsertSchema(activityLogTable).omit({ id: true });
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLogTable.$inferSelect;
