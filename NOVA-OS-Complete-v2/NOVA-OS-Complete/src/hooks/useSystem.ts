import {useEffect,useState} from 'react';export function useSystem(){const[data,setData]=useState<any>(null);useEffect(()=>{window.nova.system.getOverview().then(setData)},[]);return data}
