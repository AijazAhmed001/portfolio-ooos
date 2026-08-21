import type { Product } from '../types/product'
export const primaryImage=(p:Product)=>p.colors[0]?.images[0]||''
export const secondaryImage=(p:Product)=>p.colors[0]?.images[1]||primaryImage(p)
