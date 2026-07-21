/**
 * 阿光 logo 标志（依据品牌规范重绘的 SVG 近似版）
 * 主体颜色跟随 currentColor，金点固定为品牌金色。
 * 如需像素级还原，把设计源文件（SVG/PNG）放进 public/ 后替换本组件。
 */
export default function Logo({
  size = 32,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="阿光"
    >
      {/* 外圈（右上留口） */}
      <path
        d="M 70 19.4 A 40 40 0 1 0 89.4 47"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* 内部笔画：右侧竖钩接微笑弧线 */}
      <path
        d="M 68 36 C 68 50 64 60 52 65 C 42 68 34 64 30 57"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* 金点 */}
      <circle cx="82" cy="25" r="8" fill="#D9A83C" />
    </svg>
  )
}
