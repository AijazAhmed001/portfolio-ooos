export const iocs = [
  {type:'IP',value:'103.42.18.91',risk:'Critical',source:'Threat Feed',observed:'32 sec ago'},
  {type:'Domain',value:'evil-control.example',risk:'High',source:'Internal',observed:'4 min ago'},
  {type:'SHA256',value:'a481d9f5...99d9c81',risk:'Critical',source:'EDR',observed:'11 min ago'},
  {type:'URL',value:'secure-login-check.example',risk:'High',source:'Phishing',observed:'19 min ago'},
]

export const threatActors = [
  {name:'SILENT JACKAL',risk:'Critical',origin:'Unknown',industries:'Finance · Insurance · Government',incidents:7,infra:22},
  {name:'COBALT MIST',risk:'High',origin:'Eastern Europe',industries:'Technology · Retail',incidents:4,infra:13},
  {name:'EMBER FOX',risk:'High',origin:'Unknown',industries:'Healthcare · Finance',incidents:3,infra:9},
]
