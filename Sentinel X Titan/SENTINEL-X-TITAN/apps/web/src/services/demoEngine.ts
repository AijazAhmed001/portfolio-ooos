import type { Incident, Machine, TimelineEvent } from '../types';

const now = () => new Date().toLocaleTimeString([], {hour12:false});
const ev = (id:string, source:string, machine:string, title:string, detail:string, severity:any, tactic?:string):TimelineEvent => ({id,time:now(),source,machine,title,detail,severity,tactic});

export type SimulationUpdate = {
  machines: Machine[];
  incident: Incident | null;
  liveEvent?: TimelineEvent;
};

export function buildScenario(id:string, machines:Machine[]): {steps: ((s:SimulationUpdate)=>SimulationUpdate)[], incident:Incident} {
  const target = id === 'auth' ? ['AD-DC-01'] : id === 'recon' ? ['EDGE-FW-01','WAF-01'] : id === 'endpoint' ? ['HR-PC-01'] : id === 'lateral' ? ['DEV-PC-01','DEVOPS-01','API-PROD-01','DB-PRIMARY-01'] : id === 'impact' ? ['FILE-SRV-01','BACKUP-01'] : id === 'exfil' ? ['DB-PRIMARY-01','API-PROD-01'] : id === 'web' ? ['WEB-PROD-01','WAF-01'] : ['WEB-PROD-01','API-PROD-01','DEVOPS-01','DB-PRIMARY-01'];
  const incident:Incident = {
    id:`INC-2026-${Math.floor(810+Math.random()*80)}`,
    title:id==='apt'?'Potential Multi-stage Production Intrusion':id==='impact'?'High-volume File Modification Incident':id==='exfil'?'Controlled Data Transfer Anomaly':id==='lateral'?'Cross-zone Lateral Movement Investigation':id==='auth'?'Suspicious Authentication Chain':'Security Telemetry Correlation Incident',
    severity:id==='auth'||id==='recon'?'HIGH':'CRITICAL',status:'NEW',risk:id==='auth'?78:94,confidence:id==='apt'?91:86,assets:target,users:id==='auth'||id==='lateral'?['Account-17']:[],sourceIp:'185.220.101.41',country:'Germany',city:'Frankfurt (approx.)',asn:'AS-SIM-64520',provider:'Demo Hosting Network',attributionConfidence:'MEDIUM',timeline:[],techniques:[]
  };
  const stages = id==='auth' ? [
    ['AD-DC-01','Authentication failures','143 failed authentication attempts exceed the identity baseline.','MEDIUM','Credential Access'],
    ['AD-DC-01','Successful unfamiliar login','A successful session follows repeated failures from the same synthetic source.','HIGH','Initial Access']
  ] : id==='recon' ? [
    ['EDGE-FW-01','Connection fan-out anomaly','One synthetic source touched many exposed services in a short window.','MEDIUM','Reconnaissance'],
    ['WAF-01','Recon pattern correlation','WAF and network-sensor telemetry correlate on the same source.','HIGH','Reconnaissance']
  ] : id==='endpoint' ? [
    ['HR-PC-01','Process ancestry anomaly','A synthetic process chain deviates from the workstation baseline.','HIGH','Execution'],
    ['HR-PC-01','Unusual outbound connection','Endpoint network telemetry shows a new external destination.','CRITICAL','Command and Control']
  ] : id==='impact' ? [
    ['FILE-SRV-01','File-change velocity spike','Disposable lab files are changing far above baseline.','CRITICAL','Impact'],
    ['FILE-SRV-01','Impact confirmed','The simulator reports 1,731 laboratory files affected.','CRITICAL','Impact'],
    ['BACKUP-01','Clean recovery point verified','Immutable recovery snapshot predates the synthetic incident.','HIGH','Recovery']
  ] : id==='exfil' ? [
    ['DB-PRIMARY-01','Data access anomaly','Synthetic query volume exceeds the established data-access baseline.','HIGH','Collection'],
    ['API-PROD-01','Outbound volume anomaly','Fake demo records are copied to an isolated cyber-range sink.','CRITICAL','Exfiltration']
  ] : id==='lateral' ? [
    ['DEV-PC-01','Endpoint anomaly','Developer workstation behavior deviates from baseline.','HIGH','Execution'],
    ['DEVOPS-01','New internal authentication path','Synthetic account activity appears on the CI/CD host.','HIGH','Lateral Movement'],
    ['API-PROD-01','Cross-zone session','The same identity context reaches the application zone.','CRITICAL','Lateral Movement'],
    ['DB-PRIMARY-01','Sensitive database access','Correlated access reaches the protected data tier.','CRITICAL','Collection']
  ] : id==='web' ? [
    ['WAF-01','Request-pattern anomaly','WAF detects a synthetic request pattern outside normal application behavior.','MEDIUM','Initial Access'],
    ['WEB-PROD-01','Web telemetry correlation','Web, WAF and IDS events converge on WEB-PROD-01.','HIGH','Execution'],
    ['WEB-PROD-01','Host-risk escalation','Endpoint telemetry raises the web server to high risk.','CRITICAL','Persistence']
  ] : [
    ['WEB-PROD-01','External traffic anomaly','Synthetic traffic deviates from the production web baseline.','MEDIUM','Reconnaissance'],
    ['WEB-PROD-01','Web host correlation','Multiple controls now agree that WEB-PROD-01 is suspicious.','HIGH','Initial Access'],
    ['DEVOPS-01','Engineering-zone anomaly','Correlated identity activity appears on DEVOPS-01.','HIGH','Lateral Movement'],
    ['API-PROD-01','Application-zone expansion','The incident graph expands into the API tier.','CRITICAL','Lateral Movement'],
    ['DB-PRIMARY-01','Sensitive data-tier activity','Database telemetry crosses the critical investigation threshold.','CRITICAL','Collection']
  ];

  const steps = stages.map((stage:any[], idx:number) => (s:SimulationUpdate):SimulationUpdate => {
    const [machine,title,detail,severity,tactic]=stage;
    const live=ev(`${id}-${idx}`,'SENTINEL Detection Engine',machine,title,detail,severity,tactic);
    const updatedMachines: Machine[]=s.machines.map(m=>m.name===machine?{...m,status:(severity==='CRITICAL'?'COMPROMISED':severity==='HIGH'?'HIGH_RISK':'SUSPICIOUS') as Machine['status'],risk:severity==='CRITICAL'?96:severity==='HIGH'?81:54,cpu:Math.min(99,m.cpu+18),network:Math.min(99,m.network+25),alerts:m.alerts+1}:m);
    const updatedIncident={...(s.incident||incident),status:idx===0?'TRIAGED':'INVESTIGATING',timeline:[...((s.incident||incident).timeline||[]),live],techniques:Array.from(new Set([...(s.incident||incident).techniques,tactic]))} as Incident;
    return {machines:updatedMachines,incident:updatedIncident,liveEvent:live};
  });
  return {steps,incident};
}

export function isolateAffected(machines:Machine[], incident:Incident):Machine[]{
  return machines.map(m=>incident.assets.includes(m.name) && m.status!=='HEALTHY' ? {...m,status:'ISOLATED',risk:Math.max(35,m.risk-30),network:3}:m);
}

export function recoverAffected(machines:Machine[], incident:Incident):Machine[]{
  return machines.map(m=>incident.assets.includes(m.name) ? {...m,status:'RECOVERED',risk:6,cpu:22,network:14,alerts:0}:m);
}
