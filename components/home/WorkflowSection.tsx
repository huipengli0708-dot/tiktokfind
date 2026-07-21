'use client'

import { Eye, Lightbulb, PlayCircle, TrendingUp } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

/** 方法原则：看见 — 理解 — 行动 — 增长 */
const STEPS = [
  {
    icon: Eye,
    step: '01',
    title: '看见',
    desc: '每天上午 10:30 更新，把美国站当日正在起势的内容整理好，去重、核验，排除异常内容。',
  },
  {
    icon: Lightbulb,
    step: '02',
    title: '理解',
    desc: '每条内容附带播放、增长与预估 GMV，以及它为什么能起量的拆解，帮你看清本质。',
  },
  {
    icon: PlayCircle,
    step: '03',
    title: '行动',
    desc: '收藏值得跟进的内容，关联 TikTok 链接与货源线索，从判断到执行不用换工具。',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: '增长',
    desc: '把看见的内容变成自己的表达与选品节奏，让内容创新持续带来生意增长。',
  },
]

export default function WorkflowSection() {
  return (
    <section id="workflow" className="border-b border-[#252A32] py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-7">
        <SectionHeading
          eyebrow="方法原则"
          title="看见 — 理解 — 行动 — 增长"
          description="以数据洞察问题本质，通过内容创新，激发生意增长。"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-[#252A32] bg-[#252A32] md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, step, title, desc }, idx) => (
            <Reveal key={step} delay={idx * 0.08} className="h-full">
              <div className="flex h-full flex-col bg-[#0B0E13] p-7 lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[11px] border border-[#252A32] bg-[#171A20] text-[#E3B44F]">
                    <Icon size={17} aria-hidden />
                  </span>
                  <span className="font-mono text-[13px] tracking-[0.05em] text-[#3A404A]">{step}</span>
                </div>
                <h3 className="mt-6 text-[18px] font-medium tracking-tight text-[#F7F7F3]">{title}</h3>
                <p className="mt-3.5 text-[13.5px] leading-[1.8] text-[#8B919B]">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
