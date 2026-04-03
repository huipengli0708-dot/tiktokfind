import Link from "next/link"
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
      {/* Top header */}
      <header className="flex items-center justify-between px-5 pt-12 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-tight">阿光选品</span>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        </div>
        <Link
          href="/videos"
          className="text-xs text-white/40 hover:text-white/65 transition-colors"
        >
          全部 {allVideos.length} 个爆款 →
        </Link>
      </header>

      {/* Featured videos — swipeable banner */}
      <BannerCarousel videos={bannerVideos} />

      {/* Content feed — the main product */}
      <HomeFeed videos={allVideos} />
    </div>
  )
}
