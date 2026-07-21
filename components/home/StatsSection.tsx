'use client'

import CountUp from './CountUp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const STATS = [
  { value: 12000, suffix: '+', label: '每日扫描视频量', desc: '覆盖美国站全量增长榜' },
  { value: 15, suffix: '', label: '今日精选', desc: '筛选率 0.125%' },
  { value: 3, suffix: '', label: '内容类型分类', desc: '达人 / 商家 / AI' },
  { value: 92.6, suffix: '%', decimals: 1, label: '人工复核通过率', desc: '去重、核验，排除异常内容' },
]

export default function StatsSection() {
  return (
    <section className="border-b border-[#252A32] py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-7">
        <SectionHeading eyebrow="今日运行数据" title="筛掉 99.87%，才敢推给你" />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-[#252A32] bg-[#252A32] sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div className="h-full bg-[#0B0E13] px-6 py-9">
                <p className="text-[34px] font-semibold leading-none tracking-[-0.02em] text-[#F7F7F3] lg:text-[42px]">
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-4 text-[14px] font-medium text-[#F7F7F3]">{s.label}</p>
                <p className="mt-1.5 text-[12px] leading-[1.6] text-[#656B75]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
