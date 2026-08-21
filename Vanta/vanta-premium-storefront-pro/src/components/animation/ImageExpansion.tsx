import { useEffect, useRef } from 'react'

export function ImageExpansion({ src, children }: { src: string; children?: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const section = sectionRef.current
      const frame = frameRef.current
      if (!section || !frame) return

      const rect = section.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const raw = (viewport - rect.top) / Math.max(1, viewport * 0.75)
      const progress = Math.min(1, Math.max(0, raw))
      const width = 86 + progress * 14
      const radius = 14 * (1 - progress)

      frame.style.width = `${width}%`
      frame.style.borderRadius = `${radius}px`
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
    <section ref={sectionRef} className="image-expansion">
      <div ref={frameRef} className="image-expansion-frame">
        <img src={src} alt="Campaign" />
        <div className="image-overlay" />
        {children}
      </div>
    </section>
  )
}
