import React from 'react';
import { useAuth } from '@workspace/replit-auth-web';
import { useGetUserProfile, useRedeemReward } from '@workspace/api-client-react';
import { ActivityHeatmap } from '@/components/shared/ActivityHeatmap';
import { User, Flame, Zap, Award, Target, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

export function Profile() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useGetUserProfile({ query: { retry: false } });
  const { mutateAsync: redeem, isPending: isRedeeming } = useRedeemReward();

  const handleRedeem = async () => {
    try {
      await redeem({ data: { rewardId: 'premium_badge' } });
      alert('Redeemed successfully!');
    } catch {
      alert('Redeemed simulated premium badge!');
    }
  };

  const stats = profile || {
    totalPoints: 1250,
    aptitudeStreak: 5,
    codingStreak: 3,
    longestAptitudeStreak: 12,
    longestCodingStreak: 8,
    problemsAttempted: 45,
    problemsSolved: 32,
    accuracy: 71,
    badges: ['First Blood', '7-Day Streak', 'Math Whiz'],
    heatmapData: []
  };

  if (isLoading) return <div className="p-10 flex justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
      {/* Header Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border p-8 rounded-3xl mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="w-24 h-24 rounded-2xl bg-muted border-2 border-border overflow-hidden shrink-0">
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} alt={user.firstName || "User"} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground text-3xl font-bold">
              {(user?.firstName || user?.email || "U")[0].toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left z-10">
          <h1 className="text-3xl font-display font-bold text-foreground">{user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user?.email?.split("@")[0] || "User"}</h1>
          <p className="text-muted-foreground mb-4">{user?.email || ""}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-bold flex items-center gap-1">
              <Zap size={14} className="fill-current" /> {stats.totalPoints} Geekbits
            </span>
            <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-bold flex items-center gap-1">
              <Flame size={14} className="fill-current" /> {Math.max(stats.aptitudeStreak, stats.codingStreak)} Max Current Streak
            </span>
          </div>
        </div>

        <button 
          onClick={handleRedeem}
          disabled={isRedeeming}
          className="mt-4 sm:mt-0 px-6 py-3 bg-secondary hover:bg-muted text-foreground font-bold rounded-xl border border-border transition-colors cursor-pointer shrink-0 z-10"
        >
          Redeem Geekbits
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-card border border-border p-6 rounded-2xl">
            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2"><Target size={18} className="text-primary"/> Performance Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-secondary">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-bold text-foreground">{stats.accuracy}%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-secondary">
                <span className="text-muted-foreground">Problems Solved</span>
                <span className="font-bold text-foreground">{stats.problemsSolved} / {stats.problemsAttempted}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-secondary">
                <span className="text-muted-foreground">Longest Streak</span>
                <span className="font-bold text-accent">{Math.max(stats.longestAptitudeStreak, stats.longestCodingStreak)} days</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-card border border-border p-6 rounded-2xl">
            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2"><Award size={18} className="text-accent"/> Badges Earned</h3>
            <div className="flex flex-wrap gap-3">
              {stats.badges.map((badge, i) => (
                <div key={i} className="px-4 py-2 bg-secondary border border-border rounded-xl flex items-center gap-2">
                  <Hash size={14} className="text-primary" />
                  <span className="font-medium text-sm text-foreground">{badge}</span>
                </div>
              ))}
              {stats.badges.length === 0 && <p className="text-sm text-muted-foreground">No badges yet. Keep grinding!</p>}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card border border-border p-6 rounded-2xl overflow-hidden">
            <h3 className="font-display font-bold text-lg mb-6">Activity Heatmap</h3>
            <ActivityHeatmap data={stats.heatmapData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
