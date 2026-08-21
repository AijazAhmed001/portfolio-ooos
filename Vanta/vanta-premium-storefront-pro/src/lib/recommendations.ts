import { products } from '../data/products'
export const byIds=(ids:number[])=>ids.map(id=>products.find(p=>p.id===id)).filter((p):p is NonNullable<typeof p>=>Boolean(p))
