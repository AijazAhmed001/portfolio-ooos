import { useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
const allowed=['whoami','hostname','node','npm','git','dotnet','python','adb'];
export default function TerminalApp(){
 const [history,setHistory]=useState<Array<{cmd:string;out:string}>>([{cmd:'nova',out:'NOVA Safe Terminal\nCommands are intentionally allowlisted. Type help to list them.'}]); const [value,setValue]=useState(''); const busy=useRef(false);
 const run=async()=>{const cmd=value.trim().toLowerCase(); if(!cmd||busy.current)return; setValue(''); if(cmd==='clear'){setHistory([]);return} if(cmd==='help'){setHistory(h=>[...h,{cmd,out:`Available: ${allowed.join(', ')}, help, clear`}]);return} busy.current=true; let out=''; try{out=await window.nova.terminal.runSafe(cmd)}catch(e:any){out=e?.message||'Command failed.'} setHistory(h=>[...h,{cmd,out}]); busy.current=false};
 return <div className="terminal-app"><div className="terminal-banner"><ShieldCheck size={16}/><span>Safe mode: no arbitrary shell execution from the renderer.</span></div><div className="terminal-history">{history.map((item,i)=><div className="term-block" key={i}><div><span className="prompt">nova&gt;</span> {item.cmd}</div><pre>{item.out}</pre></div>)}</div><div className="terminal-input"><span className="prompt">nova&gt;</span><input autoFocus value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')run()}} placeholder="help"/></div></div>;
}
