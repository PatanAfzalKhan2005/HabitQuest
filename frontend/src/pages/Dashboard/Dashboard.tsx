import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BarChart, Bar, CartesianGrid, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Brain, Code2, Flame, Puzzle, Sparkles, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { getQuestSnapshot, QUEST_EVENT } from "@/features/analytics/quest";

const featureCards = [
  { href: "/aptitude", icon: Brain, title: "Aptitude Test", description: "12 questions per level with streaks, timer energy, and a completion pop-up." },
  { href: "/coding", icon: Code2, title: "Coding Practice", description: "Animated coding platform cards with progress tracking and streak updates." },
  { href: "/puzzle", icon: Puzzle, title: "Puzzle Game", description: "A LinkedIn-style daily puzzle that rewards completion instantly." },
  { href: "/dictionary", icon: BookOpen, title: "Daily Words", description: "Five fresh words, examples, and a smooth learned-state flow." },
  { href: "/habits", icon: CheckCircle2, title: "Habit Tracker", description: "Complete your routine cards and keep the daily quest alive." },
];

export function Dashboard() {
  const [snapshot, setSnapshot] = useState(() => getQuestSnapshot());

  useEffect(() => {
    const update = () => setSnapshot(getQuestSnapshot());
    window.addEventListener(QUEST_EVENT, update);
    return () => window.removeEventListener(QUEST_EVENT, update);
  }, []);

  const quote = useMemo(() => {
    const pool = [
      "Momentum grows when small wins are visible.",
      "Gamified consistency beats occasional intensity.",
      "Every completed quest compounds into confidence.",
    ];
    return pool[new Date().getDay() % pool.length];
  }, []);

  if (!snapshot) return null;

  const { user, stats, charts, activityFeed } = snapshot;

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-7xl overflow-hidden px-6 py-8 md:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Welcome to Learning Quest
            </p>
            <h1 className="mt-5 text-4xl font-display font-bold text-foreground md:text-5xl">
              Hi {user.name.split(" ")[0]}, your streak is glowing.
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">{quote}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Current</p>
              <p className="mt-2 flex items-center gap-2 text-2xl font-bold text-foreground"><Flame className="text-accent" size={20} /> {stats.currentStreak}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Longest</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{stats.longestStreak}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Geekbits</p>
              <p className="mt-2 text-2xl font-bold text-primary">{stats.totalPoints}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Missed Days</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{stats.missedDays}</p>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="relative mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        {featureCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -6, rotateX: 6, rotateY: -6, scale: 1.02 }}
            className="group rounded-[1.75rem] border border-white/10 bg-white/6 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <div className="flex h-full flex-col">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_30px_rgba(34,197,94,0.18)]">
                <card.icon size={24} />
              </div>
              <h2 className="text-xl font-display font-bold text-foreground">{card.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{card.description}</p>
              <Link href={card.href}>
                <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-semibold text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  Open Quest
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="relative grid grid-cols-1 gap-6 xl:grid-cols-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-card/70 p-6 backdrop-blur-xl xl:col-span-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">Bar Graph Analytics</h3>
              <p className="text-sm text-muted-foreground">Tests completed and coding activity over the last 7 days.</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.bars}>
                <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.12)" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#08111f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }} />
                <Bar dataKey="tests" fill="#22c55e" radius={[8, 8, 0, 0]} />
                <Bar dataKey="coding" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-card/70 p-6 backdrop-blur-xl xl:col-span-5">
          <h3 className="text-xl font-display font-bold text-foreground">Wave Progress Graph</h3>
          <p className="mt-1 text-sm text-muted-foreground">Learning momentum over time with cumulative activity.</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.line}>
                <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.12)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#08111f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16 }} />
                <Line type="monotone" dataKey="progress" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      <section className="relative mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-card/70 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-display font-bold text-foreground">Quest Summary</h3>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tests</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{stats.testsCompleted}</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Coding</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{stats.codingActivity}</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Puzzles</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{stats.puzzlesSolved}</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Habits</p>
              <p className="mt-2 text-2xl font-bold text-foreground">{stats.habitsCompleted}/7</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-card/70 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-display font-bold text-foreground">Recent Activity</h3>
          <div className="mt-5 space-y-3">
            {activityFeed.length ? activityFeed.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
                <div>
                  <p className="font-medium capitalize text-foreground">{item.type} quest</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">+{item.points}</span>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground">No activity yet. Start one module to light up the dashboard.</p>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
