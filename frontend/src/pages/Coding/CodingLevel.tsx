import React from 'react';
import { Link, useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { useGetCodingProblems } from '@/services/api-hooks';
import { ChevronRight } from 'lucide-react';

export function CodingLevel() {
  const [match, params] = useRoute('/coding/:topic/:level');
  const topic = params?.topic || '';
  const level = params?.level || 'simple';

  const { data, isLoading } = useGetCodingProblems({ topic, level }, { query: { retry: false } });
  const problems = data?.problems || [];

  if (isLoading) return <div className="p-10 text-center">Loading problems...</div>;
  if (!problems.length) return <div className="p-10 text-center">No problems found for this level.</div>;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold">{topic.replace(/-/g, ' ')} — {level}</h1>
        <p className="text-muted-foreground mt-2">Select a problem to open the editor and run code.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {problems.map((p: any, i: number) => (
          <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
            <Link href={`/coding/${topic}/${level}/${p.id}`}>
              <div className="group bg-card border border-border p-4 rounded-2xl flex items-center justify-between hover:border-primary/50 hover:bg-secondary/50 transition-all cursor-pointer">
                <div>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.difficulty} • {p.category}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ChevronRight size={18} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
