import type { SecurityEvent, Threat } from '../types'

export const threatSeed: Threat[] = [
  { id:'THR-8421', severity:'Critical', sourceIp:'103.42.18.91', country:'Germany', city:'Frankfurt', attack:'SQL Injection', target:'API-GATEWAY-02', targetIp:'10.20.4.18', time:'12:07:42', source:'WAF', confidence:97, risk:94, status:'Investigating', coords:{x:516,y:146}, targetCoords:{x:690,y:226} },
  { id:'THR-8420', severity:'High', sourceIp:'192.45.22.18', country:'United States', city:'Virginia', attack:'Brute Force', target:'AUTH-SRV-01', targetIp:'10.20.1.12', time:'12:06:31', source:'IAM', confidence:92, risk:83, status:'New', coords:{x:235,y:167}, targetCoords:{x:690,y:226} },
  { id:'THR-8419', severity:'Medium', sourceIp:'45.82.91.20', country:'Pakistan', city:'Karachi', attack:'Malware', target:'WS-291', targetIp:'10.20.4.93', time:'12:05:10', source:'EDR', confidence:88, risk:68, status:'Investigating', coords:{x:690,y:226}, targetCoords:{x:690,y:226} },
  { id:'THR-8418', severity:'High', sourceIp:'77.24.52.91', country:'Russia', city:'Moscow', attack:'DDoS', target:'EDGE-GW-01', targetIp:'10.10.0.1', time:'12:03:57', source:'IDS', confidence:95, risk:86, status:'Contained', coords:{x:614,y:122}, targetCoords:{x:811,y:257} },
  { id:'THR-8417', severity:'Low', sourceIp:'83.19.21.43', country:'France', city:'Paris', attack:'Port Scan', target:'WEB-PROD-03', targetIp:'10.20.2.23', time:'12:01:22', source:'Firewall', confidence:74, risk:43, status:'Resolved', coords:{x:494,y:157}, targetCoords:{x:690,y:226} },
  { id:'THR-8416', severity:'Critical', sourceIp:'61.178.77.12', country:'China', city:'Beijing', attack:'C2 Beacon', target:'DB-PROD-01', targetIp:'10.20.5.10', time:'11:58:49', source:'NDR', confidence:99, risk:98, status:'Investigating', coords:{x:783,y:176}, targetCoords:{x:516,y:146} },
]

export const eventSeed: SecurityEvent[] = [
  {id:'EV-4001',severity:'Critical',title:'SQL Injection blocked',detail:'Germany → API-GATEWAY-02',time:'12:07:42',source:'WAF',target:'API-GATEWAY-02'},
  {id:'EV-4000',severity:'High',title:'Repeated login failure',detail:'USA → AUTH-SRV-01',time:'12:07:39',source:'IAM',target:'AUTH-SRV-01'},
  {id:'EV-3999',severity:'Medium',title:'Suspicious executable detected',detail:'WS-291 • EDR telemetry',time:'12:07:36',source:'EDR',target:'WS-291'},
  {id:'EV-3998',severity:'Info',title:'Endpoint scan completed',detail:'WS-182 • no findings',time:'12:07:31',source:'EDR',target:'WS-182'},
]

export const activityData = [
  {time:'00:00',critical:3,high:7,medium:14,low:24}, {time:'03:00',critical:4,high:8,medium:18,low:31},
  {time:'06:00',critical:2,high:12,medium:21,low:38}, {time:'09:00',critical:6,high:17,medium:29,low:42},
  {time:'12:00',critical:8,high:21,medium:34,low:51}, {time:'15:00',critical:5,high:16,medium:27,low:44},
  {time:'18:00',critical:7,high:19,medium:31,low:48}, {time:'21:00',critical:4,high:14,medium:24,low:39},
]
