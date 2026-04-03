import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Puzzle, Sparkles } from "lucide-react";
import { useConfetti } from "@/hooks/use-confetti";
import { markPuzzleComplete } from "@/features/analytics/quest";

const dailyPuzzles = [
  {
    id: "sequence-river",
    title: "River Sequence",
    prompt: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "44"],
    answer: "42",
    explanation: "The gap grows by 2: +4, +6, +8, +10, so the next jump is +12.",
  },
  {
    id: "mirror-grid",
    title: "Mirror Grid",
    prompt: "A 3x3 grid is mirrored horizontally. Which corner stays in place?",
    options: ["Top-left", "Top-right", "Bottom-left", "Center"],
    answer: "Center",
    explanation: "Only the center point remains unchanged during a mirror flip.",
  },
];

export function PuzzlePage() {
  const { triggerSuccess, triggerSmall } = useConfetti();
  const [selected, setSelected] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const puzzle = useMemo(() => dailyPuzzles[new Date().getDate() % dailyPuzzles.length], []);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === puzzle.answer;
    if (correct) {
      setSolved(true);
      markPuzzleComplete(puzzle.id);
      triggerSuccess();
    } else {
      triggerSmall();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-card/75 p-8 backdrop-blur-xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
          <Sparkles size={16} />
          Daily Puzzle System
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-display font-bold text-foreground">
              <Puzzle className="text-primary" />
              {puzzle.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{puzzle.prompt}</p>

            <div className="mt-8 grid gap-4">
              {puzzle.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`rounded-2xl border px-5 py-4 text-left text-base font-medium transition-all ${
                    selected === option
                      ? "border-primary bg-primary/10 text-primary shadow-[0_0_24px_rgba(34,197,94,0.2)]"
                      : "border-white/10 bg-black/15 text-foreground hover:-translate-y-0.5 hover:border-primary/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button onClick={handleSubmit} className="mt-8 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-[0_12px_40px_rgba(34,197,94,0.35)] transition-transform hover:scale-[1.02]">
              Submit Puzzle
            </button>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6">
            <h2 className="text-xl font-display font-bold text-foreground">Reward Panel</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Solve the daily puzzle to update your streak, unlock the reward animation, and keep your activity graph climbing.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Completion</p>
              <p className="mt-3 text-3xl font-bold text-foreground">{solved ? "100%" : "0%"}</p>
            </div>
            {selected && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-foreground">{selected === puzzle.answer ? "Correct move" : "Try again"}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{puzzle.explanation}</p>
              </div>
            )}
            {solved && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-primary">
                <Trophy size={20} />
                Puzzle cleared. Streak and progress updated.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
