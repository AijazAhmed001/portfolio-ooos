import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { ProductColor } from '../../types/product'
import { FullscreenGallery } from './FullscreenGallery'

export function ProductGallery({ color }: { color: ProductColor }) {
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState(0)

  useEffect(() => {
    setStart(0)
  }, [color.id])

  return (
    <>
      <div className="gallery">
        <AnimatePresence mode="popLayout">
          {color.images.map((src, i) => (
            <motion.button
              layout
              key={`${color.id}-${src}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                setStart(i)
                setOpen(true)
              }}
            >
              <img src={src} alt={`${color.name} view ${i + 1}`} />
              <span>0{i + 1}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <FullscreenGallery images={color.images} initial={start} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
