"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { insertVideo, updateVideo, deleteVideo } from "@/lib/db"
import { generateVideoAnalysis } from "@/lib/ai-analysis"

/** Safe string getter — returns "" instead of null when field is absent */
function str(formData: FormData, key: string): string {
  return (formData.get(key) as string) ?? ""
}

/** 从 FormData 解析所有字段，组装为 DB 可用结构 */
function parseVideoFormData(formData: FormData) {
  // Defensive splits — handle missing fields gracefully
  const tags = str(formData, "tags")
    .split(",").map(t => t.trim()).filter(Boolean)

  const targetAudience = str(formData, "target_audience")
    .split("\n").map(t => t.trim()).filter(Boolean)

  const contentStrategy = str(formData, "content_strategy")
    .split("\n").map(t => t.trim()).filter(Boolean)

  const riskNotes = str(formData, "risk_notes")
    .split("\n").map(t => t.trim()).filter(Boolean)

  const whyViral = str(formData, "whyViral")
    .split("\n").map(t => t.trim()).filter(Boolean)

  const rawScore = str(formData, "recommendation_score")
  const trendScore = rawScore ? Number(rawScore) : 0

  const analysis: Record<string, unknown> = {
    punchline:        str(formData, "punchline"),
    whyViral,
    marketSize:       str(formData, "marketSize"),
    competitionLevel: str(formData, "competitionLevel") || "中",
    trendScore,
    roi:              str(formData, "roi"),
    beginnerFriendly: formData.get("beginnerFriendly") === "on",
    shouldDo:         formData.get("shouldDo") === "on",
    targetSeller:     str(formData, "targetSeller"),
    contentApproach:  str(formData, "contentApproach"),
    riskLevel:        str(formData, "riskLevel") || "中",
    viewCount:        Number(str(formData, "viewCount")) || 0,
    likeCount:        Number(str(formData, "likeCount")) || 0,
  }

  const sourceType = str(formData, "video_source_type") || "tiktok"

  return {
    title:              str(formData, "title"),
    slug:               str(formData, "slug"),
    // Store "" (not null) to satisfy the DB NOT NULL constraint on video_url.
    // TikTok records will have the actual URL; mp4 records store "" here.
    video_url:          str(formData, "video_url"),
    video_source_type:  sourceType,
    video_file_url:     str(formData, "video_file_url") || null,
    cover_image:        str(formData, "cover_image"),
    category:           str(formData, "category") || "未分类",
    tags,
    short_description:  str(formData, "short_description"),
    analysis,
    target_audience:    targetAudience,
    content_strategy:   contentStrategy,
    risk_notes:         riskNotes,
    profit_note:        str(formData, "profit_note") || null,
    recommendation_score: rawScore ? trendScore : null,
    content_type:       str(formData, "content_type") || null,
    is_published:       formData.get("is_published") === "on",
    is_featured:        formData.get("is_featured") === "on",
    sort_order:         null as null,
  }
}

export async function insertVideoAction(formData: FormData) {
  const payload = parseVideoFormData(formData)
  const { id, error } = await insertVideo(payload)
  if (error) throw new Error(error)

  // Generate AI analysis and write it back before redirecting.
  // Falls back silently — the video record is already saved.
  if (id) {
    try {
      const result = await generateVideoAnalysis({
        title:              payload.title,
        short_description:  payload.short_description,
        category:           payload.category,
        content_type:       payload.content_type,
        video_source_type:  payload.video_source_type,
        tags:               payload.tags,
      })
      await updateVideo(id, {
        analysis:             result.analysis,
        target_audience:      result.target_audience,
        content_strategy:     result.content_strategy,
        risk_notes:           result.risk_notes,
        recommendation_score: result.recommendation_score,
      })
    } catch (aiErr) {
      // Non-fatal: log and continue to redirect
      console.error("[insertVideoAction] AI analysis step failed:", aiErr)
    }
  }

  revalidatePaths()
  redirect("/admin/videos")
}

export async function updateVideoAction(formData: FormData) {
  const id = formData.get("id") as string
  const payload = parseVideoFormData(formData)
  const { error } = await updateVideo(id, payload)
  if (error) throw new Error(error)

  revalidatePaths()
  redirect("/admin/videos")
}

export async function deleteVideoAction(formData: FormData) {
  const id = formData.get("id") as string
  const { error } = await deleteVideo(id)
  if (error) throw new Error(error)
  revalidatePaths()
}

export async function togglePublishedAction(formData: FormData) {
  const id = formData.get("id") as string
  const current = formData.get("current") === "true"
  const { error } = await updateVideo(id, { is_published: !current })
  if (error) throw new Error(error)
  revalidatePaths()
}

export async function toggleFeaturedAction(formData: FormData) {
  const id = formData.get("id") as string
  const current = formData.get("current") === "true"
  const { error } = await updateVideo(id, { is_featured: !current })
  if (error) throw new Error(error)
  revalidatePaths()
}

function revalidatePaths() {
  revalidatePath("/admin/videos")
  revalidatePath("/videos")
  revalidatePath("/")
}
