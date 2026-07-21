import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Store, BarChart3 } from 'lucide-react'
import type { DbProduct } from '@/lib/db'
import FavoriteButton from './FavoriteButton'

const SOURCE_LABELS: Record<string, string> = {
  fastmoss: 'FastMoss',
  kalodata: 'Kalodata',
  manual: '阿光推荐',
}

/** 深色主题新品卡片：方图 + 来源角标 + 价格 + 点评 + 操作区 */
export default function ProductCard({ product }: { product: DbProduct }) {
  const sales = Object.entries(product.sales_data ?? {}).slice(0, 2)

  return (
    <div className="card-dark card-dark-hover flex flex-col overflow-hidden">
      {/* 主图 */}
      <Link href={`/products/${product.id}`} className="relative block aspect-square w-full overflow-hidden bg-[#0B0E15]">
        {product.cover_image ? (
          <Image
            src={product.cover_image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(min-width: 1280px) 300px, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">📦</div>
        )}
        <span className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[11px] font-bold text-[#F5D77C] backdrop-blur-sm">
          {SOURCE_LABELS[product.source] ?? product.source}
        </span>
      </Link>

      {/* 信息区 */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">{product.title}</p>
          {product.price && (
            <span className="shrink-0 text-sm font-bold text-[#7CB1FF]">{product.price}</span>
          )}
        </div>

        <p className="text-xs text-gray-500">{product.category}</p>

        {/* 数据摘要 */}
        {sales.length > 0 && (
          <div className="flex gap-2">
            {sales.map(([k, v]) => (
              <span key={k} className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-gray-300">
                {k}: {String(v)}
              </span>
            ))}
          </div>
        )}

        {/* 点评 */}
        {product.note && (
          <p className="line-clamp-2 text-[13px] leading-snug text-gray-300">{product.note}</p>
        )}

        {/* 操作区 */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link
            href={`/products/${product.id}`}
            className="btn-blue flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-[13px]"
          >
            <BarChart3 size={14} /> 查看详情
          </Link>
          {product.supplier_url ? (
            <a
              href={product.supplier_url}
              target="_blank"
              rel="noreferrer"
              className="btn-dark-outline flex items-center justify-center gap-1.5 px-3 py-2 text-[13px]"
            >
              <Store size={13} /> 货源
            </a>
          ) : product.source_url ? (
            <a
              href={product.source_url}
              target="_blank"
              rel="noreferrer"
              className="btn-dark-outline flex items-center justify-center gap-1.5 px-3 py-2 text-[13px]"
            >
              来源 <ExternalLink size={13} />
            </a>
          ) : null}
          <FavoriteButton targetType="product" targetId={product.id} dark />
        </div>
      </div>
    </div>
  )
}
