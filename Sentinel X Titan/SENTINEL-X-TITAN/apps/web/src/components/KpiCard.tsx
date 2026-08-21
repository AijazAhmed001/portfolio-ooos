import React from 'react';
export default function KpiCard({label,value,sub,accent}:{label:string,value:React.ReactNode,sub?:string,accent?:string}){
  return <div className="kpi-card"><div className="kpi-top"><span>{label}</span>{accent&&<span className="micro-chip">{accent}</span>}</div><div className="kpi-value">{value}</div>{sub&&<div className="kpi-sub">{sub}</div>}</div>
}
