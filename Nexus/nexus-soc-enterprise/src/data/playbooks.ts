export const playbooks = [
  {name:'Critical Malware Response',trigger:'Malware detected',runs:38,success:97,steps:['Enrich IP','Check hash reputation','Isolate endpoint','Disable compromised account','Create incident','Notify analyst']},
  {name:'Credential Compromise',trigger:'Risky identity alert',runs:21,success:94,steps:['Check login history','Revoke sessions','Reset password','Require MFA','Create incident']},
  {name:'Malicious IP Containment',trigger:'Threat intel match',runs:54,success:99,steps:['Enrich IP','Block at firewall','Search historical events','Open incident']},
]
