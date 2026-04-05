"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TrendingUp } from "lucide-react"

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/videos", label: "爆款视频" },
  { href: "/tool", label: "选品工具" },
  { href: "/contact", label: "关于我" },
] as const

export default function DesktopNavbar() {
  const pathname = usePathname()

  // Hidden on admin routes and on mobile
  if (pathname.startsWith("/admin")) return null

  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 items-center justify-between px-8 app-desktop-nav">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
          <TrendingUp size={14} className="text-white" />
        </div>
        <span className="text-gray-900 font-bold text-sm">阿光选品</span>
      </Link>

      {/* Primary nav */}
      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "text-violet-700 bg-violet-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50/80"
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Low-priority admin entry — intentionally muted */}
      <Link
        href="/admin/login"
        className="text-xs text-gray-300 hover:text-gray-500 transition-colors px-2 py-1.5 shrink-0"
      >
        管理
      </Link>
    </header>
  )
}
