'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, Play, Sparkles, ArrowRight } from 'lucide-react'
import type { ContentId, Pick, NewProduct } from '@/lib/mock-picks'
import VideoTypeBadge from './VideoTypeBadge'
import FavoriteButton from './FavoriteButton'

type Props = {
  item: Pick | NewProduct | null
  reduced: boolean
  onClose: () => void
  onToggleFavorite: (id: ContentId) => void
  onGenerateReport: () => void
}

function isPick(x: Pick | NewProduct): x is Pick {
  return (x as Pick).type !== undefined
}

export default function DetailDrawer({ item, reduced, onClose, onToggleFavorite, onGenerateReport }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [failedImageId, setFailedImageId] = useState<ContentId | null>(null)

  useEffect(() => {
    if (!item) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [item, onClose])

  const pick = item && isPick(item) ? item : null
  const product = item && !isPick(item) ? (item as NewProduct) : null
  const imgOk = item ? failedImageId !== item.id : true

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#050608]/70"
            aria-hidden
          />

          {/* 面板 */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="爆款拆解详情"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            className="fixed inset-0 z-[65] flex h-full w-full flex-col border-l border-[#252A32] bg-[#111419] outline-none lg:left-auto lg:right-0 lg:w-[450px]"
          >
            {/* 顶部 */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#252A32] px-5 py-4">
              <h2 className="text-[15px] font-medium text-[#F7F7F3]">
                {pick ? '爆款拆解' : '新品拆解'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="关闭详情"
                className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#252A32] bg-[#171A20] text-[#8B919B] transition-colors hover:text-[#F7F7F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F]"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            {/* 可滚动内容 */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {/* 视频预览 */}
              <div className="mx-auto w-[230px]">
                <div className="relative overflow-hidden rounded-[14px] bg-[#171A20]" style={{ aspectRatio: '9 / 12' }}>
                  {pick?.videoUrl ? (
                    <video
                      src={pick.videoUrl}
                      poster={item.thumbnail}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : imgOk ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.thumbnail}
                      alt={`${item.product} 视频预览`}
                      onError={() => setFailedImageId(item.id)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-[#656B75]">
                      {item.product}
                    </div>
                  )}
                  <div className="absolute left-2 top-2">
                    {pick ? (
                      <VideoTypeBadge type={pick.type} size="sm" />
                    ) : (
                      <span className="rounded-[7px] bg-[#080A0D]/75 px-2 py-1 text-[10px] font-medium text-[#E3B44F]">
                        新品
                      </span>
                    )}
                  </div>
                  {!pick?.videoUrl && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F7F7F3]/40 bg-[#080A0D]/45 backdrop-blur-sm">
                        <Play size={17} className="ml-0.5 fill-[#F7F7F3] text-[#F7F7F3]" aria-hidden />
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 标题区 */}
              <div className="mt-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-[17px] font-medium text-[#F7F7F3]">{item.product}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#8B919B]">{item.title}</p>
                  <p className="mt-1.5 text-[12px] text-[#656B75]">{pick ? pick.author : product!.brand}</p>
                </div>
                <FavoriteButton
                  active={item.isFavorite}
                  onToggle={() => onToggleFavorite(item.id)}
                  label={item.product}
                />
              </div>

              {/* 核心数据 */}
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                <Metric label={pick ? '播放量' : '预估销量'} value={pick ? pick.views : product!.estimatedSales} />
                <Metric label="24小时增长" value={`+${item.growth}%`} accent />
                <Metric label="预估GMV" value={item.estimatedGMV} />
              </div>

              {/* 阿光发现 */}
              <div className="mt-5 rounded-[14px] border border-[#E3B44F]/25 bg-[#2A2418] p-4">
                <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#E3B44F]">
                  <Sparkles size={14} aria-hidden />
                  阿光发现
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#D8CDB3]">{item.hook}</p>
              </div>

              {/* 原因 */}
              <div className="mt-5">
                <h4 className="text-[14px] font-medium text-[#F7F7F3]">
                  {pick ? '爆火的 3 大原因' : '值得跟进的 3 个理由'}
                </h4>
                <ol className="mt-3 flex flex-col gap-2.5">
                  {item.reasons.map((r, i) => (
                    <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-[#8B919B]">
                      <span className="shrink-0 font-mono text-[12px] text-[#656B75]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[#F7F7F3]/85">{r}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="shrink-0 border-t border-[#252A32] p-4" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={onGenerateReport}
                className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#E3B44F] text-[14px] font-medium text-[#080A0D] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111419]"
              >
                查看完整分析
                <ArrowRight size={16} aria-hidden />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-[12px] border border-[#252A32] bg-[#171A20] px-3 py-3 text-center">
      <p className={`text-[15px] font-medium ${accent ? 'text-[#71DFA2]' : 'text-[#F7F7F3]'}`}>{value}</p>
      <p className="mt-1 text-[11px] text-[#656B75]">{label}</p>
    </div>
  )
}
