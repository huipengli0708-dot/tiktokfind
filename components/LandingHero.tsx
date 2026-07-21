'use client'

import Link from 'next/link'
import { ArrowRight, Flame, Sparkles } from 'lucide-react'
import Logo from './Logo'
import Starfield from './Starfield'

export default function LandingHero() {
  return (
    <div className="page-dark-bg relative min-h-screen overflow-hidden">
      {/* 动态星空：星团聚拢 + 鼠标引力 */}
      <div className="absolute inset-0">
        <Starfield count={260} gravityRadius={280} gravity={0.5} linkDistance={120} />
      </div>

      {/* 内容 */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <span className="mb-6 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-4 py-1.5 text-sm font-medium text-[#7CB1FF]">
          ● 每天 15 条美国最火带货视频
        </span>

        <Logo size={88} className="text-white drop-shadow-2xl" />

        <h1 className="mt-8 text-5xl font-black leading-tight tracking-wide text-white lg:text-6xl">
          今天选什么品 🔥
        </h1>
        <p className="mt-5 max-w-xl text-lg font-medium text-gray-300 lg:text-xl">
          每日 5 条达人实拍 · 5 条商家自制 · 5 条 AI 生成
          <br />
          跨境选品，不用愁
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/picks"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] px-9 py-4 text-lg font-semibold text-white shadow-[0_4px_24px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_32px_rgba(59,130,246,0.65)]"
          >
            <Flame size={20} /> 立即选品
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/me"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-9 py-4 text-lg font-semibold text-white/85 transition-colors hover:border-white/50 hover:bg-white/10"
          >
            <Sparkles size={18} /> 登录 / 注册
          </Link>
        </div>

        <p className="mt-14 text-sm text-gray-500">
          数据仅供参考，选品前请自行核实 · 关注小红书 @阿光
        </p>
      </div>
    </div>
  )
}
