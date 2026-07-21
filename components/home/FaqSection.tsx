'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'

const FAQS = [
  {
    q: '数据是从哪里来的？准不准？',
    a: '视频数据来自美国站 TikTok 的公开榜单与增长指标，每天早上抓取当日候选，再结合第三方数据源交叉核对。所有进入榜单的内容都会人工过一遍，去重、核验，排除异常内容。数据用于判断趋势，经营决策请结合实际情况。',
  },
  {
    q: '为什么每天只有 15 条，不能多给一些吗？',
    a: '不是抓不到更多，是给多了你不会看。我们的目标是让你 10 分钟内完成判断，所以每类只留最值得看的 5 条。需要更大范围的原始数据，专业数据平台更合适——我们做的是判断，不是数据库。',
  },
  {
    q: '达人、商家、AI 三类有什么区别？',
    a: '达人实拍看老外如何把商品带入真实场景、信任怎么建立；商家自制看品牌如何展示商品并形成可持续生产的内容；AI 生成看新工具的出片方向和适合的品类。三类打法完全不同，分开看才知道哪种适合你现在的账号。',
  },
  {
    q: '看到爆款之后，怎么落地执行？',
    a: '每条内容会关联对应的 TikTok 链接与商品信息，「每日新品」栏目还会给出货源线索和预估价格带。从看见内容到着手执行，尽量不用再切换到其他工具。',
  },
  {
    q: '现在收费吗？',
    a: '不收费。每日精选内容永久免费开放，注册后即可使用收藏和历史记录。',
  },
  {
    q: '每天什么时候更新？',
    a: '每天上午 10:30（北京时间）更新当日内容，对应美国站前一日的完整数据周期。更新时间会显示在页面标题右侧。',
  },
  {
    q: '有问题或建议，怎么联系你们？',
    a: '发邮件到 support@tiktokfind.com，功能建议、数据纠错、合作洽谈都可以，我们会尽快回复。',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-b border-[#252A32] py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-7">
        <SectionHeading eyebrow="常见问题" title="你可能想问的事" />

        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-[16px] border border-[#252A32]">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={i > 0 ? 'border-t border-[#252A32]' : ''}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-5 bg-[#0B0E13] px-6 py-5 text-left transition-colors hover:bg-[#0F1216] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F] lg:px-8 lg:py-6"
                >
                  <span className="text-[14.5px] font-medium leading-[1.5] text-[#F7F7F3] lg:text-[15.5px]">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-[#252A32] bg-[#171A20] text-[#8B919B]"
                  >
                    <Plus size={14} aria-hidden />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden bg-[#0B0E13]"
                    >
                      <p className="max-w-[54ch] px-6 pb-7 text-[13.5px] leading-[1.85] text-[#8B919B] lg:px-8 lg:text-[14.5px]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
