import Image from "next/image"
import Link from "next/link"
import { Eye, Heart, TrendingUp, ArrowRight, Zap } from "lucide-react"
import { VideoProduct, formatViewCount } from "@/lib/mock-data"
import { getContentTypeLabel } from "@/lib/content-types"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: VideoProduct
  variant?: "default" | "featured"
}

export default function VideoCard({ video, variant = "default" }: VideoCardProps) {
  const isFeatured = variant === "featured"

  return (
    <Link href={`/videos/${video.slug}`} className="block group">
      <article
        className={cn(
          "glass-card glass-card-hover rounded-2xl overflow-hidden",
          isFeatured && "rounded-3xl"
        )}
      >
        {/* 封面图 — 9:16 竖版比例 */}
        <div className="relative aspect-[9/16] overflow-hidden">
          {video.coverImage ? (
            <Image
              src={video.coverImage}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] border-l-indigo-400 ml-1" />
              </div>
              <span className="text-[11px] text-gray-400">暂无封面</span>
            </div>
          )}
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* 内容类型标签 */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white bg-black/30 backdrop-blur-md border border-white/20">
              {getContentTypeLabel(video.content_type)}
            </span>
          </div>

          {/* 趋势评分角标 */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500/90 to-purple-500/90 backdrop-blur-md">
              <TrendingUp size={10} className="text-white" />
              <span className="text-[11px] font-bold text-white">{video.analysis.trendScore}</span>
            </div>
          </div>

          {/* 底部数据 + ROI */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-white/90 text-xs">
                <Eye size={11} />
                {formatViewCount(video.viewCount)}
              </span>
              <span className="flex items-center gap-1 text-white/90 text-xs">
                <Heart size={11} />
                {formatViewCount(video.likeCount)}
              </span>
            </div>
            {/* ROI 标签 */}
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-bold">
              <Zap size={9} />
              {video.roi}
            </span>
          </div>
        </div>

        {/* 内容区 */}
        <div className="p-2.5 sm:p-4">
          {/* 标签行：新手友好 + 原标签 — 仅桌面显示 */}
          <div className="hidden sm:flex flex-wrap gap-1.5 mb-2.5">
            {video.beginnerFriendly && (
              <span className="tag-pill-beginner">✦ 新手友好</span>
            )}
            {video.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>

          {/* 标题 */}
          <h3 className={cn(
            "font-semibold text-gray-800 leading-snug mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2",
            isFeatured ? "text-base" : "text-[13px] sm:text-[14px]"
          )}>
            {video.title}
          </h3>

          {/* 爆点结论 — 仅桌面显示 */}
          <p className="hidden sm:block text-xs font-medium text-indigo-700/80 bg-indigo-50/70 border border-indigo-100/60 rounded-lg px-3 py-1.5 leading-relaxed mb-3">
            💡 {video.punchline}
          </p>

          {/* 底部行 */}
          <div className="flex items-center justify-between mt-1">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[11px] text-gray-400">利润率</span>
              <span className="text-[11px] font-semibold text-emerald-600">
                {video.analysis.profitMargin}
              </span>
            </div>
            <span className="flex items-center gap-0.5 text-indigo-600 text-[11px] sm:text-xs font-medium group-hover:gap-1.5 transition-all sm:ml-auto">
              查看 <ArrowRight size={10} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
