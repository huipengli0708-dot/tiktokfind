import AppHeader from '@/components/picks/AppHeader'
import MobileNavigation from '@/components/picks/MobileNavigation'
import VideoHeroConcept from '@/components/concept-video/VideoHeroConcept'
import StatsSection from '@/components/home/StatsSection'
import ComparisonSection from '@/components/home/ComparisonSection'
import SignalSection from '@/components/home/SignalSection'
import WhyFifteenSection from '@/components/home/WhyFifteenSection'
import WorkflowSection from '@/components/home/WorkflowSection'
import FaqSection from '@/components/home/FaqSection'
import FinalCTA from '@/components/home/FinalCTA'
import SiteFooter from '@/components/home/SiteFooter'

export const metadata = {
  title: '阿光选品 | 好内容，先看见',
  description:
    '关注美国 TikTok 上的创作者、品牌与 AI 内容，发现正在起势的商品和表达。以数据洞察问题本质，通过内容创新，激发生意增长。',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F7F7F3]">
      <AppHeader active="home" showDivider={false} />
      <main className="pb-24 lg:pb-0">
        <VideoHeroConcept />
        <StatsSection />
        <ComparisonSection />
        <SignalSection />
        <WhyFifteenSection />
        <WorkflowSection />
        <FaqSection />
        <FinalCTA />
      </main>
      <SiteFooter />
      <MobileNavigation active="home" />
    </div>
  )
}
