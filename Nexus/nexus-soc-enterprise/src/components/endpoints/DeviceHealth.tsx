import { ShieldAlert,ShieldCheck } from 'lucide-react'
import type { DeviceHealth as Health } from '../../types'
export function DeviceHealth({health}:{health:Health}){return <span className={`device-health health-${health.toLowerCase()}`}>{health==='Healthy'?<ShieldCheck size={15}/>:<ShieldAlert size={15}/>} {health}</span>}
