import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryText?: string
  secondaryText?: string
  primaryHref?: string
  secondaryHref?: string
  variant?: "default" | "compact"
}

export default function CTASection({
  title = "找到你的下一个爆款商品",
  subtitle = "使用阿光的选品工具，系统化发现 TikTok 爆款机会，少走弯路",
  primaryText = "立即获取选品工具",
  secondaryText = "查看更多爆款视频",
  primaryHref = "/tool",
  secondaryHref = "/videos",
  variant = "default",
}: CTASectionProps) {
  if (variant === "compact") {
    return (
      <div className="glass-card rounded-2xl p-6 text-center relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-indigo-400/10 blur-2xl" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-purple-400/10 blur-2xl" />
        <div className="relative z-10">
          <p className="text-sm font-semibold text-gray-700 mb-3">{subtitle}</p>
          <Link href={primaryHref} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-gradient">
            {primaryText} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="relative rounded-3xl overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-pink-500/6" />
      <div className="absolute inset-0 glass-card" />

      {/* 装饰球 */}
      <div className="glow-orb w-64 h-64 bg-indigo-400/20 -top-16 -right-16 slow-pulse" />
      <div className="glow-orb w-48 h-48 bg-purple-400/20 -bottom-12 -left-12 slow-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 px-6 py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200/60 text-indigo-700 text-xs font-medium mb-5">
          <Sparkles size={12} />
          专为 TikTok 卖家设计
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
          {title}
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm btn-gradient"
          >
            {primaryText} <ArrowRight size={15} />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm btn-outline-glass"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  )
}
