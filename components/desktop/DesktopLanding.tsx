import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Flame, TrendingUp, Sparkles } from "lucide-react"
import type { VideoProduct } from "@/lib/mock-data"

interface Props {
  featuredVideos: VideoProduct[]
  allVideos: VideoProduct[]
}

export default function DesktopLanding({ featuredVideos, allVideos }: Props) {
  const previewVideos = (featuredVideos.length >= 3 ? featuredVideos : allVideos).slice(0, 6)
  const spotlightVideo = featuredVideos[0] ?? allVideos[0]
  const totalVideos = allVideos.length
  const avgScore =
    allVideos.length > 0
      ? Math.round(allVideos.reduce((s, v) => s + v.analysis.trendScore, 0) / allVideos.length)
      : 0
  const categories = new Set(allVideos.map((v) => v.category)).size

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(145deg, #FDFBFF 0%, #F3EEFF 35%, #FFF9F5 68%, #F7F2FF 100%)" }}
    >
      {/* ── Background blobs ─── */}
      <div className="fixed top-0 right-0 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none" style={{ background: "rgba(167,139,250,0.26)" }} />
      <div className="fixed top-80 -left-32 w-[440px] h-[440px] rounded-full blur-[130px] pointer-events-none" style={{ background: "rgba(250,204,21,0.18)" }} />
      <div className="fixed bottom-48 right-1/3 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(232,121,249,0.12)" }} />
      <div className="fixed bottom-0 left-1/4 w-60 h-60 rounded-full blur-[90px] pointer-events-none" style={{ background: "rgba(52,211,153,0.10)" }} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-14 pb-12 px-8 max-w-6xl mx-auto relative">
        {/* Dot grid texture */}
        <div className="absolute inset-0 dot-pattern pointer-events-none" style={{ opacity: 0.50 }} />
        {/* Scattered sparkle chars */}
        <span className="absolute top-10 left-[44%] text-violet-300 text-2xl select-none pointer-events-none" style={{ opacity: 0.65 }}>✦</span>
        <span className="absolute top-36 left-[36%] text-amber-300 text-lg select-none pointer-events-none" style={{ opacity: 0.55 }}>⋆</span>
        <span className="absolute bottom-8 left-[42%] text-rose-300 text-base select-none pointer-events-none" style={{ opacity: 0.45 }}>✧</span>

        <div className="relative grid grid-cols-[1fr_460px] gap-12 items-center">

          {/* ── LEFT: copy ──────────────────── */}
          <div>
            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 mt-2 text-xs font-semibold"
              style={{ background: "rgba(139,92,246,0.10)", border: "1px solid rgba(139,92,246,0.22)", color: "#6D28D9", boxShadow: "0 2px 12px rgba(139,92,246,0.14)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              每周更新 · TikTok 爆款研究
              <Sparkles size={11} />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-5">
              发现下一个{" "}
              <span style={{ background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #E879F9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                TikTok 爆款
              </span>
              <br />
              <span className="text-gray-400 font-normal text-4xl">做正确的事，把事情做正确</span>
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-9 max-w-lg">
              看一千条爆款视频，比拍一千条视频更重要
            </p>

            <div className="flex items-center gap-3 mb-10">
              <Link href="/videos" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-white text-sm btn-gradient hover:-translate-y-0.5 transition-transform">
                查看爆款视频 <ArrowRight size={15} />
              </Link>
              <Link href="/tool" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm btn-outline-glass">
                了解选品工具
              </Link>
            </div>

            {/* Stats pills */}
            <div className="flex items-center gap-3">
              {[
                { value: `${totalVideos}+`, label: "爆款案例", valColor: "text-violet-600", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.15)" },
                { value: String(avgScore), label: "本周上新视频数", valColor: "text-amber-600", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.18)" },
                { value: `${categories}+`, label: "今日访客数", valColor: "text-emerald-600", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.15)" },
              ].map(({ value, label, valColor, bg, border }) => (
                <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl" style={{ background: bg, border: `1px solid ${border}` }}>
                  <span className={`text-xl font-bold tabular-nums ${valColor}`}>{value}</span>
                  <span className="text-gray-500 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: visual centerpiece ────────────────── */}
          <div className="relative h-[540px]">

            {/* === MAIN ANALYSIS CARD === */}
            <div
              className="absolute top-12 left-6 right-2 rounded-3xl overflow-hidden z-10"
              style={{
                background: "white",
                border: "1.5px solid rgba(139,92,246,0.14)",
                boxShadow: "0 28px 72px rgba(139,92,246,0.18), 0 6px 24px rgba(0,0,0,0.07)",
              }}
            >
              {/* Card header */}
              <div className="px-5 pt-4 pb-3 flex items-center justify-between" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.07) 0%, rgba(232,121,249,0.04) 100%)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)" }}>
                    <TrendingUp size={13} className="text-white" />
                  </div>
                  <span className="text-gray-700 text-xs font-bold">本周爆款精选</span>
                </div>
                <span className="text-gray-400 text-[10px]">TikTok 深度分析</span>
              </div>

              <div className="px-5 py-4">
                {/* Product visual block */}
                <div className="flex items-start gap-3.5 mb-4">
                  {/* Big product emoji in gradient squircle */}
                  <div
                    className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center text-3xl shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
                      boxShadow: "0 4px 16px rgba(139,92,246,0.22), inset 0 1px 0 rgba(255,255,255,0.8)",
                    }}
                  >
                    🛍️
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-gray-800 text-sm font-bold leading-snug line-clamp-2 mb-2">
                      {spotlightVideo?.title ?? "TikTok 爆款商品深度分析"}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(139,92,246,0.09)", color: "#6D28D9", border: "1px solid rgba(139,92,246,0.16)" }}
                      >
                        {spotlightVideo?.category ?? "精选品类"}
                      </span>
                      {spotlightVideo?.content_type && (
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: "rgba(245,158,11,0.09)", color: "#92400E", border: "1px solid rgba(245,158,11,0.20)" }}
                        >
                          {spotlightVideo.content_type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metric rows */}
                {spotlightVideo && (
                  <div className="space-y-2 mb-4">
                    {[
                      { icon: "💰", label: "利润率", value: spotlightVideo.analysis.profitMargin.split("，")[0], color: "#059669", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.18)" },
                      { icon: "⚡", label: "竞争度", value: `${spotlightVideo.analysis.competitionLevel}竞争`, color: "#D97706", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.22)" },
                      { icon: "🎯", label: "内容方向", value: spotlightVideo.content_type ?? "商家实拍", color: "#7C3AED", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.18)" },
                    ].map(({ icon, label, value, color, bg, border }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="text-gray-400 text-[11px]">{icon} {label}</span>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ color, background: bg, border: `1px solid ${border}` }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Score progress bar */}
                {spotlightVideo && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-gray-400 text-[10px]">🔥 爆款指数</span>
                      <span className="text-violet-600 text-[10px] font-bold">{spotlightVideo.analysis.trendScore}/100</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: "rgba(139,92,246,0.10)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${spotlightVideo.analysis.trendScore}%`,
                          background: "linear-gradient(90deg, #7C3AED, #A78BFA, #E879F9)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* === SCORE CIRCLE BADGE — overlaps top-right of main card === */}
            {spotlightVideo && (
              <div
                className="absolute top-6 right-0 w-[58px] h-[58px] rounded-full flex flex-col items-center justify-center z-20"
                style={{
                  background: "linear-gradient(145deg, #FBBF24 0%, #F59E0B 100%)",
                  boxShadow: "0 5px 0 rgba(161,72,0,0.35), 0 10px 28px rgba(245,158,11,0.45)",
                  border: "2.5px solid rgba(255,255,255,0.90)",
                }}
              >
                <span className="text-white text-[8px] font-extrabold leading-none tracking-wide uppercase">score</span>
                <span className="text-white text-[22px] font-black leading-none">{spotlightVideo.analysis.trendScore}</span>
              </div>
            )}

            {/* === "HOT PICK" 3D STICKER — top-left, rotated === */}
            <div
              className="absolute top-3 left-0 z-20"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)",
                border: "2px solid rgba(109,40,217,0.50)",
                boxShadow: "0 5px 0 rgba(88,28,135,0.50), 0 10px 22px rgba(139,92,246,0.35)",
                borderRadius: "999px",
                padding: "7px 16px",
                fontSize: "12px",
                fontWeight: 800,
                color: "white",
                transform: "rotate(-6deg)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}
            >
              🔥 HOT PICK
            </div>

            {/* === PROFIT MINI CARD — bottom-left, floating === */}
            <div
              className="absolute bottom-28 -left-4 rounded-2xl px-4 py-3 z-20 float-b"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1.5px solid rgba(16,185,129,0.25)",
                boxShadow: "0 10px 32px rgba(16,185,129,0.22), 0 2px 8px rgba(0,0,0,0.06)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: "linear-gradient(135deg, #A7F3D0 0%, #34D399 100%)", boxShadow: "0 3px 10px rgba(52,211,153,0.35)" }}
                >
                  💰
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] leading-none mb-0.5">平均利润率</p>
                  <p className="text-emerald-600 text-base font-black leading-none">60–70%</p>
                </div>
              </div>
            </div>

            {/* === TREND METER CARD — bottom-right, floating === */}
            <div
              className="absolute bottom-16 right-0 rounded-2xl px-4 py-3 z-20 float-a"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1.5px solid rgba(139,92,246,0.22)",
                boxShadow: "0 10px 32px rgba(139,92,246,0.20), 0 2px 8px rgba(0,0,0,0.06)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: "linear-gradient(135deg, #DDD6FE 0%, #8B5CF6 100%)", boxShadow: "0 3px 10px rgba(139,92,246,0.35)" }}
                >
                  📈
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] leading-none mb-1.5">趋势热度</p>
                  {/* Bar meter */}
                  <div className="flex gap-[3px] items-end">
                    {[3, 5, 4, 7, 6, 8, 7].map((h, i) => (
                      <div
                        key={i}
                        className="w-[5px] rounded-sm"
                        style={{
                          height: `${h * 2.5}px`,
                          background: i >= 4
                            ? "linear-gradient(180deg, #7C3AED, #A78BFA)"
                            : "rgba(139,92,246,0.22)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* === "新手友好" 3D AMBER STICKER — bottom-left, rotated === */}
            <div
              className="absolute bottom-6 left-14 z-20 float-c"
              style={{
                background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
                border: "2px solid rgba(251,191,36,0.55)",
                boxShadow: "0 5px 0 rgba(161,98,7,0.28), 0 10px 22px rgba(251,191,36,0.32)",
                borderRadius: "999px",
                padding: "7px 16px",
                fontSize: "12px",
                fontWeight: 800,
                color: "#78350F",
                transform: "rotate(4deg)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
              }}
            >
              ✦ 新手友好
            </div>

            {/* === WEEKLY UPDATE STICKER — mid-right === */}
            <div
              className="absolute top-[200px] right-[-4px] z-20 float-e"
              style={{
                background: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
                border: "2px solid rgba(74,222,128,0.45)",
                boxShadow: "0 5px 0 rgba(22,101,52,0.22), 0 10px 22px rgba(74,222,128,0.28)",
                borderRadius: "999px",
                padding: "7px 14px",
                fontSize: "11px",
                fontWeight: 800,
                color: "#14532D",
                transform: "rotate(-3deg)",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                whiteSpace: "nowrap",
              }}
            >
              📊 每周更新
            </div>

            {/* Scattered sparkle chars around the right side */}
            <span className="absolute top-8 left-24 text-violet-300 text-xl select-none pointer-events-none" style={{ opacity: 0.65 }}>✦</span>
            <span className="absolute top-32 right-8 text-amber-300 text-base select-none pointer-events-none" style={{ opacity: 0.55 }}>⋆</span>
            <span className="absolute bottom-12 right-28 text-purple-300 text-lg select-none pointer-events-none" style={{ opacity: 0.45 }}>✧</span>
          </div>

        </div>
      </section>

      {/* ── Feature highlights ─────────────────────────────── */}
      <section className="px-8 pb-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-5">
          {[
            {
              emoji: "🔥",
              title: "爆款深度拆解",
              desc: "每期案例拆解爆红原因与内容规律，告诉你为什么它能爆，以及如何复制这个逻辑。",
              emojiGrad: "linear-gradient(135deg, #FDE68A 0%, #FBBF24 100%)",
              emojiShadow: "0 6px 20px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
              strip: "linear-gradient(90deg, #F59E0B, #FCD34D)",
              cornerBg: "linear-gradient(135deg, #F59E0B, #FBBF24)",
              cornerLabel: "每周新增",
              titleColor: "#92400E",
              border: "rgba(251,191,36,0.18)",
            },
            {
              emoji: "💰",
              title: "利润 & 市场数据",
              desc: "提供真实利润率区间、市场规模参考和竞争程度评估，帮你做出有依据的决策。",
              emojiGrad: "linear-gradient(135deg, #A7F3D0 0%, #34D399 100%)",
              emojiShadow: "0 6px 20px rgba(52,211,153,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
              strip: "linear-gradient(90deg, #10B981, #34D399)",
              cornerBg: "linear-gradient(135deg, #10B981, #34D399)",
              cornerLabel: "真实数据",
              titleColor: "#065F46",
              border: "rgba(16,185,129,0.15)",
            },
            {
              emoji: "📋",
              title: "内容打法建议",
              desc: "每个品类对应具体内容方向和起号策略，有 AI 加持，新手也能快速复现。",
              emojiGrad: "linear-gradient(135deg, #DDD6FE 0%, #8B5CF6 100%)",
              emojiShadow: "0 6px 20px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
              strip: "linear-gradient(90deg, #7C3AED, #A78BFA)",
              cornerBg: "linear-gradient(135deg, #7C3AED, #A78BFA)",
              cornerLabel: "AI 加持",
              titleColor: "#5B21B6",
              border: "rgba(139,92,246,0.12)",
            },
          ].map(({ emoji, title, desc, emojiGrad, emojiShadow, strip, cornerBg, cornerLabel, titleColor, border }) => (
            <div
              key={title}
              className="relative rounded-2xl p-5 pt-6 overflow-visible"
              style={{ background: "white", border: `1px solid ${border}`, boxShadow: "0 2px 20px rgba(139,92,246,0.07)" }}
            >
              {/* Colored top strip */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: strip }} />

              {/* Corner sticker badge */}
              <div
                className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white z-10"
                style={{
                  background: cornerBg,
                  boxShadow: "0 3px 0 rgba(0,0,0,0.18), 0 5px 14px rgba(0,0,0,0.12)",
                  transform: "rotate(6deg)",
                }}
              >
                {cornerLabel}
              </div>

              {/* Emoji in gradient squircle */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3 mt-1"
                style={{ background: emojiGrad, boxShadow: emojiShadow }}
              >
                {emoji}
              </div>
              <h3 className="font-bold text-sm mb-2" style={{ color: titleColor }}>{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Video grid ──────────────────────────────────────── */}
      {previewVideos.length > 0 && (
        <section className="px-8 pb-24 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 text-xl font-bold">看爆款，做爆款，成爆款</h2>
              <p className="text-gray-400 text-sm mt-0.5">点击任意商品查看完整分析</p>
            </div>
            <Link href="/videos" className="flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 transition-colors font-medium">
              全部 {totalVideos} 个 <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {previewVideos.map((video, idx) => {
              const cs = {
                低: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200/60" },
                中: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200/60" },
                高: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200/60" },
              }[video.analysis.competitionLevel] ?? { text: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200/60" }

              return (
                <Link
                  key={video.id}
                  href={`/videos/${video.slug}`}
                  className="group relative rounded-2xl overflow-visible h-72 transition-transform hover:-translate-y-1 duration-300"
                  style={{ boxShadow: "0 4px 20px rgba(139,92,246,0.09)", border: "1px solid rgba(139,92,246,0.08)" }}
                >
                  {/* Overflow clip for the image */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {video.coverImage ? (
                      <Image
                        src={video.coverImage}
                        alt={video.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-300"
                        sizes="(max-width: 1280px) 33vw, 400px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-purple-50 to-amber-50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Score badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className="inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm"
                      style={{ background: "rgba(254,243,199,0.92)", color: "#92400E", border: "1px solid rgba(245,158,11,0.25)" }}
                    >
                      <Flame size={10} /> {video.analysis.trendScore}
                    </span>
                  </div>

                  {/* Content type */}
                  {video.content_type && (
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm"
                        style={{ background: "rgba(255,255,255,0.88)", color: "#5B21B6", border: "1px solid rgba(139,92,246,0.18)" }}
                      >
                        {video.content_type}
                      </span>
                    </div>
                  )}

                  {/* "本周最热" corner sticker on first card */}
                  {idx === 0 && (
                    <div
                      className="absolute -top-3 -left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-extrabold"
                      style={{
                        background: "linear-gradient(135deg, #EF4444 0%, #F97316 100%)",
                        color: "white",
                        boxShadow: "0 4px 0 rgba(185,28,28,0.40), 0 6px 16px rgba(239,68,68,0.35)",
                        transform: "rotate(-8deg)",
                      }}
                    >
                      🏆 本周最热
                    </div>
                  )}
                  {/* "新品" sticker on third card */}
                  {idx === 2 && (
                    <div
                      className="absolute -top-3 -left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-extrabold"
                      style={{
                        background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
                        color: "white",
                        boxShadow: "0 4px 0 rgba(91,33,182,0.40), 0 6px 16px rgba(139,92,246,0.35)",
                        transform: "rotate(-6deg)",
                      }}
                    >
                      ✦ 高利润
                    </div>
                  )}

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <span className="text-white/55 text-[11px] mb-1.5 block">{video.category}</span>
                    <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-3">{video.title}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-emerald-300 font-medium">{video.analysis.profitMargin.split("，")[0]}</span>
                      <span className={`font-medium px-1.5 py-0.5 rounded-full text-[10px] border ${cs.text} ${cs.bg} ${cs.border}`}>
                        {video.analysis.competitionLevel}竞争
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/videos" className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-semibold btn-outline-glass">
              查看全部爆款分析 <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
