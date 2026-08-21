import { AnimatePresence,motion } from 'framer-motion'
import { Check,CircleAlert,X,Zap } from 'lucide-react'
import { useSocStore } from '../../store/socStore'
export function Toasts(){const toasts=useSocStore(s=>s.toasts),remove=useSocStore(s=>s.removeToast);return <div className="toast-stack"><AnimatePresence>{toasts.map(t=><motion.button key={t.id} onClick={()=>remove(t.id)} initial={{opacity:0,x:30,scale:.96}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,x:20,scale:.96}} className={`toast toast-${t.kind}`}><span>{t.kind==='success'?<Check size={15}/>:t.kind==='warning'?<CircleAlert size={15}/>:<Zap size={15}/>}</span><b>{t.message}</b><X size={14}/></motion.button>)}</AnimatePresence></div>}
