import { UserRound, Store, Sparkles } from 'lucide-react'
import type { PickType } from '@/lib/mock-picks'

export const TYPE_STYLE: Record<PickType, { label: string; text: string; bg: string; border: string }> = {
  达人: { label: '达人视频', text: 'text-[#7FA8D9]', bg: 'bg-[#16202B]', border: 'border-[#2C3D4F]' },
  商家: { label: '商家自制', text: 'text-[#D0A277]', bg: 'bg-[#241C15]', border: 'border-[#40332553]' },
  AI: { label: 'AI 生成', text: 'text-[#A9A2C4]', bg: 'bg-[#1D1B26]', border: 'border-[#332F42]' },
}

const ICONS = { 达人: UserRound, 商家: Store, AI: Sparkles } as const

export default function VideoTypeBadge({ type, size = 'md' }: { type: PickType; size?: 'sm' | 'md' }) {
  const s = TYPE_STYLE[type]
  const Icon = ICONS[type]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[7px] border ${s.border} ${s.bg} ${s.text} ${
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-[11px]'
      } font-medium`}
    >
      <Icon size={size === 'sm' ? 10 : 12} aria-hidden />
      {s.label}
    </span>
  )
}
