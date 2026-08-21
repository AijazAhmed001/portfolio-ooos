export default function Sparkline({ values, height = 74 }: { values: number[]; height?: number }) {
  const safe = values.length ? values : [0];
  const max = Math.max(100, ...safe);
  const points = safe.map((value, index) => {
    const x = safe.length === 1 ? 0 : (index / (safe.length - 1)) * 100;
    const y = 100 - (Math.max(0, value) / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="sparkline" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height }} aria-hidden="true">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill="url(#sparkFill)" />
      <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
