import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { insertVideoAction } from "@/app/admin/actions"
import VideoFormFields from "@/app/admin/_components/VideoFormFields"

export default function NewVideoPage() {
  return (
    <div className="page-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 relative z-10">

        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/videos"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={14} /> 返回列表
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-bold text-gray-900">新增视频</h1>
        </div>

        <form action={insertVideoAction} className="space-y-5">
          <VideoFormFields />

          <div className="flex items-center gap-3 justify-end pt-2 pb-8">
            <Link href="/admin/videos" className="px-5 py-2.5 rounded-xl text-sm font-medium btn-outline-glass">
              取消
            </Link>
            <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-semibold btn-gradient">
              保存并发布
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
