'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { isFavorited, toggleFavorite, type FavoriteTargetType } from '@/lib/favorites'

type Props = {
  targetType: FavoriteTargetType
  targetId: string
  size?: number
  /** 深色主题样式 */
  dark?: boolean
}

export default function FavoriteButton({ targetType, targetId, size = 18, dark = false }: Props) {
  const [fav, setFav] = useState(false)
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    isFavorited(targetType, targetId).then((v) => mounted && setFav(v))
    return () => {
      mounted = false
    }
  }, [targetType, targetId])

  async function onClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (busy) return
    setBusy(true)
    const result = await toggleFavorite(targetType, targetId)
    setBusy(false)
    if (result === null) {
      // 未登录
      router.push('/me?from=fav')
      return
    }
    setFav(result)
  }

  return (
    <button
      onClick={onClick}
      aria-label={fav ? '取消收藏' : '收藏'}
      className={
        dark
          ? 'fav-btn flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white/5 hover:bg-white/10'
          : 'fav-btn flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm'
      }
    >
      <Heart
        size={size}
        className={fav ? 'fill-[#F0655A] text-[#F0655A]' : dark ? 'text-white/60' : 'text-[#9BB8AC]'}
      />
    </button>
  )
}
