"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Flame } from "lucide-react"
import type { VideoProduct } from "@/lib/mock-data"

export default function BannerCarousel({ videos }: { videos: VideoProduct[] }) {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const slides = videos.slice(0, 5)

  function goTo(i: number) {
    const el = ref.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" })
    setActive(i)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      setActive(Math.round(el.scrollLeft / el.clientWidth))
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1) return
    const t = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % slides.length
        ref.current?.scrollTo({ left: next * (ref.current.clientWidth), behavior: "smooth" })
        return next
      })
    }, 4000)
    return () => clearInterval(t)
  }, [slides.length])

  if (slides.length === 0) return (
    <div className="mx-4 mb-5 h-44 rounded-3xl app-banner-empty flex items-center justify-center">
      <p className="text-white/30 text-sm">暂无精选内容</p>
    </div>
  )

  return (
    <div className="mx-4 mb-5">
      <div
        ref={ref}
        className="flex overflow-x-auto snap-x snap-mandatory rounded-3xl"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {slides.map((video) => (
          <Link
            key={video.id}
            href={`/videos/${video.slug}`}
            className="snap-start shrink-0 w-full relative h-48 flex-none block"
          >
            <Image
              src={video.coverImage}
              alt={video.title}
              fill
              className="object-cover"
              priority
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />

            {/* content */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-white/80 border border-white/20 backdrop-blur-sm">
                  {video.category}
                </span>
                {video.content_type && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/30 text-violet-200 border border-violet-400/20 backdrop-blur-sm">
                    {video.content_type}
                  </span>
                )}
              </div>
              <p className="text-white font-bold text-base leading-snug line-clamp-2 mb-2">
                {video.title}
              </p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Flame size={11} />
                  爆款指数 {video.analysis.trendScore}
                </span>
                <span className="text-white/50 text-xs">
                  {video.analysis.profitMargin}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* dots */}
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-violet-400" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
