import { useEffect } from 'react'
import { useSocStore } from '../store/socStore'
export function useLiveEvents(){const live=useSocStore(s=>s.live),inject=useSocStore(s=>s.injectEvent);useEffect(()=>{if(!live)return;const id=window.setInterval(inject,3600);return()=>window.clearInterval(id)},[live,inject])}
