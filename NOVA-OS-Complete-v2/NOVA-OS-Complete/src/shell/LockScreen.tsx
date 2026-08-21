export default function LockScreen(){return <div className='lock-screen'><strong>NOVA</strong><time>{new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</time></div>}
