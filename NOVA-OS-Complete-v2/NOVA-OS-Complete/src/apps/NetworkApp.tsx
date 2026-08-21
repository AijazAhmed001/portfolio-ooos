import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Network, Radio, Wifi } from 'lucide-react';
import { formatRate } from '../lib/format';
import { usePerformance } from '../lib/usePerformance';
import Sparkline from '../components/Sparkline';

export default function NetworkApp(){
  const [interfaces,setInterfaces]=useState<any[]>([]); const [connections,setConnections]=useState<any[]>([]); const {latest,history}=usePerformance(1300);
  useEffect(()=>{window.nova.network.interfaces().then(setInterfaces).catch(()=>{}); window.nova.network.connections().then(v=>setConnections(v.slice(0,150))).catch(()=>{});},[]);
  return <div className="app-shell"><div className="page-head compact"><div><span className="eyebrow">NETWORK CENTER</span><h1>Connectivity</h1><p>Local adapter details and live traffic.</p></div><div className="status-chip"><span/>Connected telemetry</div></div>
    <div className="network-metrics"><section className="surface network-stat"><ArrowDown/><div><small>DOWNLOAD</small><strong>{formatRate(latest?.download)}</strong></div><Sparkline values={history.map(p=>Math.min(100,p.download/1024/1024*8))} height={48}/></section><section className="surface network-stat"><ArrowUp/><div><small>UPLOAD</small><strong>{formatRate(latest?.upload)}</strong></div><Sparkline values={history.map(p=>Math.min(100,p.upload/1024/1024*8))} height={48}/></section></div>
    <div className="two-col"><section className="surface list-card"><div className="section-title"><div><span>ADAPTERS</span><h3>Network interfaces</h3></div><Wifi size={18}/></div>{interfaces.map((n:any,i)=><div className="adapter-row" key={`${n.iface}-${i}`}><span className="icon-chip"><Network size={16}/></span><div className="grow"><strong>{n.ifaceName||n.iface}</strong><small>{n.type||'Network'} · {n.operstate||'unknown'}</small></div><div className="adapter-address mono">{n.ip4||'No IPv4'}</div></div>)}</section>
      <section className="surface list-card"><div className="section-title"><div><span>CONNECTIONS</span><h3>Recent socket state</h3></div><Radio size={18}/></div><div className="connection-head"><span>Protocol</span><span>Local</span><span>State</span></div>{connections.slice(0,40).map((c:any,i)=><div className="connection-row" key={i}><span>{c.protocol||'—'}</span><span className="mono truncate">{c.localAddress}:{c.localPort}</span><span>{c.state||'—'}</span></div>)}</section></div>
  </div>;
}
