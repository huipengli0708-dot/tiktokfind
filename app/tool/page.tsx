import Link from "next/link"
import {
  TrendingUp, BarChart3, Zap, Target, Shield, CheckCircle,
  ArrowRight, Sparkles, Clock, Users, Star
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "选品工具",
  description: "系统化找到 TikTok 爆款商品的选品工具，帮助创作者和卖家精准选品。",
}

const toolFeatures = [
  {
    icon: <TrendingUp size={20} className="text-indigo-500" />,
    title: "爆款趋势监测",
    desc: "实时追踪 TikTok 各品类热度变化，第一时间发现正在起量的新品类，不再靠跟风。",
    highlight: "每日更新"
  },
  {
    icon: <BarChart3 size={20} className="text-purple-500" />,
    title: "竞争度分析报告",
    desc: "评估每个品类当前的市场饱和度，告诉你现在入场是早了还是晚了，还有没有机会。",
    highlight: "精准评估"
  },
  {
    icon: <Zap size={20} className="text-emerald-500" />,
    title: "利润率快速估算",
    desc: "结合主流供应商价格数据，快速估算从进货到售出的真实利润空间，只选真正能赚钱的品。",
    highlight: "数据驱动"
  },
  {
    icon: <Target size={20} className="text-amber-500" />,
    title: "内容策略模板库",
    desc: "针对不同产品类型，提供可以直接套用的视频脚本结构和钩子词模板，大幅缩短摸索时间。",
    highlight: "即拿即用"
  },
  {
    icon: <Shield size={20} className="text-rose-500" />,
    title: "风险预警系统",
    desc: "提前识别品类的合规风险、库存风险和流量衰减信号，帮你避开常见的踩坑路径。",
    highlight: "防患未然"
  },
  {
    icon: <Users size={20} className="text-blue-500" />,
    title: "受众画像分析",
    desc: "分析每个爆款品类的核心买家群体，帮你精准定位内容方向和营销角度。",
    highlight: "精准人群"
  },
]

const whyBuy = [
  "手动调研一个品类平均需要 3-5 天，工具可以压缩到 2 小时",
  "靠感觉选品失败率超 70%，系统化框架降低决策风险",
  "避免在已经饱和的品类浪费时间和广告费",
  "获得可复用的内容打法，不用每次都从零开始摸索",
  "加入选品工具用户群，和同频卖家交流实战经验",
]

const targetGroups = [
  { emoji: "🛒", title: "TikTok Shop 新卖家", desc: "想快速找到第一个盈利品，少走弯路" },
  { emoji: "📱", title: "内容创作者", desc: "想做带货但不知道选什么品推" },
  { emoji: "📦", title: "有货源的传统卖家", desc: "想用 TikTok 内容引爆现有产品" },
  { emoji: "🔄", title: "从其他平台转型", desc: "已有电商经验，想复制到 TikTok" },
]

const faqs = [
  {
    q: "这个工具是软件还是方法论体系？",
    a: "目前是系统化的选品方法论 + 核心分析框架，以文档和模板形式交付，后续将上线在线工具版本。"
  },
  {
    q: "购买后如何获取？",
    a: "付款后将通过微信/邮件发送工具包，包含完整的方法论手册、分析模板和案例库。"
  },
  {
    q: "没有电商经验可以用吗？",
    a: "可以。工具设计面向 0 基础用户，从选品逻辑到内容打法都有详细讲解，不需要提前有经验。"
  },
  {
    q: "购买后是否有后续更新？",
    a: "是的，购买即可加入用户群，获得后续所有版本的免费更新，以及每月新增案例分享。"
  },
]

export default function ToolPage() {
  return (
    <div className="page-bg">
      {/* 背景装饰 */}
      <div className="glow-orb w-96 h-96 bg-indigo-300/20 top-0 right-0 slow-pulse" />
      <div className="glow-orb w-72 h-72 bg-purple-300/15 top-60 -left-20 slow-pulse" style={{ animationDelay: "2s" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 py-10">

        {/* ===== Hero ===== */}
        <section className="text-center py-10 md:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-indigo-200/50 text-indigo-700 text-xs font-medium mb-5">
            <Sparkles size={12} />
            专为 TikTok 选品设计
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            系统化找爆款，<br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              不靠运气靠方法
            </span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed mb-8">
            阿光选品工具帮你建立可复用的选品体系<br />
            0延迟抓取平台数据，24小时监测同行<br />
            第一时间发现爆品，永远快人一步
          </p>

          {/* 社会证明 */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-8">
            {[
              { icon: <Clock size={14} className="text-indigo-500" />, text: "节省 80% 调研时间" },
              { icon: <Star size={14} className="text-amber-500 fill-amber-500" />, text: "4.9/5 用户评分" },
              { icon: <Users size={14} className="text-emerald-500" />, text: "已帮助 500+ 卖家" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-gray-600">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold btn-gradient"
            >
              立即咨询获取 <ArrowRight size={16} />
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold btn-outline-glass"
            >
              先看爆款案例
            </Link>
          </div>
        </section>

        {/* ===== 适合人群 ===== */}
        <section className="py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">适合哪些人？</h2>
            <p className="text-gray-500 text-sm">不管你现在处于哪个阶段，这套工具都能帮到你</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {targetGroups.map((group, i) => (
              <div key={i} className="glass-card glass-card-hover rounded-2xl p-5 flex items-start gap-4">
                <div className="text-3xl shrink-0">{group.emoji}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{group.title}</h3>
                  <p className="text-sm text-gray-500">{group.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 功能亮点 ===== */}
        <section className="py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">工具功能详解</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              每个功能模块都针对 TikTok 选品的核心痛点设计
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolFeatures.map((feature, i) => (
              <div key={i} className="glass-card glass-card-hover rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1.5">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 为什么要买 ===== */}
        <section className="py-10">
          <div className="glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <div className="glow-orb w-48 h-48 bg-indigo-300/15 -top-10 -right-10" />
            <div className="glow-orb w-40 h-40 bg-purple-300/15 -bottom-10 -left-10" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">为什么你需要这套工具？</h2>
              <p className="text-gray-500 text-sm mb-6">
                大多数人的选品方式：刷 TikTok 看到什么卖什么，或者跟着别人做同款。
                这两种方式要么太随机，要么已经过了红利期。
              </p>
              <div className="space-y-3 mb-6">
                {whyBuy.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm btn-gradient"
              >
                立即咨询 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">常见问题</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <p className="font-semibold text-gray-800 text-sm mb-2">Q: {faq.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 最终 CTA ===== */}
        <section className="py-8 pb-16">
          <div className="glass-card rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="glow-orb w-56 h-56 bg-indigo-400/15 -top-10 -right-10 slow-pulse" />
            <div className="glow-orb w-48 h-48 bg-purple-400/15 -bottom-10 -left-10 slow-pulse" />
            <div className="relative z-10">
              <div className="text-3xl mb-3">🚀</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">准备好开始系统化选品了吗？</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                不要再靠感觉选品，工具帮你建立可持续的爆款发现体系。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base btn-gradient"
              >
                立即联系获取工具 <ArrowRight size={16} />
              </Link>
              <p className="text-xs text-gray-400 mt-3">私信/联系后通常 24 小时内回复</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
