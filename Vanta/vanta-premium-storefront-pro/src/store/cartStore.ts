import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

type CartState={items:CartItem[];add:(product:Product,colorId:string,size:string,qty?:number)=>void;remove:(key:string)=>void;setQty:(key:string,qty:number)=>void;clear:()=>void;count:()=>number;subtotal:()=>number}
export const useCartStore=create<CartState>()(persist((set,get)=>({
 items:[],
 add:(product,colorId,size,qty=1)=>set(state=>{const key=`${product.id}-${colorId}-${size}`;const found=state.items.find(x=>x.key===key);return {items:found?state.items.map(x=>x.key===key?{...x,qty:x.qty+qty}:x):[...state.items,{key,product,colorId,size,qty}]}}),
 remove:key=>set(s=>({items:s.items.filter(x=>x.key!==key)})),
 setQty:(key,qty)=>set(s=>({items:qty<=0?s.items.filter(x=>x.key!==key):s.items.map(x=>x.key===key?{...x,qty}:x)})),
 clear:()=>set({items:[]}),
 count:()=>get().items.reduce((a,x)=>a+x.qty,0),
 subtotal:()=>get().items.reduce((a,x)=>a+x.product.price*x.qty,0)
}),{name:'vanta_cart'}))
