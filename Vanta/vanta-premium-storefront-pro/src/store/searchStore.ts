import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type S={recent:string[];add:(q:string)=>void;clear:()=>void}
export const useSearchStore=create<S>()(persist(set=>({recent:[],add:q=>set(s=>({recent:[q,...s.recent.filter(x=>x!==q)].slice(0,6)})),clear:()=>set({recent:[]})}),{name:'vanta_recent_searches'}))
