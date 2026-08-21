import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type S={ids:number[];toggle:(id:number)=>void;has:(id:number)=>boolean;remove:(id:number)=>void}
export const useWishlistStore=create<S>()(persist((set,get)=>({ids:[],toggle:id=>set(s=>({ids:s.ids.includes(id)?s.ids.filter(x=>x!==id):[...s.ids,id]})),has:id=>get().ids.includes(id),remove:id=>set(s=>({ids:s.ids.filter(x=>x!==id)}))}),{name:'vanta_wishlist'}))
