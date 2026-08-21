import type { Device } from '../types'

export const deviceSeed: Device[] = [
  {id:'DEV-201',name:'WS-201',ip:'10.0.4.18',os:'Windows 11',health:'Healthy',lastSeen:'Now',cpu:38,memory:62,network:22,threats:0,owner:'Finance',criticality:'Standard'},
  {id:'DEV-202',name:'WS-202',ip:'10.0.4.19',os:'Windows 11',health:'Warning',lastSeen:'Now',cpu:71,memory:78,network:43,threats:2,owner:'Claims',criticality:'High'},
  {id:'DEV-291',name:'WS-291',ip:'10.0.4.93',os:'Windows 11',health:'Critical',lastSeen:'8 sec',cpu:54,memory:71,network:38,threats:3,owner:'Operations',criticality:'High'},
  {id:'DEV-API',name:'API-GATEWAY-02',ip:'10.20.4.18',os:'Ubuntu 24.04',health:'Warning',lastSeen:'Now',cpu:43,memory:66,network:78,threats:5,owner:'Platform',criticality:'Mission Critical'},
  {id:'DEV-DB1',name:'DB-PROD-01',ip:'10.20.5.10',os:'RHEL 9',health:'Critical',lastSeen:'Now',cpu:67,memory:82,network:49,threats:4,owner:'Core Systems',criticality:'Mission Critical'},
  {id:'DEV-WEB',name:'WEB-PROD-03',ip:'10.20.2.23',os:'Ubuntu 24.04',health:'Healthy',lastSeen:'Now',cpu:29,memory:48,network:62,threats:1,owner:'Digital',criticality:'High'},
]
