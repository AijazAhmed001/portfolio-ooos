export default function ClockWidget(){return <div className='status-chip'><span/>{new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div>}
