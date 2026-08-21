import { create } from 'zustand'
import { deviceSeed } from '../data/devices'
import { incidentSeed } from '../data/incidents'
import { eventSeed, threatSeed } from '../data/threats'
import { createSyntheticEvent } from '../services/eventSimulator'
import { assignIncidentOwner, moveIncident } from '../services/incidentService'
import type { Device, IncidentStatus, SecurityEvent, Severity, Threat } from '../types'

type SeverityFilter = 'All' | Severity
type Toast = {id:string;message:string;kind:'success'|'warning'|'info'}

interface SocState {
  threats: Threat[]; events: SecurityEvent[]; devices: Device[]
  incidents: import('../types').Incident[]; filter: SeverityFilter; live:boolean
  selectedThreat: Threat|null; selectedDevice:Device|null; commandOpen:boolean; toasts:Toast[]; eventCounter:number
  setFilter:(f:SeverityFilter)=>void; setLive:(v:boolean)=>void; selectThreat:(v:Threat|null)=>void; selectDevice:(v:Device|null)=>void
  setCommandOpen:(v:boolean)=>void; addToast:(m:string,k?:Toast['kind'])=>void; removeToast:(id:string)=>void
  isolateDevice:(id:string)=>void; updateIncidentStatus:(id:string,s:IncidentStatus)=>void; assignIncident:(id:string,o:string)=>void; injectEvent:()=>void
}

export const useSocStore = create<SocState>((set,get)=>({
  threats:threatSeed,events:eventSeed,devices:deviceSeed,incidents:incidentSeed,filter:'All',live:true,selectedThreat:null,selectedDevice:null,commandOpen:false,toasts:[],eventCounter:5000,
  setFilter:filter=>set({filter}),setLive:live=>set({live}),selectThreat:selectedThreat=>set({selectedThreat}),selectDevice:selectedDevice=>set({selectedDevice}),setCommandOpen:commandOpen=>set({commandOpen}),
  addToast:(message,kind='success')=>{const id=`toast-${Date.now()}-${Math.random()}`;set(s=>({toasts:[...s.toasts,{id,message,kind}]}));window.setTimeout(()=>get().removeToast(id),3600)},
  removeToast:id=>set(s=>({toasts:s.toasts.filter(t=>t.id!==id)})),
  isolateDevice:id=>{set(s=>({devices:s.devices.map(d=>d.id===id?{...d,health:'Isolated',network:0}:d)}));get().addToast('Endpoint isolated from the network')},
  updateIncidentStatus:(id,status)=>{set(s=>({incidents:moveIncident(s.incidents,id,status)}));get().addToast(`Incident moved to ${status}`)},
  assignIncident:(id,owner)=>{set(s=>({incidents:assignIncidentOwner(s.incidents,id,owner)}));get().addToast(`Incident assigned to ${owner}`,'info')},
  injectEvent:()=>{if(!get().live)return;const n=get().eventCounter+1;const {threat,event}=createSyntheticEvent(n);set(s=>({eventCounter:n,threats:[threat,...s.threats].slice(0,50),events:[event,...s.events].slice(0,30)}))},
}))
