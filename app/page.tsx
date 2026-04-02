import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { getFeaturedVideos, getAllVideos } from "@/lib/db"
import BannerCarousel from "@/components/BannerCarousel"
import HomeFeed from "@/components/HomeFeed"

export const revalidate = 60

export default async function HomePage() {
  const [featuredVideos, allVideos] = await Promise.all([
    getFeaturedVideos(),
    getAllVideos(),
  ])

  const bannerVideos = featuredVideos.length ? featuredVideos : allVideos

  return (
    <div className="app-bg min-h-screen pb-24">
      {/* ── Top header ── */}
      <header className="flex items-center justify-between px-5 pt-12 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-tight">首页</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        </div>
        <Link
          href="/videos"
          className="flex items-center gap-1.5 text-xs text-white/45 hover:text-white/70 transition-colors"
        >
          <TrendingUp size={13} />
          <span>{allVideos.length} 个爆款</span>
        </Link>
      </header>

      {/* ── Banner carousel ── */}
      <BannerCarousel videos={bannerVideos} />

      {/* ── 2-col feature cards ── */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1 - 商家实拍 */}
          <Link
            href="/videos"
            className="app-card-purple rounded-2xl p-4 min-h-[100px] relative overflow-hidden active:scale-[0.97] transition-transform"
          >
            <p className="text-white font-bold text-sm mb-1">商家实拍</p>
            <p className="text-white/55 text-[11px] leading-relaxed">真实商品展示，最高转化率</p>
            <div className="absolute right-3 bottom-3 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-base">
              🎥
            </div>
          </Link>

          {/* Card 2 - 达人带货 */}
          <Link
            href="/videos"
            className="app-card-teal rounded-2xl p-4 min-h-[100px] relative overflow-hidden active:scale-[0.97] transition-transform"
          >
            <p className="text-white font-bold text-sm mb-1">达人带货</p>
            <p className="text-white/55 text-[11px] leading-relaxed">KOL 合作爆款打法</p>
            <div className="absolute right-3 bottom-3 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-base">
              ⭐
            </div>
          </Link>

          {/* Card 3 - AI内容 */}
          <Link
            href="/videos"
            className="app-card-dark rounded-2xl p-4 min-h-[88px] relative overflow-hidden active:scale-[0.97] transition-transform"
          >
            <p className="text-white font-bold text-sm mb-1">AI 内容</p>
            <p className="text-white/45 text-[11px]">AI 生成爆款</p>
            <div className="absolute right-3 bottom-3 text-base">🤖</div>
          </Link>

          {/* Card 4 - 选品工具 */}
          <Link
            href="/tool"
            className="app-card-dark rounded-2xl p-4 min-h-[88px] relative overflow-hidden active:scale-[0.97] transition-transform"
          >
            <p className="text-white font-bold text-sm mb-1">选品工具</p>
            <p className="text-white/45 text-[11px]">系统化选品</p>
            <div className="absolute right-3 bottom-3 text-base">⚡</div>
          </Link>
        </div>
      </div>

      {/* ── Feed section ── */}
      <HomeFeed videos={allVideos} />
    </div>
  )
}
