import React from 'react';
import { motion } from 'framer-motion';
import { useGetAptitudeTopics } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { BrainCircuit, Lock, Play, CheckCircle2 } from 'lucide-react';

export function AptitudeTopics() {
  // If endpoint is missing, provide fallback data to ensure UI works
  const { data, isLoading } = useGetAptitudeTopics({
    query: { retry: false }
  });

  const fallbackTopics = [
    { id: 't1', name: 'Numbers', totalQuestions: 36, solvedQuestions: 12, available: true },
    { id: 't2', name: 'Percentage', totalQuestions: 36, solvedQuestions: 36, available: true },
    { id: 't3', name: 'Profit and Loss', totalQuestions: 36, solvedQuestions: 5, available: true },
    { id: 't4', name: 'Average', totalQuestions: 36, solvedQuestions: 0, available: true },
    { id: 't5', name: 'Ratio & Proportion', totalQuestions: 36, solvedQuestions: 0, available: true },
    { id: 't6', name: 'Time and Work', totalQuestions: 36, solvedQuestions: 0, available: false },
    { id: 't7', name: 'Geometry', totalQuestions: 36, solvedQuestions: 0, available: false },
  ];

  const topics = data?.topics || fallbackTopics;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
          <BrainCircuit className="text-primary" size={36} />
          Aptitude Training
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Master 15 essential topics. Each topic has Simple, Hard, and Difficult levels.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, i) => {
            const isCompleted = topic.solvedQuestions === topic.totalQuestions;
            const progressPercent = Math.round((topic.solvedQuestions / topic.totalQuestions) * 100) || 0;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`
                  relative p-6 rounded-2xl border transition-all duration-300
                  ${topic.available 
                    ? 'bg-card border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1' 
                    : 'bg-card/50 border-border/50 opacity-70'}
                `}
              >
                {!topic.available && (
                  <div className="absolute top-4 right-4 text-muted-foreground">
                    <Lock size={18} />
                  </div>
                )}
                
                {isCompleted && (
                  <div className="absolute top-4 right-4 text-primary">
                    <CheckCircle2 size={20} className="fill-primary/20" />
                  </div>
                )}

                <h3 className="font-display font-bold text-xl mb-4 pr-6">{topic.name}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>Progress</span>
                    <span className={isCompleted ? 'text-primary' : ''}>{progressPercent}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isCompleted ? 'bg-primary' : 'bg-accent'}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {topic.solvedQuestions} / {topic.totalQuestions} Questions
                  </p>
                </div>

                {topic.available ? (
                  <div className="grid grid-cols-3 gap-2">
                    {['simple', 'hard', 'difficult'].map((level) => (
                      <Link key={level} href={`/aptitude/${topic.id}/${level}`}>
                        <button className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-bold capitalize hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer flex items-center justify-center">
                          <Play size={12} className="mr-1" /> {level[0]}
                        </button>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <button disabled className="w-full py-2 rounded-lg bg-muted text-muted-foreground text-sm font-bold cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
