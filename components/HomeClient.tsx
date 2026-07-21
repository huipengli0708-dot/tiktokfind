'use client'

import { useMemo, useState } from 'react'
import { Search, Calendar, Filter } from 'lucide-react'
import type { VideoProduct, DbProduct } from '@/lib/db'
import { CONTENT_TYPE_FILTER_OPTIONS, CONTENT_TYPE_COLORS } from '@/lib/content-types'
import VideoCard from './VideoCard'
import ProductCard from './ProductCard'
import StarBackdrop from './StarBackdrop'

type Props = {
  videos: VideoProduct[]
  products: DbProduct[]
}

type Tab = 'videos' | 'products'

export default function HomeClient({ videos, products }: Props) {
  const [tab, setTab] = useState<Tab>('videos')
  const [keyword, setKeyword] = useState('')
  const [typeFilter, setTypeFilter] = useState('全部')
  const [category, setCategory] = useState('全部')

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  /* 各类型数量 */
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { 全部: videos.length }
    for (const opt of CONTENT_TYPE_FILTER_OPTIONS.slice(1)) {
      counts[opt.value] = videos.filter((v) => (v.content_type ?? 'merchant') === opt.value).length
    }
    return counts
  }, [videos])

  /* 分类集合（当前 tab） */
  const categories = useMemo(() => {
    const source = tab === 'videos' ? videos.map((v) => v.category) : products.map((p) => p.category)
    return ['全部', ...Array.from(new Set(source.filter(Boolean)))]
  }, [tab, videos, products])

  /* 视频：过滤 + 按热度排序（趋势分 → 精选优先） */
  const filteredVideos = useMemo(() => {
    let list = videos
    if (typeFilter !== '全部') list = list.filter((v) => (v.content_type ?? 'merchant') === typeFilter)
    if (category !== '全部') list = list.filter((v) => v.category === category)
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase()
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(kw) ||
          v.account.toLowerCase().includes(kw) ||
          v.productName.toLowerCase().includes(kw) ||
          v.shortDescription.toLowerCase().includes(kw) ||
          v.tags.some((t) => t.toLowerCase().includes(kw))
      )
    }
    return [...list].sort(
      (a, b) =>
        Number(b.isFeatured) - Number(a.isFeatured) ||
        b.analysis.trendScore - a.analysis.trendScore
    )
  }, [videos, typeFilter, category, keyword])

  /* 新品：过滤 */
  const filteredProducts = useMemo(() => {
    let list = products
    if (category !== '全部') list = list.filter((p) => p.category === category)
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(kw) ||
          (p.note ?? '').toLowerCase().includes(kw) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(kw))
      )
    }
    return list
  }, [products, category, keyword])

  function switchTab(next: Tab) {
    setTab(next)
    setCategory('全部')
    setTypeFilter('全部')
  }

  return (
    <div className="relative min-h-screen">
      <StarBackdrop />

      <div className="relative z-10 mx-auto max-w-7xl px-8 pb-24 pt-24">
        {/* ===== 页头 ===== */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-white">今日美国爆款视频</h1>
            <p className="mt-2 text-sm text-gray-400">
              每日筛选 5 条达人实拍、5 条商家自制、5 条 AI 生成
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 日期 */}
            <span className="input-dark flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300">
              <Calendar size={15} className="text-gray-500" /> {today}
            </span>

            {/* 搜索 */}
            <div className="input-dark flex w-64 items-center gap-2 px-4 py-2.5">
              <Search size={15} className="shrink-0 text-gray-500" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索视频、商品或账号"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />
            </div>

            {/* 品类筛选 */}
            <div className="input-dark flex items-center gap-2 px-3 py-2">
              <Filter size={14} className="text-gray-500" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent py-0.5 text-sm text-white outline-none [&>option]:bg-[#11151E]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === '全部' ? '所有品类' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ===== Tab ===== */}
        <div className="mt-8 border-b border-white/10">
          <button
            className={`tab-underline ${tab === 'videos' ? 'tab-underline-active' : ''}`}
            onClick={() => switchTab('videos')}
          >
            每日爆款视频
          </button>
          <button
            className={`tab-underline ${tab === 'products' ? 'tab-underline-active' : ''}`}
            onClick={() => switchTab('products')}
          >
            每日新品
          </button>
        </div>

        {/* ===== 类型筛选（仅视频）===== */}
        {tab === 'videos' && (
          <div className="mt-5 flex flex-wrap gap-2.5">
            {CONTENT_TYPE_FILTER_OPTIONS.map((opt) => {
              const color = CONTENT_TYPE_COLORS[opt.value]
              return (
                <button
                  key={opt.value}
                  onClick={() => setTypeFilter(opt.value)}
                  className={`chip-dark ${typeFilter === opt.value ? 'chip-dark-active' : ''}`}
                >
                  {color && (
                    <span className="h-2 w-2 rounded-full" style={{ background: color.dot }} />
                  )}
                  {opt.label}
                  <span className={typeFilter === opt.value ? 'text-[#7CB1FF]' : 'text-gray-500'}>
                    {typeCounts[opt.value] ?? 0}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* ===== 内容网格 ===== */}
        <div className="mt-6">
          {tab === 'videos' ? (
            filteredVideos.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {filteredVideos.map((v, i) => (
                  <VideoCard key={v.id} video={v} rank={i + 1} />
                ))}
              </div>
            ) : (
              <EmptyState text="还没有匹配的爆款视频" />
            )
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <EmptyState text="还没有匹配的新品" />
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="card-dark py-20 text-center">
      <p className="text-lg font-bold text-white">{text}</p>
      <p className="mt-2 text-sm text-gray-500">换个筛选条件或关键词试试。</p>
    </div>
  )
}
