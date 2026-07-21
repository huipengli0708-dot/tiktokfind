import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getProductById } from "@/lib/db"
import { updateProductAction } from "../../actions"
import ProductFormFields from "../../_components/ProductFormFields"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  return (
    <div className="page-bg min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        <Link href="/admin/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-emerald-600 transition-colors">
          <ArrowLeft size={14} /> 返回新品列表
        </Link>

        <h1 className="mt-3 mb-6 text-2xl font-bold text-gray-900">编辑新品</h1>

        <form action={updateProductAction} className="glass-card rounded-2xl p-6">
          <input type="hidden" name="id" value={product.id} />
          <ProductFormFields defaults={product} />
          <div className="mt-6 flex justify-end gap-3">
            <Link href="/admin/products" className="btn-outline-glass rounded-xl px-5 py-2.5 text-sm font-medium">
              取消
            </Link>
            <button type="submit" className="btn-gradient rounded-xl px-6 py-2.5 text-sm font-semibold">
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
