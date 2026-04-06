"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Play, Zap, User } from "lucide-react"

const TABS = [
  { href: "/",        label: "首页", icon: Home },
  { href: "/videos",  label: "爆款", icon: Play },
  { href: "/tool",    label: "工具", icon: Zap  },
  { href: "/contact", label: "关于", icon: User },
] as const

export default function MobileFloatingTab() {
  const pathname = usePathname()

  // Never render inside admin
  if (pathname.startsWith("/admin")) return null

  return (
    <div
      className="fixed z-50 left-1/2 -translate-x-1/2 md:hidden"
      style={{ bottom: "max(20px, calc(env(safe-area-inset-bottom) + 12px))" }}
    >
      {/* Floating pill container */}
      <div
        className="flex items-center gap-1 rounded-full px-2 py-2"
        style={{
          background: "rgba(255, 255, 255, 0.82)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(139, 92, 246, 0.14)",
          boxShadow:
            "0 8px 32px rgba(139, 92, 246, 0.18), " +
            "0 2px 8px rgba(0, 0, 0, 0.08), " +
            "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        }}
      >
        {TABS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={[
                "relative flex items-center rounded-full transition-all duration-300 ease-in-out select-none",
                active
                  ? "gap-1.5 px-4 h-11"
                  : "w-11 h-11 justify-center hover:bg-violet-50 active:scale-90",
              ].join(" ")}
              style={
                active
                  ? {
                      background:
                        "linear-gradient(135deg, #7C3AED 0%, #6D28D9 55%, #4F46E5 100%)",
                      boxShadow:
                        "0 4px 18px rgba(124, 58, 237, 0.50), " +
                        "0 2px 6px rgba(0, 0, 0, 0.10), " +
                        "inset 0 1px 0 rgba(255, 255, 255, 0.20)",
                    }
                  : undefined
              }
            >
              <Icon
                size={active ? 17 : 20}
                strokeWidth={active ? 2.5 : 1.8}
                className={[
                  "shrink-0 transition-all duration-300",
                  active ? "text-white" : "text-gray-400",
                ].join(" ")}
              />

              {/* Label — slides in/out via max-width + opacity */}
              <span
                className={[
                  "text-[12px] font-bold text-white whitespace-nowrap overflow-hidden",
                  "transition-all duration-300 ease-in-out",
                  active ? "max-w-[64px] opacity-100" : "max-w-0 opacity-0",
                ].join(" ")}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
