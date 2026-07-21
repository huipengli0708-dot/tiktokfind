import { supabase } from './supabase'

/* ============ 类型 ============ */

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
  analysis: Record<string, unknown> | string | null
  target_audience: string[] | null
  content_strategy: string[] | null
  risk_notes: string[] | null
  profit_note: string | null
  recommendation_score: number | null
  content_type: string | null
  video_source_type: string | null
  video_file_url: string | null
  is_published: boolean
  is_featured: boolean
  sort_order: number | null
  created_at?: string
}

/** 前端使用的视频数据结构 */
export type VideoProduct = {
  id: string
  title: string
  slug: string
  coverImage: string
  videoUrl: string
  category: string
  tags: string[]
  shortDescription: string
  punchline: string
  roi: string
  beginnerFriendly: boolean
  analysis: {
    whyViral: string[]
    marketSize: string
    competitionLevel: '低' | '中' | '高'
    profitMargin: string
    trendScore: number
  }
  verdict: {
    recommendation: number
    shouldDo: boolean
    targetSeller: string
    contentApproach: string
    riskLevel: '低' | '中' | '高'
  }
  targetAudience: string[]
  contentStrategy: string[]
  riskNotes: string[]
  content_type: string | null
  video_source_type: string | null
  video_file_url: string | null
  isFeatured: boolean
  viewCount: number
  likeCount: number
  publishedAt: string
  /* —— 以下为可选展示字段（存在 analysis JSONB 里，缺省隐藏）—— */
  account: string
  views24h: string
  commentCount: number
  productName: string
  productPrice: string
  productImage: string
  estimatedGMV: string
}

/** 与 Supabase public.products 表字段一一对应 */
export type DbProduct = {
  id: string
  title: string
  cover_image: string
  category: string
  price: string
  source: string
  source_url: string
  sales_data: Record<string, unknown> | null
  supplier_url: string
  note: string
  tags: string[]
  is_published: boolean
  sort_order: number | null
  created_at?: string
}

/* ============ 视频 ============ */

export function parseVideoAnalysis(value: DbVideo['analysis']): Record<string, unknown> {
  if (!value) return {}
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {}
    } catch {
      return {}
    }
  }
  return value
}

function mapDbVideo(row: DbVideo): VideoProduct {
  const a = parseVideoAnalysis(row.analysis)

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
    video_source_type: row.video_source_type ?? null,
    video_file_url: row.video_file_url ?? null,
    isFeatured: row.is_featured,
    viewCount: (a.viewCount as number) ?? 0,
    likeCount: (a.likeCount as number) ?? 0,
    publishedAt: row.created_at ?? '',
    account: (a.account as string) ?? '',
    views24h: (a.views24h as string) ?? '',
    commentCount: (a.commentCount as number) ?? 0,
    productName: (a.productName as string) ?? '',
    productPrice: (a.productPrice as string) ?? '',
    productImage: (a.productImage as string) ?? '',
    estimatedGMV: (a.estimatedGMV as string) ?? '',
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

export async function getVideosByIds(ids: string[]): Promise<VideoProduct[]> {
  if (ids.length === 0) return []
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .in('id', ids)

  if (error) {
    console.error('[db] getVideosByIds error:', error.message)
    return []
  }
  return (data as DbVideo[]).map(mapDbVideo)
}

/* ============ 新品 ============ */

export async function getAllProducts(): Promise<DbProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[db] getAllProducts error:', error.message)
    return []
  }
  return data as DbProduct[]
}

export async function getProductById(id: string): Promise<DbProduct | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[db] getProductById error:', error.message)
    return null
  }
  return data as DbProduct
}

export async function getProductsByIds(ids: string[]): Promise<DbProduct[]> {
  if (ids.length === 0) return []
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ids)

  if (error) {
    console.error('[db] getProductsByIds error:', error.message)
    return []
  }
  return data as DbProduct[]
}

/* ============ 后台：视频 ============ */

export async function getAllVideosAdmin(): Promise<DbVideo[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('id, title, category, content_type, video_source_type, video_file_url, is_published, is_featured, created_at, slug')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[db] getAllVideosAdmin error:', error.message)
    return []
  }
  return data as DbVideo[]
}

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

export async function insertVideo(payload: InsertVideoPayload): Promise<{ id: string | null; error: string | null }> {
  const { data, error } = await supabase.from('videos').insert(payload).select('id').single()
  return { id: (data as { id: string } | null)?.id ?? null, error: error?.message ?? null }
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

/* ============ 后台：新品 ============ */

export async function getAllProductsAdmin(): Promise<DbProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[db] getAllProductsAdmin error:', error.message)
    return []
  }
  return data as DbProduct[]
}

export type InsertProductPayload = Omit<DbProduct, 'id' | 'created_at'>

export async function insertProduct(payload: InsertProductPayload): Promise<{ id: string | null; error: string | null }> {
  const { data, error } = await supabase.from('products').insert(payload).select('id').single()
  return { id: (data as { id: string } | null)?.id ?? null, error: error?.message ?? null }
}

export async function insertProducts(payloads: InsertProductPayload[]): Promise<{ count: number; error: string | null }> {
  const { data, error } = await supabase.from('products').insert(payloads).select('id')
  return { count: data?.length ?? 0, error: error?.message ?? null }
}

export async function updateProduct(
  id: string,
  payload: Partial<InsertProductPayload>
): Promise<{ error: string | null }> {
  const { error } = await supabase.from('products').update(payload).eq('id', id)
  return { error: error?.message ?? null }
}

export async function deleteProduct(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('products').delete().eq('id', id)
  return { error: error?.message ?? null }
}
