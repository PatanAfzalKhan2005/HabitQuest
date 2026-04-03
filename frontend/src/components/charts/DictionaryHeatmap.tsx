import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DayEntry { date: string; completed: boolean }

interface Props {
  data?: DayEntry[]; // [{date, completed}]
  days?: number;
  overrideDates?: string[]; // YYYY-MM-DD dates to treat as completed (optimistic)
}

export default function DictionaryHeatmap({ data = [], days = 30, overrideDates = [] }: Props) {
  const today = new Date();
  const startDate = subDays(today, days - 1);

  const dateRange = useMemo(() => eachDayOfInterval({ start: startDate, end: today }), [startDate, today]);

  const activityMap = useMemo(() => {
    const m = new Map<string, boolean>();
    (data || []).forEach((d) => {
      const key = new Date(d.date).toISOString().split('T')[0];
      m.set(key, Boolean(d.completed));
    });
    (overrideDates || []).forEach((d) => m.set(new Date(d).toISOString().split('T')[0], true));
    return m;
  }, [data, overrideDates]);

  function getColor(completed: boolean | undefined) {
    if (completed) return 'bg-green-500 shadow-[0_0_8px_#22c55e]';
    return 'bg-[#0b1220]';
  }

  // split into weeks (columns)
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="flex flex-col space-y-3 overflow-x-auto pb-2">
      <div className="flex gap-1.5 min-w-max">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1.5">
            {week.map((date) => {
              const key = date.toISOString().split('T')[0];
              const completed = activityMap.get(key) || false;

              return (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <div
                      role="button"
                      aria-label={`${format(date, 'MMM d, yyyy')} — ${completed ? 'Completed' : 'Not Completed'}`}
                      title={`${format(date, 'MMM d, yyyy')} — ${completed ? 'Completed' : 'Not Completed'}`}
                      className={`w-5 h-5 rounded-sm transition-all duration-200 transform hover:scale-110 ${getColor(completed)}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-popover border-border text-xs">
                    <p className="font-semibold text-foreground">{format(date, 'MMM d, yyyy')}</p>
                    <p className="text-muted-foreground">{completed ? 'Completed' : 'Not Completed'}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
