import Image from "next/image"
import Link from "next/link"
import {
  TrendingUp, Zap, Shield, Target, BarChart3, ArrowRight,
  Eye, Star, CheckCircle, Sparkles, Play
} from "lucide-react"
import { getFeaturedVideos, getAllVideos } from "@/lib/db"
import { formatViewCount } from "@/lib/mock-data"
import VideoCard from "@/components/VideoCard"
import CTASection from "@/components/CTASection"

const whyViralReasons = [
  {
    icon: <Eye size={20} className="text-indigo-500" />,
    title: "视觉冲击 3 秒钩子",
    desc: "爆款视频的开头 3 秒必须产生强烈视觉冲击，让用户停下刷屏的手指。我们分析每个产品的天然拍摄优势。"
  },
  {
    icon: <Target size={20} className="text-purple-500" />,
    title: "精准痛点匹配",
    desc: "好的爆款商品必须解决真实痛点。我们评估产品能触达的痛点是否足够普遍、足够强烈。"
  },
  {
    icon: <BarChart3 size={20} className="text-emerald-500" />,
    title: "利润空间验证",
    desc: "流量好但没利润等于白做。我们同步分析供应链成本、定价区间与实际利润率，只推真正能赚钱的品。"
  },
  {
    icon: <Zap size={20} className="text-amber-500" />,
    title: "内容可复制性",
    desc: "分析每个爆款产品的内容打法：用什么角度拍、说什么钩子词、哪个场景最出效果，让你直接可以复用。"
  },
]

const valuePoints = [
  "每周精选真实 TikTok 爆款案例，不是道听途说",
  "从选品逻辑到内容打法，完整链条拆解",
  "帮你识别哪些是昙花一现，哪些是长期稳定赛道",
  "适合 0-1 阶段的卖家和创作者快速起量",
]

const toolFeatures = [
  { title: "爆款趋势监测", desc: "实时追踪 TikTok 热卖品类变化趋势" },
  { title: "竞争度分析", desc: "评估每个品类当前市场饱和度" },
  { title: "利润率估算", desc: "结合供应链数据快速估算真实利润空间" },
  { title: "内容策略模板", desc: "针对不同产品给出可直接使用的拍摄框架" },
]

export const revalidate = 60

export default async function HomePage() {
  const [featuredVideos, allVideos] = await Promise.all([
    getFeaturedVideos(),
    getAllVideos(),
  ])
  const totalViews = allVideos.reduce((sum, v) => sum + v.viewCount, 0)

  return (
    <div className="page-bg">
      {/* 背景光晕装饰 */}
      <div className="glow-orb w-96 h-96 bg-indigo-300/20 top-0 right-0 slow-pulse" />
      <div className="glow-orb w-80 h-80 bg-purple-300/20 top-40 -left-20 slow-pulse" style={{ animationDelay: "2s" }} />
      <div className="glow-orb w-64 h-64 bg-pink-200/20 top-96 right-1/4" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ===== HERO ===== */}
        <section className="pt-12 pb-16 md:pt-20 md:pb-24 text-center">
          {/* 标签 */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-indigo-200/50 text-indigo-700 text-xs font-medium mb-6">
            <Sparkles size={12} />
            每周更新 · TikTok 爆款研究
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-6">
            别再试错了，
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              直接复制已验证爆款
            </span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            每周精选 3 个真实跑出来的 TikTok 爆款，完整拆解选品逻辑 + 内容打法 + 利润数据，
            拿来直接用，不需要从零摸索。
          </p>

          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              href="/videos"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold btn-gradient"
            >
              获取爆款清单 <ArrowRight size={16} />
            </Link>
            <Link
              href="/tool"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold btn-outline-glass"
            >
              了解选品工具
            </Link>
          </div>

          {/* 数据展示 */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: `${allVideos.length}+`, label: "爆款案例" },
              { value: `${Math.round(totalViews / 1000000)}M+`, label: "累计浏览量" },
              { value: "92", label: "平均爆款指数" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 今日爆款推荐（按内容类型分组） ===== */}
        {(() => {
          const GROUP_ORDER = ["商家实拍", "达人", "AI"] as const
          const GROUP_META: Record<string, { emoji: string; desc: string; color: string }> = {
            "商家实拍": { emoji: "🎥", desc: "商家自拍真实产品展示", color: "text-blue-600 bg-blue-50/80 border-blue-200/50" },
            "达人":    { emoji: "⭐", desc: "KOL / 达人合作爆款",   color: "text-purple-600 bg-purple-50/80 border-purple-200/50" },
            "AI":      { emoji: "🤖", desc: "AI 生成内容爆款",       color: "text-emerald-600 bg-emerald-50/80 border-emerald-200/50" },
          }
          const groups = GROUP_ORDER
            .map((type) => ({ type, videos: featuredVideos.filter((v) => v.content_type === type) }))
            .filter((g) => g.videos.length > 0)
          const ungrouped = featuredVideos.filter((v) => !v.content_type || !GROUP_ORDER.includes(v.content_type as typeof GROUP_ORDER[number]))

          return (
            <section className="py-12 space-y-10">
              {/* 标题行 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-500/10 to-orange-400/10 border border-rose-300/30 text-rose-600 text-[11px] font-bold tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse inline-block" />
                      今日更新
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">今日爆款推荐</h2>
                  <p className="text-sm text-gray-400 mt-1">按内容类型精选，附完整选品逻辑</p>
                </div>
                <Link href="/videos" className="hidden sm:flex items-center gap-1 text-sm text-indigo-600 font-medium hover:gap-2 transition-all">
                  查看全部 <ArrowRight size={14} />
                </Link>
              </div>

              {/* 按分组渲染 */}
              {groups.map(({ type, videos }) => {
                const meta = GROUP_META[type]
                return (
                  <div key={type}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border mb-4 ${meta.color}`}>
                      <span>{meta.emoji}</span>
                      <span>{type}</span>
                      <span className="opacity-60">— {meta.desc}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                      {videos.map((video) => (
                        <VideoCard key={video.id} video={video} variant="featured" />
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* 未分类兜底 */}
              {ungrouped.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {ungrouped.map((video) => (
                    <VideoCard key={video.id} video={video} variant="featured" />
                  ))}
                </div>
              )}

              <div className="flex justify-center sm:hidden">
                <Link href="/videos" className="px-5 py-2.5 rounded-xl text-sm font-medium btn-outline-glass">
                  查看全部爆款 →
                </Link>
              </div>
            </section>
          )
        })()}

        {/* ===== 为什么这些商品会爆 ===== */}
        <section className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">为什么这些商品会爆？</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              不是随机选品，每个推荐都经过系统化分析框架验证
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyViralReasons.map((item, i) => (
              <div key={i} className="glass-card glass-card-hover rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center mb-3 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 网站价值说明 ===== */}
        <section className="py-12">
          <div className="glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <div className="glow-orb w-48 h-48 bg-indigo-300/15 -top-10 -right-10" />
            <div className="glow-orb w-40 h-40 bg-purple-300/15 -bottom-10 -left-10" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-medium text-amber-600">为什么关注阿光选品</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  不是搬运视频，<br />而是帮你建立选品判断力
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  市面上充斥着"爆款推荐"内容，但大多数只是搬运热门视频，没有选品逻辑，
                  没有数据支撑，没有风险提示。跟着做只是碰运气。
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  我做的事情不一样：深入分析每一个爆款背后的选品逻辑、内容打法和市场空间，
                  让你真正理解"什么样的商品在 TikTok 更容易爆"。
                </p>
              </div>

              <div className="w-full md:w-64 shrink-0">
                <div className="glass-card rounded-2xl p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-3">你能从这里获得</p>
                  <ul className="space-y-2.5">
                    {valuePoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-600 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 选品工具介绍区 ===== */}
        <section className="py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/60 text-emerald-700 text-xs font-medium mb-4">
              <Zap size={12} />
              工具加速
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">用选品工具，系统化找爆款</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              不只是看案例，用工具方法论化你的选品流程
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {toolFeatures.map((feature, i) => (
              <div key={i} className="glass-card glass-card-hover rounded-2xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center shrink-0">
                  <Shield size={14} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm btn-gradient"
            >
              查看选品工具详情 <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-8 pb-16">
          <CTASection />
        </section>

      </div>
    </div>
  )
}
