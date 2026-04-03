"use client"

import { useRef, useState } from "react"
import { supabase } from "@/lib/supabase"

const MAX_SIZE = 50 * 1024 * 1024 // 50 MB
const BUCKET = "videos"

interface Props {
  defaultValue?: string
}

type Status = "idle" | "uploading" | "done" | "error"

export default function Mp4UploadField({ defaultValue = "" }: Props) {
  const [url, setUrl] = useState(defaultValue)
  const [status, setStatus] = useState<Status>("idle")
  const [errMsg, setErrMsg] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "video/mp4") {
      setStatus("error")
      setErrMsg("只支持 MP4 格式")
      return
    }

    if (file.size > MAX_SIZE) {
      setStatus("error")
      setErrMsg(`文件超过 50MB（当前 ${(file.size / 1024 / 1024).toFixed(1)} MB）`)
      return
    }

    setStatus("uploading")
    setErrMsg("")

    // Path inside the bucket — no leading folder prefix to avoid "videos/videos/…" in URL
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const path = `${Date.now()}-${safeName}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: "video/mp4", upsert: false })

    if (uploadError) {
      setStatus("error")
      setErrMsg(uploadError.message)
      return
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    setUrl(data.publicUrl)
    setStatus("done")
  }

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200/60 focus:border-indigo-300/50 transition-all backdrop-blur-sm"

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        MP4 视频文件（来源=mp4时）
      </label>

      {/* This hidden input is what the server action reads via formData.get("video_file_url") */}
      <input type="hidden" name="video_file_url" value={url} />

      {/* File picker trigger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={status === "uploading"}
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "uploading" ? "上传中…" : "选择 MP4 文件"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="video/mp4"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="text-[11px] text-gray-400">最大 50 MB，仅限 MP4</span>
      </div>

      {/* Upload progress bar */}
      {status === "uploading" && (
        <div className="h-1.5 w-full rounded-full bg-white/40 overflow-hidden">
          <div className="h-full bg-indigo-400 animate-pulse w-2/3 rounded-full" />
        </div>
      )}

      {status === "done" && (
        <p className="text-[11px] text-emerald-600 font-medium">✓ 上传成功</p>
      )}
      {status === "error" && (
        <p className="text-[11px] text-rose-500">✗ {errMsg}</p>
      )}

      {/* Manual URL fallback — shares the same state as the hidden input */}
      <div>
        <label className="block text-[11px] text-gray-400 mb-1">或手动输入 MP4 链接</label>
        <input
          type="text"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setStatus("idle") }}
          placeholder="https://example.com/video.mp4"
          className={inputCls}
        />
      </div>

      {url && status !== "error" && (
        <p className="text-[11px] text-indigo-500 break-all truncate">{url}</p>
      )}
    </div>
  )
}
