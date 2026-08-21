import { useEffect, useState } from 'react'

export function AnimatedCounter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const start = display
    const delta = value - start
    const startedAt = performance.now()
    const duration = 320
    let raf = 0

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(start + delta * eased)
      if (progress < 1) raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(raf)
    }
  }, [value])

  return <span>{prefix}{Math.round(display)}</span>
}
