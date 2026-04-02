import Link from "next/link"
import { TrendingUp, Heart } from "lucide-react"

const footerLinks = [
  { href: "/videos", label: "爆款视频" },
  { href: "/tool", label: "选品工具" },
  { href: "/contact", label: "关于我" },
]

export default function Footer() {
  return (
    <footer className="relative mt-16">
      {/* 顶部渐变分隔 */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-200/60 to-transparent" />

      <div className="glass-nav py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center btn-gradient">
                  <TrendingUp size={14} className="text-white" />
                </div>
                <span className="font-bold text-gray-800 text-sm tracking-tight">阿光选品</span>
              </Link>
              <p className="text-xs text-gray-500 text-center md:text-left max-w-[200px]">
                TikTok 爆款选品研究 · 内容变现方法论
              </p>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA小按钮 */}
            <Link
              href="/tool"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold btn-gradient"
            >
              获取选品工具
            </Link>
          </div>

          {/* 底部版权 */}
          <div className="mt-8 pt-6 border-t border-white/40 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">
              © 2024 阿光选品. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              用 <Heart size={10} className="text-rose-400 fill-rose-400" /> 研究爆款
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
