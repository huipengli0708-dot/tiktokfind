'use client'

import { supabase } from './supabase'

export type FavoriteTargetType = 'video' | 'product'

export type Favorite = {
  id: string
  target_type: FavoriteTargetType
  target_id: string
  created_at: string
}

/** 当前登录用户，未登录返回 null */
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser()
  return data.user ?? null
}

/** 获取当前用户全部收藏 */
export async function getMyFavorites(): Promise<Favorite[]> {
  const user = await getCurrentUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('favorites')
    .select('id, target_type, target_id, created_at')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[favorites] get error:', error.message)
    return []
  }
  return data as Favorite[]
}

/** 是否已收藏 */
export async function isFavorited(targetType: FavoriteTargetType, targetId: string): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('target_type', targetType)
    .eq('target_id', targetId)
    .maybeSingle()
  return !!data
}

/** 切换收藏，返回切换后的状态；未登录返回 null */
export async function toggleFavorite(
  targetType: FavoriteTargetType,
  targetId: string
): Promise<boolean | null> {
  const user = await getCurrentUser()
  if (!user) return null

  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('target_type', targetType)
    .eq('target_id', targetId)
    .maybeSingle()

  if (existing) {
    await supabase.from('favorites').delete().eq('id', existing.id)
    return false
  }
  await supabase.from('favorites').insert({
    user_id: user.id,
    target_type: targetType,
    target_id: targetId,
  })
  return true
}
