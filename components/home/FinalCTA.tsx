'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function FinalCTA() {
  return (
    <section className="border-b border-[#252A32] py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-7">
        <Reveal>
          <div className="flex flex-col items-center rounded-[16px] border border-[#252A32] bg-[#111419] px-6 py-16 text-center lg:px-12 lg:py-20">
            <h2 className="text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#F7F7F3] lg:text-[44px]">
              好内容，<span className="text-[#E3B44F]">先看见</span>
            </h2>

            <p className="mt-5 max-w-[38ch] text-[14px] leading-[1.85] text-[#8B919B] lg:text-[15px]">
              今天的内容已经整理好了。永久免费使用，注册后即可收藏和持续跟进。
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/picks"
                className="inline-flex items-center gap-2 rounded-[11px] bg-[#E3B44F] px-7 py-3.5 text-[15px] font-medium text-[#080A0D] transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                看看今天的内容
                <ArrowRight size={17} aria-hidden />
              </Link>
              <Link
                href="/me"
                className="inline-flex items-center gap-2 rounded-[11px] border border-[#252A32] bg-[#171A20] px-7 py-3.5 text-[15px] font-medium text-[#F7F7F3] transition-colors hover:border-[#3A404A]"
              >
                注册账号
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
