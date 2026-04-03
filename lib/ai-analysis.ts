/**
 * AI analysis generation for newly created videos.
 * Requires ANTHROPIC_API_KEY in .env.local
 * Falls back gracefully if the key is missing or the call fails.
 */
import Anthropic from "@anthropic-ai/sdk"

export interface VideoInput {
  title: string
  short_description: string
  category: string
  content_type: string | null
  video_source_type: string | null
  tags: string[]
}

/** Shape that maps directly to DbVideo.analysis JSONB + separate columns */
export interface AnalysisResult {
  /** Written to DbVideo.analysis JSONB */
  analysis: {
    punchline: string
    whyViral: string[]
    marketSize: string
    competitionLevel: "低" | "中" | "高"
    profitMargin: string
    trendScore: number
    roi: string
    shouldDo: boolean
    targetSeller: string
    contentApproach: string
    riskLevel: "低" | "中" | "高"
    beginnerFriendly: boolean
    viewCount: number
    likeCount: number
  }
  /** Written to separate columns */
  target_audience: string[]
  content_strategy: string[]
  risk_notes: string[]
  recommendation_score: number
}

const FALLBACK: AnalysisResult = {
  analysis: {
    punchline: "AI分析生成中，请稍后在编辑页面更新。",
    whyViral: [
      "视频内容具有吸引力，适合TikTok传播",
      "产品能解决用户实际痛点",
      "内容展示效果直观",
    ],
    marketSize: "待深度分析",
    competitionLevel: "中",
    profitMargin: "待分析",
    trendScore: 70,
    roi: "ROI待评估",
    shouldDo: true,
    targetSeller: "适合有内容创作基础的卖家，建议深度分析后再决策。",
    contentApproach: "建议通过实际视频展示产品效果，突出核心卖点。",
    riskLevel: "中",
    beginnerFriendly: false,
    viewCount: 0,
    likeCount: 0,
  },
  target_audience: [
    "对该类产品有需求的主流消费群体",
    "关注生活品质提升的用户",
    "TikTok活跃用户群体",
  ],
  content_strategy: [
    "开头3秒展示产品最吸引人的效果",
    "通过对比展示产品核心价值",
    "结尾引导用户行动（购买/关注）",
  ],
  risk_notes: [
    "建议深度调研市场竞争情况后再投入",
    "注意平台政策合规性",
  ],
  recommendation_score: 70,
}

const VALID_LEVELS = ["低", "中", "高"] as const

function clampScore(v: unknown): number {
  return Math.min(100, Math.max(0, Number(v) || 70))
}

function validLevel(v: unknown): "低" | "中" | "高" {
  return VALID_LEVELS.includes(v as "低" | "中" | "高") ? (v as "低" | "中" | "高") : "中"
}

export async function generateVideoAnalysis(video: VideoInput): Promise<AnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.warn("[ai-analysis] ANTHROPIC_API_KEY not set — using fallback")
    return FALLBACK
  }

  const client = new Anthropic({ apiKey })

  const prompt = `你是"阿光选品"平台的AI选品分析师，专注于TikTok爆款商品分析。

根据以下视频信息，生成一份完整的选品分析报告，以JSON格式输出。

视频信息：
- 标题：${video.title}
- 简介：${video.short_description}
- 分类：${video.category || "未分类"}
- 内容类型：${video.content_type || "未知"}
- 标签：${video.tags.length ? video.tags.join("、") : "无"}

输出要求（只输出纯JSON，不要任何其他文字）：
{
  "analysis": {
    "punchline": "一句话爆点总结，不超过25字",
    "whyViral": ["爆款原因1", "爆款原因2", "爆款原因3", "爆款原因4"],
    "marketSize": "市场规模一句话描述，含数字",
    "competitionLevel": "低或中或高",
    "profitMargin": "如55%-65%",
    "trendScore": 85,
    "roi": "如ROI 3.0x",
    "shouldDo": true,
    "targetSeller": "适合哪类卖家来做，一两句话",
    "contentApproach": "内容打法建议，一两句话",
    "riskLevel": "低或中或高",
    "beginnerFriendly": true
  },
  "target_audience": ["目标受众描述1", "目标受众描述2", "目标受众描述3"],
  "content_strategy": ["内容策略步骤1", "内容策略步骤2", "内容策略步骤3", "内容策略步骤4"],
  "risk_notes": ["风险提示1", "风险提示2"],
  "recommendation_score": 85
}`

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    })

    const raw = (message.content[0] as { type: string; text: string }).text.trim()
    const json = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
    const parsed = JSON.parse(json) as AnalysisResult

    // Sanitize and validate
    parsed.analysis.trendScore = clampScore(parsed.analysis.trendScore)
    parsed.recommendation_score = clampScore(parsed.recommendation_score)
    parsed.analysis.competitionLevel = validLevel(parsed.analysis.competitionLevel)
    parsed.analysis.riskLevel = validLevel(parsed.analysis.riskLevel)

    // Ensure arrays
    if (!Array.isArray(parsed.analysis.whyViral)) parsed.analysis.whyViral = FALLBACK.analysis.whyViral
    if (!Array.isArray(parsed.target_audience))   parsed.target_audience = FALLBACK.target_audience
    if (!Array.isArray(parsed.content_strategy))  parsed.content_strategy = FALLBACK.content_strategy
    if (!Array.isArray(parsed.risk_notes))         parsed.risk_notes = FALLBACK.risk_notes

    // Always reset view/like counts for new records
    parsed.analysis.viewCount = 0
    parsed.analysis.likeCount = 0

    console.log(`[ai-analysis] Generated for "${video.title}" — score: ${parsed.recommendation_score}`)
    return parsed
  } catch (err) {
    console.error("[ai-analysis] generation failed:", err)
    return FALLBACK
  }
}
