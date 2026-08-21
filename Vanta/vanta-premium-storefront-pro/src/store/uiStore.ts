import { create } from 'zustand'
type S={cartOpen:boolean;searchOpen:boolean;mobileOpen:boolean;filterOpen:boolean;setCartOpen:(v:boolean)=>void;setSearchOpen:(v:boolean)=>void;setMobileOpen:(v:boolean)=>void;setFilterOpen:(v:boolean)=>void}
export const useUIStore=create<S>(set=>({cartOpen:false,searchOpen:false,mobileOpen:false,filterOpen:false,setCartOpen:cartOpen=>set({cartOpen}),setSearchOpen:searchOpen=>set({searchOpen}),setMobileOpen:mobileOpen=>set({mobileOpen}),setFilterOpen:filterOpen=>set({filterOpen})}))
