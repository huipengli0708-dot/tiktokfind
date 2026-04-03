import { getFeaturedVideos, getAllVideos } from "@/lib/db"
import MobileHome from "@/components/mobile/MobileHome"
import DesktopLanding from "@/components/desktop/DesktopLanding"

export const revalidate = 60

/**
 * Responsive homepage:
 *   < 768px  → MobileHome    (app-style: banner + cards + feed + bottom nav)
 *   ≥ 768px  → DesktopLanding (landing page: hero + CTAs + video grid + top nav)
 *
 * Device detection is CSS-only (md:hidden / hidden md:block).
 * Both layouts receive the same server-fetched Supabase data.
 */
export default async function HomePage() {
  const [featuredVideos, allVideos] = await Promise.all([
    getFeaturedVideos(),
    getAllVideos(),
  ])

  return (
    <>
      {/* Mobile — hidden on md+ */}
      <div className="md:hidden">
        <MobileHome featuredVideos={featuredVideos} allVideos={allVideos} />
      </div>

      {/* Desktop — hidden below md */}
      <div className="hidden md:block">
        <DesktopLanding featuredVideos={featuredVideos} allVideos={allVideos} />
      </div>
    </>
  )
}
