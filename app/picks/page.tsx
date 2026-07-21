import PicksApp from '@/components/picks/PicksApp'
import { getAllVideos, type VideoProduct } from '@/lib/db'
import type { Pick, PickType } from '@/lib/mock-picks'

export const metadata = {
  title: '今日趋势',
  description: '来自创作者、商家与 AI 内容，关注近期正在发生的变化。',
}

function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return String(value || 0)
}

function normalizeType(value: string | null): PickType {
  if (value === 'creator' || value === '达人') return '达人'
  if (value === 'ai' || value === 'AI') return 'AI'
  return '商家'
}

function toPick(video: VideoProduct, index: number): Pick {
  const growth = Number.parseFloat(video.views24h.replace(/[^\d.-]/g, '')) || 0
  return {
    id: video.id,
    rank: index + 1,
    type: normalizeType(video.content_type),
    title: video.shortDescription || video.title,
    product: video.productName || video.title,
    author: video.account || '来源待补充',
    thumbnail: video.coverImage,
    views: formatCount(video.viewCount),
    growth,
    likes: formatCount(video.likeCount),
    estimatedGMV: video.estimatedGMV || '待评估',
    hook: video.punchline || video.shortDescription,
    reasons: video.analysis.whyViral.length > 0 ? video.analysis.whyViral : ['等待补充爆款分析'],
    isFavorite: false,
    videoUrl: video.video_file_url || video.videoUrl,
  }
}

export const dynamic = 'force-dynamic'

type Props = {
  searchParams: Promise<{ view?: string }>
}

export default async function PicksPage({ searchParams }: Props) {
  const [videos, params] = await Promise.all([getAllVideos(), searchParams])
  return <PicksApp initialPicks={videos.map(toPick)} initialFavoriteMode={params.view === 'favorites'} />
}
