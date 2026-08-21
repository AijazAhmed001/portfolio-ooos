import type { TimelineEvent } from '../types';
import StatusPill from './StatusPill';
export default function Timeline({events}:{events:TimelineEvent[]}){
  if(!events.length) return <div className="empty-state"><div className="radar-orb"/><h3>No incident telemetry yet</h3><p>Start a cyber-range scenario to generate correlated synthetic security events.</p></div>;
  return <div className="timeline">{[...events].reverse().map((e,i)=><div className="timeline-row" key={e.id}><div className="timeline-time">{e.time}</div><div className="timeline-track"><span/></div><div className="timeline-body"><div className="timeline-title"><strong>{e.title}</strong><StatusPill value={e.severity}/></div><div className="timeline-meta">{e.source} · {e.machine}{e.tactic?` · ${e.tactic}`:''}</div><p>{e.detail}</p></div></div>)}</div>
}
