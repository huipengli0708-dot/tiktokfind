"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ExternalLink, Flame } from "lucide-react"
import type { VideoProduct } from "@/lib/mock-data"

const TYPE_TABS = ["全部", "商家实拍", "达人", "AI"] as const
type TypeTab = (typeof TYPE_TABS)[number]

const COMPETITION_STYLE: Record<string, string> = {
  低: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  中: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  高: "text-rose-400 bg-rose-400/10 border-rose-400/20",
}

export default function DesktopVideoTable({ videos }: { videos: VideoProduct[] }) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<TypeTab>("全部")

  const filtered = videos.filter((v) => {
    const matchSearch =
      !search ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
    const matchType =
      typeFilter === "全部" || v.content_type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="app-desktop-card rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <Flame size={15} className="text-amber-400" />
          <h2 className="text-white font-semibold text-sm">爆款视频库</h2>
          <span className="text-white/35 text-xs">
            {filtered.length} / {videos.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Type filter tabs */}
          <div className="flex items-center gap-1 bg-white/[0.04] rounded-xl p-1 border border-white/[0.07]">
            {TYPE_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  t === typeFilter
                    ? "bg-violet-500/25 text-violet-300 border border-violet-500/25"
                    : "text-white/40 hover:text-white/65"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索商品、分类..."
              className="pl-8 pr-4 py-2 text-xs rounded-xl bg-white/[0.06] border border-white/[0.09] text-white placeholder:text-white/30 outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all w-52"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05] bg-white/[0.025]">
              <th className="text-left px-5 py-3 text-white/35 font-medium text-xs tracking-wide">
                商品
              </th>
              <th className="text-left px-4 py-3 text-white/35 font-medium text-xs tracking-wide">
                分类
              </th>
              <th className="text-left px-4 py-3 text-white/35 font-medium text-xs tracking-wide">
                类型
              </th>
              <th className="text-center px-4 py-3 text-white/35 font-medium text-xs tracking-wide">
                爆款指数
              </th>
              <th className="text-left px-4 py-3 text-white/35 font-medium text-xs tracking-wide">
                利润率
              </th>
              <th className="text-center px-4 py-3 text-white/35 font-medium text-xs tracking-wide">
                竞争度
              </th>
              <th className="text-center px-4 py-3 text-white/35 font-medium text-xs tracking-wide">
                市场规模
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((video, i) => (
              <tr
                key={video.id}
                className={`border-b border-white/[0.04] hover:bg-white/[0.04] transition-colors group ${
                  i % 2 === 0 ? "" : "bg-white/[0.015]"
                }`}
              >
                {/* Product */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/[0.08]">
                      <Image
                        src={video.coverImage}
                        alt={video.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium line-clamp-1 leading-snug">
                        {video.title}
                      </p>
                      <p className="text-white/30 text-[10px] mt-0.5 font-mono truncate max-w-[180px]">
                        /{video.slug}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3.5">
                  <span className="text-white/55 text-xs px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.07]">
                    {video.category}
                  </span>
                </td>

                {/* Type */}
                <td className="px-4 py-3.5">
                  {video.content_type ? (
                    <span className="text-violet-300 text-xs px-2 py-1 rounded-lg bg-violet-500/10 border border-violet-500/15">
                      {video.content_type}
                    </span>
                  ) : (
                    <span className="text-white/20 text-xs">—</span>
                  )}
                </td>

                {/* Trend score */}
                <td className="px-4 py-3.5 text-center">
                  <span className="inline-flex items-center gap-1 text-amber-400 font-bold text-sm">
                    <Flame size={11} />
                    {video.analysis.trendScore}
                  </span>
                </td>

                {/* Profit margin */}
                <td className="px-4 py-3.5">
                  <span className="text-emerald-400 text-xs font-medium">
                    {video.analysis.profitMargin.split("，")[0]}
                  </span>
                </td>

                {/* Competition */}
                <td className="px-4 py-3.5 text-center">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                      COMPETITION_STYLE[video.analysis.competitionLevel] ??
                      "text-white/40 bg-white/5 border-white/10"
                    }`}
                  >
                    {video.analysis.competitionLevel}
                  </span>
                </td>

                {/* Market size */}
                <td className="px-4 py-3.5">
                  <span className="text-blue-300/70 text-xs">
                    {video.analysis.marketSize.split("，")[0].slice(0, 12)}
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-3.5">
                  <Link
                    href={`/videos/${video.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-white/30 hover:text-violet-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-violet-500/10 opacity-0 group-hover:opacity-100"
                  >
                    <ExternalLink size={12} />
                    查看
                  </Link>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-white/25 py-20 text-sm">
                  未找到匹配内容
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
