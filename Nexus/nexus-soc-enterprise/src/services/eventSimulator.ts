import type { SecurityEvent, Severity, Threat } from '../types'
import { pick, randomBetween } from '../utils/random'
import { formatTime } from '../utils/formatters'

const countries = [
  {country:'Singapore',city:'Singapore',ip:'103.12.44.29',coords:{x:817,y:260}},
  {country:'Brazil',city:'São Paulo',ip:'177.54.11.63',coords:{x:356,y:342}},
  {country:'UAE',city:'Dubai',ip:'94.205.81.17',coords:{x:626,y:229}},
  {country:'India',city:'Mumbai',ip:'49.37.201.88',coords:{x:707,y:239}},
  {country:'United Kingdom',city:'London',ip:'51.142.18.44',coords:{x:480,y:140}},
  {country:'Japan',city:'Tokyo',ip:'126.33.71.19',coords:{x:859,y:180}},
]
const attacks: {attack:string;severity:Severity;source:string}[] = [
  {attack:'Credential Stuffing',severity:'High',source:'IAM'},
  {attack:'Suspicious PowerShell',severity:'Critical',source:'EDR'},
  {attack:'DNS Beaconing',severity:'Medium',source:'NDR'},
  {attack:'Privilege Escalation',severity:'Critical',source:'EDR'},
  {attack:'Port Scan',severity:'Low',source:'Firewall'},
  {attack:'Malicious Upload',severity:'High',source:'WAF'},
]
const targets = [
  {target:'API-GATEWAY-02',ip:'10.20.4.18',coords:{x:690,y:226}},
  {target:'DB-PROD-01',ip:'10.20.5.10',coords:{x:516,y:146}},
  {target:'WEB-PROD-03',ip:'10.20.2.23',coords:{x:690,y:226}},
  {target:'EDGE-GW-01',ip:'10.10.0.1',coords:{x:811,y:257}},
]

export function createSyntheticEvent(counter:number): {threat:Threat; event:SecurityEvent} {
  const c = pick(countries), a = pick(attacks), t = pick(targets), now = formatTime()
  const risk = a.severity === 'Critical' ? randomBetween(92,99) : a.severity === 'High' ? randomBetween(78,89) : a.severity === 'Medium' ? randomBetween(58,72) : randomBetween(32,49)
  const threat: Threat = {id:`THR-${counter}`,severity:a.severity,sourceIp:c.ip,country:c.country,city:c.city,attack:a.attack,target:t.target,targetIp:t.ip,time:now,source:a.source,confidence:randomBetween(75,99),risk,status:'New',coords:c.coords,targetCoords:t.coords}
  const event: SecurityEvent = {id:`EV-${counter}`,severity:a.severity,title:`${a.attack} detected`,detail:`${c.country} → ${t.target}`,time:now,source:a.source,target:t.target}
  return {threat,event}
}
