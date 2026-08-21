import {useEffect,useState} from 'react';export function useProcesses(){const[data,setData]=useState<any[]>([]);useEffect(()=>{window.nova.processes.list().then(setData)},[]);return data}
