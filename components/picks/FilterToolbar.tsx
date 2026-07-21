'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, ChevronDown, Check } from 'lucide-react'
import { SORT_OPTIONS, type SortOption } from '@/lib/mock-picks'
import SpecularButton from '@/components/ui/SpecularButton'
import DatePicker, { type DateOption } from './DatePicker'

export type CategoryKey = '全部' | '达人' | '商家' | 'AI'

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  全部: '全部',
  达人: '达人视频',
  商家: '商家自制',
  AI: 'AI 生成',
}

const CATEGORY_DOT: Record<CategoryKey, string> = {
  全部: '',
  达人: 'bg-[#7FA8D9]',
  商家: 'bg-[#D0A277]',
  AI: 'bg-[#A9A2C4]',
}

type Props = {
  showCategories: boolean
  category: CategoryKey
  counts: Record<CategoryKey, number>
  keyword: string
  sort: SortOption
  date: string
  dateOptions: DateOption[]
  resultLabel: string
  resultCount: number
  onCategoryChange: (c: CategoryKey) => void
  onKeywordChange: (k: string) => void
  onSortChange: (s: SortOption) => void
  onDateChange: (d: string) => void
}

export default function FilterToolbar({
  showCategories,
  category,
  counts,
  keyword,
  sort,
  date,
  dateOptions,
  resultLabel,
  resultCount,
  onCategoryChange,
  onKeywordChange,
  onSortChange,
  onDateChange,
}: Props) {
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSortOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const categories: CategoryKey[] = ['全部', '达人', '商家', 'AI']
  const specularBase = {
    size: 'sm' as const,
    radius: 10,
    blur: 8,
    tint: '#ffffff',
    tintOpacity: 0.035,
    lineColor: '#F7F7F3',
    baseColor: '#3A404A',
    intensity: 0.92,
    shineSize: 14,
    shineFade: 34,
    thickness: 1.2,
    speed: 0.5,
    followMouse: true,
    proximity: 1,
    autoAnimate: false,
  }

  return (
    <div className="mt-5">
      <div className="rounded-[16px] border border-[#252A32] bg-[#111419] p-3 lg:p-3.5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* 分类 */}
          {showCategories ? (
            <div
              role="group"
              aria-label="内容分类筛选"
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {categories.map((c) => {
                const isActive = category === c
                return (
                  <SpecularButton
                    key={c}
                    type="button"
                    onClick={() => onCategoryChange(c)}
                    aria-pressed={isActive}
                    className={`h-[38px] shrink-0 gap-1.5 px-3 py-0 text-[13px] font-medium transition-colors ${
                      isActive ? 'text-[#F7F7F3]' : 'text-[#A1A7B1] hover:text-[#F7F7F3]'
                    }`}
                    {...specularBase}
                    textColor={isActive ? '#F7F7F3' : '#A1A7B1'}
                    tint={isActive ? '#E3B44F' : '#ffffff'}
                    tintOpacity={isActive ? 0.1 : specularBase.tintOpacity}
                    lineColor={isActive ? '#E3B44F' : specularBase.lineColor}
                    baseColor={isActive ? '#6D5528' : specularBase.baseColor}
                    intensity={isActive ? 1.3 : specularBase.intensity}
                  >
                    {c !== '全部' && <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[c]}`} aria-hidden />}
                    {CATEGORY_LABELS[c]}
                  </SpecularButton>
                )
              })}
            </div>
          ) : (
            <span className="text-[13px] text-[#8B919B]">按销量与增长排序的每日新品机会</span>
          )}

          {/* 工具 */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* 搜索 */}
            <div className="flex h-[38px] items-center gap-2 rounded-[10px] border border-[#252A32] bg-[#171A20] px-3 focus-within:border-[#3A404A] sm:w-[230px]">
              <Search size={14} className="shrink-0 text-[#656B75]" aria-hidden />
              <input
                type="search"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                placeholder="搜索视频、商品或账号"
                aria-label="搜索视频、商品或账号"
                className="w-full bg-transparent text-[13px] text-[#F7F7F3] outline-none placeholder:text-[#656B75]"
              />
            </div>

            <div className="flex gap-2">
              {/* 日期 */}
              <DatePicker options={dateOptions} value={date} onChange={onDateChange} />

              {/* 排序 */}
              <div ref={sortRef} className="relative flex-1 sm:flex-none">
                <SpecularButton
                  type="button"
                  onClick={() => setSortOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                  aria-label={`排序方式：${sort}`}
                  className="h-[38px] w-full gap-2 px-3 py-0 text-[13px] font-semibold"
                  textColor="#F7F7F3"
                  {...specularBase}
                >
                  {sort}
                  <ChevronDown size={14} className="text-[#656B75]" aria-hidden />
                </SpecularButton>

                {sortOpen && (
                  <ul
                    role="listbox"
                    aria-label="排序方式"
                    className="absolute right-0 z-30 mt-2 w-[150px] overflow-hidden rounded-[11px] border border-[#252A32] bg-[#171A20] py-1 shadow-xl shadow-black/50"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <li key={opt} role="option" aria-selected={sort === opt}>
                        <button
                          type="button"
                          onClick={() => {
                            onSortChange(opt)
                            setSortOpen(false)
                          }}
                          className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] text-[#F7F7F3] transition-colors hover:bg-[#252A32] focus-visible:outline-none focus-visible:bg-[#252A32]"
                        >
                          {opt}
                          {sort === opt && <Check size={13} className="text-[#E3B44F]" aria-hidden />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 结果信息 */}
      <div className="mt-3.5 flex items-center justify-between text-[13px]">
        <span className="text-[#8B919B]">{resultLabel}</span>
        <span className="text-[#656B75]">{resultCount} 条结果</span>
      </div>
    </div>
  )
}
