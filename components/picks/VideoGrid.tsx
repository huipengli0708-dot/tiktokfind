'use client'

import { motion } from 'motion/react'
import type { ContentId, Pick, NewProduct } from '@/lib/mock-picks'
import VideoCard from './VideoCard'

type Props = {
  items: (Pick | NewProduct)[]
  gridKey: string
  reduced: boolean
  onOpen: (item: Pick | NewProduct) => void
  onToggleFavorite: (id: ContentId) => void
}

export default function VideoGrid({ items, gridKey, reduced, onOpen, onToggleFavorite }: Props) {
  return (
    <motion.div
      key={gridKey}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="mt-4 grid grid-cols-1 gap-3.5 min-[390px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1180px]:grid-cols-4 min-[1360px]:grid-cols-5"
    >
      {items.map((item, i) => (
        <VideoCard
          key={item.id}
          item={item}
          index={i}
          reduced={reduced}
          onOpen={() => onOpen(item)}
          onToggleFavorite={() => onToggleFavorite(item.id)}
        />
      ))}
    </motion.div>
  )
}
