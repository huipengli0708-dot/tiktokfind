import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getVideoById } from "@/lib/db"
import { updateVideoAction } from "@/app/admin/actions"
import VideoFormFields, { type FormDefaults } from "@/app/admin/_components/VideoFormFields"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditVideoPage({ params }: Props) {
  const { id } = await params
  const video = await getVideoById(id)
  if (!video) notFound()

  // 从 analysis JSONB 提取子字段，供表单回显
  const a = (video.analysis ?? {}) as Record<string, unknown>
  const defaults: FormDefaults = {
    title: video.title,
    slug: video.slug,
    video_url: video.video_url,
    cover_image: video.cover_image,
    category: video.category,
    tags: video.tags,
    short_description: video.short_description,
    profit_note: video.profit_note,
    recommendation_score: video.recommendation_score,
    content_type: video.content_type,
    is_published: video.is_published,
    is_featured: video.is_featured,
    target_audience: video.target_audience,
    content_strategy: video.content_strategy,
    risk_notes: video.risk_notes,
    // analysis 子字段
    punchline: a.punchline as string | undefined,
    whyViral: a.whyViral as string[] | undefined,
    marketSize: a.marketSize as string | undefined,
    competitionLevel: a.competitionLevel as string | undefined,
    trendScore: a.trendScore as number | undefined,
    roi: a.roi as string | undefined,
    beginnerFriendly: a.beginnerFriendly as boolean | undefined,
    shouldDo: a.shouldDo as boolean | undefined,
    targetSeller: a.targetSeller as string | undefined,
    contentApproach: a.contentApproach as string | undefined,
    riskLevel: a.riskLevel as string | undefined,
    viewCount: a.viewCount as number | undefined,
    likeCount: a.likeCount as number | undefined,
  }

  return (
    <div className="page-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 relative z-10">

        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/videos"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={14} /> 返回列表
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-bold text-gray-900 line-clamp-1">编辑：{video.title}</h1>
        </div>

        <form action={updateVideoAction} className="space-y-5">
          {/* 传递 ID 给 server action */}
          <input type="hidden" name="id" value={id} />

          <VideoFormFields defaults={defaults} />

          <div className="flex items-center gap-3 justify-end pt-2 pb-8">
            <Link href="/admin/videos" className="px-5 py-2.5 rounded-xl text-sm font-medium btn-outline-glass">
              取消
            </Link>
            <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-semibold btn-gradient">
              保存更改
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
