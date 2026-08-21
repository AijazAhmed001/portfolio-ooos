import {useEffect,useState} from 'react';export function usePermissions(){const[p,setP]=useState<any[]>([]);useEffect(()=>{window.nova.permissions.list().then(setP)},[]);return p}
