import type { MachineStatus, Severity } from '../types';
export default function StatusPill({value}:{value:MachineStatus|Severity|string}){
  const key=value.toLowerCase().replaceAll('_','-');
  return <span className={`pill pill-${key}`}><span className="dot"/>{value.replaceAll('_',' ')}</span>
}
