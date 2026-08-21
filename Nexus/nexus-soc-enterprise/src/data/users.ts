export const users = [
  {name:'Aijaz Ahmed',email:'aijaz@company.local',role:'SOC Analyst',risk:18,status:'Normal',last:'Now'},
  {name:'Sara Khan',email:'sara@company.local',role:'Senior Analyst',risk:9,status:'Normal',last:'1m'},
  {name:'John Carter',email:'john@company.local',role:'Finance User',risk:87,status:'High Risk',last:'4m'},
  {name:'Maya Lee',email:'maya@company.local',role:'Threat Hunter',risk:22,status:'Normal',last:'8m'},
]

export const authEvents = [
  {time:'12:08:18',user:'john@company.local',location:'Berlin, Germany',result:'Denied',method:'Password',risk:'High'},
  {time:'12:07:52',user:'svc-api-prod',location:'Karachi, Pakistan',result:'Success',method:'Certificate',risk:'Low'},
  {time:'12:07:21',user:'aijaz@company.local',location:'Karachi, Pakistan',result:'Success',method:'MFA',risk:'Low'},
  {time:'12:05:33',user:'john@company.local',location:'Virginia, USA',result:'Denied',method:'Password',risk:'Critical'},
]
