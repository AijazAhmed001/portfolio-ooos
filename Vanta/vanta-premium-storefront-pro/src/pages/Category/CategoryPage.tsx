import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ShopPage from '../Shop/ShopPage'
import { useFilterStore } from '../../store/filterStore'

export default function CategoryPage() {
  const { slug = '' } = useParams()
  const setFilter = useFilterStore((s) => s.setFilter)

  useEffect(() => {
    setFilter('category', slug.charAt(0).toUpperCase() + slug.slice(1))
    return () => {
      setFilter('category', '')
    }
  }, [slug, setFilter])

  return <ShopPage />
}
