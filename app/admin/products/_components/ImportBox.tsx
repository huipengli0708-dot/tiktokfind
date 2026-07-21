"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wand2, Upload, Trash2 } from "lucide-react"
import { parseImportAction, importProductsAction } from "../actions"
import type { ParsedProduct } from "@/lib/ai-parse-products"

type Source = "fastmoss" | "kalodata" | "manual"

export default function ImportBox() {
  const [text, setText] = useState("")
  const [source, setSource] = useState<Source>("fastmoss")
  const [parsed, setParsed] = useState<ParsedProduct[]>([])
  const [msg, setMsg] = useState("")
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  async function parse() {
    setBusy(true)
    setMsg("")
    const { products, error } = await parseImportAction(text, source)
    setBusy(false)
    if (error) {
      setMsg(error)
      return
    }
    setParsed(products)
    setMsg(`解析出 ${products.length} 个商品，确认后入库（默认未发布）`)
  }

  async function doImport() {
    setBusy(true)
    const { count, error } = await importProductsAction(parsed)
    setBusy(false)
    if (error) {
      setMsg("入库失败：" + error)
      return
    }
    setParsed([])
    setText("")
    setMsg(`已入库 ${count} 个商品`)
    router.refresh()
  }

  return (
    <div className="glass-card rounded-2xl p-5">
      <h2 className="flex items-center gap-2 text-base font-bold text-gray-800">
        <Wand2 size={16} className="text-emerald-500" /> AI 粘贴导入
      </h2>
      <p className="mt-1 text-xs text-gray-400">
        把 FastMoss / Kalodata 页面上复制的商品数据整段粘进来，AI 自动解析成新品记录。
      </p>

      <div className="mt-3 flex gap-2">
        {(["fastmoss", "kalodata", "manual"] as Source[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSource(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              source === s ? "btn-gradient" : "btn-outline-glass"
            }`}
          >
            {s === "fastmoss" ? "FastMoss" : s === "kalodata" ? "Kalodata" : "其他"}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={7}
        placeholder="在 FastMoss/Kalodata 商品列表页 Ctrl+A 全选复制，粘贴到这里…"
        className="mt-3 w-full rounded-xl border border-white/60 bg-white/70 p-3 font-mono text-xs text-gray-700 outline-none focus:ring-2 focus:ring-emerald-200/70"
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={parse}
          disabled={busy || !text.trim()}
          className="btn-gradient inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          <Wand2 size={14} /> {busy ? "处理中…" : "AI 解析"}
        </button>
        {msg && <span className="text-xs font-medium text-emerald-600">{msg}</span>}
      </div>

      {/* 解析结果预览 */}
      {parsed.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-xl border border-white/60">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-white/40 text-left text-gray-500">
                <th className="px-3 py-2 font-semibold">品名</th>
                <th className="px-3 py-2 font-semibold">类目</th>
                <th className="px-3 py-2 font-semibold">价格</th>
                <th className="px-3 py-2 font-semibold">数据</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {parsed.map((p, i) => (
                <tr key={i} className="border-t border-white/40 bg-white/20">
                  <td className="px-3 py-2 font-medium text-gray-800">{p.title}</td>
                  <td className="px-3 py-2 text-gray-500">{p.category}</td>
                  <td className="px-3 py-2 text-gray-500">{p.price}</td>
                  <td className="px-3 py-2 text-gray-400">
                    {Object.entries(p.sales_data ?? {})
                      .slice(0, 3)
                      .map(([k, v]) => `${k}:${v}`)
                      .join(" · ")}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => setParsed(parsed.filter((_, j) => j !== i))}
                      className="text-rose-500 hover:text-rose-600"
                      title="移除"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-white/40 p-3 text-right">
            <button
              type="button"
              onClick={doImport}
              disabled={busy}
              className="btn-gradient inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              <Upload size={14} /> 全部入库（{parsed.length}）
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
