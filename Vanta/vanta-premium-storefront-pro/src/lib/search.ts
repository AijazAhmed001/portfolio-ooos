import type { Product } from '../types/product'
export const searchProducts=(items:Product[],q:string)=>{const s=q.trim().toLowerCase();if(!s)return [];return items.filter(p=>`${p.name} ${p.subtitle} ${p.category} ${p.collection}`.toLowerCase().includes(s)).slice(0,8)}
