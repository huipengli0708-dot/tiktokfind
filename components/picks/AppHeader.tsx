'use client'

import Link from 'next/link'
import { Home, Flame, Bookmark, UserRound } from 'lucide-react'
import BrandLogo from './BrandLogo'

export type NavKey = 'home' | 'picks' | 'favorites' | 'me'

export const NAV_ITEMS: { key: NavKey; label: string; icon: typeof Home; href: string }[] = [
  { key: 'home', label: '首页', icon: Home, href: '/' },
  { key: 'picks', label: '趋势', icon: Flame, href: '/picks' },
  { key: 'favorites', label: '收藏', icon: Bookmark, href: '/picks?view=favorites' },
  { key: 'me', label: '我的', icon: UserRound, href: '/me' },
]

type Props = {
  active: NavKey
  favoriteCount?: number
  showDivider?: boolean
  /** 传入则拦截「收藏」的路由跳转，改为页面内切换 */
  onFavoriteClick?: () => void
}

export default function AppHeader({ active, favoriteCount = 0, showDivider = true, onFavoriteClick }: Props) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[68px] bg-[#080A0D]/85 backdrop-blur-xl ${
        showDivider ? 'border-b border-[#252A32]' : ''
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 lg:px-7">
        {/* 品牌 */}
        <Link href="/" aria-label="阿光选品 首页" className="flex items-center gap-2.5">
          <BrandLogo size={30} />
          <span className="text-[15px] font-medium tracking-wide text-[#F7F7F3]">阿光选品</span>
          <span className="rounded-[6px] border border-[#252A32] px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-[#8B919B]">
            BETA
          </span>
        </Link>

        {/* 桌面导航 */}
        <nav aria-label="主导航" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map(({ key, label, icon: Icon, href }) => {
            const isActive = active === key
            const cls = `flex items-center gap-1.5 rounded-[10px] px-3.5 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F] ${
              isActive
                ? 'bg-[#F7F7F3] text-[#080A0D]'
                : 'text-[#8B919B] hover:bg-[#171A20] hover:text-[#F7F7F3]'
            }`
            const badge =
              key === 'favorites' && favoriteCount > 0 ? (
                <span
                  className={`ml-0.5 rounded-[5px] px-1.5 py-0.5 text-[10px] ${
                    isActive ? 'bg-[#080A0D]/10 text-[#080A0D]' : 'bg-[#252A32] text-[#8B919B]'
                  }`}
                >
                  {favoriteCount}
                </span>
              ) : null

            // 「收藏」在趋势页内做状态切换，其余走真实路由
            if (key === 'favorites' && onFavoriteClick) {
              return (
                <button
                  key={key}
                  type="button"
                  onClick={onFavoriteClick}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={label}
                  className={cls}
                >
                  <Icon size={15} aria-hidden />
                  {label}
                  {badge}
                </button>
              )
            }

            return (
              <Link
                key={key}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
                className={cls}
              >
                <Icon size={15} aria-hidden />
                {label}
                {badge}
              </Link>
            )
          })}
        </nav>

        {/* 用户 */}
        <Link
          href="/me"
          aria-label="我的账户"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#252A32] bg-[#171A20] text-[13px] text-[#F7F7F3] transition-colors hover:border-[#3A404A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F]"
        >
          光
        </Link>
      </div>
    </header>
  )
}
