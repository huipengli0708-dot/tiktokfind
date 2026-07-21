/**
 * 用 Claude 把从 FastMoss / Kalodata 页面复制的原始文本
 * 解析成结构化的新品数据（半自动导入）。
 */
import Anthropic from "@anthropic-ai/sdk"
import type { InsertProductPayload } from "./db"

export type ParsedProduct = Omit<InsertProductPayload, "is_published" | "sort_order">

export async function parseProductsFromText(
  text: string,
  source: "fastmoss" | "kalodata" | "manual"
): Promise<{ products: ParsedProduct[]; error: string | null }> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return { products: [], error: "未配置 ANTHROPIC_API_KEY" }

  const client = new Anthropic({ apiKey })

  const prompt = `你是"阿光选品"平台的数据解析助手。用户从 ${source} 平台复制了一段商品数据文本，请解析成结构化 JSON。

原始文本：
"""
${text.slice(0, 8000)}
"""

解析规则：
- 每个商品输出一个对象，尽量识别出所有商品
- 无法识别的字段留空字符串或空对象
- sales_data 里放识别到的数据指标，键名用：sales（销量）、sales_7d、gmv、growth（增速）、creators（达人数）、videos（视频数）、commission（佣金率）等
- price 格式如 "$9.99" 或 "$5-15"
- tags 从商品特征提取 2-4 个中文短标签
- category 用中文类目，如：美妆个护、家居日用、厨房用品、母婴玩具、宠物用品、运动户外、数码配件、服饰配饰、健康保健

只输出纯 JSON 数组，不要任何其他文字：
[
  {
    "title": "商品名（中文，如原文是英文就翻译）",
    "cover_image": "",
    "category": "类目",
    "price": "价格",
    "source": "${source}",
    "source_url": "",
    "sales_data": { "sales": "1.2万", "growth": "+230%" },
    "supplier_url": "",
    "note": "",
    "tags": ["标签1", "标签2"]
  }
]`

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    })

    const raw = (message.content[0] as { type: string; text: string }).text.trim()
    const json = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
    const parsed = JSON.parse(json) as ParsedProduct[]

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return { products: [], error: "没有解析出商品，换一段文本试试" }
    }

    const products = parsed
      .filter((p) => p && typeof p.title === "string" && p.title.trim())
      .map((p) => ({
        title: p.title.trim(),
        cover_image: p.cover_image ?? "",
        category: p.category || "未分类",
        price: p.price ?? "",
        source,
        source_url: p.source_url ?? "",
        sales_data: p.sales_data && typeof p.sales_data === "object" ? p.sales_data : {},
        supplier_url: p.supplier_url ?? "",
        note: p.note ?? "",
        tags: Array.isArray(p.tags) ? p.tags : [],
      }))

    return { products, error: null }
  } catch (err) {
    console.error("[ai-parse-products] failed:", err)
    return { products: [], error: "AI 解析失败，请重试或手动录入" }
  }
}
