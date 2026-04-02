import { Film, Star, TrendingUp, Grid3x3 } from "lucide-react"

interface Stats {
  totalVideos: number
  featuredCount: number
  avgScore: number
  categories: number
}

const CARDS = [
  {
    key: "totalVideos" as const,
    label: "视频总数",
    suffix: "",
    icon: Film,
    iconColor: "text-violet-400",
    gradient: "from-violet-500/15 to-violet-600/5",
    border: "border-violet-500/15",
    glow: "shadow-[0_4px_24px_rgba(139,92,246,0.1)]",
  },
  {
    key: "featuredCount" as const,
    label: "精选爆款",
    suffix: "",
    icon: Star,
    iconColor: "text-amber-400",
    gradient: "from-amber-500/15 to-amber-600/5",
    border: "border-amber-500/15",
    glow: "shadow-[0_4px_24px_rgba(245,158,11,0.1)]",
  },
  {
    key: "avgScore" as const,
    label: "平均爆款指数",
    suffix: "",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    gradient: "from-emerald-500/15 to-emerald-600/5",
    border: "border-emerald-500/15",
    glow: "shadow-[0_4px_24px_rgba(16,185,129,0.1)]",
  },
  {
    key: "categories" as const,
    label: "覆盖品类",
    suffix: "",
    icon: Grid3x3,
    iconColor: "text-blue-400",
    gradient: "from-blue-500/15 to-blue-600/5",
    border: "border-blue-500/15",
    glow: "shadow-[0_4px_24px_rgba(59,130,246,0.1)]",
  },
]

export default function DesktopStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {CARDS.map(({ key, label, suffix, icon: Icon, iconColor, gradient, border, glow }) => (
        <div
          key={key}
          className={`rounded-2xl p-5 bg-gradient-to-br ${gradient} border ${border} ${glow}`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/45 text-xs font-medium">{label}</p>
            <Icon size={16} className={iconColor} />
          </div>
          <p className={`text-3xl font-bold ${iconColor} tabular-nums`}>
            {stats[key]}{suffix}
          </p>
        </div>
      ))}
    </div>
  )
}
