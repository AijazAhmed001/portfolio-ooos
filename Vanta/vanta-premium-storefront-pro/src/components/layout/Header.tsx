import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react'
import { DesktopNavigation } from './DesktopNavigation'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'
import { useUIStore } from '../../store/uiStore'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const loc = useLocation()
  const setSearch = useUIStore((s) => s.setSearchOpen)
  const setCart = useUIStore((s) => s.setCartOpen)
  const setMobile = useUIStore((s) => s.setMobileOpen)
  const count = useCartStore((s) => s.items.reduce((a, x) => a + x.qty, 0))
  const wish = useWishlistStore((s) => s.ids.length)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
    }
  }, [])

  useEffect(() => {
    setMega(false)
  }, [loc.pathname])

  const overHero = loc.pathname === '/' && !scrolled

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''} ${overHero ? 'hero-header' : ''}`}>
        <button className="mobile-only menu-trigger" onClick={() => setMobile(true)} aria-label="Open menu"><Menu /></button>
        <Link className="brand" to="/">VANTA</Link>
        <DesktopNavigation onCollectionsEnter={() => setMega(true)} />
        <div className="header-actions">
          <button onClick={() => setSearch(true)} aria-label="Search"><Search /></button>
          <Link to="/wishlist" aria-label="Wishlist"><Heart />{wish > 0 && <i>{wish}</i>}</Link>
          <button onClick={() => setCart(true)} aria-label="Cart"><ShoppingBag />{count > 0 && <i>{count}</i>}</button>
        </div>
      </header>
      <MegaMenu open={mega} onClose={() => setMega(false)} />
      <MobileMenu />
    </>
  )
}
