import type { IncidentStatus, Severity } from './threat'

export interface Incident {
  id: string
  title: string
  severity: Severity
  status: IncidentStatus
  owner: string
  created: string
  slaMinutes: number
  risk: number
  sourceIp: string
  country: string
  target: string
  technique: string
}
