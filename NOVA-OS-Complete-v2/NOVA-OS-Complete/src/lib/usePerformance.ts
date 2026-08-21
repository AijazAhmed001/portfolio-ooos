import { useEffect, useState } from 'react';

export type PerfPoint = { timestamp: number; cpu: number; ramPercent: number; gpu: number; temperature: number; download: number; upload: number; ramUsed: number; ramTotal: number };

export function usePerformance(intervalMs = 1200) {
  const [latest, setLatest] = useState<PerfPoint | null>(null);
  const [history, setHistory] = useState<PerfPoint[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const next = await window.nova.system.getPerformance();
        if (!active) return;
        setLatest(next);
        setHistory((prev) => [...prev, next].slice(-42));
      } catch {}
    };
    load();
    const timer = window.setInterval(load, intervalMs);
    return () => { active = false; window.clearInterval(timer); };
  }, [intervalMs]);

  return { latest, history };
}
