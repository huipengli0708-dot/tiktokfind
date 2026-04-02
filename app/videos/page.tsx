import { getAllVideos } from "@/lib/db"
import VideosClientPage from "@/components/VideosClientPage"

export const revalidate = 60 // ISR：每60秒重新获取

export default async function VideosPage() {
  const videos = await getAllVideos()
  return <VideosClientPage videos={videos} />
}
