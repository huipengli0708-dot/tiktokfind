'use client'

import Link from 'next/link'
import { UserRound, Store, Sparkles, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const SIGNALS = [
  {
    icon: UserRound,
    name: '达人实拍',
    accent: 'text-[#7FA8D9]',
    dot: 'bg-[#7FA8D9]',
    bg: 'bg-[#16202B]',
    border: 'border-[#2C3D4F]',
    desc: '美国本土达人的真实使用与测评视频，看老外如何把商品带入真实场景，以及信任是怎样建立的。',
    points: ['达人画像是什么', '开场三秒的钩子', '评论区的真实反馈'],
  },
  {
    icon: Store,
    name: '商家自制',
    accent: 'text-[#D0A277]',
    dot: 'bg-[#D0A277]',
    bg: 'bg-[#241C15]',
    border: 'border-[#403325]',
    desc: '看品牌如何展示商品、回应需求，并形成可以持续生产的内容。',
    points: ['产品卖点怎么演示', '素材复用成本', '什么脚本结构值得借鉴'],
  },
  {
    icon: Sparkles,
    name: 'AI 生成',
    accent: 'text-[#A9A2C4]',
    dot: 'bg-[#A9A2C4]',
    bg: 'bg-[#1D1B26]',
    border: 'border-[#332F42]',
    desc: 'AI 生成的场景和脚本类型，Seedance 2 与 Veo 3 的出片方向。',
    points: [
      '用了什么生成方式',
      '复用 AI 提示词（一比一复刻，开发中）',
      '哪些品适合 AI',
    ],
  },
]

export default function SignalSection() {
  return (
    <section id="signals" className="border-b border-[#252A32] py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-7">
        <SectionHeading
          align="left"
          eyebrow="三个内容视角"
          title="从不同内容形态，看见不同机会"
          description="不同类型的爆款，背后的打法完全不一样。分开看，才知道哪一种适合你现在的账号。"
          aside={
            <Link
              href="/picks"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#E3B44F] transition-opacity hover:opacity-80"
            >
              查看今日内容
              <ArrowRight size={15} aria-hidden />
            </Link>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SIGNALS.map(({ icon: Icon, name, accent, dot, bg, border, desc, points }, idx) => (
            <Reveal key={name} delay={idx * 0.1} className="h-full">
              <article className="flex h-full flex-col rounded-[16px] border border-[#252A32] bg-[#111419] p-7 lg:p-8">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-[11px] border ${border} ${bg} ${accent}`}
                >
                  <Icon size={18} aria-hidden />
                </span>

                <h3 className="mt-6 text-[18px] font-medium tracking-tight text-[#F7F7F3]">{name}</h3>

                <p className="mt-3.5 text-[13.5px] leading-[1.8] text-[#8B919B]">{desc}</p>

                <ul className="mt-7 flex flex-col gap-3 border-t border-[#252A32] pt-6">
                  {points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[13.5px] leading-[1.65] text-[#F7F7F3]/85"
                    >
                      <span className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${dot}`} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
