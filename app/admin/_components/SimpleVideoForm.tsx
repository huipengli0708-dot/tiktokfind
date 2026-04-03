"use client"

import { useState } from "react"
import { insertVideoAction } from "@/app/admin/actions"
import Mp4UploadField from "./Mp4UploadField"

const VIDEO_SOURCE_TYPES = ["tiktok", "mp4"] as const
const CONTENT_TYPES = ["商家实拍", "达人", "AI"] as const

/** Derive a URL-safe slug from a title. Falls back to video-{seed} for CJK-only titles. */
function deriveSlug(title: string, seed: number): string {
  const ascii = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return (ascii.length >= 3 ? ascii : "video") + `-${seed}`
}

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200/60 focus:border-indigo-300/50 transition-all backdrop-blur-sm"
const selectCls =
  "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-200/60 transition-all backdrop-blur-sm"
const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5"

export default function SimpleVideoForm() {
  // Seed is fixed per session so the auto slug is stable across keystrokes
  const [seed] = useState(() => Date.now())
  const [sourceType, setSourceType] = useState<"tiktok" | "mp4">("tiktok")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [slugEdited, setSlugEdited] = useState(false)

  function onTitleChange(v: string) {
    setTitle(v)
    if (!slugEdited) setSlug(deriveSlug(v, seed))
  }

  return (
    <form action={insertVideoAction} className="space-y-4">

      {/* ── Hidden defaults for fields not shown in this simplified form ── */}
      <input type="hidden" name="category"          value="未分类" />
      <input type="hidden" name="tags"              value="" />
      <input type="hidden" name="profit_note"       value="" />
      <input type="hidden" name="recommendation_score" value="" />
      <input type="hidden" name="roi"               value="" />
      <input type="hidden" name="whyViral"          value="" />
      <input type="hidden" name="marketSize"        value="" />
      <input type="hidden" name="competitionLevel"  value="中" />
      <input type="hidden" name="riskLevel"         value="中" />
      <input type="hidden" name="punchline"         value="" />
      <input type="hidden" name="targetSeller"      value="" />
      <input type="hidden" name="contentApproach"   value="" />
      <input type="hidden" name="target_audience"   value="" />
      <input type="hidden" name="content_strategy"  value="" />
      <input type="hidden" name="risk_notes"        value="" />
      <input type="hidden" name="trendScore"        value="" />
      <input type="hidden" name="viewCount"         value="0" />
      <input type="hidden" name="likeCount"         value="0" />
      {/* Publish immediately, recommend by default */}
      <input type="hidden" name="is_published"      value="on" />
      <input type="hidden" name="shouldDo"          value="on" />

      <div className="glass-card rounded-2xl p-5 space-y-4">

        {/* Title */}
        <div>
          <label className={labelCls}>标题 *</label>
          <input
            type="text" name="title" required
            value={title} onChange={e => onTitleChange(e.target.value)}
            placeholder="例：迷你榨汁杯 TikTok单周破万单"
            className={inputCls}
          />
        </div>

        {/* Slug — auto-generated from title, editable */}
        <div>
          <label className={labelCls}>
            Slug <span className="font-normal text-gray-400">（自动生成，可修改）</span>
          </label>
          <input
            type="text" name="slug" required
            value={slug}
            onChange={e => { setSlug(e.target.value); setSlugEdited(true) }}
            placeholder="mini-juicer-cup"
            className={inputCls}
          />
          <p className="text-[11px] text-gray-400 mt-1">只含小写字母、数字和横线，不可重复</p>
        </div>

        {/* Source type + content type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>视频来源 *</label>
            <select
              name="video_source_type"
              value={sourceType}
              onChange={e => setSourceType(e.target.value as "tiktok" | "mp4")}
              className={selectCls}
            >
              {VIDEO_SOURCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>内容类型 *</label>
            <select name="content_type" className={selectCls}>
              {CONTENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Conditional: TikTok URL or MP4 uploader */}
        {sourceType === "tiktok" ? (
          <div>
            <label className={labelCls}>TikTok 链接</label>
            <input
              type="text" name="video_url"
              placeholder="https://www.tiktok.com/..."
              className={inputCls}
            />
          </div>
        ) : (
          <>
            {/* For mp4 entries video_url must be a non-null empty string in the DB */}
            <input type="hidden" name="video_url" value="" />
            <Mp4UploadField />
          </>
        )}

        {/* Short description */}
        <div>
          <label className={labelCls}>简介 *</label>
          <textarea
            name="short_description" required rows={2}
            placeholder="一句话描述产品和爆款逻辑"
            className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200/60 focus:border-indigo-300/50 transition-all backdrop-blur-sm resize-none"
          />
        </div>

        {/* Cover image (optional) */}
        <div>
          <label className={labelCls}>
            封面图链接 <span className="font-normal text-gray-400">（可选）</span>
          </label>
          <input
            type="text" name="cover_image"
            placeholder="https://images.unsplash.com/photo-xxx?w=600&h=800&fit=crop"
            className={inputCls}
          />
        </div>

      </div>

      <div className="flex items-center gap-3 justify-end pb-8">
        <a href="/admin/videos" className="px-5 py-2.5 rounded-xl text-sm font-medium btn-outline-glass">
          取消
        </a>
        <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-semibold btn-gradient">
          保存并发布
        </button>
      </div>

    </form>
  )
}
