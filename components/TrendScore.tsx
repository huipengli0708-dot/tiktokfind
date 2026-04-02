interface TrendScoreProps {
  score: number
  label?: string
}

export default function TrendScore({ score, label = "爆款指数" }: TrendScoreProps) {
  const color = score >= 90 ? "#10b981" : score >= 75 ? "#f59e0b" : "#6366f1"

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="trend-bar-track">
        <div
          className="trend-bar-fill"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
