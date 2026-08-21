import { useEffect, useRef } from 'react'

export function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const wrap = wrapRef.current
      const image = imageRef.current
      if (!wrap || !image) return

      const rect = wrap.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)))
      const y = -30 + progress * 60
      image.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`
    }

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrapRef} className={`parallax ${className}`}>
      <img ref={imageRef} src={src} alt={alt} />
    </div>
  )
}
