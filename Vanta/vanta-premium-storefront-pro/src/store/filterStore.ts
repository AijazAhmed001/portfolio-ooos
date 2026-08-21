import { create } from 'zustand'
import type { ShopFilters } from '../types/filters'
const initial:ShopFilters={category:'',color:'',size:'',collection:'',maxPrice:350,inStock:false,sort:'featured'}
type S={filters:ShopFilters;setFilter:<K extends keyof ShopFilters>(key:K,value:ShopFilters[K])=>void;reset:()=>void}
export const useFilterStore=create<S>(set=>({filters:initial,setFilter:(key,value)=>set(s=>({filters:{...s.filters,[key]:value}})),reset:()=>set({filters:initial})}))
