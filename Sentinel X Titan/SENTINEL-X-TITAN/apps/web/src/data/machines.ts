import type { Machine } from '../types';

const base = (id:string,name:string,role:string,zone:string,ip:string,os:string):Machine => ({id,name,role,zone,ip,os,status:'HEALTHY',risk:8,cpu:20+Math.floor(Math.random()*15),ram:32+Math.floor(Math.random()*22),network:10+Math.floor(Math.random()*18),alerts:0});

export const initialMachines: Machine[] = [
base('edge-fw','EDGE-FW-01','Firewall / Gateway','EDGE','10.10.0.1','Network OS'),
base('waf','WAF-01','Web Application Firewall','DMZ','10.20.0.2','Linux'),
base('lb','LB-01','Load Balancer','DMZ','10.20.0.3','Linux'),
base('web1','WEB-PROD-01','Production Web Server','DMZ','10.20.10.11','Ubuntu 24.04'),
base('web2','WEB-PROD-02','Production Web Server','DMZ','10.20.10.12','Ubuntu 24.04'),
base('api1','API-PROD-01','Backend API','APPLICATION','10.30.10.21','Ubuntu 24.04'),
base('api2','API-PROD-02','Backend API','APPLICATION','10.30.10.22','Ubuntu 24.04'),
base('db1','DB-PRIMARY-01','Primary Database','DATA','10.40.10.31','PostgreSQL/Linux'),
base('db2','DB-REPLICA-01','Database Replica','DATA','10.40.10.32','PostgreSQL/Linux'),
base('file','FILE-SRV-01','Company File Server','INTERNAL','10.50.10.41','Windows Server'),
base('ad','AD-DC-01','Identity / Directory','IDENTITY','10.50.20.11','Windows Server'),
base('dns','DNS-01','Internal DNS','INFRASTRUCTURE','10.50.20.12','Linux'),
base('mail','MAIL-01','Mail Simulator','INFRASTRUCTURE','10.50.20.13','Linux'),
base('devops','DEVOPS-01','CI/CD Platform','ENGINEERING','10.50.30.21','Ubuntu 24.04'),
base('devpc','DEV-PC-01','Developer Workstation','USER','10.60.10.101','Windows 11'),
base('finpc','FIN-PC-01','Finance Workstation','USER','10.60.10.102','Windows 11'),
base('hrpc','HR-PC-01','HR Workstation','USER','10.60.10.103','Windows 11'),
base('backup','BACKUP-01','Immutable Backup Vault','RECOVERY','10.70.10.10','Hardened Linux'),
base('sensor','SOC-SENSOR-01','IDS / NSM Sensor','SECURITY','10.80.10.10','Security Linux'),
base('range','RANGE-SIM-01','Isolated Event Simulator','CYBER RANGE','172.20.0.10','Isolated Linux')
];
