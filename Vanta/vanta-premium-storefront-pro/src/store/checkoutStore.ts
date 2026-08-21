import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CheckoutForm } from '../types/checkout'
const initial:CheckoutForm={email:'',firstName:'',lastName:'',address:'',city:'',country:'Pakistan',postalCode:'',phone:'',shipping:'standard',payment:'card',cardName:''}
type S={form:CheckoutForm;update:(patch:Partial<CheckoutForm>)=>void;reset:()=>void}
export const useCheckoutStore=create<S>()(persist(set=>({form:initial,update:patch=>set(s=>({form:{...s.form,...patch}})),reset:()=>set({form:initial})}),{name:'vanta_checkout'}))
