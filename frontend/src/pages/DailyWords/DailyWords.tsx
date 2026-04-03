import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGetTodayDictionary, useGetDictionaryByDate, useCompleteDictionaryDay, useGetDictionaryActivity } from "@/services/api-hooks";
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import AnimatedDictionaryPath from '@/components/animations/AnimatedDictionaryPath';
import { getQuestSnapshot, markWordsComplete } from "@/features/analytics/quest";

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString();
  } catch (e) {
    return d;
  }
}

function toDateKey(value: string | Date) {
  return new Date(value).toISOString().split('T')[0];
}

export function DailyWordsPreview() {
  const { data, isLoading } = useGetTodayDictionary({ query: { retry: false } });
  const localCompleted = getQuestSnapshot()?.stats.wordsCompleted;
  if (isLoading || !data) return <div className="text-sm text-muted-foreground">Loading words...</div>;
  const { date, words, completed } = data;
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <h4 className="font-display font-bold mb-2">Daily Words</h4>
      <p className="text-xs text-muted-foreground mb-2">{formatDate(date)}</p>
      <ul className="space-y-1">
        {words.slice(0, 3).map((w: any, idx: number) => (
          <li key={idx} className="text-sm text-foreground">{w.word} — <span className="text-muted-foreground">{w.meaning}</span></li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between">
        <a href="/dictionary" className="text-sm text-primary font-medium">Open</a>
        <span className={`text-xs px-2 py-1 rounded ${(completed || localCompleted) ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>{(completed || localCompleted) ? 'Completed' : 'Pending'}</span>
      </div>
    </div>
  );
}

export default function DailyWordsPage() {
  const selectedDate =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("date")
      : null;
  const todayQuery = useGetTodayDictionary({
    query: { enabled: !selectedDate },
  });
  const selectedDateQuery = useGetDictionaryByDate(selectedDate, {
    query: { enabled: Boolean(selectedDate) },
  });
  const data = selectedDate ? selectedDateQuery.data : todayQuery.data;
  const isLoading = selectedDate ? selectedDateQuery.isLoading : todayQuery.isLoading;
  const refetch = selectedDate ? selectedDateQuery.refetch : todayQuery.refetch;
  const { data: activityData, refetch: refetchActivity } = useGetDictionaryActivity(30, { query: { retry: false } });
  const queryClient = useQueryClient();
  const completeMutation = useCompleteDictionaryDay();
  const { toast } = useToast();

  const [learned, setLearned] = useState<boolean[]>([]);
  const [overrideDates, setOverrideDates] = useState<string[]>([]);
  const [daysState, setDaysState] = useState<any[] | null>(null);

  useEffect(() => {
    if (data?.words) setLearned(new Array(data.words.length).fill(false));
  }, [data?.words]);

  // build local daysState from activityData and overrideDates so we can update it immutably
  useEffect(() => {
    const today = new Date();
    const todayKey = toDateKey(today);
    const startDate = new Date();
    startDate.setDate(today.getDate() - 29);
    const arr: any[] = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const key = toDateKey(d);
      const activity = (activityData || []).find((a: any) => toDateKey(a.date) === key);
      const completed = Boolean(activity?.completed) || (overrideDates || []).includes(key);
      let status: 'completed' | 'current' | 'available' | 'locked' = 'locked';
      if (completed) status = 'completed';
      else if (key === todayKey) status = 'current';
      else if (key < todayKey) status = 'available';
      arr.push({ date: key, status });
    }
    setDaysState(arr);
  }, [activityData, overrideDates]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!data) return <div className="p-6">No words for this day.</div>;
  if ((data as any).locked) return <div className="p-6">This day is locked.</div>;

  const handleToggle = (index: number) => {
    setLearned((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      // if toggling makes all learned, auto-complete
      const all = next.every(Boolean) && next.length > 0;
      if (all) {
        (async () => {
          try {
            // optimistic update for auto-complete as well
            const activityKey = ['dictionary-activity', 30];
            const todayKey = ['dictionary-today'];
            const d = data.date;
            const normalized = new Date(d).toISOString().split('T')[0];

            queryClient.setQueryData(activityKey, (old: any[] | undefined) => {
              const prev = Array.isArray(old) ? old : [];
              const found = prev.find((p: any) => p.date === normalized);
              if (found) {
                return prev.map((p: any) => p.date === normalized ? { ...p, completed: true } : p);
              }
              return [...prev, { date: normalized, completed: true }];
            });

            queryClient.setQueryData(todayKey, (old: any) => {
              if (!old) return { date: normalized, words: data.words, completed: true };
              return { ...old, completed: true };
            });

            // optimistic local override for auto-complete
            setOverrideDates((prev) => Array.from(new Set([...prev, normalized])));

            // update controlled daysState immutably so AnimatedDictionaryPath re-renders
            setDaysState((prev) => {
              if (!prev) return prev;
              const idx = prev.findIndex((p: any) => p.date === normalized);
              if (idx === -1) return prev;
              const updated = prev.map((p: any, i: number) => i === idx ? { ...p, status: 'completed' } : p);
              // unlock next day if it's locked
              if (updated[idx + 1] && updated[idx + 1].status === 'locked') {
                updated[idx + 1] = { ...updated[idx + 1], status: 'current' };
              }
              return [...updated];
            });

            setTimeout(() => {
              setOverrideDates((prev) => prev.filter(d => d !== normalized));
            }, 8000);


            await completeMutation.mutateAsync({ data: { date: data.date } });
            markWordsComplete();
            toast({ title: "Day completed", description: "Great job — your streak was updated." });
            refetch();
            refetchActivity();
          } catch (e: any) {
            queryClient.invalidateQueries({ queryKey: ['dictionary-activity'] });
            queryClient.invalidateQueries({ queryKey: ['dictionary-today'] });
            toast({ title: "Error", description: e?.message || "Failed to mark complete" });
          }
        })();
      }
      return next;
    });
  };

  const allLearned = learned.every(Boolean) && learned.length > 0;

  const handleComplete = async () => {
    if (!data?.date) return;
    try {
      // optimistic update: mark today completed in cache so heatmap and preview update instantly
      const activityKey = ['dictionary-activity', 30];
      const todayKey = ['dictionary-today'];
      const d = data.date;
      const normalized = new Date(d).toISOString().split('T')[0];

      queryClient.setQueryData(activityKey, (old: any[] | undefined) => {
        const prev = Array.isArray(old) ? old : [];
        const found = prev.find((p: any) => p.date === normalized);
        if (found) {
          return prev.map((p: any) => p.date === normalized ? { ...p, completed: true } : p);
        }
        return [...prev, { date: normalized, completed: true }];
      });

      queryClient.setQueryData(todayKey, (old: any) => {
        if (!old) return { date: normalized, words: data.words, completed: true };
        return { ...old, completed: true };
      });


      // local override so UI updates even if backend is slow
      setOverrideDates((prev) => Array.from(new Set([...prev, normalized])));

      // also update controlled daysState so AnimatedDictionaryPath shows completion immediately
      setDaysState((prev) => {
        if (!prev) return prev;
        const idx = prev.findIndex((p: any) => p.date === normalized);
        if (idx === -1) return prev;
        const updated = prev.map((p: any, i: number) => i === idx ? { ...p, status: 'completed' } : p);
        if (updated[idx + 1] && updated[idx + 1].status === 'locked') {
          updated[idx + 1] = { ...updated[idx + 1], status: 'current' };
        }
        return [...updated];
      });

      await completeMutation.mutateAsync({ data: { date: data.date } });
      markWordsComplete();
      toast({ title: "Day completed", description: "Great job — your streak was updated." });
      refetch();
      refetchActivity();
      // clear optimistic override after a short animation window
      setTimeout(() => {
        setOverrideDates((prev) => prev.filter(d => d !== normalized));
      }, 8000);
    } catch (e: any) {
      // rollback optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['dictionary-activity'] });
      queryClient.invalidateQueries({ queryKey: ['dictionary-today'] });
      setOverrideDates((prev) => prev.filter(d => d !== new Date(data.date).toISOString().split('T')[0]));
      toast({ title: "Error", description: e?.message || "Failed to mark complete" });
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Daily Words</h1>
        <p className="text-sm text-muted-foreground mt-1">{formatDate(data.date)}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.words.map((w: any, idx: number) => (
          <motion.div key={w.word + idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-foreground text-lg">{w.word}</h3>
                <p className="text-sm text-accent mt-1">{w.meaning}</p>
                <p className="text-sm text-muted-foreground mt-2">{w.explanation}</p>
                <p className="mt-3 text-sm text-muted-foreground italic">"{w.example}"</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => handleToggle(idx)} className={`py-2 px-3 rounded-xl font-medium ${learned[idx] ? 'bg-accent text-accent-foreground' : 'border border-border text-muted-foreground'}`}>
                  {learned[idx] ? 'Learned' : 'Mark as Learned'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <AnimatedDictionaryPath data={activityData || []} count={30} daysState={daysState} overrideDates={overrideDates} onClick={(date, status) => {
          if (status === 'locked') {
            toast({ title: 'Locked', description: 'Complete previous day to unlock.' });
            return;
          }
          // navigate to day - open dictionary by date
          window.location.href = `/dictionary?date=${date}`;
        }} />
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button disabled={!allLearned} onClick={handleComplete} className={`py-2.5 px-4 rounded-xl font-bold ${allLearned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
          Complete Day
        </button>
      </div>
    </div>
  );
}
