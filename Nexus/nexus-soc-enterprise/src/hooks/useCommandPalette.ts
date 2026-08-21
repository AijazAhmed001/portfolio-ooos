import { useEffect } from 'react'
import { useSocStore } from '../store/socStore'
export function useCommandPalette(){const setOpen=useSocStore(s=>s.setCommandOpen);useEffect(()=>{const h=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setOpen(true)}if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[setOpen])}
