import type { Incident } from '../types'

export const incidentSeed: Incident[] = [
  {id:'INC-2026-0842',title:'SQL Injection against production API',severity:'Critical',status:'Investigating',owner:'Aijaz Ahmed',created:'8 min ago',slaMinutes:22,risk:94,sourceIp:'103.42.18.91',country:'Germany',target:'API-GATEWAY-02',technique:'T1190 — Exploit Public-Facing Application'},
  {id:'INC-2026-0837',title:'Command-and-control beacon detected',severity:'Critical',status:'Investigating',owner:'Sara Khan',created:'21 min ago',slaMinutes:9,risk:98,sourceIp:'61.178.77.12',country:'China',target:'DB-PROD-01',technique:'T1071 — Application Layer Protocol'},
  {id:'INC-2026-0831',title:'Repeated authentication attack',severity:'High',status:'New',owner:'Unassigned',created:'31 min ago',slaMinutes:49,risk:83,sourceIp:'192.45.22.18',country:'United States',target:'AUTH-SRV-01',technique:'T1110 — Brute Force'},
  {id:'INC-2026-0822',title:'Distributed denial-of-service activity',severity:'High',status:'Contained',owner:'Omar Ali',created:'1h 12m ago',slaMinutes:0,risk:86,sourceIp:'77.24.52.91',country:'Russia',target:'EDGE-GW-01',technique:'T1498 — Network Denial of Service'},
  {id:'INC-2026-0814',title:'Suspicious PowerShell execution',severity:'Medium',status:'Resolved',owner:'Maya Lee',created:'3h ago',slaMinutes:0,risk:66,sourceIp:'10.0.4.93',country:'Internal',target:'WS-291',technique:'T1059.001 — PowerShell'},
]
