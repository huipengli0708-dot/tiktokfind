'use client'

type Props = {
  title: string
  description: string
  updatedAt: string
}

export default function PageHeading({ title, description, updatedAt }: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="flex items-center gap-2 text-[13px] text-[#8B919B]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#71DFA2] opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#71DFA2]" />
          </span>
          美国站 · 每日更新
        </p>

        <h1 className="mt-3 text-[34px] font-semibold leading-tight tracking-tight text-[#F7F7F3] lg:text-[50px]">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-[#8B919B] lg:text-sm">
          {description}
        </p>
      </div>

      <p className="text-xs text-[#656B75] lg:pb-2">更新于 {updatedAt}</p>
    </div>
  )
}
