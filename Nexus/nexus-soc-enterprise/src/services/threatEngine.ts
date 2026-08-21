import type { Threat } from '../types'
export const filterThreats = (threats:Threat[], severity:string) => severity === 'All' ? threats : threats.filter(t=>t.severity===severity)
export const countBySeverity = (threats:Threat[]) => threats.reduce<Record<string,number>>((acc,t)=>{acc[t.severity]=(acc[t.severity]||0)+1;return acc},{})
