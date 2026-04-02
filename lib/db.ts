import { supabase } from './supabase'
import type { VideoProduct } from './mock-data'

/** 与 Supabase public.videos 表字段一一对应 */
export type DbVideo = {
  id: string
  title: string
  slug: string
  video_url: string | null
  cover_image: string
  category: string
  tags: string[]
  short_description: string
  /** JSONB：存放 whyViral / marketSize / competitionLevel 等分析字段，也可存 punchline/roi 等扩展字段 */
  analysis: Record<string, unknown> | null
  target_audience: string[] | null
  content_strategy: string[] | null
  risk_notes: string[] | null
  profit_note: string | null
  recommendation_score: number | null
  content_type: string | null
  is_published: boolean
  is_featured: boolean
  sort_order: number | null
  created_at?: string
}

function mapDbVideo(row: DbVideo): VideoProduct {
  const a = (row.analysis ?? {}) as Record<string, unknown>

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    coverImage: row.cover_image,
    videoUrl: row.video_url ?? '',
    category: row.category,
    tags: Array.isArray(row.tags) ? row.tags : [],
    shortDescription: row.short_description,
    punchline: (a.punchline as string) ?? '',
    roi: (a.roi as string) ?? '',
    beginnerFriendly: (a.beginnerFriendly as boolean) ?? false,
    analysis: {
      whyViral: (a.whyViral as string[]) ?? [],
      marketSize: (a.marketSize as string) ?? '',
      competitionLevel: (a.competitionLevel as '低' | '中' | '高') ?? '中',
      profitMargin: (a.profitMargin as string) ?? row.profit_note ?? '',
      trendScore: (a.trendScore as number) ?? row.recommendation_score ?? 0,
    },
    verdict: {
      recommendation: row.recommendation_score ?? (a.trendScore as number) ?? 0,
      shouldDo: (a.shouldDo as boolean) ?? true,
      targetSeller: (a.targetSeller as string) ?? '',
      contentApproach: (a.contentApproach as string) ?? '',
      riskLevel: (a.riskLevel as '低' | '中' | '高') ?? '中',
    },
    targetAudience: Array.isArray(row.target_audience) ? row.target_audience : [],
    contentStrategy: Array.isArray(row.content_strategy) ? row.content_strategy : [],
    riskNotes: Array.isArray(row.risk_notes) ? row.risk_notes : [],
    content_type: row.content_type ?? null,
    isFeatured: row.is_featured,
    viewCount: (a.viewCount as number) ?? 0,
    likeCount: (a.likeCount as number) ?? 0,
    publishedAt: row.created_at ?? '',
  }
}

export async function getFeaturedVideos(): Promise<VideoProduct[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('is_featured', true)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[db] getFeaturedVideos error:', error.message)
    return []
  }
  return (data as DbVideo[]).map(mapDbVideo)
}

export async function getAllVideos(): Promise<VideoProduct[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[db] getAllVideos error:', error.message)
    return []
  }
  return (data as DbVideo[]).map(mapDbVideo)
}

export async function getVideoBySlug(slug: string): Promise<VideoProduct | null> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('[db] getVideoBySlug error:', error.message)
    return null
  }
  return mapDbVideo(data as DbVideo)
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('slug')
    .eq('is_published', true)

  if (error) {
    console.error('[db] getAllSlugs error:', error.message)
    return []
  }
  return (data as { slug: string }[]).map((r) => r.slug)
}

/** 后台用：返回所有视频（含未发布），按创建时间倒序 */
export async function getAllVideosAdmin(): Promise<DbVideo[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('id, title, category, is_published, is_featured, created_at, slug')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[db] getAllVideosAdmin error:', error.message)
    return []
  }
  return data as DbVideo[]
}

/** 后台用：按 ID 获取单条完整视频数据 */
export async function getVideoById(id: string): Promise<DbVideo | null> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[db] getVideoById error:', error.message)
    return null
  }
  return data as DbVideo
}

export type InsertVideoPayload = Omit<DbVideo, 'id' | 'created_at'>

export async function insertVideo(payload: InsertVideoPayload): Promise<{ error: string | null }> {
  const { error } = await supabase.from('videos').insert(payload)
  return { error: error?.message ?? null }
}

export async function updateVideo(
  id: string,
  payload: Partial<InsertVideoPayload>
): Promise<{ error: string | null }> {
  const { error } = await supabase.from('videos').update(payload).eq('id', id)
  return { error: error?.message ?? null }
}

export async function deleteVideo(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('videos').delete().eq('id', id)
  return { error: error?.message ?? null }
}
