'use client'

import Link from 'next/link'
import { NAV_ITEMS, type NavKey } from './AppHeader'

type Props = {
  active: NavKey
  favoriteCount?: number
  /** 传入则拦截「收藏」的路由跳转，改为页面内切换 */
  onFavoriteClick?: () => void
}

export default function MobileNavigation({ active, favoriteCount = 0, onFavoriteClick }: Props) {
  return (
    <nav
      aria-label="底部导航"
      className="fixed inset-x-3 bottom-2.5 z-50 h-[62px] rounded-[18px] border border-[#252A32] bg-[#111419]/95 backdrop-blur-xl lg:hidden"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex h-full items-center">
        {NAV_ITEMS.map(({ key, label, icon: Icon, href }) => {
          const isActive = active === key
          const cls = `flex w-full flex-col items-center gap-1 rounded-[14px] py-2 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F] ${
            isActive ? 'text-[#E3B44F]' : 'text-[#8B919B]'
          }`
          const inner = (
            <>
              <span className="relative">
                <Icon size={19} aria-hidden />
                {key === 'favorites' && favoriteCount > 0 && (
                  <span className="absolute -right-2.5 -top-1.5 min-w-[15px] rounded-full bg-[#E3B44F] px-1 text-[9px] leading-[15px] text-[#080A0D]">
                    {favoriteCount}
                  </span>
                )}
              </span>
              {label}
            </>
          )

          return (
            <li key={key} className="flex-1">
              {key === 'favorites' && onFavoriteClick ? (
                <button
                  type="button"
                  onClick={onFavoriteClick}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={label}
                  className={cls}
                >
                  {inner}
                </button>
              ) : (
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={label}
                  className={cls}
                >
                  {inner}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
