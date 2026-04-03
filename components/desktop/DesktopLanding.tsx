import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Flame } from "lucide-react"
import type { VideoProduct } from "@/lib/mock-data"

interface Props {
  featuredVideos: VideoProduct[]
  allVideos: VideoProduct[]
}

export default function DesktopLanding({ featuredVideos, allVideos }: Props) {
  const previewVideos = (featuredVideos.length >= 3 ? featuredVideos : allVideos).slice(0, 6)
  const totalVideos = allVideos.length
  const avgScore =
    allVideos.length > 0
      ? Math.round(
          allVideos.reduce((s, v) => s + v.analysis.trendScore, 0) / allVideos.length
        )
      : 0
  const categories = new Set(allVideos.map((v) => v.category)).size

  return (
    <div className="app-bg min-h-screen">
      {/* Background orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-violet-500/[0.07] rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-80 -left-24 w-80 h-80 bg-blue-500/[0.06] rounded-full blur-[80px] pointer-events-none" />

      {/* ─── Hero ─────────────────────────────────── */}
      {/* Note: layout.tsx adds md:pt-16 to clear the fixed navbar */}
      <section className="pt-14 pb-20 px-8 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-medium mb-8 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          每周更新 · TikTok 爆款研究
        </div>

        <div className="max-w-2xl mb-10">
          <h1 className="text-5xl font-bold text-white leading-[1.15] tracking-tight mb-6">
            别再试错了，
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              直接复制已验证爆款
            </span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            每周精选 TikTok 真实跑出来的爆款，完整拆解选品逻辑、内容打法和利润数据，
            拿来直接用，不需要从零摸索。
          </p>
        </div>

        {/* ── Primary CTAs ── */}
        <div className="flex items-center gap-4 mb-14">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition-all shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:shadow-[0_6px_28px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 text-sm"
          >
            查看爆款视频 <ArrowRight size={15} />
          </Link>
          <Link
            href="/tool"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-medium text-white/70 bg-white/[0.07] border border-white/[0.12] hover:bg-white/[0.11] hover:text-white transition-all text-sm"
          >
            获取选品工具
          </Link>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-10 pt-8 border-t border-white/[0.07]">
          {[
            { value: `${totalVideos}+`, label: "爆款案例" },
            { value: String(avgScore), label: "平均爆款指数" },
            { value: `${categories}+`, label: "覆盖品类" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
              <p className="text-white/38 text-sm mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured video grid ──────────────────── */}
      {previewVideos.length > 0 && (
        <section className="px-8 pb-24 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white text-xl font-bold">今日精选爆款</h2>
              <p className="text-white/35 text-sm mt-0.5">每周更新，附完整选品分析</p>
            </div>
            <Link
              href="/videos"
              className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              查看全部 <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {previewVideos.map((video) => {
              const competitionColor = {
                低: "text-emerald-400",
                中: "text-amber-400",
                高: "text-rose-400",
              }[video.analysis.competitionLevel] ?? "text-white/40"

              return (
                <Link
                  key={video.id}
                  href={`/videos/${video.slug}`}
                  className="group relative rounded-2xl overflow-hidden h-64 app-desktop-card hover:border-white/15 transition-colors"
                >
                  <Image
                    src={video.coverImage}
                    alt={video.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                    sizes="(max-width: 1280px) 33vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {video.content_type && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/40 text-violet-200 border border-violet-400/20 backdrop-blur-sm font-medium">
                        {video.content_type}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-amber-400 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-amber-400/20">
                      <Flame size={10} /> {video.analysis.trendScore}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-2">
                      {video.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-xs">{video.category}</span>
                      <div className="flex items-center gap-2.5">
                        <span className="text-emerald-400 text-xs font-medium">
                          {video.analysis.profitMargin.split("，")[0]}
                        </span>
                        <span className={`text-xs font-medium ${competitionColor}`}>
                          {video.analysis.competitionLevel}竞争
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-10">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-medium text-white/65 bg-white/[0.06] border border-white/[0.1] hover:text-white hover:bg-white/[0.09] transition-all"
            >
              查看全部爆款视频 <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
