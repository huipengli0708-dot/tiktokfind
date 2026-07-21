import Link from 'next/link'
import Image from 'next/image'
import { Play, MessageCircle, Heart, ExternalLink, BarChart3 } from 'lucide-react'
import type { VideoProduct } from '@/lib/db'
import { getContentTypeLabel, CONTENT_TYPE_COLORS } from '@/lib/content-types'
import FavoriteButton from './FavoriteButton'

function fmt(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(n >= 100000 ? 0 : 1) + '万'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return String(n)
}

type Props = {
  video: VideoProduct
  rank?: number
}

/** 深色主题视频卡片：封面 3:4 + 排名/类型角标 + 数据 + 商品 + 爆款理由 + 操作区 */
export default function VideoCard({ video, rank }: Props) {
  const typeColor = CONTENT_TYPE_COLORS[video.content_type ?? 'merchant'] ?? CONTENT_TYPE_COLORS.merchant

  return (
    <div className="card-dark card-dark-hover flex flex-col overflow-hidden">
      {/* 封面区 */}
      <Link href={`/videos/${video.slug}`} className="relative block aspect-[3/4] w-full overflow-hidden bg-[#0B0E15]">
        {video.coverImage && (
          <Image
            src={video.coverImage}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(min-width: 1280px) 300px, 50vw"
          />
        )}

        {/* 排名 + 24h 播放 */}
        {rank != null && (
          <div className="absolute left-0 top-0 rounded-br-2xl bg-black/75 px-3 py-2 backdrop-blur-sm">
            <p className="text-lg font-black leading-none text-white">#{rank}</p>
            {video.views24h && (
              <p className="mt-1 text-[11px] font-medium leading-none text-gray-300">24h +{video.views24h}</p>
            )}
          </div>
        )}

        {/* 类型角标 */}
        <span className={`absolute right-2 top-2 rounded-md px-2 py-1 text-[11px] font-bold text-white ${typeColor.badge}`}>
          {getContentTypeLabel(video.content_type)}
        </span>

        {/* 数据浮层 */}
        {(video.viewCount > 0 || video.likeCount > 0) && (
          <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1 rounded-lg bg-black/65 px-2.5 py-2 text-[11px] font-semibold text-white backdrop-blur-sm">
            {video.viewCount > 0 && (
              <span className="flex items-center gap-1"><Play size={11} /> {fmt(video.viewCount)}</span>
            )}
            {video.commentCount > 0 && (
              <span className="flex items-center gap-1"><MessageCircle size={11} /> {fmt(video.commentCount)}</span>
            )}
            {video.likeCount > 0 && (
              <span className="flex items-center gap-1"><Heart size={11} /> {fmt(video.likeCount)}</span>
            )}
          </div>
        )}
      </Link>

      {/* 信息区 */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* 账号行 / 标题 */}
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-white">
            {video.account ? `@${video.account.replace(/^@/, '')}` : video.title}
          </p>
          <span className="shrink-0 text-xs text-gray-500">{video.category}</span>
        </div>

        {/* 商品行 */}
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#0B0E15]">
            {(video.productImage || video.coverImage) && (
              <Image
                src={video.productImage || video.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="44px"
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-gray-200">
              {video.productName || video.title}
            </p>
            {video.productPrice && (
              <p className="text-[13px] font-bold text-[#7CB1FF]">{video.productPrice}</p>
            )}
          </div>
        </div>

        {/* 爆款理由 */}
        {video.punchline && (
          <div>
            <p className="text-xs font-bold text-gray-400">爆款理由</p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-gray-300">{video.punchline}</p>
          </div>
        )}

        {/* 操作区 */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link
            href={`/videos/${video.slug}`}
            className="btn-blue flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-[13px]"
          >
            <BarChart3 size={14} /> 查看分析
          </Link>
          {video.videoUrl && (
            <a
              href={video.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-dark-outline flex items-center justify-center gap-1.5 px-3 py-2 text-[13px]"
            >
              原视频 <ExternalLink size={13} />
            </a>
          )}
          <FavoriteButton targetType="video" targetId={video.id} dark />
        </div>
      </div>
    </div>
  )
}
