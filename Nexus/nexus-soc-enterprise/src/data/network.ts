import type { NetworkConnection, NetworkPoint } from '../types'

export const networkData: NetworkPoint[] = Array.from({length: 24}, (_, i) => ({
  time: `${String(i).padStart(2,'0')}:00`,
  inbound: Number((2.8 + Math.sin(i/2.3)*1.2 + (i%5)*0.11).toFixed(2)),
  outbound: Number((1.4 + Math.cos(i/3.1)*0.7 + (i%4)*0.08).toFixed(2)),
}))

export const networkConnections: NetworkConnection[] = [
  {source:'10.20.1.24',destination:'34.117.2.42',protocol:'HTTPS',data:'42 MB',status:'Allowed'},
  {source:'10.20.1.42',destination:'8.8.8.8',protocol:'DNS',data:'21 KB',status:'Allowed'},
  {source:'10.20.4.92',destination:'103.42.18.91',protocol:'SSH',data:'2.8 MB',status:'Suspicious'},
  {source:'10.20.5.10',destination:'61.178.77.12',protocol:'TLS',data:'7.4 MB',status:'Blocked'},
]
