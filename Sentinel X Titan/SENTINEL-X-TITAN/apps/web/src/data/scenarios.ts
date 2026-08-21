import type { Scenario } from '../types';
export const scenarios: Scenario[] = [
  {id:'auth',title:'Suspicious Authentication',difficulty:'Beginner',description:'Repeated login failures followed by a successful session from unfamiliar infrastructure.',target:'AD-DC-01'},
  {id:'recon',title:'Reconnaissance Activity',difficulty:'Beginner',description:'Synthetic network-probe telemetry appears across exposed services.',target:'EDGE-FW-01'},
  {id:'web',title:'Web Application Incident',difficulty:'Intermediate',description:'WAF, web logs and IDS telemetry begin correlating around WEB-PROD-01.',target:'WEB-PROD-01'},
  {id:'endpoint',title:'Endpoint Compromise Simulation',difficulty:'Intermediate',description:'A workstation shows synthetic suspicious process, file and network events.',target:'HR-PC-01'},
  {id:'lateral',title:'Lateral Movement Investigation',difficulty:'Advanced',description:'Synthetic activity crosses developer, DevOps, API and database assets.',target:'DEV-PC-01'},
  {id:'exfil',title:'Controlled Exfiltration Simulation',difficulty:'Advanced',description:'Fake demo data is copied to an isolated sink inside the range.',target:'DB-PRIMARY-01'},
  {id:'impact',title:'Ransomware-style Impact',difficulty:'Advanced',description:'Disposable laboratory files are modified, requiring isolation and clean restore.',target:'FILE-SRV-01'},
  {id:'apt',title:'Multi-stage Intrusion Campaign',difficulty:'Expert',description:'A long-form scenario combining reconnaissance, identity, endpoint, lateral movement, data access and recovery.',target:'WEB-PROD-01'}
];
