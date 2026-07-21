import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, BarChart3, Store } from 'lucide-react'
import { getProductById } from '@/lib/db'
import FavoriteButton from '@/components/FavoriteButton'
import StarBackdrop from '@/components/StarBackdrop'

export const revalidate = 60

const SOURCE_LABELS: Record<string, string> = {
  fastmoss: 'FastMoss',
  kalodata: 'Kalodata',
  manual: '阿光推荐',
}

/** sales_data 常见字段 → 中文标签 */
const METRIC_LABELS: Record<string, string> = {
  sales: '销量',
  sales_7d: '近7天销量',
  sales_30d: '近30天销量',
  gmv: 'GMV',
  gmv_7d: '近7天GMV',
  growth: '增速',
  creators: '带货达人数',
  videos: '关联视频数',
  live: '直播场次',
  commission: '佣金率',
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)
  return { title: product?.title ?? '每日新品' }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  const metrics = Object.entries(product.sales_data ?? {}).filter(
    ([, v]) => v !== null && v !== '' && typeof v !== 'object'
  )

  return (
    <div className="relative min-h-screen">
      <StarBackdrop />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-24">
        <Link href="/picks" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-white">
          <ArrowLeft size={16} /> 返回趋势列表
        </Link>

        {/* 头部卡 */}
        <div className="card-dark mt-4 p-8">
          <div className="flex items-start gap-8">
            <div className="relative h-52 w-52 shrink-0 overflow-hidden rounded-2xl bg-[#0B0E15]">
              {product.cover_image ? (
                <Image src={product.cover_image} alt={product.title} fill className="object-cover" sizes="208px" />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl">📦</div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#F5D77C]/15 px-2.5 py-1 text-xs font-bold text-[#F5D77C]">
                    {SOURCE_LABELS[product.source] ?? product.source}
                  </span>
                  <span className="rounded-md bg-white/8 px-2.5 py-1 text-xs font-semibold text-gray-300">
                    {product.category}
                  </span>
                </div>
                <FavoriteButton targetType="product" targetId={product.id} size={20} dark />
              </div>
              <h1 className="mt-3 text-3xl font-black text-white">{product.title}</h1>
              {product.price && (
                <p className="mt-2 text-2xl font-black text-[#7CB1FF]">{product.price}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(product.tags ?? []).map((t) => (
                  <span key={t} className="rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                {product.source_url && (
                  <a href={product.source_url} target="_blank" rel="noreferrer" className="btn-blue inline-flex items-center gap-1.5 px-5 py-2.5 text-sm">
                    查看数据来源 <ExternalLink size={14} />
                  </a>
                )}
                {product.supplier_url && (
                  <a href={product.supplier_url} target="_blank" rel="noreferrer" className="btn-dark-outline inline-flex items-center gap-1.5 px-5 py-2.5 text-sm">
                    <Store size={14} /> 1688 货源
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 销售数据 */}
        {metrics.length > 0 && (
          <div className="card-dark mt-6 p-7">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <BarChart3 size={18} className="text-[#3B82F6]" /> 销售数据
            </h2>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {metrics.map(([key, value]) => (
                <div key={key} className="rounded-xl bg-white/5 p-4 text-center">
                  <p className="text-lg font-black text-[#7CB1FF]">{String(value)}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    {METRIC_LABELS[key] ?? key}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 阿光点评 */}
        {product.note && (
          <div className="card-dark mt-6 border-[#F5D77C]/25 p-7">
            <h2 className="text-lg font-bold text-[#F5D77C]">💡 阿光点评</h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#E8D5A0]">
              {product.note}
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-gray-600">
          数据仅供参考，选品前请自行核实。
        </p>
      </div>
    </div>
  )
}
