import { getFeaturedVideos, getAllVideos } from "@/lib/db"
import MobileHome from "@/components/mobile/MobileHome"
import DesktopHome from "@/components/desktop/DesktopHome"

export const revalidate = 60

/**
 * Responsive homepage:
 *   < 768px (md)  → MobileHome  (dark app-style layout)
 *   ≥ 768px (md)  → DesktopHome (sidebar dashboard layout)
 *
 * Both layouts receive the same server-fetched data.
 * CSS show/hide (md:hidden / hidden md:block) avoids hydration mismatches.
 */
export default async function HomePage() {
  const [featuredVideos, allVideos] = await Promise.all([
    getFeaturedVideos(),
    getAllVideos(),
  ])

  return (
    <>
      {/* ── Mobile (hidden on md+) ── */}
      <div className="md:hidden">
        <MobileHome featuredVideos={featuredVideos} allVideos={allVideos} />
      </div>

      {/* ── Desktop (hidden below md) ── */}
      <div className="hidden md:block">
        <DesktopHome featuredVideos={featuredVideos} allVideos={allVideos} />
      </div>
    </>
  )
}
