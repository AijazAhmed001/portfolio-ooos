import { ShieldCheck } from 'lucide-react'
export function EmptyState({title='No critical threats detected',description='Environment currently stable.'}:{title?:string;description?:string}){return <div className="empty-state"><ShieldCheck size={25}/><b>{title}</b><span>{description}</span></div>}
