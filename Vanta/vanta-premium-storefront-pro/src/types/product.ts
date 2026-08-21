export type ProductColor = { id: string; name: string; hex: string; images: string[] }
export type Product = {
  id: number; slug: string; name: string; subtitle: string; description: string;
  category: 'Men'|'Women'|'Footwear'|'Accessories'; collection: string; price: number;
  compareAtPrice?: number; badge?: string; colors: ProductColor[]; sizes: string[];
  materials: string[]; features: string[]; stock: number; recommendedProductIds: number[]; createdAt: string;
}
