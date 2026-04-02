"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { insertVideo, updateVideo, deleteVideo } from "@/lib/db"

/** 从 FormData 解析所有字段，组装为 DB 可用结构 */
function parseVideoFormData(formData: FormData) {
  const tags = (formData.get("tags") as string)
    .split(",").map((t) => t.trim()).filter(Boolean)

  const targetAudience = (formData.get("target_audience") as string)
    .split("\n").map((t) => t.trim()).filter(Boolean)

  const contentStrategy = (formData.get("content_strategy") as string)
    .split("\n").map((t) => t.trim()).filter(Boolean)

  const riskNotes = (formData.get("risk_notes") as string)
    .split("\n").map((t) => t.trim()).filter(Boolean)

  const whyViral = (formData.get("whyViral") as string)
    .split("\n").map((t) => t.trim()).filter(Boolean)

  const score = formData.get("recommendation_score") as string
  const trendScore = score ? Number(score) : 0

  // 将所有 analysis 子字段组装为 JSONB
  const analysis: Record<string, unknown> = {
    punchline: formData.get("punchline") as string,
    whyViral,
    marketSize: formData.get("marketSize") as string,
    competitionLevel: formData.get("competitionLevel") as string,
    trendScore,
    roi: formData.get("roi") as string,
    beginnerFriendly: formData.get("beginnerFriendly") === "on",
    shouldDo: formData.get("shouldDo") === "on",
    targetSeller: formData.get("targetSeller") as string,
    contentApproach: formData.get("contentApproach") as string,
    riskLevel: formData.get("riskLevel") as string,
    viewCount: Number(formData.get("viewCount")) || 0,
    likeCount: Number(formData.get("likeCount")) || 0,
  }

  return {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    video_url: (formData.get("video_url") as string) || null,
    cover_image: formData.get("cover_image") as string,
    category: formData.get("category") as string,
    tags,
    short_description: formData.get("short_description") as string,
    analysis,
    target_audience: targetAudience,
    content_strategy: contentStrategy,
    risk_notes: riskNotes,
    profit_note: (formData.get("profit_note") as string) || null,
    recommendation_score: score ? trendScore : null,
    content_type: (formData.get("content_type") as string) || null,
    is_published: formData.get("is_published") === "on",
    is_featured: formData.get("is_featured") === "on",
    sort_order: null as null,
  }
}

export async function insertVideoAction(formData: FormData) {
  const payload = parseVideoFormData(formData)
  const { error } = await insertVideo(payload)
  if (error) throw new Error(error)

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
