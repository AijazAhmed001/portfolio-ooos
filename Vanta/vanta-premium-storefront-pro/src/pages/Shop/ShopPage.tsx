import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { products } from '../../data/products'
import { useFilterStore } from '../../store/filterStore'
import { useUIStore } from '../../store/uiStore'
import { filterProducts, sortProducts } from '../../lib/filters'
import { ShopHeader } from '../../components/shop/ShopHeader'
import { ProductCount } from '../../components/shop/ProductCount'
import { SortDropdown } from '../../components/shop/SortDropdown'
import { GridSwitcher } from '../../components/shop/GridSwitcher'
import { ActiveFilters } from '../../components/shop/ActiveFilters'
import { ProductGrid } from '../../components/product/ProductGrid'
import { LoadMore } from '../../components/shop/LoadMore'
import { FilterDrawer } from '../../components/shop/FilterDrawer'

export default function ShopPage() {
  const filters = useFilterStore((s) => s.filters)
  const setFilter = useFilterStore((s) => s.setFilter)
  const reset = useFilterStore((s) => s.reset)
  const openFilter = useUIStore((s) => s.setFilterOpen)
  const location = useLocation()
  const [dense, setDense] = useState(false)
  const [limit, setLimit] = useState(12)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const sort = params.get('sort')
    if (sort) setFilter('sort', sort)
  }, [location.search, setFilter])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  const visible = useMemo(
    () => sortProducts(filterProducts(products, filters), filters.sort),
    [filters],
  )

  return (
    <>
      <ShopHeader />
      <div className="shop-toolbar">
        <button onClick={() => openFilter(true)}><SlidersHorizontal /> FILTER</button>
        <ProductCount count={visible.length} />
        <div><SortDropdown /><GridSwitcher dense={dense} onChange={setDense} /></div>
      </div>
      <ActiveFilters />
      <ProductGrid products={visible.slice(0, limit)} className={`shop-grid ${dense ? 'dense' : ''}`} />
      <LoadMore visible={Math.min(limit, visible.length)} total={visible.length} onClick={() => setLimit((x) => x + 8)} />
      <FilterDrawer />
    </>
  )
}
