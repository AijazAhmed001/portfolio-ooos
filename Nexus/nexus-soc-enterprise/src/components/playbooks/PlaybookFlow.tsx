import { useEffect,useState } from 'react'
import { Play } from 'lucide-react'
import { PlaybookStep } from './PlaybookStep'
export function PlaybookFlow({steps}:{steps:string[]}){const [running,setRunning]=useState(false),[at,setAt]=useState(-1);useEffect(()=>{if(!running)return;const id=window.setInterval(()=>setAt(v=>{if(v>=steps.length-1){window.clearInterval(id);setRunning(false);return v}return v+1}),650);return()=>window.clearInterval(id)},[running,steps.length]);return <div className="playbook-flow"><div>{steps.map((s,i)=><PlaybookStep key={s} label={s} state={i<at?'done':i===at?'running':'idle'}/>)}</div><button className="primary-btn" onClick={()=>{setAt(0);setRunning(true)}} disabled={running}><Play size={15}/>{running?'Running...':'Run Playbook'}</button></div>}
