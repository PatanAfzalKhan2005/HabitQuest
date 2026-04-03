import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { getQuestSnapshot, saveHabits } from "@/features/analytics/quest";

export function HabitTrackerPage() {
  const snapshot = getQuestSnapshot();
  const habits = snapshot?.defaults.habits || ["Bathing", "Fresh", "Study", "Food", "Clothing", "Timings", "Games"];
  const today = new Date().toISOString().split("T")[0];
  const existing = snapshot?.progress.habitsByDate?.[today] || {};
  const [values, setValues] = useState<Record<string, boolean>>(existing);

  useEffect(() => {
    setValues(existing);
  }, [today]);

  const completedCount = Object.values(values).filter(Boolean).length;

  const toggleHabit = (habit: string) => {
    const next = { ...values, [habit]: !values[habit] };
    setValues(next);
    saveHabits(next);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-card/75 p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Habit Tracker
            </p>
            <h1 className="mt-4 text-4xl font-display font-bold text-foreground">Build the routine behind the results.</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Check off your daily essentials. When all seven are complete, HabitQuest automatically records the activity and extends your streak.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 px-6 py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Today</p>
            <p className="mt-2 flex items-center gap-2 text-3xl font-bold text-foreground"><Clock3 size={22} className="text-accent" /> {completedCount}/7</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {habits.map((habit, index) => (
            <motion.button
              key={habit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => toggleHabit(habit)}
              className={`rounded-[1.5rem] border p-5 text-left transition-all ${
                values[habit]
                  ? "border-primary/40 bg-primary/10 shadow-[0_0_32px_rgba(34,197,94,0.18)]"
                  : "border-white/10 bg-black/15 hover:border-primary/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-display font-bold text-foreground">{habit}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {values[habit] ? "Completed and saved for today." : "Tap to mark this habit complete."}
                  </p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${values[habit] ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground"}`}>
                  <CheckCircle2 size={20} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
