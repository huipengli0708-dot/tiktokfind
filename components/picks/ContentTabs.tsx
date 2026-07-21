'use client'

import { motion } from 'motion/react'

export type ContentTab = 'videos' | 'products'

type Props = {
  active: ContentTab
  videoCount: number
  productCount: number
  onChange: (tab: ContentTab) => void
}

export default function ContentTabs({ active, videoCount, productCount, onChange }: Props) {
  const tabs: { key: ContentTab; label: string; count: number }[] = [
    { key: 'videos', label: '爆款视频', count: videoCount },
    { key: 'products', label: '每日新品', count: productCount },
  ]

  return (
    <div role="tablist" aria-label="内容类型" className="flex gap-7 border-b border-[#252A32]">
      {tabs.map(({ key, label, count }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${key}`}
            id={`tab-${key}`}
            onClick={() => onChange(key)}
            className={`relative flex items-center gap-2 pb-3 pt-1 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F] ${
              isActive ? 'text-[#F7F7F3]' : 'text-[#8B919B] hover:text-[#F7F7F3]'
            }`}
          >
            {label}
            <span className={`text-xs ${isActive ? 'text-[#8B919B]' : 'text-[#656B75]'}`}>{count}</span>
            {isActive && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#E3B44F]"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
