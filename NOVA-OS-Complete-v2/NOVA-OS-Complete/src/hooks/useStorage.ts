import {useEffect,useState} from 'react';export function useStorage(){const[data,setData]=useState<any[]>([]);useEffect(()=>{window.nova.storage.drives().then(setData)},[]);return data}
