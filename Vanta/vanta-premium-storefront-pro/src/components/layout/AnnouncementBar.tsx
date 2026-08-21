import { useEffect, useState } from 'react'
import { messages } from '../../app/constants'

export function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length)
    }, 5000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className="announcement">
      <span>{messages[index]}</span>
      <small>{String(index + 1).padStart(2, '0')} / {String(messages.length).padStart(2, '0')}</small>
    </div>
  )
}
