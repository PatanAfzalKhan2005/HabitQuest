import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HeatmapEntry {
  date: string;
  count: number;
}

interface ActivityHeatmapProps {
  data: HeatmapEntry[];
  days?: number;
  loading?: boolean;
}

export function ActivityHeatmap({ data, days = 90, loading = false }: ActivityHeatmapProps) {
  const today = new Date();
  const startDate = subDays(today, days - 1);
  
  const dateRange = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: today });
  }, [startDate, today]);

  const activityMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach(entry => {
      // normalize to YYYY-MM-DD
      const normalizedDate = new Date(entry.date).toISOString().split('T')[0];
      map.set(normalizedDate, entry.count);
    });
    return map;
  }, [data]);

  function getColor(count: number) {
    if (count === 0) return "bg-[#0b1220]";
    if (count === 1) return "bg-green-900";
    if (count === 2) return "bg-green-700";
    if (count === 3) return "bg-green-500 shadow-[0_0_6px_#22c55e]";
    return "bg-green-400 shadow-[0_0_10px_#4ade80]";
  }

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-muted/30 border border-muted/50';
    if (count === 1) return 'bg-primary/30 border border-primary/20';
    if (count === 2) return 'bg-primary/60 border border-primary/40';
    if (count === 3) return 'bg-primary/80 border border-primary/60';
    return 'bg-primary border border-primary drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]';
  };

  // Group by weeks for rendering
  // Group into weeks (columns)
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  dateRange.forEach((date, idx) => {
    currentWeek.push(date);
    const isLast = idx === dateRange.length - 1;
    if (date.getDay() === 6 || isLast) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const isLoading = !!loading;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="flex flex-col space-y-3 overflow-x-auto pb-2">
      <div className="flex gap-1.5 min-w-max">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1.5">
            {week.map(date => {
              const dateKey = date.toISOString().split('T')[0];
              const count = activityMap.get(dateKey) || 0;

              if (isLoading) {
                return <div key={dateKey} className="w-4 h-4 rounded-sm bg-muted/20 animate-pulse" />;
              }

              return (
                <Tooltip key={dateKey}>
                  <TooltipTrigger asChild>
                    <div
                      role="button"
                      aria-label={`${format(date, 'MMM d, yyyy')} — ${count} activities`}
                      title={`${format(date, 'MMM d, yyyy')} — ${count} activities`}
                      className={`w-4 h-4 rounded-sm transition-all duration-200 transform hover:scale-110 ${getColor(count)}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-popover border-border text-xs">
                    <p className="font-semibold text-foreground">{format(date, 'MMM d, yyyy')}</p>
                    <p className="text-muted-foreground">{count} {count === 1 ? 'activity' : 'activities'}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end text-xs text-muted-foreground gap-3 pt-2">
        <span>Less</span>
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded-sm bg-[#0b1220] border border-[#0b1220]" />
          <div className="w-4 h-4 rounded-sm bg-green-900" />
          <div className="w-4 h-4 rounded-sm bg-green-700" />
          <div className="w-4 h-4 rounded-sm bg-green-500 shadow-[0_0_6px_#22c55e]" />
          <div className="w-4 h-4 rounded-sm bg-green-400 shadow-[0_0_10px_#4ade80]" />
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
}
