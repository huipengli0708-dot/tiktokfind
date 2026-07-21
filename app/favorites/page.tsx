'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getMyFavorites, getCurrentUser } from '@/lib/favorites'
import { getVideosByIds, getProductsByIds, type VideoProduct, type DbProduct } from '@/lib/db'
import VideoCard from '@/components/VideoCard'
import ProductCard from '@/components/ProductCard'
import StarBackdrop from '@/components/StarBackdrop'

type Tab = 'videos' | 'products'

export default function FavoritesPage() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<Tab>('videos')
  const [videos, setVideos] = useState<VideoProduct[]>([])
  const [products, setProducts] = useState<DbProduct[]>([])

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser()
      if (!user) {
        setLoggedIn(false)
        setLoading(false)
        return
      }
      setLoggedIn(true)
      const favs = await getMyFavorites()
      const videoIds = favs.filter((f) => f.target_type === 'video').map((f) => f.target_id)
      const productIds = favs.filter((f) => f.target_type === 'product').map((f) => f.target_id)
      const [v, p] = await Promise.all([getVideosByIds(videoIds), getProductsByIds(productIds)])
      const orderV = new Map(videoIds.map((id, i) => [id, i]))
      const orderP = new Map(productIds.map((id, i) => [id, i]))
      setVideos([...v].sort((a, b) => (orderV.get(a.id) ?? 0) - (orderV.get(b.id) ?? 0)))
      setProducts([...p].sort((a, b) => (orderP.get(a.id) ?? 0) - (orderP.get(b.id) ?? 0)))
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="relative min-h-screen">
      <StarBackdrop />

      <div className="relative z-10 mx-auto max-w-7xl px-8 pb-24 pt-24">
        <h1 className="text-3xl font-black text-white">我的收藏</h1>

        {/* Tab */}
        <div className="mt-6 border-b border-white/10">
          <button
            className={`tab-underline ${tab === 'videos' ? 'tab-underline-active' : ''}`}
            onClick={() => setTab('videos')}
          >
            爆款视频 {videos.length > 0 && `(${videos.length})`}
          </button>
          <button
            className={`tab-underline ${tab === 'products' ? 'tab-underline-active' : ''}`}
            onClick={() => setTab('products')}
          >
            新品 {products.length > 0 && `(${products.length})`}
          </button>
        </div>

        <div className="mt-8">
          {loading ? (
            <p className="py-20 text-center text-gray-500">加载中…</p>
          ) : !loggedIn ? (
            <div className="card-dark py-20 text-center">
              <p className="text-lg font-bold text-white">还没有登录</p>
              <p className="mt-2 text-sm text-gray-500">登录后收藏的内容会保存在这里。</p>
              <Link href="/me" className="btn-blue mt-6 inline-block px-8 py-3">
                去登录
              </Link>
            </div>
          ) : (tab === 'videos' ? videos : products).length === 0 ? (
            <div className="card-dark py-20 text-center">
              <p className="text-lg font-bold text-white">
                还没有收藏{tab === 'videos' ? '爆款视频' : '新品'}
              </p>
              <p className="mt-2 text-sm text-gray-500">去趋势页看看值得关注的内容吧。</p>
              <Link href="/picks" className="btn-blue mt-6 inline-block px-8 py-3">
                去逛逛
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {tab === 'videos'
                ? videos.map((v) => <VideoCard key={v.id} video={v} />)
                : products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
