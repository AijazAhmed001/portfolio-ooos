import type { CSSProperties } from 'react'
export function ThreatScore({value=96}:{value?:number}){return <div className="big-ring" style={{'--risk':`${value*3.6}deg`} as CSSProperties}><span><b>{value}%</b>Threat score</span></div>}
