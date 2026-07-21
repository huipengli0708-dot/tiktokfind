'use client'

import { motion } from 'motion/react'
import { Bookmark } from 'lucide-react'

type Props = {
  active: boolean
  onToggle: () => void
  label: string
  size?: number
}

export default function FavoriteButton({ active, onToggle, label, size = 17 }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
        onToggle()
      }}
      aria-label={active ? `取消收藏 ${label}` : `收藏 ${label}`}
      aria-pressed={active}
      className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#252A32] bg-[#171A20] text-[#8B919B] transition-colors hover:border-[#3A404A] hover:text-[#F7F7F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111419]"
    >
      <Bookmark
        size={size}
        className={active ? 'fill-[#E3B44F] text-[#E3B44F]' : ''}
        aria-hidden
      />
    </motion.button>
  )
}
