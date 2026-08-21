import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
export function Card({children,className='',interactive=false}:{children:ReactNode;className?:string;interactive?:boolean}){return <motion.section whileHover={interactive?{y:-2}:undefined} transition={{duration:.18}} className={`card ${interactive?'card-interactive':''} ${className}`}>{children}</motion.section>}
