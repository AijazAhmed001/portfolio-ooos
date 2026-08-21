import { useEffect,useState } from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import { Outlet,useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { CommandPalette } from '../components/common'
import { useLiveEvents } from '../hooks/useLiveEvents'
import { useCommandPalette } from '../hooks/useCommandPalette'
export function SocLayout(){const [collapsed,setCollapsed]=useState(()=>localStorage.getItem('nexus-sidebar')==='collapsed'),[mobileOpen,setMobileOpen]=useState(false),location=useLocation();useLiveEvents();useCommandPalette();useEffect(()=>setMobileOpen(false),[location.pathname]);const toggle=()=>setCollapsed(v=>{const next=!v;localStorage.setItem('nexus-sidebar',next?'collapsed':'expanded');return next});return <div className={`app-shell ${collapsed?'sidebar-collapsed':''}`}><Sidebar collapsed={collapsed} mobileOpen={mobileOpen} onCollapse={toggle} onClose={()=>setMobileOpen(false)}/>{mobileOpen&&<button aria-label="Close navigation" className="mobile-backdrop" onClick={()=>setMobileOpen(false)}/>}<div className="app-main"><Topbar onMenu={()=>setMobileOpen(true)}/><main className="content"><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{opacity:0,y:12,filter:'blur(3px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-6}} transition={{duration:.32,ease:[.22,1,.36,1]}}><Outlet/></motion.div></AnimatePresence></main></div><CommandPalette/></div>}
