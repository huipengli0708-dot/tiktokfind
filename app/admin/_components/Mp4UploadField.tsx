"use client"

import { useRef, useState } from "react"
import { supabase } from "@/lib/supabase"

const MAX_SIZE = 50 * 1024 * 1024 // 50 MB
const BUCKET = "videos"

interface Props {
  defaultValue?: string
  /** Called with the Supabase public URL after a successful upload */
  onCoverGenerated?: (coverUrl: string) => void
}

type Status = "idle" | "uploading" | "done" | "error"

/** Extract the first visible frame from a video File as a JPEG Blob */
function extractFirstFrame(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    const video = document.createElement("video")
    video.muted = true
    video.playsInline = true
    video.preload = "auto"

    const objectUrl = URL.createObjectURL(file)
    video.src = objectUrl

    const cleanup = () => URL.revokeObjectURL(objectUrl)

    video.addEventListener(
      "seeked",
      () => {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth || 720
        canvas.height = video.videoHeight || 1280
        const ctx = canvas.getContext("2d")
        if (!ctx) { cleanup(); resolve(null); return }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => { cleanup(); resolve(blob) },
          "image/jpeg",
          0.85
        )
      },
      { once: true }
    )

    video.addEventListener("error", () => { cleanup(); resolve(null) }, { once: true })

    video.addEventListener(
      "loadedmetadata",
      () => { video.currentTime = 0.1 },
      { once: true }
    )
  })
}

export default function Mp4UploadField({ defaultValue = "", onCoverGenerated }: Props) {
  const [url, setUrl] = useState(defaultValue)
  const [status, setStatus] = useState<Status>("idle")
  const [errMsg, setErrMsg] = useState("")
  const [coverStatus, setCoverStatus] = useState<"idle" | "generating" | "done" | "failed">("idle")
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "video/mp4") {
      setStatus("error"); setErrMsg("只支持 MP4 格式"); return
    }
    if (file.size > MAX_SIZE) {
      setStatus("error")
      setErrMsg(`文件超过 50MB（当前 ${(file.size / 1024 / 1024).toFixed(1)} MB）`)
      return
    }

    setStatus("uploading")
    setErrMsg("")

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const ts = Date.now()
    const videoPath = `${ts}-${safeName}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(videoPath, file, { contentType: "video/mp4", upsert: false })

    if (uploadError) {
      setStatus("error"); setErrMsg(uploadError.message); return
    }

    const { data: videoData } = supabase.storage.from(BUCKET).getPublicUrl(videoPath)
    setUrl(videoData.publicUrl)
    setStatus("done")

    // ── Auto-generate cover from first frame ──
    if (onCoverGenerated) {
      setCoverStatus("generating")
      try {
        const frameBlob = await extractFirstFrame(file)
        if (frameBlob) {
          const coverPath = `covers/${ts}-${safeName.replace(/\.mp4$/i, "")}.jpg`
          const { error: coverErr } = await supabase.storage
            .from(BUCKET)
            .upload(coverPath, frameBlob, { contentType: "image/jpeg", upsert: false })
          if (!coverErr) {
            const { data: coverData } = supabase.storage.from(BUCKET).getPublicUrl(coverPath)
            onCoverGenerated(coverData.publicUrl)
            setCoverStatus("done")
          } else {
            setCoverStatus("failed")
          }
        } else {
          setCoverStatus("failed")
        }
      } catch {
        setCoverStatus("failed")
      }
    }
  }

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200/60 focus:border-indigo-300/50 transition-all backdrop-blur-sm"

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
        MP4 视频文件（来源=mp4时）
      </label>

      {/* Hidden input the server action reads */}
      <input type="hidden" name="video_file_url" value={url} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={status === "uploading"}
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "uploading" ? "上传中…" : "选择 MP4 文件"}
        </button>
        <input ref={fileRef} type="file" accept="video/mp4" className="hidden" onChange={handleFileChange} />
        <span className="text-[11px] text-gray-400">最大 50 MB，仅限 MP4</span>
      </div>

      {status === "uploading" && (
        <div className="h-1.5 w-full rounded-full bg-white/40 overflow-hidden">
          <div className="h-full bg-indigo-400 animate-pulse w-2/3 rounded-full" />
        </div>
      )}
      {status === "done" && (
        <p className="text-[11px] text-emerald-600 font-medium">
          ✓ 视频上传成功
          {coverStatus === "generating" && " · 封面生成中…"}
          {coverStatus === "done" && " · 封面已自动生成"}
          {coverStatus === "failed" && " · 封面提取失败（将使用空白封面）"}
        </p>
      )}
      {status === "error" && <p className="text-[11px] text-rose-500">✗ {errMsg}</p>}

      {/* Manual URL fallback */}
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
