import { useEffect, useMemo, useState } from 'react';
import { Activity, Cpu, Download, Gauge, HardDrive, MemoryStick, Network, Thermometer, Upload } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { formatBytes, formatPercent, formatRate, formatUptime } from '../lib/format';
import { usePerformance } from '../lib/usePerformance';

export default function DashboardApp() {
  const [overview, setOverview] = useState<any>(null);
  const [top, setTop] = useState<any[]>([]);
  const { latest, history } = usePerformance();

  useEffect(() => {
    if (!window.nova) return;
    window.nova.system.getOverview().then(setOverview).catch(() => {});
    const load = () => window.nova.processes.list().then((items) => setTop(items.slice(0, 6))).catch(() => {});
    load();
    const timer = window.setInterval(load, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const drives = overview?.drives || [];
  const total = drives.reduce((sum: number, drive: any) => sum + Number(drive.size || 0), 0);
  const used = drives.reduce((sum: number, drive: any) => sum + Number(drive.used || 0), 0);
  const health = useMemo(() => {
    const cpu = latest?.cpu || 0; const ram = latest?.ramPercent || 0; const disk = total ? (used / total) * 100 : 0;
    return Math.max(55, Math.round(100 - Math.max(0, cpu - 60) * .2 - Math.max(0, ram - 70) * .25 - Math.max(0, disk - 80) * .35));
  }, [latest, total, used]);

  return (
    <div className="app-shell dashboard-app">
      <div className="page-head">
        <div><span className="eyebrow">SYSTEM OVERVIEW</span><h1>{overview?.hostname || 'This PC'}</h1><p>{overview?.os?.distro || overview?.platform || 'Loading system information...'} · {overview?.arch || ''}</p></div>
        <div className="health-pill"><span className="health-dot" /><div><strong>{health}/100</strong><small>System health</small></div></div>
      </div>

      <div className="metric-grid">
        <MetricCard icon={Cpu} label="CPU" value={formatPercent(latest?.cpu)} sub={overview?.cpu?.brand || 'Processor'} values={history.map((p) => p.cpu)} />
        <MetricCard icon={MemoryStick} label="Memory" value={formatPercent(latest?.ramPercent)} sub={`${formatBytes(latest?.ramUsed)} / ${formatBytes(latest?.ramTotal)}`} values={history.map((p) => p.ramPercent)} />
        <MetricCard icon={Gauge} label="GPU" value={formatPercent(latest?.gpu)} sub={overview?.graphics?.controllers?.[0]?.model || 'Graphics adapter'} values={history.map((p) => p.gpu)} />
        <MetricCard icon={HardDrive} label="Storage" value={total ? formatPercent((used / total) * 100) : '—'} sub={`${formatBytes(used)} / ${formatBytes(total)}`} values={history.map(() => total ? (used / total) * 100 : 0)} />
      </div>

      <div className="dashboard-grid">
        <section className="surface chart-card span-2">
          <div className="section-title"><div><span>PERFORMANCE</span><h3>Live activity</h3></div><div className="legend"><span><i />CPU</span><span><i className="muted-dot" />RAM</span></div></div>
          <LiveChart history={history} />
        </section>

        <section className="surface live-card">
          <div className="section-title"><div><span>LIVE</span><h3>Telemetry</h3></div><Activity size={18}/></div>
          <div className="telemetry-list">
            <div><span><Download size={15}/>Download</span><strong>{formatRate(latest?.download)}</strong></div>
            <div><span><Upload size={15}/>Upload</span><strong>{formatRate(latest?.upload)}</strong></div>
            <div><span><Thermometer size={15}/>CPU temp</span><strong>{latest?.temperature ? `${latest.temperature.toFixed(0)}°C` : 'Not supported'}</strong></div>
            <div><span><Activity size={15}/>Processes</span><strong>{overview?.processCount || '—'}</strong></div>
            <div><span><Network size={15}/>Adapters</span><strong>{overview?.interfaces?.length || 0}</strong></div>
            <div><span><Gauge size={15}/>Uptime</span><strong>{formatUptime(overview?.uptime || 0)}</strong></div>
          </div>
        </section>

        <section className="surface process-card span-2">
          <div className="section-title"><div><span>TOP PROCESSES</span><h3>Resource activity</h3></div></div>
          <div className="mini-table"><div className="table-head"><span>Name</span><span>CPU</span><span>Memory</span><span>PID</span></div>{top.map((item) => <div className="table-row" key={`${item.pid}-${item.name}`}><span className="process-name"><i />{item.name}</span><span>{Number(item.cpu || 0).toFixed(1)}%</span><span>{formatBytes(Number(item.memRss || item.memVsz || 0) * 1024)}</span><span className="mono">{item.pid}</span></div>)}</div>
        </section>

        <section className="surface drives-card">
          <div className="section-title"><div><span>STORAGE</span><h3>Local drives</h3></div></div>
          <div className="drive-list">{drives.slice(0,4).map((drive:any) => <div key={`${drive.fs}-${drive.mount}`} className="drive-item"><div><strong>{drive.mount || drive.fs}</strong><small>{drive.type || 'Drive'} · {formatBytes(drive.size)}</small></div><span>{formatPercent(drive.use)}</span><div className="progress"><i style={{ width: `${Math.min(100, Number(drive.use || 0))}%` }}/></div></div>)}</div>
        </section>
      </div>
    </div>
  );
}

function LiveChart({ history }: { history: Array<{ cpu: number; ramPercent: number }> }) {
  const data = history.length > 1 ? history : [{ cpu: 0, ramPercent: 0 }, ...(history.length ? history : [{ cpu: 0, ramPercent: 0 }])];
  const points = (key: 'cpu' | 'ramPercent') => data.map((point, index) => `${(index / (data.length - 1)) * 100},${100 - Math.max(0, Math.min(100, Number(point[key]) || 0))}`).join(' ');
  const cpu = points('cpu');
  return <div className="big-chart" aria-label="Live CPU and memory chart"><svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img">
    <defs><linearGradient id="dashboardCpuFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity=".3"/><stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/></linearGradient></defs>
    <path d="M 0 25 H 100 M 0 50 H 100 M 0 75 H 100" fill="none" stroke="var(--grid)" strokeWidth=".35" vectorEffect="non-scaling-stroke"/>
    <polygon points={`0,100 ${cpu} 100,100`} fill="url(#dashboardCpuFill)"/><polyline points={cpu} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
    <polyline points={points('ramPercent')} fill="none" stroke="var(--text-2)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
  </svg></div>;
}
