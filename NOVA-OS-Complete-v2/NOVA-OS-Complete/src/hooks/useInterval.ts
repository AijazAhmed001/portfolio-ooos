import {useEffect} from 'react';export function useInterval(fn:()=>void,delay:number){useEffect(()=>{const t=setInterval(fn,delay);return()=>clearInterval(t)},[fn,delay])}
