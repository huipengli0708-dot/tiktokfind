"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Play, Zap, LayoutDashboard, TrendingUp } from "lucide-react"

const navItems = [
  { href: "/", label: "数据总览", icon: LayoutDashboard },
  { href: "/videos", label: "视频库", icon: Play },
  { href: "/tool", label: "选品工具", icon: Zap },
  { href: "/admin/videos", label: "后台管理", icon: TrendingUp },
] as const

export default function DesktopSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 app-sidebar flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/[0.07]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
          <Home size={16} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-none mb-0.5">阿光选品</p>
          <p className="text-white/35 text-[10px]">TikTok 爆款研究</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">
          导航
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-violet-500/15 text-violet-300 border border-violet-500/20 shadow-[0_0_16px_rgba(139,92,246,0.08)]"
                  : "text-white/45 hover:text-white/75 hover:bg-white/[0.05]"
              }`}
            >
              <Icon
                size={16}
                className={active ? "text-violet-400" : "text-white/35"}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/[0.07]">
        <p className="text-white/20 text-[11px]">tiktokfind.com</p>
        <p className="text-white/15 text-[10px] mt-0.5">每周更新爆款数据</p>
      </div>
    </aside>
  )
}
