'use client'

import { Check, X, Minus } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

type Cell = { text: string; state: 'good' | 'bad' | 'mid' }

const ROWS: { label: string; sub: string; self: Cell; tool: Cell; ours: Cell }[] = [
  {
    label: '每天花的时间',
    sub: '从打开到确定做什么品',
    self: { text: '2–3 小时刷视频', state: 'bad' },
    tool: { text: '40 分钟翻榜单', state: 'mid' },
    ours: { text: '10 分钟看完，立刻能动手', state: 'good' },
  },
  {
    label: '信息负担',
    sub: '要不要自己判断真假爆款',
    self: { text: '全靠感觉，需要自己判断变化', state: 'bad' },
    tool: { text: '几千条数据，看不完', state: 'mid' },
    ours: { text: '每类只留 5 条，人工复核', state: 'good' },
  },
  {
    label: '内容类型区分',
    sub: '达人 / 商家自制 / AI 生成',
    self: { text: '混在一起，无法归类', state: 'bad' },
    tool: { text: '一般不区分', state: 'mid' },
    ours: { text: '三类分开，打法各不相同', state: 'good' },
  },
  {
    label: '洞察深度',
    sub: '为什么它能起量',
    self: { text: '要自己反复拆解', state: 'bad' },
    tool: { text: '只给数字，不给结论', state: 'mid' },
    ours: { text: '拆到为什么火、怎么复制', state: 'good' },
  },
  {
    label: '从看见到执行',
    sub: '看完之后能不能马上做',
    self: { text: '还要再找一遍货源', state: 'bad' },
    tool: { text: '通常不覆盖', state: 'mid' },
    ours: { text: '关联 TikTok 链接与货源线索', state: 'good' },
  },
  {
    label: '使用成本',
    sub: '每月实际支出',
    self: { text: '时间成本极高', state: 'bad' },
    tool: { text: '数据平台月费高', state: 'mid' },
    ours: { text: '永久免费使用', state: 'good' },
  },
]

const ICON = { good: Check, bad: X, mid: Minus }
const COLOR = { good: 'text-[#71DFA2]', bad: 'text-[#8B5C5C]', mid: 'text-[#656B75]' }

const GRID = 'grid grid-cols-[1.35fr_1fr_1fr_1.2fr]'

export default function ComparisonSection() {
  return (
    <section id="value" className="border-b border-[#252A32] py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-7">
        <SectionHeading
          eyebrow="为什么用阿光选品"
          title="素材不是越多越好，看见得早才是优势"
          description="我们不做又一个塞满数据的后台，而是把值得看的内容整理清楚，让你更快作出判断。"
        />

        {/* 对比表 */}
        <Reveal delay={0.1} className="mt-14 overflow-hidden rounded-[16px] border border-[#252A32]">
          {/* 表头 */}
          <div className={`${GRID} bg-[#111419] text-[12px] font-medium tracking-[0.02em] lg:text-[13px]`}>
            <div className="px-5 py-4 text-[#8B919B] lg:px-7 lg:py-5">对比维度</div>
            <div className="px-4 py-4 text-[#8B919B] lg:px-5 lg:py-5">自己刷 TikTok</div>
            <div className="px-4 py-4 text-[#8B919B] lg:px-5 lg:py-5">数据平台</div>
            <div className="border-l border-[#E3B44F]/25 bg-[#2A2418] px-4 py-4 text-[#E3B44F] lg:px-5 lg:py-5">
              阿光选品
            </div>
          </div>

          {/* 表体 */}
          {ROWS.map((r, i) => (
            <div
              key={r.label}
              className={`${GRID} border-t border-[#252A32] ${i % 2 === 0 ? 'bg-[#0B0E13]' : 'bg-[#0F1216]'}`}
            >
              <div className="px-5 py-5 lg:px-7 lg:py-6">
                <p className="text-[13.5px] font-medium leading-[1.5] text-[#F7F7F3] lg:text-[14px]">
                  {r.label}
                </p>
                <p className="mt-1.5 hidden text-[12px] leading-[1.6] text-[#656B75] sm:block">{r.sub}</p>
              </div>

              {([r.self, r.tool] as Cell[]).map((c, j) => {
                const Icon = ICON[c.state]
                return (
                  <div key={j} className="flex items-start gap-2 px-4 py-5 lg:px-5 lg:py-6">
                    <Icon size={13} className={`mt-[3px] shrink-0 ${COLOR[c.state]}`} aria-hidden />
                    <span className="text-[12.5px] leading-[1.7] text-[#8B919B] lg:text-[13px]">
                      {c.text}
                    </span>
                  </div>
                )
              })}

              <div className="flex items-start gap-2 border-l border-[#E3B44F]/25 bg-[#2A2418]/45 px-4 py-5 lg:px-5 lg:py-6">
                <Check size={13} className="mt-[3px] shrink-0 text-[#71DFA2]" aria-hidden />
                <span className="text-[12.5px] font-medium leading-[1.7] text-[#F7F7F3] lg:text-[13px]">
                  {r.ours.text}
                </span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
