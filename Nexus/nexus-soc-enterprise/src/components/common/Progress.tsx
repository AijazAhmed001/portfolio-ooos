import { motion } from 'framer-motion'
export function Progress({value,max=100,className=''}:{value:number;max?:number;className?:string}){return <div className={`progress ${className}`}><motion.span initial={{width:0}} animate={{width:`${Math.min(100,(value/max)*100)}%`}} transition={{duration:.9,ease:[.22,1,.36,1]}}/></div>}
