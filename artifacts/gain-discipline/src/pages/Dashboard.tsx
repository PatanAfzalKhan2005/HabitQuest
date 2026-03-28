import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@workspace/replit-auth-web';
import { useGetUserProfile, useGetDailyProblem } from '@workspace/api-client-react';
import { ActivityHeatmap } from '@/components/shared/ActivityHeatmap';
import { Link } from 'wouter';
import { Flame, BrainCircuit, Code2, Zap, ArrowRight, Star } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  
  // Provide fallback empty data if API fails or is loading
  const { data: profile, isLoading: profileLoading } = useGetUserProfile({
    query: { retry: false }
  });
  
  const { data: dailyProblem } = useGetDailyProblem({
    query: { retry: false }
  });

  const quotes = [
    "Consistency is the architecture of mastery.",
    "Discipline equals freedom.",
    "Small daily improvements over time lead to stunning results."
  ];
  const dailyQuote = quotes[new Date().getDay() % quotes.length];

  const stats = profile || {
    totalPoints: 0,
    aptitudeStreak: 0,
    codingStreak: 0,
    heatmapData: []
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Welcome back, <span className="text-primary">{user?.firstName || user?.email?.split("@")[0] || "Discipler"}</span>!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg italic border-l-4 border-accent pl-4">
          "{dailyQuote}"
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Stats Area */}
        <div className="md:col-span-8 space-y-6">
          {/* Streaks Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Flame size={64} className="text-accent" />
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                <Flame size={24} className="fill-current" />
              </div>
              <p className="text-3xl font-display font-bold text-foreground">{stats.aptitudeStreak}</p>
              <p className="text-sm text-muted-foreground font-medium">Aptitude Streak</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code2 size={64} className="text-primary" />
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <Code2 size={24} />
              </div>
              <p className="text-3xl font-display font-bold text-foreground">{stats.codingStreak}</p>
              <p className="text-sm text-muted-foreground font-medium">Coding Streak</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary/20 to-card border border-primary/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <Zap size={24} className="fill-current" />
              </div>
              <p className="text-3xl font-display font-bold text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                {stats.totalPoints}
              </p>
              <p className="text-sm text-primary/80 font-medium">Geekbits</p>
            </motion.div>
          </div>

          {/* Activity Heatmap */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
              <Star size={18} className="text-accent" /> Activity History
            </h3>
            {profileLoading ? (
              <div className="h-32 flex items-center justify-center text-muted-foreground">Loading activity...</div>
            ) : (
              <ActivityHeatmap data={stats.heatmapData} />
            )}
          </motion.div>
        </div>

        {/* Sidebar Actions */}
        <div className="md:col-span-4 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-1 relative overflow-hidden"
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/mascot.png`} 
              alt="Mascot" 
              className="w-full h-48 object-cover rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display font-bold text-xl mb-1">Time to train!</h3>
              <p className="text-sm text-muted-foreground mb-4">Don't let your streak die today.</p>
              <Link href="/aptitude">
                <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer">
                  Start Aptitude Quiz <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Daily Challenge Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Daily Code</h3>
              <span className="px-2 py-1 rounded bg-accent/20 text-accent text-xs font-bold uppercase">+50 Bits</span>
            </div>
            
            {dailyProblem ? (
              <>
                <p className="text-foreground font-medium mb-2">{dailyProblem.title}</p>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{dailyProblem.topic}</span>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    dailyProblem.level === 'hard' ? 'bg-destructive/20 text-destructive' : 
                    dailyProblem.level === 'simple' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                  }`}>
                    {dailyProblem.level}
                  </span>
                </div>
                <Link href={`/coding/${dailyProblem.topic}/${dailyProblem.level}/${dailyProblem.id}`}>
                  <button className="w-full py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-colors cursor-pointer">
                    Solve Now
                  </button>
                </Link>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm mb-4">Loading daily challenge...</p>
                <Link href="/coding">
                  <button className="w-full py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors cursor-pointer">
                    Browse Problems
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
