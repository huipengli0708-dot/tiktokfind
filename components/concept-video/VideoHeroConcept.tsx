import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4'

export default function VideoHeroConcept() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,8,0.98)_0%,rgba(3,5,8,0.92)_25%,rgba(3,5,8,0.68)_47%,rgba(3,5,8,0.12)_70%,rgba(3,5,8,0.08)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,transparent_24%,transparent_72%,rgba(0,0,0,0.3)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-5 pb-10 pt-[68px] lg:px-7">
        <div className="w-[46%] max-w-[620px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E3B44F]/30 bg-[#2A2418]/75 px-4 py-1.5 text-sm font-medium text-[#E3B44F] backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[#E3B44F]" aria-hidden="true" />
            美国 TikTok 内容趋势与选品工具
          </div>

          <h1 className="text-[clamp(2.75rem,4.4vw,4.75rem)] font-semibold leading-[1.06] tracking-normal text-[#F7F7F3]">
            好内容，
            <span className="text-[#E3B44F]">先看见</span>
          </h1>

          <p className="mt-8 max-w-[43ch] text-lg leading-[1.8] text-white/70">
            关注美国 TikTok 上的创作者、品牌与 AI 内容，发现正在起势的商品和表达。
          </p>
          <p className="mt-2.5 max-w-[43ch] text-[15px] leading-[1.8] text-white/45">
            以数据洞察问题本质，通过内容创新，激发生意增长。
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/picks"
              className="inline-flex items-center gap-2 rounded-lg bg-[#E3B44F] px-6 py-3 text-sm font-medium text-[#080A0D] transition-transform hover:scale-105"
            >
              看看今天的内容
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/#value"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/25 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Play size={15} aria-hidden="true" />
              了解怎么用
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
