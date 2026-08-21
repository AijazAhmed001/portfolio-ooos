import type { Severity } from '../types'
export const severityOrder: Severity[] = ['Critical','High','Medium','Low','Info']
export const severityClass = (severity: Severity) => severity.toLowerCase()
export const severityScore = (severity: Severity) => ({Critical:5,High:4,Medium:3,Low:2,Info:1}[severity])
