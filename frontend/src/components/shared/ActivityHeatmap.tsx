import React, { useMemo } from 'react';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HeatmapEntry {
  date: string;
  count: number;
}

interface ActivityHeatmapProps {
  data: HeatmapEntry[];
  days?: number;
}

export function ActivityHeatmap({ data, days = 90 }: ActivityHeatmapProps) {
  const today = new Date();
  const startDate = subDays(today, days - 1);
  
  const dateRange = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: today });
  }, [startDate, today]);

  const activityMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach(entry => {
      // API might return ISO strings, normalize to YYYY-MM-DD
      const normalizedDate = new Date(entry.date).toISOString().split('T')[0];
      map.set(normalizedDate, entry.count);
    });
    return map;
  }, [data]);

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-muted/30 border border-muted/50';
    if (count === 1) return 'bg-primary/30 border border-primary/20';
    if (count === 2) return 'bg-primary/60 border border-primary/40';
    if (count === 3) return 'bg-primary/80 border border-primary/60';
    return 'bg-primary border border-primary drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]';
  };

  // Group by weeks for rendering
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  dateRange.forEach(date => {
    currentWeek.push(date);
    if (date.getDay() === 6 || date === dateRange[dateRange.length - 1]) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="flex flex-col space-y-2 overflow-x-auto pb-2">
      <div className="flex gap-1.5 min-w-max">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1.5">
            {week.map(date => {
              const dateKey = date.toISOString().split('T')[0];
              const count = activityMap.get(dateKey) || 0;
              
              return (
                <Tooltip key={dateKey}>
                  <TooltipTrigger asChild>
                    <div 
                      className={`w-3.5 h-3.5 rounded-sm transition-colors duration-200 hover:ring-2 ring-accent ring-offset-1 ring-offset-background ${getColorClass(count)}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-popover border-border text-xs">
                    <p className="font-semibold text-foreground">{count} activities</p>
                    <p className="text-muted-foreground">{format(date, 'MMM d, yyyy')}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end text-xs text-muted-foreground gap-2 pt-2">
        <span>Less</span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-muted/30 border border-muted/50" />
          <div className="w-3 h-3 rounded-sm bg-primary/30 border border-primary/20" />
          <div className="w-3 h-3 rounded-sm bg-primary/60 border border-primary/40" />
          <div className="w-3 h-3 rounded-sm bg-primary/80 border border-primary/60" />
          <div className="w-3 h-3 rounded-sm bg-primary border border-primary" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
