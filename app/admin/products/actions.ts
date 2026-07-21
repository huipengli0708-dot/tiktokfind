"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  insertProduct,
  insertProducts,
  updateProduct,
  deleteProduct,
  type InsertProductPayload,
} from "@/lib/db"
import { parseProductsFromText, type ParsedProduct } from "@/lib/ai-parse-products"

function str(formData: FormData, key: string): string {
  return ((formData.get(key) as string) ?? "").trim()
}

function parseProductFormData(formData: FormData): InsertProductPayload {
  const tags = str(formData, "tags").split(",").map((t) => t.trim()).filter(Boolean)

  let salesData: Record<string, unknown> = {}
  const rawSales = str(formData, "sales_data")
  if (rawSales) {
    try {
      salesData = JSON.parse(rawSales)
    } catch {
      // 支持 "键:值" 每行一条的简单格式
      for (const line of rawSales.split("\n")) {
        const idx = line.indexOf(":")
        if (idx > 0) salesData[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
      }
    }
  }

  return {
    title: str(formData, "title"),
    cover_image: str(formData, "cover_image"),
    category: str(formData, "category") || "未分类",
    price: str(formData, "price"),
    source: str(formData, "source") || "manual",
    source_url: str(formData, "source_url"),
    sales_data: salesData,
    supplier_url: str(formData, "supplier_url"),
    note: str(formData, "note"),
    tags,
    is_published: formData.get("is_published") === "on",
    sort_order: null,
  }
}

export async function insertProductAction(formData: FormData) {
  const payload = parseProductFormData(formData)
  const { error } = await insertProduct(payload)
  if (error) throw new Error(error)
  revalidatePaths()
  redirect("/admin/products")
}

export async function updateProductAction(formData: FormData) {
  const id = formData.get("id") as string
  const payload = parseProductFormData(formData)
  const { error } = await updateProduct(id, payload)
  if (error) throw new Error(error)
  revalidatePaths()
  redirect("/admin/products")
}

export async function deleteProductAction(formData: FormData) {
  const id = formData.get("id") as string
  const { error } = await deleteProduct(id)
  if (error) throw new Error(error)
  revalidatePaths()
}

export async function toggleProductPublishedAction(formData: FormData) {
  const id = formData.get("id") as string
  const current = formData.get("current") === "true"
  const { error } = await updateProduct(id, { is_published: !current })
  if (error) throw new Error(error)
  revalidatePaths()
}

/** AI 解析粘贴文本（供客户端导入组件调用） */
export async function parseImportAction(
  text: string,
  source: "fastmoss" | "kalodata" | "manual"
): Promise<{ products: ParsedProduct[]; error: string | null }> {
  if (!text.trim()) return { products: [], error: "请先粘贴内容" }
  return parseProductsFromText(text, source)
}

/** 批量入库（默认未发布，需在列表页逐个上架） */
export async function importProductsAction(
  products: ParsedProduct[]
): Promise<{ count: number; error: string | null }> {
  const payloads: InsertProductPayload[] = products.map((p) => ({
    ...p,
    is_published: false,
    sort_order: null,
  }))
  const result = await insertProducts(payloads)
  revalidatePaths()
  return result
}

function revalidatePaths() {
  revalidatePath("/admin/products")
  revalidatePath("/")
}
