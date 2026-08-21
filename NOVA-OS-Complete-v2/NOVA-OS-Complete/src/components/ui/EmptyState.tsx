import type { ReactNode } from 'react';
export default function EmptyState({icon,title,body,action}:{icon?:ReactNode;title:string;body:string;action?:ReactNode}){return <div className="surface empty-state padded nova-empty">{icon}<h2>{title}</h2><p>{body}</p>{action}</div>}
