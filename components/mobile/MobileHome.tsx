import Link from "next/link"
import { Sparkles, TrendingUp } from "lucide-react"
import BannerCarousel from "@/components/BannerCarousel"
import HomeFeed from "@/components/HomeFeed"
import type { VideoProduct } from "@/lib/mock-data"

interface Props {
  featuredVideos: VideoProduct[]
  allVideos: VideoProduct[]
}

export default function MobileHome({ featuredVideos, allVideos }: Props) {
  const bannerVideos = featuredVideos.length ? featuredVideos : allVideos
  const spotlightVideo = featuredVideos[0] ?? allVideos[0]

  return (
    <div className="app-bg min-h-screen pb-24">

      {/* ── Header ──────────────────────────────── */}
      <div className="relative overflow-hidden pt-12 pb-4 px-5">
        {/* Dot grid texture */}
        <div className="absolute inset-0 dot-pattern-sm pointer-events-none" style={{ opacity: 0.45 }} />

        {/* Background glows */}
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-[90px] pointer-events-none" style={{ background: "rgba(167,139,250,0.28)" }} />
        <div className="absolute top-8 -left-10 w-40 h-40 rounded-full blur-[70px] pointer-events-none" style={{ background: "rgba(250,204,21,0.22)" }} />
        <div className="absolute bottom-0 right-1/3 w-32 h-32 rounded-full blur-[60px] pointer-events-none" style={{ background: "rgba(232,121,249,0.14)" }} />

        {/* Sparkle chars */}
        <span className="absolute top-10 right-14 text-violet-300 text-lg select-none pointer-events-none" style={{ opacity: 0.60 }}>✦</span>
        <span className="absolute top-20 left-[54%] text-amber-300 text-base select-none pointer-events-none" style={{ opacity: 0.50 }}>⋆</span>
        <span className="absolute bottom-4 right-10 text-purple-300 text-sm select-none pointer-events-none" style={{ opacity: 0.40 }}>✧</span>

        <div className="relative">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-[10px] font-semibold"
            style={{ background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.22)", color: "#6D28D9", boxShadow: "0 2px 10px rgba(139,92,246,0.12)" }}
          >
            <span className="w-1 h-1 rounded-full bg-violet-500 animate-pulse" />
            <Sparkles size={9} />
            TikTok 爆款研究站
          </div>

          <div className="flex items-end justify-between mb-4">
            <div>
              <h1 className="font-bold text-2xl tracking-tight leading-tight">
                <span style={{ background: "linear-gradient(135deg, #6D28D9 0%, #A78BFA 60%, #E879F9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  阿光选品
                </span>
              </h1>
              <p className="text-gray-400 text-xs mt-0.5">发现高利润 TikTok 爆款</p>
            </div>
            <Link href="/videos" className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors pb-0.5">
              全部 {allVideos.length} 个 →
            </Link>
          </div>

          {/* Stat pills */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.20)", color: "#5B21B6" }}>
              🔥 {allVideos.length}+ 爆款
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(250,204,21,0.14)", border: "1px solid rgba(250,204,21,0.30)", color: "#92400E" }}>
              💰 高利润分析
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.20)", color: "#065F46" }}>
              📋 内容打法
            </div>
          </div>

          {/* ── Mini spotlight widget ── */}
          {spotlightVideo && (
            <div
              className="relative rounded-2xl p-3.5 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.90)",
                border: "1.5px solid rgba(139,92,246,0.14)",
                boxShadow: "0 8px 28px rgba(139,92,246,0.14), 0 2px 8px rgba(0,0,0,0.05)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* "本周推荐" header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)" }}
                  >
                    <TrendingUp size={11} className="text-white" />
                  </div>
                  <span className="text-gray-700 text-[11px] font-bold">本周精选爆款</span>
                </div>
                {/* Score badge */}
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #FBBF24, #F59E0B)",
                    color: "white",
                    boxShadow: "0 3px 0 rgba(161,72,0,0.30), 0 5px 14px rgba(245,158,11,0.35)",
                  }}
                >
                  🔥 {spotlightVideo.analysis.trendScore}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Product emoji */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
                    boxShadow: "0 3px 10px rgba(139,92,246,0.20)",
                  }}
                >
                  🛍️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 text-xs font-semibold line-clamp-1 mb-1.5">{spotlightVideo.title}</p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: "rgba(16,185,129,0.10)", color: "#065F46", border: "1px solid rgba(16,185,129,0.20)" }}
                    >
                      {spotlightVideo.analysis.profitMargin.split("，")[0]}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: "rgba(139,92,246,0.08)", color: "#5B21B6", border: "1px solid rgba(139,92,246,0.16)" }}
                    >
                      {spotlightVideo.category}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/videos/${spotlightVideo.slug}`}
                  className="shrink-0 text-violet-600 text-lg"
                >
                  →
                </Link>
              </div>

              {/* 3D sticker pills overlapping the widget */}
              <div
                className="absolute -top-3 -right-2"
                style={{
                  background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
                  border: "2px solid rgba(251,191,36,0.50)",
                  boxShadow: "0 4px 0 rgba(161,98,7,0.25), 0 8px 16px rgba(251,191,36,0.28)",
                  borderRadius: "999px",
                  padding: "5px 11px",
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#78350F",
                  transform: "rotate(5deg)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                💰 高利润
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured videos — swipeable banner */}
      <BannerCarousel videos={bannerVideos} />

      {/* Content feed */}
      <HomeFeed videos={allVideos} />
    </div>
  )
}
