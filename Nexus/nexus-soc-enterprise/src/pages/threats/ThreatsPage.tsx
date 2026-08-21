import { LatestThreats } from '../../components/dashboard'
import { IncidentDrawer } from '../../components/incidents'
import { PageHeader } from '../../components/common'
export function ThreatsPage(){return <><PageHeader eyebrow="THREAT MONITORING" title="Threat Intelligence Queue" description="Correlated detections from endpoint, identity, network and web security controls."/><LatestThreats limit={20}/><IncidentDrawer/></>}
