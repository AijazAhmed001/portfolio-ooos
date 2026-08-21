export interface NetworkPoint {
  time: string
  inbound: number
  outbound: number
}

export interface NetworkConnection {
  source: string
  destination: string
  protocol: string
  data: string
  status: 'Allowed' | 'Suspicious' | 'Blocked'
}
