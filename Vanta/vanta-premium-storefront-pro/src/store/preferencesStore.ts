import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type S={currency:'USD'|'EUR'|'GBP'|'AED'|'PKR';region:string;setCurrency:(c:S['currency'])=>void;setRegion:(r:string)=>void}
export const usePreferencesStore=create<S>()(persist(set=>({currency:'USD',region:'Global',setCurrency:currency=>set({currency}),setRegion:region=>set({region})}),{name:'vanta_preferences'}))
