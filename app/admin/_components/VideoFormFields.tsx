/** 新增 / 编辑视频的共享表单字段（Server Component） */
import Mp4UploadField from "./Mp4UploadField"

export interface FormDefaults {
  title?: string
  slug?: string
  video_url?: string | null
  video_source_type?: string | null
  video_file_url?: string | null
  cover_image?: string
  category?: string
  tags?: string[]
  short_description?: string
  profit_note?: string | null
  recommendation_score?: number | null
  is_published?: boolean
  is_featured?: boolean
  target_audience?: string[] | null
  content_strategy?: string[] | null
  content_type?: string | null
  risk_notes?: string[] | null
  // analysis JSONB 子字段
  punchline?: string
  whyViral?: string[]
  marketSize?: string
  competitionLevel?: string
  trendScore?: number
  roi?: string
  beginnerFriendly?: boolean
  shouldDo?: boolean
  targetSeller?: string
  contentApproach?: string
  riskLevel?: string
  viewCount?: number
  likeCount?: number
}

interface Props {
  defaults?: FormDefaults
}

const VIDEO_SOURCE_TYPES = ["tiktok", "mp4"] as const
const CONTENT_TYPES = ["商家实拍", "达人", "AI"] as const
const COMPETITION_LEVELS = ["低", "中", "高"] as const
const RISK_LEVELS = ["低", "中", "高"] as const

export default function VideoFormFields({ defaults = {} }: Props) {
  const d = defaults
  return (
    <div className="space-y-5">

      {/* ── 基础信息 ── */}
      <Section title="基础信息">
        <Field label="标题 *" name="title" required defaultValue={d.title}
          placeholder="迷你便携榨汁杯：30秒出杯，TikTok单周破万单" />
        <Field label="Slug *" name="slug" required defaultValue={d.slug}
          placeholder="mini-portable-juicer-cup"
          hint="用于URL，只含小写字母和横线，不可重复" />
        <Field label="封面图链接 *" name="cover_image" required defaultValue={d.cover_image ?? ""}
          placeholder="https://images.unsplash.com/photo-xxx?w=600&h=800&fit=crop" />
        <TwoCol>
          <SelectField label="视频来源类型" name="video_source_type"
            options={VIDEO_SOURCE_TYPES} defaultValue={d.video_source_type ?? "tiktok"} />
          <Field label="TikTok链接（来源=tiktok时填写）" name="video_url" defaultValue={d.video_url ?? ""}
            placeholder="https://www.tiktok.com/..." />
        </TwoCol>
        <Mp4UploadField defaultValue={d.video_file_url ?? ""} />
        <TwoCol>
          <Field label="分类 *" name="category" required defaultValue={d.category}
            placeholder="厨房好物 / 数码配件 / 家居生活" />
          <SelectField label="内容类型 *" name="content_type"
            options={CONTENT_TYPES} defaultValue={d.content_type ?? "商家实拍"} />
        </TwoCol>
        <Field label="标签（逗号分隔）" name="tags"
          defaultValue={d.tags?.join(", ") ?? ""}
          placeholder="便携,健康生活,爆款,高复购" />
        <TextareaField label="简介 *" name="short_description" required rows={2}
          defaultValue={d.short_description}
          placeholder="一句话描述产品和爆款逻辑" />
      </Section>

      {/* ── 运营数据 ── */}
      <Section title="运营数据">
        <TwoCol>
          <Field label="利润备注" name="profit_note" defaultValue={d.profit_note ?? ""}
            placeholder="55%-65%" />
          <Field label="推荐评分（0-100）" name="recommendation_score" type="number"
            defaultValue={d.recommendation_score?.toString() ?? ""}
            placeholder="88" />
        </TwoCol>
        <TwoCol>
          <Field label="ROI" name="roi" defaultValue={d.roi ?? ""}
            placeholder="ROI 3.2x" />
          <TwoCol>
            <Field label="播放量" name="viewCount" type="number"
              defaultValue={d.viewCount?.toString() ?? ""}
              placeholder="1000000" />
            <Field label="点赞量" name="likeCount" type="number"
              defaultValue={d.likeCount?.toString() ?? ""}
              placeholder="80000" />
          </TwoCol>
        </TwoCol>
        <div className="flex flex-wrap gap-6 pt-1">
          <Checkbox name="is_published" label="立即发布" defaultChecked={d.is_published ?? true} />
          <Checkbox name="is_featured" label="设为精选" defaultChecked={d.is_featured ?? false} />
          <Checkbox name="beginnerFriendly" label="新手友好" defaultChecked={d.beginnerFriendly ?? false} />
          <Checkbox name="shouldDo" label="建议做" defaultChecked={d.shouldDo ?? true} />
        </div>
      </Section>

      {/* ── 爆款分析 ── */}
      <Section title="爆款分析">
        <TextareaField label="一句话爆点（punchline）" name="punchline" rows={2}
          defaultValue={d.punchline}
          placeholder="30秒出杯，懒人健康赛道天花板级爆款，单周破万单已验证" />
        <TextareaField label="爆款原因（每行一条）" name="whyViral" rows={4}
          defaultValue={d.whyViral?.join("\n") ?? ""}
          placeholder={"视觉冲击强：榨汁过程颜色鲜艳\n演示感强：30秒可完整展示在短视频里\n痛点精准：打中白领和健身人群"} />
        <TwoCol>
          <Field label="市场规模" name="marketSize" defaultValue={d.marketSize ?? ""}
            placeholder="全球便携榨汁机市场超$15亿，年增长8.5%" />
          <Field label="爆款指数（trendScore）" name="trendScore" type="number"
            defaultValue={d.trendScore?.toString() ?? ""}
            placeholder="92" />
        </TwoCol>
        <TwoCol>
          <SelectField label="竞争等级" name="competitionLevel"
            options={COMPETITION_LEVELS} defaultValue={d.competitionLevel ?? "中"} />
          <SelectField label="风险等级" name="riskLevel"
            options={RISK_LEVELS} defaultValue={d.riskLevel ?? "中"} />
        </TwoCol>
        <TextareaField label="适合人群（targetSeller）" name="targetSeller" rows={2}
          defaultValue={d.targetSeller}
          placeholder="有一定内容基础的卖家，健康生活赛道新手也可快速切入" />
        <TextareaField label="内容打法（contentApproach）" name="contentApproach" rows={2}
          defaultValue={d.contentApproach}
          placeholder="颜色冲击开场 + 懒人场景痛点共鸣 + 30秒出杯完整演示" />
      </Section>

      {/* ── 详细内容 ── */}
      <Section title="详细内容（每行一条）">
        <TextareaField label="目标受众" name="target_audience" rows={4}
          defaultValue={d.target_audience?.join("\n") ?? ""}
          placeholder={"25-35岁城市白领，关注健康但没时间\n健身人群，需要运动后快速补充营养\n学生党，宿舍场景使用"} />
        <TextareaField label="内容策略" name="content_strategy" rows={4}
          defaultValue={d.content_strategy?.join("\n") ?? ""}
          placeholder={"开头3秒：展示颜色鲜艳水果被吸入并瞬间出汁\n痛点共鸣：外出想喝新鲜果汁但买不到\n结尾CTA：限时折扣 + 评论区截图送优惠券"} />
        <TextareaField label="风险提醒" name="risk_notes" rows={3}
          defaultValue={d.risk_notes?.join("\n") ?? ""}
          placeholder={"电机类产品注意110V/220V兼容性\n刀片属于敏感品类，部分平台需要额外审核\n需持续更新内容维持曝光"} />
      </Section>

    </div>
  )
}

/* ──── 内部小组件 ──── */

const inputCls = "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200/60 focus:border-indigo-300/50 transition-all backdrop-blur-sm"
const textareaCls = "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200/60 focus:border-indigo-300/50 transition-all backdrop-blur-sm resize-y"
const selectCls = "w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-200/60 transition-all backdrop-blur-sm"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-5 md:p-6 space-y-4">
      <h2 className="text-sm font-semibold text-gray-700 border-b border-white/40 pb-2">{title}</h2>
      {children}
    </div>
  )
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
}

function Field({
  label, name, required, placeholder, hint, type = "text", defaultValue,
}: {
  label: string; name: string; required?: boolean; placeholder?: string
  hint?: string; type?: string; defaultValue?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <input type={type} name={name} required={required} placeholder={placeholder}
        defaultValue={defaultValue ?? ""} className={inputCls} />
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

function TextareaField({
  label, name, required, placeholder, rows = 3, defaultValue,
}: {
  label: string; name: string; required?: boolean; placeholder?: string
  rows?: number; defaultValue?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <textarea name={name} required={required} placeholder={placeholder}
        rows={rows} defaultValue={defaultValue ?? ""} className={textareaCls} />
    </div>
  )
}

function SelectField({
  label, name, options, defaultValue,
}: {
  label: string; name: string; options: readonly string[]; defaultValue?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <select name={name} defaultValue={defaultValue ?? options[0]} className={selectCls}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" name={name} defaultChecked={defaultChecked}
        className="w-4 h-4 rounded accent-indigo-500" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}
