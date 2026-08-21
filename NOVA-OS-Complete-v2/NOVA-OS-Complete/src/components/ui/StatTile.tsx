import type { ReactNode } from 'react';
export default function StatTile({label,value,sub,icon}:{label:string;value:string;sub?:string;icon?:ReactNode}){return <section className="surface nova-stat"><div className="nova-stat-top"><span>{label}</span>{icon}</div><strong>{value}</strong>{sub&&<small>{sub}</small>}</section>}
