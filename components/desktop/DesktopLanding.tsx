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
      {/* layout.tsx adds md:pt-16 to clear the fixed navbar */}
      <section className="pt-14 pb-16 px-8 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/55 text-xs font-medium mb-8 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          每周更新 · TikTok 爆款研究
        </div>

        <div className="max-w-2xl mb-8">
          <h1 className="text-5xl font-bold text-white leading-[1.15] tracking-tight mb-5">
            每周精选 TikTok 爆款，
            <br />
            <span className="text-white/70 font-normal text-4xl">
              附完整选品分析与内容打法
            </span>
          </h1>
          <p className="text-white/45 text-base leading-relaxed">
            深入拆解每个爆款背后的市场逻辑、内容策略和利润空间。
            看懂一个商品，建立你自己的选品判断力。
          </p>
        </div>

        {/* Single primary CTA → content */}
        <div className="flex flex-col gap-3 mb-2">
          <div className="flex items-center gap-4">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition-all shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 text-sm"
            >
              查看爆款视频 <ArrowRight size={15} />
            </Link>
          </div>
          {/* Tool is secondary — text link only */}
          <p className="text-white/25 text-xs ml-1">
            需要系统化选品工具？
            <Link href="/tool" className="text-white/40 hover:text-white/60 underline underline-offset-2 ml-1 transition-colors">
              了解选品工具 →
            </Link>
          </p>
        </div>

        {/* Stats — context, not conversion */}
        <div className="flex items-center gap-10 mt-12 pt-8 border-t border-white/[0.07]">
          {[
            { value: `${totalVideos}+`, label: "爆款案例" },
            { value: String(avgScore), label: "平均爆款指数" },
            { value: `${categories}+`, label: "覆盖品类" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
              <p className="text-white/35 text-sm mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Video grid — the actual product ────── */}
      {previewVideos.length > 0 && (
        <section className="px-8 pb-24 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white text-xl font-bold">本期精选爆款</h2>
              <p className="text-white/35 text-sm mt-0.5">点击任意商品查看完整分析</p>
            </div>
            <Link
              href="/videos"
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/65 transition-colors"
            >
              全部 {totalVideos} 个 <ArrowRight size={13} />
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
                  className="group relative rounded-2xl overflow-hidden h-72 app-desktop-card hover:border-white/15 transition-colors"
                >
                  <Image
                    src={video.coverImage}
                    alt={video.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-78 transition-opacity duration-300"
                    sizes="(max-width: 1280px) 33vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  {/* Trend score */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-amber-400 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-amber-400/20">
                      <Flame size={10} /> {video.analysis.trendScore}
                    </span>
                  </div>

                  {/* Content type */}
                  {video.content_type && (
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-white/65 border border-white/15 backdrop-blur-sm">
                        {video.content_type}
                      </span>
                    </div>
                  )}

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Category */}
                    <span className="text-white/45 text-[11px] mb-1.5 block">{video.category}</span>
                    {/* Title */}
                    <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-3">
                      {video.title}
                    </p>
                    {/* Key metrics — learning info */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-emerald-400 font-medium">
                        {video.analysis.profitMargin.split("，")[0]}
                      </span>
                      <span className={`font-medium ${competitionColor}`}>
                        {video.analysis.competitionLevel}竞争
                      </span>
                      <span className="text-white/35">
                        {video.analysis.marketSize.split("，")[0].slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-sm text-white/50 bg-white/[0.05] border border-white/[0.09] hover:text-white/75 hover:bg-white/[0.08] transition-all"
            >
              查看全部爆款分析 <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
