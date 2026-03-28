import React from 'react';
import { motion } from 'framer-motion';
import { useGetCodingTopics } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { Code2, ChevronRight, Lock } from 'lucide-react';

export function CodingTopics() {
  const { data, isLoading } = useGetCodingTopics({ query: { retry: false } });

  const fallbackTopics = [
    { id: 'arrays', name: 'Arrays & Hashing', totalProblems: 50, solvedProblems: 12, available: true },
    { id: 'strings', name: 'String Manipulation', totalProblems: 40, solvedProblems: 5, available: true },
    { id: 'two-pointers', name: 'Two Pointers', totalProblems: 30, solvedProblems: 0, available: false },
    { id: 'sliding-window', name: 'Sliding Window', totalProblems: 25, solvedProblems: 0, available: false },
  ];

  const topics = data?.topics || fallbackTopics;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
          <Code2 className="text-primary" size={36} />
          Coding Challenges
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Master algorithms and data structures. Write code directly in the browser.</p>
      </div>

      <div className="space-y-4">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {topic.available ? (
              <Link href={`/coding/${topic.id}/simple`}>
                <div className="group bg-card border border-border p-6 rounded-2xl flex items-center justify-between hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
                  <div>
                    <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors">{topic.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{topic.solvedProblems} / {topic.totalProblems} solved</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Simple</span>
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">Hard</span>
                      <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full">Difficult</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="bg-card/50 border border-border/50 p-6 rounded-2xl flex items-center justify-between opacity-60">
                <div>
                  <h3 className="text-xl font-bold font-display text-muted-foreground">{topic.name}</h3>
                  <p className="text-muted-foreground/60 text-sm mt-1">{topic.totalProblems} problems</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground bg-muted px-4 py-2 rounded-xl">
                  <Lock size={16} /> <span className="font-medium text-sm">Coming Soon</span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
