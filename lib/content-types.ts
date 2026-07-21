/** DB 中存储的英文值 → 前端显示的中文 */
export const CONTENT_TYPE_LABELS: Record<string, string> = {
  merchant: '商家自制',
  creator:  '达人实拍',
  ai:       'AI 生成',
}

/** 各内容类型的主题色（深色主题下使用） */
export const CONTENT_TYPE_COLORS: Record<string, { dot: string; badge: string }> = {
  creator:  { dot: '#3B82F6', badge: 'bg-[#3B82F6]' },
  merchant: { dot: '#F97316', badge: 'bg-[#F97316]' },
  ai:       { dot: '#8B5CF6', badge: 'bg-[#8B5CF6]' },
}

/** 固定的筛选选项（顺序固定） */
export const CONTENT_TYPE_FILTER_OPTIONS = [
  { value: '全部',     label: '全部' },
  { value: 'creator',  label: '达人实拍' },
  { value: 'merchant', label: '商家自制' },
  { value: 'ai',       label: 'AI 生成' },
]

/** 将 DB 英文值转为中文，空值默认显示"商家自制" */
export function getContentTypeLabel(ct: string | null | undefined): string {
  if (!ct) return '商家自制'
  return CONTENT_TYPE_LABELS[ct] ?? ct
}
