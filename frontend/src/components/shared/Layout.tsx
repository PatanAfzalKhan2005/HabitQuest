import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@workspace/replit-auth-web';
import { 
  Menu, X, BrainCircuit, Code2, Gamepad2, 
  User, Trophy, LogOut, Hexagon, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Hexagon, exact: true },
    { href: '/aptitude', label: 'Aptitude', icon: BrainCircuit },
    { href: '/coding', label: 'Coding', icon: Code2 },
    { href: '/coming-soon', label: 'Puzzle Games', icon: Gamepad2 },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-xl shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Zap size={18} className="fill-current" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground">Gain Discipline</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact ? location === item.href : location.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className="block">
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? 'bg-primary text-primary-foreground font-medium shadow-[0_0_15px_rgba(34,197,94,0.25)]' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt={user.firstName || "User"} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-primary">{(user?.firstName || user?.email || "U")[0].toUpperCase()}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user?.firstName || user?.email?.split("@")[0] || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 mt-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-lg z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Zap size={20} className="text-primary fill-primary" />
          <span className="font-display font-bold text-lg">Gain Discipline</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-foreground">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col"
          >
            <div className="h-16 flex items-center justify-end px-4">
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-foreground">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 px-6 py-8 flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = item.exact ? location === item.href : location.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className={`
                      flex items-center gap-4 px-6 py-4 rounded-2xl text-lg transition-colors
                      ${isActive ? 'bg-primary text-primary-foreground font-bold' : 'text-foreground font-medium bg-card'}
                    `}>
                      <item.icon size={24} />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
              <button 
                onClick={() => { setMobileMenuOpen(false); logout(); }}
                className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl text-lg text-destructive bg-destructive/10 font-medium"
              >
                <LogOut size={24} />
                <span>Logout</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
