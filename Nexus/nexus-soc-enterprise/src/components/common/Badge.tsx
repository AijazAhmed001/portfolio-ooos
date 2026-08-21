import type { Severity } from '../../types'
export function SeverityBadge({severity}:{severity:Severity}){return <span className={`severity severity-${severity.toLowerCase()}`}><i/>{severity}</span>}
export function StatusBadge({status}:{status:string}){return <span className={`status status-${status.toLowerCase().replaceAll(' ','-')}`}><i/>{status}</span>}
