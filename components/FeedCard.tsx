import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Flame } from "lucide-react"
import type { VideoProduct } from "@/lib/mock-data"

export default function FeedCard({ video }: { video: VideoProduct }) {
  const score = video.analysis.trendScore
  const competition = video.analysis.competitionLevel

  const competitionColor = {
    低: "text-emerald-600",
    中: "text-amber-600",
    高: "text-rose-500",
  }[competition] ?? "text-gray-400"

  return (
    <Link
      href={`/videos/${video.slug}`}
      className="flex items-center gap-3 p-3 rounded-2xl app-feed-card active:scale-[0.97] transition-transform"
    >
      {/* Thumbnail */}
      <div className="relative w-[60px] h-[60px] rounded-xl overflow-hidden shrink-0">
        <Image src={video.coverImage} alt={video.title} fill className="object-cover" />
        {video.isFeatured && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Flame size={14} className="text-amber-400" />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-sm font-semibold line-clamp-1 mb-1">
          {video.title}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-400 text-[11px]">{video.category}</span>
          {video.content_type && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-600 border border-violet-200/60">
              {video.content_type}
            </span>
          )}
          <span className={`text-[10px] font-medium ${competitionColor}`}>
            竞争{competition}
          </span>
        </div>
      </div>

      {/* Score + Arrow */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="text-right">
          <div className="flex items-center gap-0.5 text-amber-400 justify-end">
            <Flame size={11} />
            <span className="text-xs font-bold">{score}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">
            {video.analysis.profitMargin.split("，")[0]}
          </span>
        </div>
        <ChevronRight size={14} className="text-gray-300" />
      </div>
    </Link>
  )
}
