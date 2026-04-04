import { cn } from "@/lib/utils"

interface TagBadgeProps {
  label: string
  active?: boolean
  onClick?: () => void
  size?: "sm" | "md"
}

export default function TagBadge({ label, active = false, onClick, size = "sm" }: TagBadgeProps) {
  const isClickable = !!onClick

  if (isClickable) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "tag-pill cursor-pointer select-none transition-all duration-200",
          active && "tag-pill-active",
          size === "md" && "px-3 py-1 text-sm",
          !active && "hover:bg-violet-500/20 hover:border-violet-500/40"
        )}
      >
        {label}
      </button>
    )
  }

  return (
    <span
      className={cn(
        "tag-pill",
        active && "tag-pill-active",
        size === "md" && "px-3 py-1 text-sm"
      )}
    >
      {label}
    </span>
  )
}
