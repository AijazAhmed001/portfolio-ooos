export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type MachineStatus = 'HEALTHY' | 'MONITORING' | 'SUSPICIOUS' | 'HIGH_RISK' | 'COMPROMISED' | 'ISOLATED' | 'RECOVERING' | 'RECOVERED';

export interface Machine {
  id: string;
  name: string;
  role: string;
  zone: string;
  ip: string;
  os: string;
  status: MachineStatus;
  risk: number;
  cpu: number;
  ram: number;
  network: number;
  alerts: number;
}

export interface TimelineEvent {
  id: string;
  time: string;
  source: string;
  machine: string;
  title: string;
  detail: string;
  severity: Severity;
  tactic?: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: 'NEW' | 'TRIAGED' | 'INVESTIGATING' | 'CONTAINING' | 'ERADICATING' | 'RECOVERING' | 'MONITORING' | 'CLOSED';
  risk: number;
  confidence: number;
  assets: string[];
  users: string[];
  sourceIp: string;
  country: string;
  city: string;
  asn: string;
  provider: string;
  attributionConfidence: 'LOW' | 'MEDIUM' | 'HIGH';
  timeline: TimelineEvent[];
  techniques: string[];
}

export interface Scenario {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  target: string;
}
