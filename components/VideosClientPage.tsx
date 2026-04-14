"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, TrendingUp } from "lucide-react"
import type { VideoProduct } from "@/lib/mock-data"
import { CONTENT_TYPE_FILTER_OPTIONS } from "@/lib/content-types"
import VideoCard from "@/components/VideoCard"
import CategoryFilter from "@/components/CategoryFilter"
import TagBadge from "@/components/TagBadge"

interface Props {
  videos: VideoProduct[]
}

export default function VideosClientPage({ videos }: Props) {
  // 固定的内容类型筛选选项，顺序固定
  const contentTypeLabels = CONTENT_TYPE_FILTER_OPTIONS.map((o) => o.label)

  const allTags = useMemo(() => {
    return Array.from(new Set(videos.flatMap((v) => v.tags)))
  }, [videos])

  const [selectedTypeLabel, setSelectedTypeLabel] = useState("全部")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showTagFilter, setShowTagFilter] = useState(false)

  const filteredVideos = useMemo(() => {
    // 根据选中的中文 label 找到对应的英文 value
    const selectedValue =
      CONTENT_TYPE_FILTER_OPTIONS.find((o) => o.label === selectedTypeLabel)?.value ?? "全部"

    return videos.filter((video) => {
      const matchType =
        selectedValue === "全部" || (video.content_type ?? "merchant") === selectedValue
      const matchTags =
        selectedTags.length === 0 || selectedTags.some((t) => video.tags.includes(t))
      const matchSearch =
        searchQuery.trim() === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some((t) => t.includes(searchQuery))
      return matchType && matchTags && matchSearch
    })
  }, [videos, selectedTypeLabel, selectedTags, searchQuery])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="page-bg">
      <div className="glow-orb w-80 h-80 bg-indigo-300/15 top-0 right-0 slow-pulse" />
      <div className="glow-orb w-64 h-64 bg-purple-300/15 top-40 -left-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        <section className="pt-10 pb-8 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <TrendingUp size={16} className="text-violet-500" />
            <span className="text-xs font-medium text-violet-500 uppercase tracking-wider">每周持续更新</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">爆款视频库</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto md:mx-0">
            看爆款，做爆款，成爆款
          </p>
        </section>

        <section className="pb-6">
          <div className="glass-card rounded-2xl p-4 md:p-5 flex flex-col gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索商品名称、标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white/80 border border-violet-100/60 placeholder:text-gray-400 text-gray-700 outline-none focus:ring-2 focus:ring-violet-200/60 focus:border-violet-300/50 transition-all backdrop-blur-sm"
              />
            </div>

            <div className="flex items-start gap-3 flex-wrap">
              {/* 内容类型筛选 */}
              <CategoryFilter
                categories={contentTypeLabels}
                selected={selectedTypeLabel}
                onChange={setSelectedTypeLabel}
              />
              <button
                onClick={() => setShowTagFilter(!showTagFilter)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm glass-card border border-violet-100/40 text-gray-600 hover:text-gray-900 transition-all"
              >
                <SlidersHorizontal size={13} />
                标签
                {selectedTags.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {selectedTags.length}
                  </span>
                )}
              </button>
            </div>

            {showTagFilter && (
              <div className="border-t border-violet-100/40 pt-3">
                <p className="text-xs text-gray-400 mb-2 font-medium">按标签筛选</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <TagBadge
                      key={tag}
                      label={tag}
                      active={selectedTags.includes(tag)}
                      onClick={() => toggleTag(tag)}
                    />
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="mt-2 text-xs text-violet-600 hover:underline"
                  >
                    清除筛选
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            共找到 <span className="font-semibold text-gray-800">{filteredVideos.length}</span> 个爆款案例
          </p>
          {(selectedTags.length > 0 || searchQuery || selectedTypeLabel !== "全部") && (
            <button
              onClick={() => {
                setSelectedTypeLabel("全部")
                setSelectedTags([])
                setSearchQuery("")
              }}
              className="text-xs text-violet-600 hover:underline"
            >
              重置筛选
            </button>
          )}
        </div>

        <section className="pb-16">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-5">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl py-16 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500 text-sm">没有找到匹配的爆款案例</p>
              <p className="text-gray-400 text-xs mt-1">试试调整筛选条件</p>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
