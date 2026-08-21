import { useEffect, useState } from 'react'
export function useResponsive(query='(max-width: 960px)'){const [matches,setMatches]=useState(()=>window.matchMedia(query).matches);useEffect(()=>{const m=window.matchMedia(query);const h=()=>setMatches(m.matches);m.addEventListener('change',h);return()=>m.removeEventListener('change',h)},[query]);return matches}
