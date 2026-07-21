import { Mail } from 'lucide-react'
import BrandLogo from '@/components/picks/BrandLogo'

export const CONTACT_EMAIL = 'support@tiktokfind.com'

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#252A32] pb-12 pt-14">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-7">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2.5">
              <BrandLogo size={26} />
              <span className="text-[14px] font-medium text-[#F7F7F3]">阿光选品</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.7] text-[#8B919B]">好内容，先看见</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-[#8B919B] transition-colors hover:text-[#E3B44F]"
            >
              <Mail size={14} aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* 对外账号 */}
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-[#8B919B]">
            <a
              href="https://www.xiaohongshu.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#F7F7F3]"
            >
              小红书 @阿光聊选品
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#252A32] pt-6 text-[12px] text-[#656B75] sm:flex-row sm:items-center sm:justify-between">
          <p>数据仅供参考，经营决策请结合实际情况</p>
          <p>© {new Date().getFullYear()} 阿光选品</p>
        </div>
      </div>
    </footer>
  )
}
