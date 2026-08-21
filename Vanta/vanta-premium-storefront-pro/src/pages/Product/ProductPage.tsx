import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getProduct } from '../../data/products'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { ProductGallery } from '../../components/product/ProductGallery'
import { ProductInfo } from '../../components/product/ProductInfo'
import { ProductStorytelling } from '../../components/product/ProductStorytelling'
import { RecommendedProducts } from '../../components/product/RecommendedProducts'
import { StickyAddToBag } from '../../components/product/StickyAddToBag'
import { useRecentlyViewedStore } from '../../store/recentlyViewedStore'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  const addRecent = useRecentlyViewedStore((s) => s.add)
  const [colorId, setColorId] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    if (!product) return
    setColorId(product.colors[0].id)
    setSize(product.sizes[0])
    addRecent(product.id)
  }, [product?.id, addRecent])

  if (!product) return <Navigate to="/404" replace />

  const color = product.colors.find((item) => item.id === colorId) || product.colors[0]
  const selectedSize = size || product.sizes[0]

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', to: '/' },
        { label: product.category, to: `/shop/${product.category.toLowerCase()}` },
        { label: product.name },
      ]} />
      <section className="pdp-top">
        <ProductGallery color={color} />
        <ProductInfo product={product} colorId={color.id} size={selectedSize} onColor={setColorId} onSize={setSize} />
      </section>
      <StickyAddToBag product={product} colorId={color.id} size={selectedSize} />
      <ProductStorytelling product={product} />
      <RecommendedProducts product={product} />
    </>
  )
}
