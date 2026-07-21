import type { DbProduct } from "@/lib/db"

/** 视频/新品共用的输入框样式 */
const inputCls =
  "w-full px-3 py-2 rounded-xl text-sm bg-white/70 border border-white/60 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-200/70 transition-all"

export default function ProductFormFields({ defaults }: { defaults?: Partial<DbProduct> }) {
  const salesDataText = defaults?.sales_data
    ? JSON.stringify(defaults.sales_data, null, 2)
    : ""

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="text-sm font-medium text-gray-600 sm:col-span-2">
        品名 *
        <input name="title" required defaultValue={defaults?.title ?? ""} placeholder="如：便携挂脖风扇" className={`mt-1 ${inputCls}`} />
      </label>

      <label className="text-sm font-medium text-gray-600">
        主图 URL
        <input name="cover_image" defaultValue={defaults?.cover_image ?? ""} placeholder="https://..." className={`mt-1 ${inputCls}`} />
      </label>

      <label className="text-sm font-medium text-gray-600">
        类目
        <input name="category" defaultValue={defaults?.category ?? ""} placeholder="如：家居日用" className={`mt-1 ${inputCls}`} />
      </label>

      <label className="text-sm font-medium text-gray-600">
        售价
        <input name="price" defaultValue={defaults?.price ?? ""} placeholder="如：$9.99 或 $5-15" className={`mt-1 ${inputCls}`} />
      </label>

      <label className="text-sm font-medium text-gray-600">
        数据来源
        <select name="source" defaultValue={defaults?.source ?? "manual"} className={`mt-1 ${inputCls}`}>
          <option value="manual">阿光推荐（手动）</option>
          <option value="fastmoss">FastMoss</option>
          <option value="kalodata">Kalodata</option>
        </select>
      </label>

      <label className="text-sm font-medium text-gray-600">
        来源页链接
        <input name="source_url" defaultValue={defaults?.source_url ?? ""} placeholder="https://..." className={`mt-1 ${inputCls}`} />
      </label>

      <label className="text-sm font-medium text-gray-600">
        1688 货源链接
        <input name="supplier_url" defaultValue={defaults?.supplier_url ?? ""} placeholder="https://detail.1688.com/..." className={`mt-1 ${inputCls}`} />
      </label>

      <label className="text-sm font-medium text-gray-600 sm:col-span-2">
        标签（逗号分隔）
        <input name="tags" defaultValue={(defaults?.tags ?? []).join(", ")} placeholder="如：夏季, 户外, 低客单" className={`mt-1 ${inputCls}`} />
      </label>

      <label className="text-sm font-medium text-gray-600 sm:col-span-2">
        销售数据（JSON 或每行「键: 值」）
        <textarea
          name="sales_data"
          rows={4}
          defaultValue={salesDataText}
          placeholder={'{"sales": "1.2万", "growth": "+230%", "creators": "56"}'}
          className={`mt-1 font-mono text-xs ${inputCls}`}
        />
      </label>

      <label className="text-sm font-medium text-gray-600 sm:col-span-2">
        阿光点评
        <textarea name="note" rows={3} defaultValue={defaults?.note ?? ""} placeholder="为什么值得关注、怎么打…" className={`mt-1 ${inputCls}`} />
      </label>

      <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
        <input type="checkbox" name="is_published" defaultChecked={defaults?.is_published ?? false} className="h-4 w-4 accent-emerald-500" />
        立即发布
      </label>
    </div>
  )
}
