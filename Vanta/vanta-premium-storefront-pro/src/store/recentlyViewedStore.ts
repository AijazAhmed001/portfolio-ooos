import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type S={ids:number[];add:(id:number)=>void}
export const useRecentlyViewedStore=create<S>()(persist(set=>({ids:[],add:id=>set(s=>({ids:[id,...s.ids.filter(x=>x!==id)].slice(0,8)}))}),{name:'vanta_recently_viewed'}))
