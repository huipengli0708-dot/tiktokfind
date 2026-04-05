import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Flame, TrendingUp, BarChart3, Lightbulb, Sparkles } from "lucide-react"
import type { VideoProduct } from "@/lib/mock-data"

interface Props {
  featuredVideos: VideoProduct[]
  allVideos: VideoProduct[]
}

export default function DesktopLanding({ featuredVideos, allVideos }: Props) {
  const previewVideos = (featuredVideos.length >= 3 ? featuredVideos : allVideos).slice(0, 6)
  const spotlightVideo = featuredVideos[0] ?? allVideos[0]
  const totalVideos = allVideos.length
  const avgScore =
    allVideos.length > 0
      ? Math.round(allVideos.reduce((s, v) => s + v.analysis.trendScore, 0) / allVideos.length)
      : 0
  const categories = new Set(allVideos.map((v) => v.category)).size

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(145deg, #FFFCF7 0%, #F4F0FF 40%, #FFF8F2 72%, #F8F3FF 100%)" }}
    >
      {/* ── Soft background blobs ─────────────────── */}
      <div
        className="fixed top-0 right-0 w-[640px] h-[640px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(167,139,250,0.20)" }}
      />
      <div
        className="fixed top-72 -left-24 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(250,204,21,0.14)" }}
      />
      <div
        className="fixed bottom-40 right-1/3 w-72 h-72 rounded-full blur-[90px] pointer-events-none"
        style={{ background: "rgba(167,139,250,0.10)" }}
      />

      {/* ── Hero ─────────────────────────────────── */}
      <section className="pt-14 pb-10 px-8 max-w-6xl mx-auto relative">
        <div className="grid grid-cols-[1fr_400px] gap-14 items-center">

          {/* LEFT — copy */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 mt-2 text-xs font-semibold"
              style={{
                background: "rgba(139,92,246,0.09)",
                border: "1px solid rgba(139,92,246,0.18)",
                color: "#6D28D9",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              每周更新 · TikTok 爆款研究
              <Sparkles size={11} />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-5">
              发现下一个
              <span className="text-violet-600"> TikTok 爆款</span>
              <br />
              <span className="text-gray-400 font-normal text-4xl">
                附完整分析与内容打法
              </span>
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-9 max-w-lg">
              深入拆解每个爆款背后的市场逻辑、内容策略和利润空间。
              看懂一个商品，建立你自己的选品判断力。
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 mb-10">
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white text-sm btn-gradient hover:-translate-y-0.5 transition-transform"
              >
                查看爆款视频 <ArrowRight size={15} />
              </Link>
              <Link
                href="/tool"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm btn-outline-glass"
              >
                了解选品工具
              </Link>
            </div>

            {/* Stats pills */}
            <div className="flex items-center gap-3">
              {[
                { value: `${totalVideos}+`, label: "爆款案例", valColor: "text-violet-600", bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.13)" },
                { value: String(avgScore), label: "平均爆款指数", valColor: "text-amber-600", bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.15)" },
                { value: `${categories}+`, label: "覆盖品类", valColor: "text-emerald-600", bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.13)" },
              ].map(({ value, label, valColor, bg, border }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <span className={`text-xl font-bold tabular-nums ${valColor}`}>{value}</span>
                  <span className="text-gray-500 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — floating preview card */}
          <div className="relative h-[380px]">

            {/* Main card */}
            <div
              className="absolute top-6 left-6 right-0 rounded-3xl p-5"
              style={{
                background: "white",
                border: "1px solid rgba(139,92,246,0.10)",
                boxShadow: "0 20px 60px rgba(139,92,246,0.13), 0 4px 16px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #A78BFA)" }}
                  >
                    <TrendingUp size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 text-xs font-bold">本周爆款精选</p>
                    <p className="text-gray-400 text-[10px]">TikTok 深度分析</p>
                  </div>
                </div>
                {spotlightVideo && (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(245,158,11,0.12)",
                      border: "1px solid rgba(245,158,11,0.22)",
                      color: "#92400E",
                    }}
                  >
                    <Flame size={11} />
                    {spotlightVideo.analysis.trendScore}
                  </span>
                )}
              </div>

              {spotlightVideo && (
                <>
                  <p className="text-gray-700 text-sm font-semibold line-clamp-1 mb-3">
                    {spotlightVideo.title}
                  </p>
                  <div className="space-y-2.5 mb-4">
                    {[
                      { label: "利润率", value: spotlightVideo.analysis.profitMargin.split("，")[0], textColor: "text-emerald-700", bgColor: "bg-emerald-50" },
                      { label: "竞争度", value: `${spotlightVideo.analysis.competitionLevel}竞争`, textColor: "text-amber-700", bgColor: "bg-amber-50" },
                      { label: "内容类型", value: spotlightVideo.content_type ?? "商家实拍", textColor: "text-violet-700", bgColor: "bg-violet-50" },
                    ].map(({ label, value, textColor, bgColor }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">{label}</span>
                        <span className={`text-xs font-semibold ${textColor} ${bgColor} px-2.5 py-0.5 rounded-full`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-gray-400 text-[10px]">爆款指数</span>
                      <span className="text-violet-600 text-[10px] font-bold">
                        {spotlightVideo.analysis.trendScore}/100
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(139,92,246,0.10)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${spotlightVideo.analysis.trendScore}%`,
                          background: "linear-gradient(90deg, #8B5CF6, #A78BFA)",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Floating sticker pills */}
            <div
              className="absolute top-2 right-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-md -rotate-2"
              style={{
                background: "rgba(250,204,21,0.15)",
                border: "1px solid rgba(250,204,21,0.35)",
                color: "#92400E",
              }}
            >
              🔥 高利润品类
            </div>
            <div
              className="absolute bottom-24 -left-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-md rotate-2"
              style={{
                background: "rgba(139,92,246,0.10)",
                border: "1px solid rgba(139,92,246,0.22)",
                color: "#5B21B6",
              }}
            >
              📊 每周分析更新
            </div>
            <div
              className="absolute bottom-10 right-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-md -rotate-1"
              style={{
                background: "rgba(16,185,129,0.10)",
                border: "1px solid rgba(16,185,129,0.22)",
                color: "#065F46",
              }}
            >
              ✦ 新手友好
            </div>
          </div>

        </div>
      </section>

      {/* ── Feature highlights ───────────────────── */}
      <section className="px-8 pb-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              emoji: "🔥",
              title: "爆款深度拆解",
              desc: "每期案例拆解爆红原因与内容规律，告诉你为什么它能爆，以及如何复制这个逻辑。",
              valColor: "text-violet-600",
              bg: "rgba(139,92,246,0.05)",
              border: "rgba(139,92,246,0.10)",
            },
            {
              emoji: "💰",
              title: "利润 & 市场数据",
              desc: "提供真实利润率区间、市场规模参考和竞争程度评估，帮你做出有依据的决策。",
              valColor: "text-amber-600",
              bg: "rgba(245,158,11,0.05)",
              border: "rgba(245,158,11,0.12)",
            },
            {
              emoji: "📋",
              title: "内容打法建议",
              desc: "每个品类对应具体内容方向和起号策略，有 AI 加持，新手也能快速复现。",
              valColor: "text-emerald-600",
              bg: "rgba(16,185,129,0.05)",
              border: "rgba(16,185,129,0.11)",
            },
          ].map(({ emoji, title, desc, valColor, bg, border }) => (
            <div
              key={title}
              className="rounded-2xl p-5"
              style={{
                background: "white",
                border: `1px solid ${border}`,
                boxShadow: "0 2px 16px rgba(139,92,246,0.05)",
              }}
            >
              <div className="text-2xl mb-3">{emoji}</div>
              <h3 className={`font-bold text-sm ${valColor} mb-2`}>{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Video grid ─────────────────────────────── */}
      {previewVideos.length > 0 && (
        <section className="px-8 pb-24 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 text-xl font-bold">本期精选爆款</h2>
              <p className="text-gray-400 text-sm mt-0.5">点击任意商品查看完整分析</p>
            </div>
            <Link
              href="/videos"
              className="flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 transition-colors font-medium"
            >
              全部 {totalVideos} 个 <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {previewVideos.map((video) => {
              const cs = {
                低: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200/60" },
                中: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200/60" },
                高: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200/60" },
              }[video.analysis.competitionLevel] ?? { text: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200/60" }

              return (
                <Link
                  key={video.id}
                  href={`/videos/${video.slug}`}
                  className="group relative rounded-2xl overflow-hidden h-72 transition-transform hover:-translate-y-1 duration-300"
                  style={{
                    boxShadow: "0 4px 20px rgba(139,92,246,0.09)",
                    border: "1px solid rgba(139,92,246,0.08)",
                  }}
                >
                  {video.coverImage ? (
                    <Image
                      src={video.coverImage}
                      alt={video.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-300"
                      sizes="(max-width: 1280px) 33vw, 400px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-purple-50 to-amber-50" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Score badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm"
                      style={{ background: "rgba(254,243,199,0.92)", color: "#92400E", border: "1px solid rgba(245,158,11,0.25)" }}
                    >
                      <Flame size={10} /> {video.analysis.trendScore}
                    </span>
                  </div>

                  {/* Content type */}
                  {video.content_type && (
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm"
                        style={{ background: "rgba(255,255,255,0.88)", color: "#5B21B6", border: "1px solid rgba(139,92,246,0.18)" }}
                      >
                        {video.content_type}
                      </span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white/55 text-[11px] mb-1.5 block">{video.category}</span>
                    <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-3">
                      {video.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-300 font-medium">
                        {video.analysis.profitMargin.split("，")[0]}
                      </span>
                      <span className={`font-medium px-1.5 py-0.5 rounded-full text-[10px] border ${cs.text} ${cs.bg} ${cs.border}`}>
                        {video.analysis.competitionLevel}竞争
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
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-semibold btn-outline-glass"
            >
              查看全部爆款分析 <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
