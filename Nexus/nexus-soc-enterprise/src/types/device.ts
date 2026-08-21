export type DeviceHealth = 'Healthy' | 'Warning' | 'Critical' | 'Isolated'

export interface Device {
  id: string
  name: string
  ip: string
  os: string
  health: DeviceHealth
  lastSeen: string
  cpu: number
  memory: number
  network: number
  threats: number
  owner: string
  criticality: 'Standard' | 'High' | 'Mission Critical'
}
