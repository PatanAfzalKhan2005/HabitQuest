import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@workspace/replit-auth-web';
import { Zap, Brain, Code2, Trophy, ArrowRight } from 'lucide-react';
import { Redirect } from 'wouter';

export function Landing() {
  const { isAuthenticated, login, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Image / Effects */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={24} className="text-primary fill-primary" />
          <span className="font-display font-bold text-xl text-foreground">Gain Discipline</span>
        </div>
        <button 
          onClick={login}
          className="px-6 py-2 rounded-full font-semibold text-sm bg-card hover:bg-muted border border-border transition-colors text-foreground"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8"
        >
          <Trophy size={16} />
          <span>Gamified Learning Platform</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-extrabold text-white max-w-4xl leading-tight tracking-tight mb-6"
        >
          Master Skills Through <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Daily Discipline
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
        >
          Build your aptitude, conquer coding challenges, and track your daily streaks. Compete on the leaderboard and earn Geekbits to redeem real rewards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={login}
            className="px-8 py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Start Learning Now <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full max-w-5xl">
          {[
            { icon: Brain, title: "Aptitude Mastery", desc: "15+ topics from probability to algebra with varying difficulties." },
            { icon: Code2, title: "Coding Challenges", desc: "Practice algorithms and data structures in JS, Python, or Java." },
            { icon: Trophy, title: "Earn & Redeem", desc: "Maintain streaks to earn Geekbits and climb the global leaderboard." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
              className="p-8 rounded-3xl bg-card border border-border text-left hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
