"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Play, Zap, User } from "lucide-react"

const tabs = [
  { href: "/", label: "首页", icon: Home },
  { href: "/videos", label: "视频库", icon: Play },
  { href: "/tool", label: "工具", icon: Zap },
  { href: "/admin/login", label: "我的", icon: User },
] as const

export default function BottomNav() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 app-bottom-nav">
      <div className="flex items-center justify-around px-2 py-2 pb-[max(env(safe-area-inset-bottom,0px),8px)]">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl transition-colors ${
                active ? "text-violet-400" : "text-white/35"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "drop-shadow-[0_0_6px_rgba(167,139,250,0.7)]" : ""}
              />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
