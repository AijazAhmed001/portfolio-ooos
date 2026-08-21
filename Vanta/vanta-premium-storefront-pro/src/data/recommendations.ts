import { products } from './products'
export const recommendedFor=(ids:number[])=>ids.map(id=>products.find(p=>p.id===id)).filter(Boolean)
