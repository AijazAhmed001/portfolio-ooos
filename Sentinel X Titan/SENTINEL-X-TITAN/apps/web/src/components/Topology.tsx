import type { Machine } from '../types';
const links=[['EDGE-FW-01','WAF-01'],['WAF-01','LB-01'],['LB-01','WEB-PROD-01'],['LB-01','WEB-PROD-02'],['WEB-PROD-01','API-PROD-01'],['WEB-PROD-02','API-PROD-02'],['API-PROD-01','DB-PRIMARY-01'],['API-PROD-02','DB-PRIMARY-01'],['DB-PRIMARY-01','DB-REPLICA-01'],['DEV-PC-01','DEVOPS-01'],['DEVOPS-01','API-PROD-01'],['AD-DC-01','DEV-PC-01'],['BACKUP-01','DB-PRIMARY-01']];
const positions:Record<string,[number,number]>={
'EDGE-FW-01':[50,7],'WAF-01':[50,19],'LB-01':[50,31],'WEB-PROD-01':[35,44],'WEB-PROD-02':[65,44],'API-PROD-01':[35,57],'API-PROD-02':[65,57],'DB-PRIMARY-01':[50,71],'DB-REPLICA-01':[50,88],'DEV-PC-01':[10,40],'DEVOPS-01':[18,58],'AD-DC-01':[10,18],'BACKUP-01':[88,72]
};
export default function Topology({machines}:{machines:Machine[]}){
  const map=new Map(machines.map(m=>[m.name,m]));
  return <div className="topology">
    <svg className="topology-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
      {links.map(([a,b])=>{const p1=positions[a],p2=positions[b];if(!p1||!p2)return null;const active=(map.get(a)?.status!=='HEALTHY'&&map.get(a)?.status!=='RECOVERED')||(map.get(b)?.status!=='HEALTHY'&&map.get(b)?.status!=='RECOVERED');return <line key={a+b} x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} className={active?'link active':'link'}/>})}
    </svg>
    {Object.entries(positions).map(([name,[x,y]])=>{const m=map.get(name)!;return <div key={name} className={`topology-node node-${m?.status?.toLowerCase()||'healthy'}`} style={{left:`${x}%`,top:`${y}%`}}><span className="node-dot"/><b>{name}</b><small>{m?.zone}</small></div>})}
    <div className="topology-badge">LIVE LAB TOPOLOGY · 12 KEY NODES / 20 TOTAL</div>
  </div>
}
