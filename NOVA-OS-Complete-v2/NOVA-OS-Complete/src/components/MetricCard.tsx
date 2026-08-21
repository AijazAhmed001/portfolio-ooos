import type { LucideIcon } from 'lucide-react';
import Sparkline from './Sparkline';

export default function MetricCard({ icon: Icon, label, value, sub, values = [] }: { icon: LucideIcon; label: string; value: string; sub?: string; values?: number[] }) {
  return (
    <section className="metric-card surface">
      <div className="metric-head"><span className="icon-chip"><Icon size={16} /></span><span>{label}</span></div>
      <div className="metric-value">{value}</div>
      <div className="metric-sub">{sub || 'Live system reading'}</div>
      <Sparkline values={values} height={58} />
    </section>
  );
}
