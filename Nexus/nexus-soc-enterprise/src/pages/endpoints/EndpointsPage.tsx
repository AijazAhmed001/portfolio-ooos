import { AlertTriangle,Lock,ShieldAlert,ShieldCheck } from 'lucide-react'
import { PageHeader } from '../../components/common'
import { EndpointDrawer,EndpointTable } from '../../components/endpoints'
import { useSocStore } from '../../store/socStore'
export function EndpointsPage(){const devices=useSocStore(s=>s.devices);return <><PageHeader eyebrow="ENDPOINT SECURITY" title="Protected Endpoints" description="Monitor endpoint health, EDR posture, resource utilization and active threat context."/><div className="device-kpis"><div><ShieldCheck/><span>Healthy</span><b>421</b></div><div><AlertTriangle/><span>Warning</span><b>14</b></div><div><ShieldAlert/><span>Critical</span><b>3</b></div><div><Lock/><span>Isolated</span><b>{devices.filter(d=>d.health==='Isolated').length}</b></div></div><EndpointTable/><EndpointDrawer/></>}
