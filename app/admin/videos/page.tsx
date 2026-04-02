import Link from "next/link"
import { getAllVideosAdmin } from "@/lib/db"
import {
  togglePublishedAction,
  toggleFeaturedAction,
} from "@/app/admin/actions"
import { logoutAction } from "@/app/admin/login/action"
import DeleteButton from "@/app/admin/_components/DeleteButton"
import { PlusCircle, CheckCircle, XCircle, Star, Search, LogOut } from "lucide-react"

export const dynamic = "force-dynamic"

const CONTENT_TYPE_STYLE: Record<string, string> = {
  "商家实拍": "!bg-blue-50/80 !text-blue-600 !border-blue-200/60",
  "达人":    "!bg-purple-50/80 !text-purple-600 !border-purple-200/60",
  "AI":      "!bg-emerald-50/80 !text-emerald-600 !border-emerald-200/60",
}

interface PageProps {
  searchParams: Promise<{ q?: string; cat?: string }>
}

export default async function AdminVideosPage({ searchParams }: PageProps) {
  const [videos, { q = "", cat = "" }] = await Promise.all([
    getAllVideosAdmin(),
    searchParams,
  ])

  // 从数据中提取去重分类列表
  const categories = Array.from(new Set(videos.map((v) => v.category).filter(Boolean)))

  // 前端过滤（数据量小，无需多一次 DB 查询）
  const filtered = videos.filter((v) => {
    const matchQ = !q || v.title.toLowerCase().includes(q.toLowerCase())
    const matchCat = !cat || v.category === cat
    return matchQ && matchCat
  })

  return (
    <div className="page-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 relative z-10">

        {/* ── 顶部 ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">视频管理</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {filtered.length} / {videos.length} 条
            </p>
          </div>
          <div className="flex items-center gap-2">
            <form action={logoutAction}>
              <button type="submit" title="退出登录"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium btn-outline-glass">
                <LogOut size={14} /> 退出
              </button>
            </form>
            <Link href="/admin/videos/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-gradient">
              <PlusCircle size={15} /> 新增视频
            </Link>
          </div>
        </div>

        {/* ── 搜索 + 分类筛选（GET 表单，无 JS 也能用） ── */}
        <form method="GET" className="glass-card rounded-2xl p-4 mb-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="q"
              defaultValue={q}
              placeholder="搜索标题..."
              className="w-full pl-8 pr-3 py-2 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200/60 transition-all"
            />
          </div>
          <select
            name="cat"
            defaultValue={cat}
            className="px-3 py-2 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200/60 transition-all"
          >
            <option value="">全部分类</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="submit"
            className="px-4 py-2 rounded-xl text-sm font-medium btn-gradient whitespace-nowrap">
            搜索
          </button>
          {(q || cat) && (
            <Link href="/admin/videos"
              className="px-4 py-2 rounded-xl text-sm font-medium btn-outline-glass whitespace-nowrap text-center">
              清除
            </Link>
          )}
        </form>

        {/* ── 列表 ── */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-sm">
              {videos.length === 0 ? "暂无数据，点击右上角新增" : "没有匹配的视频"}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/40 bg-white/20">
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-600">标题</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 hidden sm:table-cell">分类</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">类型</th>
                  <th className="text-center px-3 py-3.5 font-semibold text-gray-600 hidden md:table-cell">发布</th>
                  <th className="text-center px-3 py-3.5 font-semibold text-gray-600 hidden md:table-cell">精选</th>
                  <th className="text-left px-4 py-3.5 font-semibold text-gray-600 hidden lg:table-cell">创建时间</th>
                  <th className="text-right px-5 py-3.5 font-semibold text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((video, i) => (
                  <tr key={video.id}
                    className={`border-b border-white/30 hover:bg-white/30 transition-colors ${i % 2 === 0 ? "bg-white/10" : ""}`}>

                    {/* 标题 */}
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-gray-800 leading-snug line-clamp-1">{video.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-mono">{video.slug}</p>
                    </td>

                    {/* 分类 */}
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className="tag-pill">{video.category}</span>
                    </td>

                    {/* 内容类型 */}
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      {video.content_type && (
                        <span className={`tag-pill ${CONTENT_TYPE_STYLE[video.content_type] ?? ""}`}>
                          {video.content_type}
                        </span>
                      )}
                    </td>

                    {/* 发布切换 */}
                    <td className="px-3 py-3.5 text-center hidden md:table-cell">
                      <form action={togglePublishedAction}>
                        <input type="hidden" name="id" value={video.id} />
                        <input type="hidden" name="current" value={String(video.is_published)} />
                        <button type="submit" title={video.is_published ? "点击下架" : "点击发布"}
                          className="hover:scale-110 transition-transform">
                          {video.is_published
                            ? <CheckCircle size={16} className="text-emerald-500 inline" />
                            : <XCircle size={16} className="text-gray-300 inline" />}
                        </button>
                      </form>
                    </td>

                    {/* 精选切换 */}
                    <td className="px-3 py-3.5 text-center hidden md:table-cell">
                      <form action={toggleFeaturedAction}>
                        <input type="hidden" name="id" value={video.id} />
                        <input type="hidden" name="current" value={String(video.is_featured)} />
                        <button type="submit" title={video.is_featured ? "取消精选" : "设为精选"}
                          className="hover:scale-110 transition-transform">
                          {video.is_featured
                            ? <Star size={15} className="text-amber-400 fill-amber-400 inline" />
                            : <Star size={15} className="text-gray-300 inline" />}
                        </button>
                      </form>
                    </td>

                    {/* 时间 */}
                    <td className="px-4 py-3.5 text-gray-400 text-xs hidden lg:table-cell">
                      {video.created_at
                        ? new Date(video.created_at).toLocaleDateString("zh-CN")
                        : "—"}
                    </td>

                    {/* 操作 */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/videos/${video.slug}`} target="_blank"
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-600 bg-indigo-50/80 hover:bg-indigo-100/80 transition-colors">
                          预览
                        </Link>
                        <Link href={`/admin/videos/edit/${video.id}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-gray-50/80 hover:bg-gray-100/80 transition-colors">
                          编辑
                        </Link>
                        <DeleteButton id={video.id} title={video.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-indigo-500 transition-colors">
            ← 返回前台首页
          </Link>
        </div>

      </div>
    </div>
  )
}
