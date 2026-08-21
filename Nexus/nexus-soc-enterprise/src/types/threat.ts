export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info'
export type IncidentStatus = 'New' | 'Investigating' | 'Contained' | 'Resolved'

export interface Coordinate { x: number; y: number }

export interface Threat {
  id: string
  severity: Severity
  sourceIp: string
  country: string
  city: string
  attack: string
  target: string
  targetIp: string
  time: string
  source: string
  confidence: number
  risk: number
  status: IncidentStatus
  coords: Coordinate
  targetCoords: Coordinate
}

export interface SecurityEvent {
  id: string
  severity: Severity
  title: string
  detail: string
  time: string
  source: string
  target: string
}
