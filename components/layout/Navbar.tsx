"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/videos", label: "爆款视频" },
  { href: "/tool", label: "选品工具" },
  { href: "/contact", label: "关于我" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center btn-gradient">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-[15px] tracking-tight">
            阿光选品
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tool"
            className="ml-3 px-4 py-2 rounded-xl text-sm font-semibold btn-gradient"
          >
            获取选品工具
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-white/60 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden glass-card border-t border-white/40 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-white/60"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tool"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center btn-gradient"
          >
            获取选品工具 →
          </Link>
        </div>
      )}
    </header>
  )
}
