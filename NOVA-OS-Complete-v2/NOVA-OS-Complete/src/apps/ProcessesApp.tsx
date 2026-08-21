import { useEffect, useMemo, useState } from 'react';
import { RefreshCw, Search, Skull, X } from 'lucide-react';
import { formatBytes } from '../lib/format';

export default function ProcessesApp() {
  const [items, setItems] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'cpu' | 'mem'>('cpu');
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const load = async () => { setLoading(true); try { setItems(await window.nova.processes.list()); } finally { setLoading(false); } };
  useEffect(() => { load(); const timer = window.setInterval(load, 3000); return () => window.clearInterval(timer); }, []);
  const filtered = useMemo(() => items.filter((p) => `${p.name} ${p.command || ''} ${p.pid}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => Number(sort === 'cpu' ? b.cpu : b.memRss) - Number(sort === 'cpu' ? a.cpu : a.memRss)), [items, query, sort]);

  const kill = async (p: any) => {
    if (!window.confirm(`End ${p.name} (PID ${p.pid})? Unsaved work in this process may be lost.`)) return;
    try { await window.nova.processes.kill(Number(p.pid)); setSelected(null); await load(); } catch (error:any) { window.alert(error?.message || 'Unable to end process.'); }
  };

  return <div className="app-shell data-app"><div className="page-head compact"><div><span className="eyebrow">TASK MANAGER</span><h1>Processes</h1><p>{items.length} processes visible</p></div><button className="ghost-button" onClick={load}><RefreshCw size={16} className={loading ? 'spin' : ''}/>Refresh</button></div>
    <div className="toolbar"><label className="search-box"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search process, command or PID"/></label><div className="segmented"><button className={sort==='cpu'?'active':''} onClick={()=>setSort('cpu')}>CPU</button><button className={sort==='mem'?'active':''} onClick={()=>setSort('mem')}>Memory</button></div></div>
    <div className="table surface process-table"><div className="table-head"><span>Name</span><span>CPU</span><span>Memory</span><span>Status</span><span>PID</span></div>{filtered.slice(0,350).map((p)=><button className="table-row" key={`${p.pid}-${p.name}`} onClick={()=>setSelected(p)}><span className="process-name"><i/>{p.name}</span><span>{Number(p.cpu||0).toFixed(1)}%</span><span>{formatBytes(Number(p.memRss || p.memVsz || 0) * 1024)}</span><span>{p.state || '—'}</span><span className="mono">{p.pid}</span></button>)}</div>
    {selected && <div className="inspector surface"><button className="inspector-close" onClick={()=>setSelected(null)}><X size={17}/></button><span className="eyebrow">PROCESS INSPECTOR</span><h2>{selected.name}</h2><p className="mono muted">{selected.path || selected.command || 'Executable path unavailable'}</p><div className="inspector-grid"><div><small>PID</small><strong>{selected.pid}</strong></div><div><small>CPU</small><strong>{Number(selected.cpu||0).toFixed(1)}%</strong></div><div><small>Memory</small><strong>{formatBytes(Number(selected.memRss || 0) * 1024)}</strong></div><div><small>State</small><strong>{selected.state || '—'}</strong></div></div><button className="danger-button" onClick={()=>kill(selected)}><Skull size={16}/>End process</button><p className="danger-note">NOVA blocks protected low-level PIDs and its own process.</p></div>}
  </div>;
}
