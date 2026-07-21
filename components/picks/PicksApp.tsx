'use client'

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { AnimatePresence } from 'motion/react'
import {
  MOCK_PRODUCTS,
  parseCount,
  parseMoney,
  type Pick,
  type NewProduct,
  type ContentId,
  type SortOption,
} from '@/lib/mock-picks'
import AppHeader, { type NavKey } from './AppHeader'
import MobileNavigation from './MobileNavigation'
import PageHeading from './PageHeading'
import ContentTabs, { type ContentTab } from './ContentTabs'
import FilterToolbar, { CATEGORY_LABELS, type CategoryKey } from './FilterToolbar'
import { buildRecentDates } from './DatePicker'
import VideoGrid from './VideoGrid'
import DetailDrawer from './DetailDrawer'
import EmptyState from './EmptyState'
import Toast from './Toast'

type Item = Pick | NewProduct

type Props = {
  initialPicks: Pick[]
  initialFavoriteMode?: boolean
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function PicksApp({ initialPicks, initialFavoriteMode = false }: Props) {
  /* ---------- 数据状态 ---------- */
  const [picks, setPicks] = useState<Pick[]>(initialPicks)
  const [products, setProducts] = useState<NewProduct[]>(MOCK_PRODUCTS)

  /* ---------- UI 状态 ---------- */
  const [favoriteMode, setFavoriteMode] = useState(initialFavoriteMode)
  const [tab, setTab] = useState<ContentTab>('videos')
  const [category, setCategory] = useState<CategoryKey>('全部')
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState<SortOption>('综合热度')
  const dateOptions = useMemo(() => buildRecentDates(14), [])
  const [date, setDate] = useState(() => buildRecentDates(1)[0].value)
  const [detail, setDetail] = useState<Item | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)

  const nav: NavKey = favoriteMode ? 'favorites' : 'picks'

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2000)
    return () => clearTimeout(t)
  }, [toast])

  /* ---------- 收藏 ---------- */
  const favoriteCount =
    picks.filter((p) => p.isFavorite).length + products.filter((p) => p.isFavorite).length

  function toggleFavorite(id: ContentId) {
    let nextState = false
    if (typeof id === 'string' || id < 100) {
      setPicks((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p
          nextState = !p.isFavorite
          return { ...p, isFavorite: nextState }
        })
      )
    } else {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p
          nextState = !p.isFavorite
          return { ...p, isFavorite: nextState }
        })
      )
    }
    setDetail((d) => (d && d.id === id ? { ...d, isFavorite: nextState } : d))
    setToast(nextState ? '已加入收藏' : '已取消收藏')
  }

  /* ---------- 分类计数 ---------- */
  const categoryCounts = useMemo<Record<CategoryKey, number>>(() => {
    const base = favoriteMode ? picks.filter((p) => p.isFavorite) : picks
    return {
      全部: base.length,
      达人: base.filter((p) => p.type === '达人').length,
      商家: base.filter((p) => p.type === '商家').length,
      AI: base.filter((p) => p.type === 'AI').length,
    }
  }, [picks, favoriteMode])

  /* ---------- 过滤 + 排序 ---------- */
  const items: Item[] = (() => {
    const kw = keyword.trim().toLowerCase()

    if (tab === 'videos') {
      let list: Pick[] = favoriteMode ? picks.filter((p) => p.isFavorite) : picks
      if (category !== '全部') list = list.filter((p) => p.type === category)
      if (kw) {
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(kw) ||
            p.product.toLowerCase().includes(kw) ||
            p.author.toLowerCase().includes(kw)
        )
      }
      return sortList(list, sort)
    }

    let list: NewProduct[] = favoriteMode ? products.filter((p) => p.isFavorite) : products
    if (kw) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(kw) ||
          p.product.toLowerCase().includes(kw) ||
          p.brand.toLowerCase().includes(kw)
      )
    }
    return sortList(list, sort)
  })()

  function sortList<T extends Item>(list: T[], s: SortOption): T[] {
    const arr = [...list]
    switch (s) {
      case '增长最快':
        return arr.sort((a, b) => b.growth - a.growth)
      case '播放量最高':
        return arr.sort((a, b) => {
          const av = 'views' in a ? parseCount(a.views) : parseCount((a as NewProduct).estimatedSales)
          const bv = 'views' in b ? parseCount(b.views) : parseCount((b as NewProduct).estimatedSales)
          return bv - av
        })
      case 'GMV最高':
        return arr.sort((a, b) => parseMoney(b.estimatedGMV) - parseMoney(a.estimatedGMV))
      default:
        return arr.sort((a, b) => a.rank - b.rank)
    }
  }

  /* ---------- 文案 ---------- */
  const heading = favoriteMode
    ? {
        title: '我的收藏',
        description: `已经保存 ${favoriteCount} 条内容，随时回来继续分析。`,
      }
    : tab === 'videos'
      ? {
          title: '今日爆款视频',
          description: '来自创作者、商家与 AI 内容，关注近期正在发生的变化。',
        }
      : {
          title: '今日新品机会',
          description: '按销量增速与关联视频数量筛选，提前锁定还没被做透的新品。',
        }

  const resultLabel = favoriteMode
    ? '我的收藏内容'
    : category === '全部'
      ? ''
      : CATEGORY_LABELS[category]

  function resetFilters() {
    setKeyword('')
    setCategory('全部')
    setFavoriteMode(false)
  }

  const isSearchEmpty = items.length === 0 && (keyword.trim() !== '' || category !== '全部')
  const isFavoriteEmpty = favoriteMode && items.length === 0 && keyword.trim() === '' && category === '全部'

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F7F7F3]">
      <AppHeader active={nav} favoriteCount={favoriteCount} onFavoriteClick={() => setFavoriteMode((v) => !v)} />

      <main className="mx-auto max-w-[1440px] px-5 pb-28 pt-[92px] lg:px-7 lg:pb-16">
        <PageHeading
          title={heading.title}
          description={heading.description}
          updatedAt={`${dateOptions.find((d) => d.value === date)?.label ?? ""} 10:30`}
        />

        <div className="mt-7">
          <ContentTabs
            active={tab}
            videoCount={favoriteMode ? picks.filter((p) => p.isFavorite).length : picks.length}
            productCount={favoriteMode ? products.filter((p) => p.isFavorite).length : products.length}
            onChange={(t) => {
              setTab(t)
              setCategory('全部')
            }}
          />
        </div>

        <FilterToolbar
          showCategories={tab === 'videos'}
          category={category}
          counts={categoryCounts}
          keyword={keyword}
          sort={sort}
          date={date}
          dateOptions={dateOptions}
          resultLabel={resultLabel}
          resultCount={items.length}
          onCategoryChange={setCategory}
          onKeywordChange={setKeyword}
          onSortChange={setSort}
          onDateChange={(d) => {
            setDate(d)
            const opt = dateOptions.find((o) => o.value === d)
            setToast(`已切换到 ${opt?.label ?? d}`)
          }}
        />

        <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
          {isFavoriteEmpty ? (
            <div className="mt-4">
              <EmptyState
                title="还没有收藏内容"
                description="在每日爆款中保存值得继续分析的视频。"
                actionLabel="查看今日爆款"
                onAction={() => setFavoriteMode(false)}
              />
            </div>
          ) : isSearchEmpty ? (
            <div className="mt-4">
              <EmptyState
                title="没有找到匹配内容"
                description="换一个关键词，或者清除当前筛选条件。"
                actionLabel="清除筛选"
                onAction={resetFilters}
              />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <VideoGrid
                key={`${tab}-${category}-${favoriteMode}`}
                gridKey={`${tab}-${category}-${favoriteMode}`}
                items={items}
                reduced={reduced}
                onOpen={setDetail}
                onToggleFavorite={toggleFavorite}
              />
            </AnimatePresence>
          )}
        </div>
      </main>

      <MobileNavigation active={nav} favoriteCount={favoriteCount} onFavoriteClick={() => setFavoriteMode((v) => !v)} />

      <DetailDrawer
        item={detail}
        reduced={reduced}
        onClose={() => setDetail(null)}
        onToggleFavorite={toggleFavorite}
        onGenerateReport={() => setToast('分析报告已生成')}
      />

      <Toast message={toast} />
    </div>
  )
}
