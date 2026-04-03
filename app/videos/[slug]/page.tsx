import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft, TrendingUp, Users, Lightbulb, AlertTriangle,
  BarChart3, CheckCircle, Target, ArrowRight, Eye, Heart,
  Star, Flame, ShieldCheck, ShieldAlert, Shield
} from "lucide-react"
import { getVideoBySlug, getAllSlugs, getAllVideos } from "@/lib/db"
import { formatViewCount } from "@/lib/mock-data"
import TrendScore from "@/components/TrendScore"
import TagBadge from "@/components/TagBadge"
import CTASection from "@/components/CTASection"
import VideoCard from "@/components/VideoCard"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const video = await getVideoBySlug(slug)
  if (!video) return { title: "未找到" }
  return {
    title: video.title,
    description: video.shortDescription,
  }
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params
  const [video, allVideos] = await Promise.all([
    getVideoBySlug(slug),
    getAllVideos(),
  ])
  if (!video) notFound()

  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id && (v.category === video.category || v.tags.some(t => video.tags.includes(t))))
    .slice(0, 3)

  const competitionColor = {
    低: "text-emerald-600 bg-emerald-50 border-emerald-200",
    中: "text-amber-600 bg-amber-50 border-amber-200",
    高: "text-rose-600 bg-rose-50 border-rose-200",
  }[video.analysis.competitionLevel]

  return (
    <div className="page-bg">
      <div className="glow-orb w-96 h-96 bg-indigo-200/20 top-0 right-0 slow-pulse" />
      <div className="glow-orb w-72 h-72 bg-purple-200/15 top-40 -left-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 py-8">

        {/* 返回按钮 */}
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          返回视频列表
        </Link>

        {/* 封面 + 基础信息 */}
        <div className="glass-card rounded-3xl overflow-hidden mb-6">
          {/* 封面图 / 视频区 — 9:16 竖版布局 */}
          {video.video_source_type === "mp4" && video.video_file_url ? (
            /* MP4: centered vertical player, max 65vh tall */
            <div className="relative bg-black flex justify-center">
              <div className="relative w-full max-w-sm">
                <video
                  src={video.video_file_url}
                  controls
                  playsInline
                  className="w-full aspect-[9/16] max-h-[65vh] object-contain"
                  poster={video.coverImage || undefined}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/50 backdrop-blur-md border border-white/20">
                    {video.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-white/90 text-xs bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                    <Eye size={11} /> {formatViewCount(video.viewCount)}
                  </span>
                  <span className="flex items-center gap-1 text-white/90 text-xs bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                    <Heart size={11} /> {formatViewCount(video.likeCount)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* TikTok / static cover — 9:16 with fallback placeholder */
            <div className="relative aspect-[9/16] max-h-[65vh] overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
              {video.coverImage ? (
                <>
                  <Image
                    src={video.coverImage}
                    alt={video.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-indigo-400 ml-1" />
                    </div>
                    <span className="text-xs">暂无封面</span>
                  </div>
                </div>
              )}

              {/* 播放按钮占位 (only when cover exists) */}
              {video.coverImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all hover:scale-105">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
                  </div>
                </div>
              )}

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/30 backdrop-blur-md border border-white/20">
                  {video.category}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="flex items-center gap-1 text-white/90 text-xs bg-black/30 backdrop-blur-md px-2 py-1 rounded-full">
                  <Eye size={11} /> {formatViewCount(video.viewCount)}
                </span>
                <span className="flex items-center gap-1 text-white/90 text-xs bg-black/30 backdrop-blur-md px-2 py-1 rounded-full">
                  <Heart size={11} /> {formatViewCount(video.likeCount)}
                </span>
              </div>
            </div>
          )}

          {/* 标题 + 标签 + 核心指标 */}
          <div className="p-5 md:p-7">
            <div className="flex flex-wrap gap-2 mb-3">
              {video.tags.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3">
              {video.title}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              {video.shortDescription}
            </p>

            {/* 核心指标行 */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="glass-card rounded-xl p-3 text-center">
                <div className="text-xs text-gray-400 mb-0.5">利润率</div>
                <div className="font-bold text-sm text-emerald-600">{video.analysis.profitMargin || "—"}</div>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <div className="text-xs text-gray-400 mb-0.5">竞争度</div>
                <div className={`font-bold text-sm px-2 py-0.5 rounded-full border text-center ${competitionColor}`}>
                  {video.analysis.competitionLevel}
                </div>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <div className="text-xs text-gray-400 mb-0.5">市场规模</div>
                <div className="font-bold text-[11px] text-gray-700 leading-tight">{(video.analysis.marketSize || "待分析").split('，')[0]}</div>
              </div>
            </div>

            {/* 爆款指数 */}
            <TrendScore score={video.analysis.trendScore} />
          </div>
        </div>

        {/* ===== 爆点分析 ===== */}
        <div className="glass-card rounded-3xl p-5 md:p-7 mb-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl btn-gradient flex items-center justify-center shrink-0">
              <TrendingUp size={15} className="text-white" />
            </div>
            <h2 className="text-base font-bold text-gray-900">爆点分析：为什么这个商品会爆？</h2>
          </div>
          {/* punchline — one-line summary from AI analysis */}
          {video.punchline && (
            <p className="text-sm font-medium text-indigo-700 bg-indigo-50/60 border border-indigo-100/60 rounded-xl px-4 py-2.5 mb-4 leading-relaxed">
              {video.punchline}
            </p>
          )}
          {video.analysis.whyViral.length > 0 ? (
            <div className="space-y-3">
              {video.analysis.whyViral.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/50">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">暂无分析数据</p>
          )}
        </div>

        {/* ===== 适合人群 ===== */}
        <div className="glass-card rounded-3xl p-5 md:p-7 mb-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <Users size={15} className="text-emerald-600" />
            </div>
            <h2 className="text-base font-bold text-gray-900">适合谁来做？</h2>
          </div>
          {video.targetAudience.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {video.targetAudience.map((audience, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100/60">
                  <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700">{audience}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">暂无分析数据</p>
          )}
        </div>

        {/* ===== 内容打法建议 ===== */}
        <div className="glass-card rounded-3xl p-5 md:p-7 mb-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
              <Lightbulb size={15} className="text-purple-600" />
            </div>
            <h2 className="text-base font-bold text-gray-900">内容打法建议</h2>
          </div>
          {video.contentStrategy.length > 0 ? (
            <div className="space-y-3">
              {video.contentStrategy.map((strategy, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/50 border border-purple-100/60">
                  <Target size={14} className="text-purple-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">{strategy}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">暂无分析数据</p>
          )}
        </div>

        {/* ===== 市场数据 ===== */}
        <div className="glass-card rounded-3xl p-5 md:p-7 mb-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <BarChart3 size={15} className="text-blue-600" />
            </div>
            <h2 className="text-base font-bold text-gray-900">市场数据参考</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/60">
              <div className="text-xs text-gray-400 mb-1">市场规模</div>
              <p className="text-sm font-medium text-gray-700">{video.analysis.marketSize || "暂无分析数据"}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/60">
              <div className="text-xs text-gray-400 mb-1">预估利润率</div>
              <p className="text-sm font-semibold text-emerald-600">{video.analysis.profitMargin || "暂无分析数据"}</p>
            </div>
          </div>
        </div>

        {/* ===== 综合结论模块 ===== */}
        {(() => {
          const v = video.verdict
          const riskColor = { 低: 'emerald', 中: 'amber', 高: 'rose' }[v.riskLevel]
          const riskIcon = { 低: ShieldCheck, 中: Shield, 高: ShieldAlert }[v.riskLevel]
          const RiskIcon = riskIcon
          const riskStyle = {
            低: 'text-emerald-600 bg-emerald-50/80 border-emerald-200/60',
            中: 'text-amber-600 bg-amber-50/80 border-amber-200/60',
            高: 'text-rose-600 bg-rose-50/80 border-rose-200/60',
          }[v.riskLevel]
          const scoreColor = v.recommendation >= 90 ? 'from-indigo-500 to-purple-500' : v.recommendation >= 80 ? 'from-blue-500 to-indigo-500' : 'from-gray-400 to-gray-500'
          return (
            <div className="glass-card rounded-3xl p-5 md:p-7 mb-5 border border-indigo-100/40">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
                  <Star size={15} className="text-white fill-white" />
                </div>
                <h2 className="text-base font-bold text-gray-900">阿光综合结论</h2>
              </div>

              {/* 推荐指数 + 是否建议做 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-2xl bg-white/60 border border-white/80 p-4 text-center">
                  <div className="text-xs text-gray-400 mb-1">推荐指数</div>
                  <div className={`text-3xl font-black bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
                    {v.recommendation}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">/ 100</div>
                </div>
                <div className={`rounded-2xl p-4 text-center flex flex-col items-center justify-center gap-1 ${v.shouldDo ? 'bg-emerald-50/80 border border-emerald-200/60' : 'bg-rose-50/80 border border-rose-200/60'}`}>
                  <Flame size={20} className={v.shouldDo ? 'text-emerald-500' : 'text-rose-400'} />
                  <div className={`text-sm font-bold ${v.shouldDo ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {v.shouldDo ? '建议做' : '暂不建议'}
                  </div>
                  <div className="text-[10px] text-gray-400">综合评估</div>
                </div>
              </div>

              {/* 适合人群 + 内容打法 + 风险等级 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/50 border border-white/70">
                  <Users size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">适合人群</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{v.targetSeller}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/50 border border-white/70">
                  <Lightbulb size={14} className="text-purple-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">内容打法</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{v.contentApproach}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${riskStyle}`}>
                  <RiskIcon size={14} className="shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold opacity-70 mb-0.5 uppercase tracking-wide">风险等级</div>
                    <p className="text-sm font-bold">{v.riskLevel}风险</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}

        {/* ===== 风险提醒 ===== */}
        <div className="rounded-3xl p-5 md:p-7 mb-6 border border-amber-200/60 bg-amber-50/60 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={15} className="text-amber-600" />
            </div>
            <h2 className="text-base font-bold text-gray-900">风险提醒</h2>
          </div>
          {video.riskNotes.length > 0 ? (
            <div className="space-y-2.5">
              {video.riskNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-amber-800">
                  <span className="text-amber-500 font-bold mt-0.5">!</span>
                  <p className="leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-amber-700/60 italic">暂无分析数据</p>
          )}
        </div>

        {/* ===== CTA ===== */}
        <div className="mb-10">
          <CTASection
            variant="compact"
            subtitle="想系统化找到更多这类爆款？用我的选品工具，省去大量摸索时间"
            primaryText="获取选品工具"
            primaryHref="/tool"
          />
        </div>

        {/* ===== 相关推荐 ===== */}
        {relatedVideos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">相关爆款推荐</h2>
              <Link href="/videos" className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                查看全部 <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedVideos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
