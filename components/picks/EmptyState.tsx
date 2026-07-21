'use client'

import { SearchX } from 'lucide-react'

type Props = {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

export default function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[16px] border border-[#252A32] bg-[#111419] px-6 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#252A32] bg-[#171A20] text-[#656B75]">
        <SearchX size={22} aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-medium text-[#F7F7F3]">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#8B919B]">{description}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-6 rounded-[10px] border border-[#252A32] bg-[#171A20] px-5 py-2.5 text-sm font-medium text-[#F7F7F3] transition-colors hover:border-[#3A404A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B44F]"
      >
        {actionLabel}
      </button>
    </div>
  )
}
