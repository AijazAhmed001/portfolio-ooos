import type { Incident } from '../types';
export default function AttackGraph({incident}:{incident:Incident|null}){
  const nodes=incident?.assets?.length?incident.assets:['SOURCE IP','WEB-PROD-01','API-PROD-01','DB-PRIMARY-01'];
  return <div className="attack-graph"><div className="source-node"><small>NETWORK SOURCE</small><strong>{incident?.sourceIp||'185.xxx.xxx.xxx'}</strong><span>{incident?.provider||'Awaiting telemetry'}</span></div><div className="graph-flow">{nodes.map((n,i)=><div className="graph-step" key={n}><div className="graph-node"><span>{i+1}</span><strong>{n}</strong><small>{i===0?'Observed':'Correlated'}</small></div>{i<nodes.length-1&&<div className="graph-arrow"><i/></div>}</div>)}</div></div>
}
