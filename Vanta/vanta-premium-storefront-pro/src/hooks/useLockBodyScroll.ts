import { useEffect } from 'react'

export function useLockBodyScroll(lock = true) {
  useEffect(() => {
    if (!lock) return undefined

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [lock])
}
