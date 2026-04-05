import Link from "next/link"
import { Sparkles } from "lucide-react"
import BannerCarousel from "@/components/BannerCarousel"
import HomeFeed from "@/components/HomeFeed"
import type { VideoProduct } from "@/lib/mock-data"

interface Props {
  featuredVideos: VideoProduct[]
  allVideos: VideoProduct[]
}

export default function MobileHome({ featuredVideos, allVideos }: Props) {
  const bannerVideos = featuredVideos.length ? featuredVideos : allVideos

  return (
    <div className="app-bg min-h-screen pb-24">

      {/* ── Header ────────────────────────────── */}
      <div className="relative overflow-hidden pt-12 pb-5 px-5">
        {/* Soft background glows */}
        <div
          className="absolute top-0 right-0 w-52 h-52 rounded-full blur-[90px] pointer-events-none"
          style={{ background: "rgba(167,139,250,0.22)" }}
        />
        <div
          className="absolute top-6 -left-8 w-36 h-36 rounded-full blur-[70px] pointer-events-none"
          style={{ background: "rgba(250,204,21,0.18)" }}
        />

        <div className="relative">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-[10px] font-semibold"
            style={{
              background: "rgba(139,92,246,0.10)",
              border: "1px solid rgba(139,92,246,0.20)",
              color: "#6D28D9",
            }}
          >
            <Sparkles size={9} />
            TikTok 爆款研究站
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-gray-900 font-bold text-2xl tracking-tight leading-tight">
                阿光选品
              </h1>
              <p className="text-gray-400 text-xs mt-0.5">发现高利润 TikTok 爆款</p>
            </div>
            <Link
              href="/videos"
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors pb-0.5"
            >
              全部 {allVideos.length} 个 →
            </Link>
          </div>

          {/* Quick stat pills */}
          <div className="flex items-center gap-2 mt-4">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
              style={{
                background: "rgba(139,92,246,0.09)",
                border: "1px solid rgba(139,92,246,0.16)",
                color: "#5B21B6",
              }}
            >
              🔥 {allVideos.length}+ 爆款
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
              style={{
                background: "rgba(250,204,21,0.12)",
                border: "1px solid rgba(250,204,21,0.28)",
                color: "#92400E",
              }}
            >
              💰 高利润分析
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
              style={{
                background: "rgba(16,185,129,0.09)",
                border: "1px solid rgba(16,185,129,0.18)",
                color: "#065F46",
              }}
            >
              📋 内容打法
            </div>
          </div>
        </div>
      </div>

      {/* Featured videos — swipeable banner */}
      <BannerCarousel videos={bannerVideos} />

      {/* Content feed — the main product */}
      <HomeFeed videos={allVideos} />
    </div>
  )
}
