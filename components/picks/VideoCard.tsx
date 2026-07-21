'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Play, Eye, Heart, TrendingUp } from 'lucide-react'
import type { Pick, NewProduct } from '@/lib/mock-picks'
import VideoTypeBadge from './VideoTypeBadge'
import FavoriteButton from './FavoriteButton'

type Props = {
  item: Pick | NewProduct
  index: number
  onOpen: () => void
  onToggleFavorite: () => void
  reduced: boolean
}

function isPick(x: Pick | NewProduct): x is Pick {
  return (x as Pick).type !== undefined
}

export default function VideoCard({ item, index, onOpen, onToggleFavorite, reduced }: Props) {
  const [imgOk, setImgOk] = useState(true)
  const pick = isPick(item) ? item : null
  const product = isPick(item) ? null : (item as NewProduct)

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: reduced ? 0 : Math.min(index * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen()
          }
        }}
        aria-label={`查看 ${item.product} 的分析详情`}
        className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[15px] border border-[#252A32] bg-[#111419] transition-[transform,border-color] duration-[250ms] hover:-translate-y-1 hover:border-[#3A404A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F] motion-reduce:hover:translate-y-0"
      >
        {/* 封面 9:12 */}
        <div className="relative w-full overflow-hidden bg-[#171A20]" style={{ aspectRatio: '9 / 12' }}>
          {imgOk ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.thumbnail}
              alt={`${item.product} 视频封面`}
              loading="lazy"
              onError={() => setImgOk(false)}
              className="h-full w-full object-cover transition-[transform,filter] duration-[250ms] group-hover:scale-[1.04] group-hover:brightness-[0.82] motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#171A20] text-xs text-[#656B75]">
              {item.product}
            </div>
          )}

          {/* 顶部：排名 + 类型 */}
          <div className="absolute inset-x-2 top-2 flex items-start justify-between gap-2">
            <span className="rounded-[7px] bg-[#080A0D]/75 px-2 py-1 text-[11px] font-medium text-[#F7F7F3] backdrop-blur-sm">
              #{item.rank}
            </span>
            {pick ? (
              <VideoTypeBadge type={pick.type} size="sm" />
            ) : (
              <span className="rounded-[7px] bg-[#080A0D]/75 px-2 py-1 text-[10px] font-medium text-[#E3B44F] backdrop-blur-sm">
                新品
              </span>
            )}
          </div>

          {/* 底部：增长 */}
          <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-[7px] bg-[#080A0D]/75 px-2 py-1 text-[11px] font-medium text-[#71DFA2] backdrop-blur-sm">
            <TrendingUp size={11} aria-hidden />
            24h +{item.growth}%
          </span>

          {/* Hover 播放 */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F7F7F3]/40 bg-[#080A0D]/50 backdrop-blur-sm">
              <Play size={17} className="ml-0.5 fill-[#F7F7F3] text-[#F7F7F3]" aria-hidden />
            </span>
            <span className="text-[11px] text-[#F7F7F3]">预览视频</span>
          </div>
        </div>

        {/* 信息区 */}
        <div className="flex flex-1 flex-col gap-1.5 p-3">
          <p className="truncate text-[12px] font-medium text-[#E3B44F]">{item.product}</p>
          <p className="line-clamp-2 text-[13px] leading-snug text-[#F7F7F3]">{item.title}</p>
          <p className="truncate text-[12px] text-[#8B919B]">{pick ? pick.author : product!.brand}</p>

          {/* 数据行 */}
          <div className="mt-auto flex items-center justify-between border-t border-[#252A32] pt-2.5">
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex items-center gap-3 text-[12px] text-[#8B919B]">
                {pick ? (
                  <>
                    <span className="flex items-center gap-1">
                      <Eye size={11} aria-hidden /> {pick.views}
                    </span>
                    <span className="hidden items-center gap-1 sm:flex">
                      <Heart size={11} aria-hidden /> {pick.likes}
                    </span>
                  </>
                ) : (
                  <>
                    <span>销量 {product!.estimatedSales}</span>
                    <span className="hidden sm:inline">视频 {product!.relatedVideos}</span>
                  </>
                )}
              </div>
              <span className="truncate text-[12px] text-[#F7F7F3]">{item.estimatedGMV}</span>
            </div>

            <FavoriteButton
              active={item.isFavorite}
              onToggle={onToggleFavorite}
              label={item.product}
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
