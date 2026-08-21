import { motion } from 'framer-motion'
import { TerminalSquare } from 'lucide-react'
import { Card,PageHeader } from '../../components/common'
import { LiveEventFeed } from '../../components/dashboard'
import { useSocStore } from '../../store/socStore'
export function LiveEventsPage(){const events=useSocStore(s=>s.events);return <><PageHeader eyebrow="STREAM" title="Live Security Events" description="Continuously updating telemetry from WAF, EDR, IAM, firewall and NDR sensors."/><Card><div className="event-page-grid"><LiveEventFeed/><div className="event-terminal"><div className="terminal-head"><span><TerminalSquare size={15}/>event-stream.log</span><span className="mono">tail -f</span></div><div>{events.slice(0,14).map(e=><motion.p initial={{opacity:0}} animate={{opacity:1}} key={e.id}><span>{e.time}</span><i className={`term-${e.severity.toLowerCase()}`}>{e.severity.toUpperCase().padEnd(8,' ')}</i><b>{e.source.padEnd(8,' ')}</b>{e.title} <em>{e.target}</em></motion.p>)}</div></div></div></Card></>}
