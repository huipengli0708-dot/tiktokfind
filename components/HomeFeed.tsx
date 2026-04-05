"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { VideoProduct } from "@/lib/mock-data"
import FeedCard from "./FeedCard"

const TABS = ["全部", "商家实拍", "达人", "AI"] as const
type Tab = (typeof TABS)[number]

export default function HomeFeed({ videos }: { videos: VideoProduct[] }) {
  const [tab, setTab] = useState<Tab>("全部")

  const filtered =
    tab === "全部"
      ? videos
      : videos.filter((v) => v.content_type === tab)

  return (
    <section className="px-4 pb-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-gray-900 font-bold text-base">爆款选品库</h2>
          <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200/60">
            <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse inline-block" />
            实时更新
          </span>
        </div>
        <Link
          href="/videos"
          className="flex items-center gap-0.5 text-xs text-gray-400 hover:text-violet-600 transition-colors"
        >
          查看全部 <ArrowRight size={12} />
        </Link>
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-2 mb-4 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
              t === tab
                ? "bg-violet-600 text-white shadow-[0_4px_12px_rgba(139,92,246,0.30)]"
                : "bg-white/70 text-gray-500 border border-violet-100/40 hover:text-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Feed list */}
      <div className="space-y-2">
        {filtered.slice(0, 10).map((video) => (
          <FeedCard key={video.id} video={video} />
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-12">
            该分类暂无内容
          </p>
        )}

        {filtered.length > 10 && (
          <Link
            href="/videos"
            className="flex items-center justify-center gap-2 py-3 rounded-2xl app-feed-card text-gray-500 text-sm mt-2"
          >
            查看更多 <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </section>
  )
}
