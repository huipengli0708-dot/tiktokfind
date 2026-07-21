'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#252A32]">
      {/* 极淡的中心聚光，避免大面积装饰 */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(227,180,79,0.07) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center px-5 pb-28 pt-[150px] text-center lg:px-7 lg:pb-40 lg:pt-[200px]">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-[#E3B44F]/30 bg-[#2A2418] px-4 py-1.5 text-[13px] font-medium tracking-[0.02em] text-[#E3B44F]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E3B44F]" aria-hidden />
          美国 TikTok 内容趋势与选品工具
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-[46px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#F7F7F3] sm:text-[60px] lg:text-[76px]"
        >
          好内容，<span className="text-[#E3B44F]">先看见</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-[40ch] text-[15px] leading-[1.85] text-[#8B919B] lg:text-[17px]"
        >
          关注美国 TikTok 上的创作者、品牌与 AI 内容，发现正在起势的商品和表达。
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-[40ch] text-[14px] leading-[1.85] text-[#656B75] lg:text-[15px]"
        >
          以数据洞察问题本质，通过内容创新，激发生意增长。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-11 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/picks"
            className="inline-flex items-center gap-2 rounded-[11px] bg-[#E3B44F] px-7 py-3.5 text-[15px] font-medium text-[#080A0D] transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            看看今天的内容
            <ArrowRight size={17} aria-hidden />
          </Link>
          <a
            href="#value"
            className="inline-flex items-center gap-2 rounded-[11px] border border-[#252A32] bg-[#111419] px-7 py-3.5 text-[15px] font-medium text-[#F7F7F3] transition-colors hover:border-[#3A404A]"
          >
            <Play size={15} aria-hidden />
            了解怎么用
          </a>
        </motion.div>
      </div>
    </section>
  )
}
