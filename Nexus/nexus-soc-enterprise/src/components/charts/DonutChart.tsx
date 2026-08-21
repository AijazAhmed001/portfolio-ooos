import type { CSSProperties } from 'react'
export function DonutChart({value,label}:{value:number;label:string}){return <div className="big-ring" style={{'--risk':`${value*3.6}deg`} as CSSProperties}><span><b>{value}%</b>{label}</span></div>}
