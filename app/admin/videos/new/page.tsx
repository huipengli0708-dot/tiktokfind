import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SimpleVideoForm from "@/app/admin/_components/SimpleVideoForm"

export default function NewVideoPage() {
  return (
    <div className="page-bg min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 relative z-10">

        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/videos"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={14} /> 返回列表
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-bold text-gray-900">新增视频</h1>
        </div>

        <SimpleVideoForm />

      </div>
    </div>
  )
}
