import type { Machine } from '../types';
import StatusPill from './StatusPill';
export default function MachineCard({machine,onSelect}:{machine:Machine,onSelect:(m:Machine)=>void}){
  return <button className={`machine-card status-border-${machine.status.toLowerCase()}`} onClick={()=>onSelect(machine)}>
    <div className="machine-head"><div><strong>{machine.name}</strong><span>{machine.role}</span></div><StatusPill value={machine.status}/></div>
    <div className="machine-meta"><span>{machine.ip}</span><span>{machine.zone}</span></div>
    <div className="risk-line"><span>Risk</span><strong>{machine.risk}</strong></div>
    <div className="bar"><i style={{width:`${machine.risk}%`}}/></div>
    <div className="machine-stats"><span>CPU <b>{machine.cpu}%</b></span><span>RAM <b>{machine.ram}%</b></span><span>NET <b>{machine.network}%</b></span><span>Alerts <b>{machine.alerts}</b></span></div>
  </button>
}
