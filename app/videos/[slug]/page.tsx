import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Flame, ExternalLink, TrendingUp, Users, Lightbulb, AlertTriangle } from 'lucide-react'
import { getVideoBySlug } from '@/lib/db'
import { getContentTypeLabel, CONTENT_TYPE_COLORS } from '@/lib/content-types'
import FavoriteButton from '@/components/FavoriteButton'
import StarBackdrop from '@/components/StarBackdrop'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const video = await getVideoBySlug(slug)
  return { title: video?.title ?? '爆款拆解' }
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params
  const video = await getVideoBySlug(slug)
  if (!video) notFound()

  const { analysis, verdict } = video
  const typeColor = CONTENT_TYPE_COLORS[video.content_type ?? 'merchant'] ?? CONTENT_TYPE_COLORS.merchant

  return (
    <div className="relative min-h-screen">
      <StarBackdrop />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-24">
        {/* 返回 */}
        <Link href="/picks" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-white">
          <ArrowLeft size={16} /> 返回趋势列表
        </Link>

        {/* 头部卡 */}
        <div className="card-dark mt-4 p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md px-2.5 py-1 text-xs font-bold text-white ${typeColor.badge}`}>
                  {getContentTypeLabel(video.content_type)}
                </span>
                <span className="rounded-md bg-white/8 px-2.5 py-1 text-xs font-semibold text-gray-300">
                  {video.category}
                </span>
                {video.beginnerFriendly && (
                  <span className="rounded-md bg-[#F5D77C]/15 px-2.5 py-1 text-xs font-bold text-[#F5D77C]">新手友好</span>
                )}
              </div>
              <h1 className="mt-3 text-3xl font-black text-white">{video.title}</h1>
              {video.account && (
                <p className="mt-1.5 text-sm text-gray-400">@{video.account.replace(/^@/, '')}</p>
              )}
              {video.punchline && (
                <p className="mt-2 text-lg font-medium text-[#7CB1FF]">“{video.punchline}”</p>
              )}
              <p className="mt-2 text-[15px] text-gray-300">{video.shortDescription}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {video.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-3">
              <FavoriteButton targetType="video" targetId={video.id} size={20} dark />
              {analysis.trendScore > 0 && (
                <span className="flex flex-col items-center rounded-2xl bg-white/6 px-4 py-2">
                  <span className="flex items-center gap-1 text-2xl font-black text-[#F97316]">
                    <Flame size={20} className="fill-[#F97316]" />
                    {analysis.trendScore}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">趋势分</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 视频 */}
        <div className="card-dark mt-6 overflow-hidden">
          {video.video_source_type === 'mp4' && video.video_file_url ? (
            <video src={video.video_file_url} controls className="max-h-[520px] w-full bg-black" poster={video.coverImage} />
          ) : (
            <div className="relative">
              {video.coverImage && (
                <div className="relative h-72 w-full">
                  <Image src={video.coverImage} alt={video.title} fill className="object-cover" sizes="896px" />
                </div>
              )}
              {video.videoUrl && (
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-blue absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-5 py-2.5 text-sm"
                >
                  去 TikTok 看原视频 <ExternalLink size={14} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* 核心数据 */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <StatCard label="市场规模" value={analysis.marketSize || '—'} />
          <StatCard label="竞争程度" value={analysis.competitionLevel} />
          <StatCard label="利润空间" value={analysis.profitMargin || '—'} />
          <StatCard label="风险等级" value={verdict.riskLevel} />
        </div>

        {/* 为什么爆 */}
        {analysis.whyViral.length > 0 && (
          <Section icon={<TrendingUp size={18} />} title="为什么能爆">
            <ul className="flex flex-col gap-2.5">
              {analysis.whyViral.map((r, i) => (
                <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-gray-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/15 text-xs font-bold text-[#7CB1FF]">
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 目标人群 */}
        {video.targetAudience.length > 0 && (
          <Section icon={<Users size={18} />} title="目标人群">
            <div className="flex flex-wrap gap-2">
              {video.targetAudience.map((t, i) => (
                <span key={i} className="rounded-xl bg-white/6 px-4 py-2 text-sm font-medium text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* 内容策略 */}
        {video.contentStrategy.length > 0 && (
          <Section icon={<Lightbulb size={18} />} title="内容策略">
            <ul className="flex flex-col gap-2.5">
              {video.contentStrategy.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-gray-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B82F6]" />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 风险提示 */}
        {video.riskNotes.length > 0 && (
          <Section icon={<AlertTriangle size={18} />} title="风险提示" warm>
            <ul className="flex flex-col gap-2.5">
              {video.riskNotes.map((r, i) => (
                <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-[#E8D5A0]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5D77C]" />
                  {r}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 阿光判断 */}
        <div className="card-dark mt-6 p-7">
          <h2 className="text-lg font-bold text-white">🎯 阿光判断</h2>
          <div className="mt-4 flex items-center gap-4">
            <span className={`rounded-full px-5 py-2 text-sm font-bold text-white ${verdict.shouldDo ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB]' : 'bg-[#F0655A]'}`}>
              {verdict.shouldDo ? '✓ 值得做' : '✕ 谨慎入场'}
            </span>
            {verdict.recommendation > 0 && (
              <span className="text-sm font-semibold text-gray-300">推荐指数 {verdict.recommendation}/100</span>
            )}
          </div>
          {verdict.targetSeller && (
            <p className="mt-3 text-[15px] text-gray-300"><b className="text-white">适合谁做：</b>{verdict.targetSeller}</p>
          )}
          {verdict.contentApproach && (
            <p className="mt-2 text-[15px] text-gray-300"><b className="text-white">内容打法：</b>{verdict.contentApproach}</p>
          )}
          {video.roi && (
            <p className="mt-2 text-[15px] text-gray-300"><b className="text-white">ROI 预估：</b>{video.roi}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-dark p-5 text-center">
      <p className="text-lg font-black text-[#7CB1FF]">{value}</p>
      <p className="mt-1 text-xs font-semibold text-gray-500">{label}</p>
    </div>
  )
}

function Section({
  icon,
  title,
  warm,
  children,
}: {
  icon: React.ReactNode
  title: string
  warm?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={`card-dark mt-6 p-7 ${warm ? 'border-[#F5D77C]/25' : ''}`}>
      <h2 className={`flex items-center gap-2 text-lg font-bold ${warm ? 'text-[#F5D77C]' : 'text-white'}`}>
        <span className={warm ? 'text-[#F5D77C]' : 'text-[#3B82F6]'}>{icon}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}
