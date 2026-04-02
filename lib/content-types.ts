/** DB 中存储的英文值 → 前端显示的中文 */
export const CONTENT_TYPE_LABELS: Record<string, string> = {
  merchant: '商家实拍',
  creator:  '达人',
  ai:       'AI',
}

/** 固定的筛选选项（顺序固定） */
export const CONTENT_TYPE_FILTER_OPTIONS = [
  { value: '全部',   label: '全部' },
  { value: 'merchant', label: '商家实拍' },
  { value: 'creator',  label: '达人' },
  { value: 'ai',       label: 'AI' },
]

/** 将 DB 英文值转为中文，空值默认显示"商家实拍" */
export function getContentTypeLabel(ct: string | null | undefined): string {
  if (!ct) return '商家实拍'
  return CONTENT_TYPE_LABELS[ct] ?? ct
}
