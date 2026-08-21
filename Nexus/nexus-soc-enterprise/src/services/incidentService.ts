import type { Incident, IncidentStatus } from '../types'
export const moveIncident = (items:Incident[],id:string,status:IncidentStatus) => items.map(i=>i.id===id?{...i,status}:i)
export const assignIncidentOwner = (items:Incident[],id:string,owner:string) => items.map(i=>i.id===id?{...i,owner}:i)
