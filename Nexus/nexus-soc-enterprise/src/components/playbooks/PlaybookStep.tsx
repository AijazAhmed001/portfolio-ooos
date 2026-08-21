import { Check,LoaderCircle } from 'lucide-react'
export function PlaybookStep({label,state}:{label:string;state:'idle'|'running'|'done'}){return <div className={`playbook-step ${state}`}><span>{state==='done'?<Check size={14}/>:state==='running'?<LoaderCircle size={14}/>:null}</span><b>{label}</b></div>}
