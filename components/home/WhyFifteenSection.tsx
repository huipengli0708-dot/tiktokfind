'use client'

import { Layers, Timer, Repeat, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

/** 筛选漏斗：从全量到 15 条 */
const FUNNEL = [
  { value: '12,000+', label: '当日候选视频', desc: '美国站全量抓取' },
  { value: '800', label: '过增长阈值', desc: '24 小时增速达标' },
  { value: '120', label: '去重与核验', desc: '排除重复与异常内容' },
  { value: '15', label: '今日精选', desc: '人工复核后发布', highlight: true },
]

const REASONS = [
  {
    icon: Timer,
    title: '15 条，是一个人真能看完的量',
    desc: '给 500 条和给 15 条，差别不在信息量，而在你会不会看。我们宁可少给，也要保证每条你都读完，并且能立刻做判断。',
  },
  {
    icon: Layers,
    title: '每类 5 条，才能横向比较',
    desc: '同类型并排放 5 条，你能立刻看出今天这一类的共性：是同一个品在起，还是同一种拍法在起。1 条看不出规律，50 条看不完。',
  },
  {
    icon: ShieldCheck,
    title: '量压下来，才有人工复核的余地',
    desc: '重复内容、老素材翻拍、异常数据，机器很难分辨。只有把数量压到 15 条，才有可能每条人工过一遍，把无效信号挡在你的清单之外。',
  },
  {
    icon: Repeat,
    title: '每天只做一件事：更新这 15 条',
    desc: '不做无限滚动，不做信息流。判断需要的是每天一次的确定性，而不是越刷越焦虑。',
  },
]

export default function WhyFifteenSection() {
  return (
    <section id="why15" className="border-b border-[#252A32] py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-7">
        <SectionHeading
          eyebrow="我们的方法论"
          title="更少的素材，是为了更快的执行"
          description={
            <>
              做数据工具最省事的做法，是把能抓到的都堆给你。
              <br className="hidden sm:block" />
              但增长的瓶颈从来不是数据不够，而是判断跟不上。
            </>
          }
        />

        {/* 筛选漏斗 */}
        <Reveal
          delay={0.1}
          className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-[#252A32] bg-[#252A32] sm:grid-cols-2 lg:grid-cols-4"
        >
          {FUNNEL.map((f, i) => (
            <div
              key={f.label}
              className={`px-6 py-8 ${f.highlight ? 'bg-[#141310]' : 'bg-[#0B0E13]'}`}
            >
              <p className="font-mono text-[11px] tracking-[0.08em] text-[#3A404A]">STEP {i + 1}</p>
              <p
                className={`mt-4 text-[32px] font-semibold leading-none tracking-[-0.02em] lg:text-[36px] ${
                  f.highlight ? 'text-[#E3B44F]' : 'text-[#F7F7F3]'
                }`}
              >
                {f.value}
              </p>
              <p className="mt-4 text-[13.5px] font-medium text-[#F7F7F3]">{f.label}</p>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-[#656B75]">{f.desc}</p>
            </div>
          ))}
        </Reveal>

        {/* 四个原因 */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {REASONS.map(({ icon: Icon, title, desc }, idx) => (
            <Reveal key={title} delay={idx * 0.08} className="h-full">
              <article className="flex h-full gap-5 rounded-[16px] border border-[#252A32] bg-[#111419] p-7 lg:p-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-[#252A32] bg-[#171A20] text-[#E3B44F]">
                  <Icon size={17} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15.5px] font-medium leading-[1.5] text-[#F7F7F3]">{title}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.8] text-[#8B919B]">{desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* 一句话总结 */}
        <Reveal delay={0.1}>
          <p className="mx-auto mt-12 max-w-[52ch] border-l-2 border-[#E3B44F] pl-6 text-[16px] leading-[1.85] text-[#F7F7F3]/85 lg:text-[18px]">
            筛掉 99.87%，不是因为数据不够多，而是因为留下的每一条，都值得你花时间。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
