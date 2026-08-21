import { useEffect, useState } from 'react'

export function useScrollPosition() {
  const [y, setY] = useState(0)

  useEffect(() => {
    const update = () => setY(window.scrollY)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
    }
  }, [])

  return y
}
