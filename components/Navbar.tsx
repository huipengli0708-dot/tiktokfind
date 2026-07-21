'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, User, Flame } from 'lucide-react'
import Logo from './Logo'

const LINKS = [
  { href: '/', label: '首页', icon: Home },
  { href: '/picks', label: '趋势', icon: Flame },
  { href: '/favorites', label: '收藏', icon: Heart },
  { href: '/me', label: '我的', icon: User },
]

export default function Navbar() {
  const pathname = usePathname()

  // 后台、首页、趋势页（各自带顶部导航）不显示全局导航
  if (
    pathname === '/' ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/picks') ||
    pathname.startsWith('/concept-video-hero')
  ) return null

  return (
    <header className="fixed left-1/2 top-3 z-50 w-[min(64rem,calc(100%-2rem))] -translate-x-1/2">
      <div className="nav-glass flex h-14 items-center justify-between rounded-2xl px-5">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <Logo size={30} />
          <span className="text-lg font-bold tracking-wide">阿光选品</span>
        </Link>

        <nav className="flex items-center gap-1.5">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? 'flex items-center gap-1.5 rounded-xl bg-white px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-md'
                    : 'flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white'
                }
              >
                <Icon size={15} />
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
