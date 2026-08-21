import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
export function Drawer({open,onClose,children}:{open:boolean;onClose:()=>void;children:ReactNode}){return <AnimatePresence>{open&&<><motion.button className="drawer-backdrop" onClick={onClose} aria-label="Close drawer" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.aside className="drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.38,ease:[.22,1,.36,1]}}>{children}</motion.aside></>}</AnimatePresence>}
