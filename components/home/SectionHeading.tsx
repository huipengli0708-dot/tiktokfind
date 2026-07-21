'use client'

import Reveal from './Reveal'
import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** 右侧附加内容（如查看链接），仅 align="left" 时生效 */
  aside?: ReactNode
  align?: 'center' | 'left'
}

/**
 * 全站统一的区块标题排版。
 * 排版规范：
 *  - eyebrow 13px / 字距 0.08em / 金色
 *  - 标题 clamp(28px, 4vw, 44px) / leading-[1.22] / tracking-tight
 *  - 说明文 15px / leading-[1.75] / 最大 46 个中文字宽，保证每行长度舒适
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
  align = 'center',
}: Props) {
  const centered = align === 'center'

  return (
    <Reveal>
      <div
        className={
          centered
            ? 'mx-auto max-w-3xl text-center'
            : 'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'
        }
      >
        <div className={centered ? '' : 'max-w-2xl'}>
          <p className="text-[13px] font-medium tracking-[0.08em] text-[#E3B44F]">{eyebrow}</p>

          <h2 className="mt-3.5 text-[28px] font-semibold leading-[1.22] tracking-tight text-[#F7F7F3] sm:text-[34px] lg:text-[44px]">
            {title}
          </h2>

          {description && (
            <p
              className={`mt-[18px] text-[14px] leading-[1.75] text-[#8B919B] lg:text-[15px] ${
                centered ? 'mx-auto max-w-[42ch]' : 'max-w-[46ch]'
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {!centered && aside && <div className="shrink-0 lg:pb-1.5">{aside}</div>}
      </div>
    </Reveal>
  )
}
