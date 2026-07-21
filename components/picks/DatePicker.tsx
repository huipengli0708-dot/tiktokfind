'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, Check, ChevronLeft, ChevronRight } from 'lucide-react'

export type DateOption = {
  /** YYYY-MM-DD */
  value: string
  /** 07月20日 */
  label: string
  /** 周一 */
  weekday: string
  /** 今天 / 昨天 */
  tag?: string
}

/** 生成最近 N 天（含今天）的可选日期 */
export function buildRecentDates(days = 14): DateOption[] {
  const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const out: DateOption[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < days; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    out.push({
      value: `${d.getFullYear()}-${mm}-${dd}`,
      label: `${mm}月${dd}日`,
      weekday: WEEK[d.getDay()],
      tag: i === 0 ? '今天' : i === 1 ? '昨天' : undefined,
    })
  }
  return out
}

type Props = {
  options: DateOption[]
  value: string
  onChange: (value: string) => void
}

export default function DatePicker({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = useMemo(
    () => options.find((o) => o.value === value) ?? options[0],
    [options, value]
  )
  const index = options.findIndex((o) => o.value === current?.value)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  /** 上一天 = 列表中更旧的一天（index + 1） */
  function step(dir: -1 | 1) {
    const next = index + dir
    if (next < 0 || next >= options.length) return
    onChange(options[next].value)
  }

  if (!current) return null

  return (
    <div ref={ref} className="relative flex-1 sm:flex-none">
      <div className="flex h-[38px] items-stretch overflow-hidden rounded-[10px] border border-[#252A32] bg-[#171A20]">
        {/* 更早一天 */}
        <button
          type="button"
          onClick={() => step(1)}
          disabled={index >= options.length - 1}
          aria-label="前一天"
          className="flex w-8 items-center justify-center text-[#656B75] transition-colors hover:bg-[#1E222A] hover:text-[#F7F7F3] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F]"
        >
          <ChevronLeft size={15} aria-hidden />
        </button>

        {/* 主体：打开列表 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`选择日期，当前 ${current.label}`}
          className="flex flex-1 items-center justify-center gap-2 border-x border-[#252A32] px-3 text-[13px] font-semibold text-[#F7F7F3] transition-colors hover:bg-[#1E222A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F]"
        >
          <Calendar size={14} className="text-[#656B75]" aria-hidden />
          {current.label}
          {current.tag && (
            <span className="rounded-[5px] bg-[#2A2418] px-1.5 py-0.5 text-[10px] font-medium text-[#E3B44F]">
              {current.tag}
            </span>
          )}
        </button>

        {/* 更晚一天 */}
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={index <= 0}
          aria-label="后一天"
          className="flex w-8 items-center justify-center text-[#656B75] transition-colors hover:bg-[#1E222A] hover:text-[#F7F7F3] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F]"
        >
          <ChevronRight size={15} aria-hidden />
        </button>
      </div>

      {/* 日期列表 */}
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-[220px] overflow-hidden rounded-[12px] border border-[#252A32] bg-[#171A20] shadow-xl shadow-black/50">
          <p className="border-b border-[#252A32] px-4 py-2.5 text-[11px] tracking-[0.06em] text-[#656B75]">
            选择日期（近 {options.length} 天）
          </p>
          <ul role="listbox" aria-label="选择日期" className="max-h-[280px] overflow-y-auto py-1">
            {options.map((o) => {
              const active = o.value === current.value
              return (
                <li key={o.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(o.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-[#252A32] focus-visible:outline-none focus-visible:bg-[#252A32] ${
                      active ? 'text-[#F7F7F3]' : 'text-[#8B919B]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {o.label}
                      <span className="text-[11px] text-[#656B75]">{o.weekday}</span>
                      {o.tag && (
                        <span className="rounded-[5px] bg-[#2A2418] px-1.5 py-0.5 text-[10px] font-medium text-[#E3B44F]">
                          {o.tag}
                        </span>
                      )}
                    </span>
                    {active && <Check size={13} className="shrink-0 text-[#E3B44F]" aria-hidden />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
