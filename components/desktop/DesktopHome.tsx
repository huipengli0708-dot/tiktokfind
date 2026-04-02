import Link from "next/link"
import { TrendingUp, ExternalLink } from "lucide-react"
import DesktopSidebar from "./DesktopSidebar"
import DesktopStats from "./DesktopStats"
import DesktopVideoTable from "./DesktopVideoTable"
import type { VideoProduct } from "@/lib/mock-data"

interface Props {
  featuredVideos: VideoProduct[]
  allVideos: VideoProduct[]
}

export default function DesktopHome({ featuredVideos, allVideos }: Props) {
  const totalVideos = allVideos.length
  const featuredCount = featuredVideos.length
  const avgScore =
    allVideos.length > 0
      ? Math.round(
          allVideos.reduce((s, v) => s + v.analysis.trendScore, 0) / allVideos.length
        )
      : 0
  const categories = new Set(allVideos.map((v) => v.category)).size

  return (
    <div className="flex min-h-screen app-bg">
      {/* Fixed sidebar */}
      <DesktopSidebar />

      {/* Main content — offset by sidebar width (w-64 = 256px) */}
      <main className="ml-64 flex-1 min-h-screen p-8 overflow-y-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">数据总览</h1>
            <p className="text-white/40 text-sm">
              实时同步 TikTok 爆款研究数据 · 每分钟刷新
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/60 bg-white/[0.06] border border-white/[0.09] hover:text-white/80 hover:bg-white/[0.09] transition-all"
            >
              <ExternalLink size={14} />
              浏览视频库
            </Link>
            <Link
              href="/admin/videos"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition-all shadow-[0_4px_16px_rgba(139,92,246,0.3)]"
            >
              <TrendingUp size={14} />
              后台管理
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <DesktopStats stats={{ totalVideos, featuredCount, avgScore, categories }} />

        {/* Video table */}
        <DesktopVideoTable videos={allVideos} />

        {/* Footer */}
        <div className="mt-8 text-center text-white/20 text-xs pb-4">
          tiktokfind.com · 阿光选品
        </div>
      </main>
    </div>
  )
}
