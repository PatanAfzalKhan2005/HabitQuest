import React, { useMemo, useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type DayStatus = 'completed' | 'current' | 'available' | 'locked';

interface DayEntry {
  date: string;
  status: DayStatus;
}

interface Props {
  count?: number;
  data?: { date: string; completed: boolean }[]; // from API (optional)
  daysState?: DayEntry[]; // controlled state array takes precedence (optional prop)
  onClick?: (date: string, status: DayStatus) => void;
  overrideDates?: string[];
}

function iso(d: Date) {
  return d.toISOString().split('T')[0];
}

export default function AnimatedDictionaryPath({ count = 30, data = [], daysState, onClick, overrideDates = [] }: Props) {
  const today = new Date();

  // internal controlled state for nodes — exposed as `days` per code style
  const [days, setDays] = useState<DayEntry[] | null>(null);

  // if a controlled array is provided via props, sync it into local state
  useEffect(() => {
    if (Array.isArray(daysState) && daysState.length > 0) {
      setDays(daysState);
    }
  }, [daysState]);

  // If a controlled daysState is provided, use it. Otherwise compute from data/overrideDates.
  const nodes: DayEntry[] = useMemo(() => {
    if (Array.isArray(days) && days.length > 0) {
      return days;
    }

    const startDate = subDays(today, count - 1);
    const daySlots = eachDayOfInterval({ start: startDate, end: today });

    // map API data to a quick lookup
    const completedMap = new Map<string, boolean>();
    (data || []).forEach(d => completedMap.set(new Date(d.date).toISOString().split('T')[0], Boolean(d.completed)));
    (overrideDates || []).forEach(d => completedMap.set(new Date(d).toISOString().split('T')[0], true));

    return daySlots.map(d => {
      const key = iso(d);
      if (new Date(key) > new Date(iso(today))) return { date: key, status: 'locked' };
      if (completedMap.get(key)) return { date: key, status: 'completed' };
      if (key === iso(today)) return { date: key, status: 'current' };
      return { date: key, status: 'available' };
    });
  }, [days, data, overrideDates, count, today]);

  // ensure chronological left-to-right ordering (oldest -> newest)
  const sortedNodes = useMemo(() => {
    return [...nodes].sort((a, b) => a.date.localeCompare(b.date));
  }, [nodes]);

  // build a smooth SVG path through node points using a zig-zag layout
  const perRow = 5; // nodes per row
  const widthPer = 56; // horizontal spacing
  const rowGap = 72; // vertical spacing between rows
  const height = Math.max(140, Math.ceil(sortedNodes.length / perRow) * rowGap + 40);
  const totalWidth = Math.max(320, perRow * widthPer + 80);

  // compute points in visual order corresponding to sortedNodes indices
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const rows = Math.ceil(sortedNodes.length / perRow);
    for (let i = 0; i < sortedNodes.length; i++) {
      const row = Math.floor(i / perRow);
      const indexInRow = i % perRow;
      const rowStartY = row * rowGap + 40;
      const rowLength = Math.min(perRow, sortedNodes.length - row * perRow);

      // for even rows (0-based) we place left-to-right; odd rows right-to-left
      let xIndex = indexInRow;
      if (row % 2 === 1) {
        // reverse within the visible items of the row
        xIndex = (rowLength - 1) - indexInRow;
      }

      const x = xIndex * widthPer + 40;
      const y = Math.sin(i / 2) * 12 + rowStartY + ((row % 2) * 6);
      pts.push({ x, y });
    }
    return pts;
  }, [sortedNodes, perRow, widthPer, rowGap]);

  // create path d using cubic bezier between points
  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const midX = (p0.x + p1.x) / 2;
      d += ` C ${midX} ${p0.y} ${midX} ${p1.y} ${p1.x} ${p1.y}`;
    }
    return d;
  }, [points]);

  const pathRef = useRef<SVGPathElement | null>(null);
  const controls = useAnimation();
  const pulseControls = useAnimation();

  useEffect(() => {
    // animate stroke dashoffset to create flowing effect
    (async () => {
      await controls.start({ pathLength: [0, 1], transition: { duration: 1.2, ease: 'easeInOut' } });
      controls.start({ pathOffset: [0, -1], transition: { repeat: Infinity, duration: 2.4, ease: 'linear' } });
    })();
  }, [controls, pathD]);

  // detect when today's node becomes completed to trigger unlock animation
  const prevCompleted = useRef<boolean>(false);
  useEffect(() => {
    const todayKey = iso(today);
    const todayNode = sortedNodes.find(n => n.date === todayKey);
    const nowCompleted = todayNode?.status === 'completed';
    if (!prevCompleted.current && nowCompleted) {
      pulseControls.start({ scale: [1, 1.12, 1], boxShadow: ['0 0 0 rgba(34,197,94,0)', '0 0 12px rgba(34,197,94,0.45)', '0 0 0 rgba(34,197,94,0)'], transition: { duration: 0.9 } });
    }
    prevCompleted.current = !!nowCompleted;
  }, [sortedNodes, pulseControls, today]);

  function colorFor(status: DayEntry['status']) {
    if (status === 'completed') return 'bg-green-500 shadow-[0_0_10px_#22c55e]';
    if (status === 'current') return 'bg-green-400 shadow-[0_0_14px_#22c55e]';
    if (status === 'available') return 'bg-sky-100 border border-sky-300 shadow-[0_0_10px_rgba(14,165,233,0.2)]';
    return 'bg-[#0b1220] border border-[#111827]';
  }

  function handleNodeClick(d: DayEntry) {
    if (d.status === 'locked') {
      // slight shake animation by toggling class via framer - we'll just call onClick with locked
      onClick?.(d.date, 'locked');
      return;
    }
    onClick?.(d.date, d.status);
  }

  return (
    <div className="w-full overflow-auto py-4">
      <div style={{ width: totalWidth }} className="relative px-4">
        <svg width={totalWidth} height={height} className="block">
          <defs>
            <linearGradient id="gflow" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#86efac" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* base path */}
          <path d={pathD} stroke="#071018" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.6} />

          {/* animated flow path */}
          <motion.path
            ref={pathRef}
            d={pathD}
            stroke="url(#gflow)"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: 0 }}
            animate={controls}
          />
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0 pointer-events-none">
          {points.map((p, i) => {
            const node = sortedNodes[i];
            const isCurrent = node.status === 'current';
            const isCompleted = node.status === 'completed';
            const cx = p.x - 10;
            const cy = p.y - 10;

            return (
              <div key={node.date + '|' + node.status} style={{ left: cx, top: cy }} className="absolute pointer-events-auto">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => handleNodeClick(node)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transform ${colorFor(node.status)}`}
                      animate={isCurrent ? { scale: [1, 1.08, 1], boxShadow: ['0 0 0 rgba(34,197,94,0)', '0 0 14px rgba(34,197,94,0.6)', '0 0 0 rgba(34,197,94,0)'] } : undefined}
                      whileTap={node.status === 'locked' ? { rotate: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } } : { scale: 0.96 }}
                    >
                      {isCompleted ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#022c0f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : isCurrent ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#022c0f"><circle cx="12" cy="12" r="5" /></svg>
                      ) : node.status === 'available' ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M8 5h8M8 12h8M8 19h8" stroke="#0369a1" strokeWidth="1.8" strokeLinecap="round"/></svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 3v3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/><path d="M19 8c0 6-7 11-7 11s-7-5-7-11a7 7 0 0 1 14 0z" stroke="#94a3b8" strokeWidth="1.2"/></svg>
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-popover border-border text-xs">
                    <p className="font-semibold text-foreground">{format(new Date(node.date), 'MMM d, yyyy')}</p>
                    <p className="text-muted-foreground">{node.status === 'completed' ? 'Completed' : node.status === 'current' ? 'Today' : node.status === 'available' ? 'Open day' : 'Locked'}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
