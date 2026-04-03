import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Code2, Sparkles } from "lucide-react";
import { getQuestSnapshot, markCodingPlatform } from "@/features/analytics/quest";

const platforms = [
  { id: "geeksforgeeks", title: "GeeksforGeeks", subtitle: "Problem exploration hub", link: "https://www.geeksforgeeks.org/explore", glow: "from-emerald-400/25 to-green-500/10" },
  { id: "smart-interview-hive", title: "Smart Interview Hive", subtitle: "Interview-focused coding drills", link: "https://hive.smartinterviews.in/", glow: "from-sky-400/25 to-cyan-500/10" },
  { id: "neopat", title: "NeoPat", subtitle: "Practice through structured company sets", link: "https://admin.mits923.examly.io/login", glow: "from-orange-400/25 to-amber-500/10" },
  { id: "codetantra", title: "CodeTantra", subtitle: "Assessment and compiler practice", link: "https://auth.codetantra.com", glow: "from-pink-400/20 to-rose-500/10" },
  { id: "practice-portal", title: "Practice Portal", subtitle: "Custom quest portal for focused sessions", link: "https://www.geeksforgeeks.org/explore", glow: "from-violet-400/20 to-indigo-500/10" },
];

export function CodingTopics() {
  const snapshot = getQuestSnapshot();
  const completed = snapshot?.progress.codingPlatforms || {};
  const stats = snapshot?.stats;

  const completedCount = useMemo(() => Object.values(completed).filter(Boolean).length, [completed]);

  const handleOpen = (platformId: string, link: string) => {
    markCodingPlatform(platformId);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-card/75 p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Coding Practice
            </p>
            <h1 className="mt-4 flex items-center gap-3 text-4xl font-display font-bold text-foreground">
              <Code2 className="text-primary" />
              Choose your coding arena
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
              Each platform card floats, glows, and marks itself complete on click. Opening a platform automatically counts as coding activity and updates your streak.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Completed</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{completedCount}/5</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Streak</p>
              <p className="mt-2 text-3xl font-bold text-primary">{stats?.currentStreak || 0}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {platforms.map((platform, index) => (
            <motion.button
              key={platform.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, rotateX: 7, rotateY: -7, scale: 1.02 }}
              onClick={() => handleOpen(platform.id, platform.link)}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${platform.glow} p-[1px] text-left shadow-[0_18px_48px_rgba(0,0,0,0.25)]`}
            >
              <div className="relative h-full rounded-[1.7rem] bg-slate-950/90 p-6">
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 40%)" }} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Platform</p>
                    <h2 className="mt-3 text-2xl font-display font-bold text-foreground">{platform.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{platform.subtitle}</p>
                  </div>
                  {completed[platform.id] ? (
                    <div className="rounded-full bg-primary/15 p-2 text-primary">
                      <CheckCircle2 size={20} />
                    </div>
                  ) : (
                    <div className="rounded-full bg-white/10 p-2 text-muted-foreground">
                      <ExternalLink size={20} />
                    </div>
                  )}
                </div>
                <div className="mt-10 flex items-center justify-between">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Open platform</span>
                  {completed[platform.id] && <span className="text-sm font-medium text-primary">Completed</span>}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
