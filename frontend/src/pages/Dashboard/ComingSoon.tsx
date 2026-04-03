import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Construction, ArrowLeft, BellRing } from 'lucide-react';

export function ComingSoon() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border border-border p-10 rounded-3xl max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Background stripes pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
        
        <div className="w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent relative z-10 rotate-12">
          <Construction size={40} />
        </div>
        
        <h2 className="text-3xl font-display font-bold mb-3 relative z-10">Under Construction</h2>
        <p className="text-muted-foreground mb-8 relative z-10">
          We are currently building Puzzle Games to test your logic in completely new ways. Check back soon!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <button 
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => alert('You will be notified!')}
          >
            <BellRing size={18} /> Notify Me
          </button>
          <Link href="/">
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-secondary text-foreground font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2 cursor-pointer border border-border">
              <ArrowLeft size={18} /> Back
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
