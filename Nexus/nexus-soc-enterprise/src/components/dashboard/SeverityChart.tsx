import { motion } from 'framer-motion'
import { Card, SectionTitle } from '../common'
import { useSocStore } from '../../store/socStore'
import type { Severity } from '../../types'
const order:Severity[]=['Critical','High','Medium','Low']
export function SeverityChart(){const threats=useSocStore(s=>s.threats),baseline:Record<Severity,number>={Critical:10,High:29,Medium:49,Low:30,Info:0};const data=order.map(s=>({name:s,value:threats.filter(t=>t.severity===s).length+baseline[s]})),max=Math.max(...data.map(d=>d.value));return <Card className="span-4"><SectionTitle eyebrow="CURRENT RISK" title="Severity Distribution"/><div className="severity-bars">{data.map(d=><div className="severity-bar-row" key={d.name}><div><span>{d.name}</span><b>{d.value}</b></div><div className={`severity-track sev-${d.name.toLowerCase()}`}><motion.i initial={{width:0}} animate={{width:`${d.value/max*100}%`}} transition={{duration:.85,ease:[.22,1,.36,1]}}/></div></div>)}</div><div className="severity-summary"><div><span>Total alerts</span><b>128</b></div><div><span>Escalated</span><b>19</b></div><div><span>Auto-blocked</span><b>87%</b></div></div></Card>}
