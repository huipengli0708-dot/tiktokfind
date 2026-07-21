/**
 * 内页背景：纯 CSS 深空 + 静态星点（零 canvas、零 JS，不影响性能）。
 * 动态星空只在首页使用（见 LandingHero）。
 */
export default function StarBackdrop() {
  return <div className="page-dark-bg star-dots fixed inset-0 -z-10" />
}
