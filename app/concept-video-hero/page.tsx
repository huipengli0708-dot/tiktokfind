import type { Metadata } from 'next'
import VideoHeroConcept from '@/components/concept-video/VideoHeroConcept'
import AppHeader from '@/components/picks/AppHeader'
import StatsSection from '@/components/home/StatsSection'
import ComparisonSection from '@/components/home/ComparisonSection'
import SignalSection from '@/components/home/SignalSection'
import WhyFifteenSection from '@/components/home/WhyFifteenSection'
import WorkflowSection from '@/components/home/WorkflowSection'
import FaqSection from '@/components/home/FaqSection'
import FinalCTA from '@/components/home/FinalCTA'
import SiteFooter from '@/components/home/SiteFooter'

export const metadata: Metadata = {
  title: '动态视频首屏概念',
  description: '阿光选品动态视频首屏设计概念。',
}

export default function ConceptVideoHeroPage() {
  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F7F7F3]">
      <AppHeader active="home" showDivider={false} />
      <VideoHeroConcept />
      <main>
        <StatsSection />
        <ComparisonSection />
        <SignalSection />
        <WhyFifteenSection />
        <WorkflowSection />
        <FaqSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
