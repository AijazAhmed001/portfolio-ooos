import { Skull } from 'lucide-react'
import { Card,PageHeader,SeverityBadge } from '../../components/common'
import { threatActors } from '../../data/iocs'
import type { Severity } from '../../types'
export function ThreatActorsPage(){return <><PageHeader eyebrow="ADVERSARY INTELLIGENCE" title="Threat Actors" description="Track fictional adversary profiles, infrastructure and campaigns in the SOC simulation."/><div className="report-grid">{threatActors.map(a=><Card className="report-card" interactive key={a.name}><div className="report-icon"><Skull size={20}/></div><h3>{a.name}</h3><SeverityBadge severity={a.risk as Severity}/><p>{a.industries}</p><div className="rule-foot"><span>{a.incidents} incidents</span><span>{a.infra} indicators</span></div></Card>)}</div></>}
