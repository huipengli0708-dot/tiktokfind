import Link from "next/link"
import { getAllProductsAdmin } from "@/lib/db"
import { toggleProductPublishedAction } from "./actions"
import { logoutAction } from "@/app/admin/login/action"
import ProductDeleteButton from "./_components/ProductDeleteButton"
import ImportBox from "./_components/ImportBox"
import { PlusCircle, CheckCircle, XCircle, LogOut } from "lucide-react"

export const dynamic = "force-dynamic"

const SOURCE_LABELS: Record<string, string> = {
  fastmoss: "FastMoss",
  kalodata: "Kalodata",
  manual: "手动",
}

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin()

  return (
    <div className="page-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        {/* ── 顶部 ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">新品管理</h1>
            <p className="text-sm text-gray-400 mt-0.5">{products.length} 条</p>
          </div>
          <div className="flex items-center gap-2">
            <form action={logoutAction}>
              <button type="submit" title="退出登录"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium btn-outline-glass">
                <LogOut size={14} /> 退出
              </button>
            </form>
            <Link href="/admin/products/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-gradient">
              <PlusCircle size={15} /> 手动新增
            </Link>
          </div>
        </div>

        {/* ── 后台导航 ── */}
        <div className="mb-5 flex gap-2">
          <Link href="/admin/videos" className="btn-outline-glass rounded-full px-4 py-1.5 text-sm font-semibold">
            爆款视频
          </Link>
          <span className="btn-gradient rounded-full px-4 py-1.5 text-sm font-semibold">每日新品</span>
        </div>

        {/* ── AI 粘贴导入 ── */}
        <div className="mb-5">
          <ImportBox />
        </div>

        {/* ── 列表 ── */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {products.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-sm">
              暂无新品，用上面的 AI 导入或手动新增
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/40 bg-white/20">
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-600">品名</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600">类目</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600">价格</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600">来源</th>
                  <th className="text-center px-3 py-3.5 font-semibold text-gray-600">发布</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">创建时间</th>
                  <th className="text-right px-5 py-3.5 font-semibold text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id}
                    className={`border-b border-white/30 hover:bg-white/30 transition-colors ${i % 2 === 0 ? "bg-white/10" : ""}`}>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-800 leading-snug line-clamp-1">{p.title}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="tag-pill">{p.category}</span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{p.price || "—"}</td>
                    <td className="px-4 py-3.5 text-gray-500 text-xs">
                      {SOURCE_LABELS[p.source] ?? p.source}
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <form action={toggleProductPublishedAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="current" value={String(p.is_published)} />
                        <button type="submit" title={p.is_published ? "点击下架" : "点击发布"}
                          className="hover:scale-110 transition-transform">
                          {p.is_published
                            ? <CheckCircle size={16} className="text-emerald-500 inline" />
                            : <XCircle size={16} className="text-gray-300 inline" />}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs hidden lg:table-cell">
                      {p.created_at ? new Date(p.created_at).toLocaleDateString("zh-CN") : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/products/${p.id}`} target="_blank"
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-600 bg-emerald-50/80 hover:bg-emerald-100/80 transition-colors">
                          预览
                        </Link>
                        <Link href={`/admin/products/edit/${p.id}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-gray-50/80 hover:bg-gray-100/80 transition-colors">
                          编辑
                        </Link>
                        <ProductDeleteButton id={p.id} title={p.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-emerald-500 transition-colors">
            ← 返回前台首页
          </Link>
        </div>
      </div>
    </div>
  )
}
