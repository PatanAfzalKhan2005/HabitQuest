import React from 'react';
import { motion } from 'framer-motion';
import { useGetLeaderboard } from '@workspace/api-client-react';
import { Trophy, Flame, Zap } from 'lucide-react';

export function Leaderboard() {
  const { data, isLoading } = useGetLeaderboard({ query: { retry: false } });

  const fallbackData = [
    { rank: 1, userId: '1', username: 'algo_master', totalPoints: 15400, aptitudeStreak: 45, codingStreak: 45 },
    { rank: 2, userId: '2', username: 'math_ninja', totalPoints: 14200, aptitudeStreak: 30, codingStreak: 12 },
    { rank: 3, userId: '3', username: 'byte_wizard', totalPoints: 12800, aptitudeStreak: 15, codingStreak: 28 },
    { rank: 4, userId: '4', username: 'dev_guru', totalPoints: 10500, aptitudeStreak: 5, codingStreak: 10 },
    { rank: 5, userId: '5', username: 'code_runner', totalPoints: 9200, aptitudeStreak: 0, codingStreak: 5 },
  ];

  const leaderboard = data?.leaderboard || fallbackData;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary shadow-[0_0_20px_rgba(34,197,94,0.2)]">
          <Trophy size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Global Leaderboard</h1>
        <p className="text-muted-foreground text-lg">Top disciplines sorted by Geekbits.</p>
      </div>

      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl shadow-black/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 text-muted-foreground text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold text-center w-16">Rank</th>
                <th className="p-4 font-semibold">Discipler</th>
                <th className="p-4 font-semibold text-right">Geekbits</th>
                <th className="p-4 font-semibold text-center hidden sm:table-cell">Aptitude Streak</th>
                <th className="p-4 font-semibold text-center hidden sm:table-cell">Coding Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, i) => (
                <motion.tr 
                  key={entry.userId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4 text-center">
                    {entry.rank === 1 ? <span className="text-2xl">🥇</span> : 
                     entry.rank === 2 ? <span className="text-2xl">🥈</span> : 
                     entry.rank === 3 ? <span className="text-2xl">🥉</span> : 
                     <span className="font-bold text-muted-foreground">#{entry.rank}</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs border border-border">
                        {entry.profileImageUrl ? <img src={entry.profileImageUrl} className="w-full h-full rounded-full object-cover"/> : (entry.username[0] || "U").toUpperCase()}
                      </div>
                      <span className="font-bold font-display text-foreground">@{entry.username}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      <Zap size={14} className="fill-current"/> {entry.totalPoints.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-center hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                      <Flame size={14} className={entry.aptitudeStreak > 0 ? "text-accent" : "text-muted-foreground"}/> {entry.aptitudeStreak}
                    </span>
                  </td>
                  <td className="p-4 text-center hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                      <Flame size={14} className={entry.codingStreak > 0 ? "text-primary" : "text-muted-foreground"}/> {entry.codingStreak}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
