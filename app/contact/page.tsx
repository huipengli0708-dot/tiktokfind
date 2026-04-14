import Link from "next/link"
import { TrendingUp, MessageCircle, Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于我 & 联系方式",
  description: "了解阿光，TikTok 爆款选品研究者，联系咨询选品工具与合作。",
}

const socialLinks = [
  {
    platform: "抖音",
    handle: "阿光聊选品",
    desc: "TikTok美区选品实战分享",
    icon: "📱",
    color: "from-gray-800 to-gray-900",
    available: false,
  },
  {
    platform: "小红书",
    handle: "阿光聊选品",
    desc: "图文版选品分析与心得",
    icon: "📔",
    color: "from-rose-500 to-pink-600",
    available: false,
  },
  {
    platform: "视频号",
    handle: "阿光聊选品",
    desc: "深度拆解爆款逻辑",
    icon: "🎬",
    color: "from-emerald-500 to-teal-600",
    available: false,
  },
]

const myStory = [
  "第一阶段：2023年8月入局TikTok美区，从0开始做店铺渠道号（双开号），第一个月单日做到5000美金，12个号累计做到30万美金GMV",
  "第二阶段：开始做保健品截流，虽然因封店失败，但积累了大量选品和跟品经验",
  "第三阶段：转向自有品牌，孵化两个千万GMV级保健品品牌，通过混剪素材+Ads投放，多次进入单日销量榜Top10",
  "第四阶段：开始做产品实拍，组建团队，打磨产品与内容，专注做长期可复制的爆款模型",
]

const contactMethods = [
  {
    title: "微信咨询",
    desc: "最快获得回复，工作日 24 小时内必回",
    value: "请通过下方表单留言，我会发送微信二维码",
    icon: <MessageCircle size={18} className="text-green-500" />,
    bgClass: "bg-green-50/60 border-green-100/60",
  },
  {
    title: "邮件联系",
    desc: "适合详细咨询和合作沟通",
    value: "aguang.picks@example.com（示例）",
    icon: <Mail size={18} className="text-blue-500" />,
    bgClass: "bg-blue-50/60 border-blue-100/60",
  },
]

const consultTopics = [
  "想购买选品工具，了解更多细节",
  "有具体商品想请阿光帮分析爆款潜力",
  "内容创作方向迷茫，想咨询选品建议",
  "媒体采访、合作邀约",
]

export default function ContactPage() {
  return (
    <div className="page-bg">
      {/* 背景装饰 */}
      <div className="glow-orb w-80 h-80 bg-indigo-300/20 top-0 right-0 slow-pulse" />
      <div className="glow-orb w-64 h-64 bg-purple-300/15 top-40 -left-20 slow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 py-10">

        {/* ===== 关于我 ===== */}
        <section className="py-8 md:py-12">
          <div className="glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <div className="glow-orb w-40 h-40 bg-indigo-200/20 -top-8 -right-8" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              {/* 头像占位 */}
              <div className="shrink-0 mx-auto md:mx-0">
                <div className="w-28 h-28 rounded-3xl btn-gradient flex items-center justify-center shadow-xl float-anim">
                  <TrendingUp size={40} className="text-white" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200/60 text-indigo-700 text-xs font-medium mb-3">
                  <Sparkles size={11} />
                  美区TikTok千万级卖家
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">嗨，我是阿光 👋</h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  这个网站是我对TikTok美区的实战总结。
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  如果你是刚入局的小白，或者国内商家想了解海外市场，
                  这里能帮你用最短时间看懂：
                  什么产品在卖，为什么能卖，怎么去做。<br /><br />
                  不用踩坑，直接看结果。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 我的故事 ===== */}
        <section className="py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">我的经历</h2>
          <div className="space-y-3">
            {myStory.map((story, i) => (
              <div key={i} className="flex items-start gap-3 glass-card rounded-xl p-4">
                <span className="w-6 h-6 rounded-full btn-gradient text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{story}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 社媒入口 ===== */}
        <section className="py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">在这里找到我</h2>
          <p className="text-gray-400 text-xs mb-4">账号持续建设中，敬请关注</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialLinks.map((social, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 text-center relative"
              >
                <div className="text-3xl mb-2">{social.icon}</div>
                <div className="font-semibold text-gray-800 text-sm mb-0.5">{social.platform}</div>
                <div className="text-xs text-indigo-600 font-mono mb-1.5">{social.handle}</div>
                <p className="text-[11px] text-gray-500">{social.desc}</p>
                {!social.available && (
                  <div className="mt-3 text-[10px] text-gray-400 px-2 py-1 rounded-full bg-gray-100 inline-block">
                    即将上线
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===== 联系方式 ===== */}
        <section className="py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">联系我</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {contactMethods.map((method, i) => (
              <div key={i} className={`glass-card rounded-2xl p-5 border ${method.bgClass}`}>
                <div className="flex items-center gap-2 mb-2">
                  {method.icon}
                  <span className="font-semibold text-gray-800 text-sm">{method.title}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1.5">{method.desc}</p>
                <p className="text-xs text-gray-700 font-medium">{method.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 咨询引导表单 ===== */}
        <section className="py-6">
          <div className="glass-card rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">给我发消息</h2>
            <p className="text-gray-500 text-sm mb-5">
              告诉我你的情况，我会在 24 小时内通过邮件或微信回复你。
            </p>

            {/* 咨询类型选择 */}
            <div className="mb-5">
              <p className="text-xs font-medium text-gray-500 mb-2">你想咨询什么？（可多选）</p>
              <div className="flex flex-wrap gap-2">
                {consultTopics.map((topic, i) => (
                  <span key={i} className="tag-pill cursor-pointer hover:tag-pill-active transition-all">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* 表单占位（第一阶段静态） */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">你的名字 / 昵称</label>
                <input
                  type="text"
                  placeholder="怎么称呼你？"
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 placeholder:text-gray-400 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200/60 transition-all backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">联系方式（微信/邮箱）</label>
                <input
                  type="text"
                  placeholder="方便我回复你的方式"
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 placeholder:text-gray-400 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200/60 transition-all backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">你的问题或想说的话</label>
                <textarea
                  rows={4}
                  placeholder="简单描述你的情况和问题，越详细我能给的建议越精准..."
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 placeholder:text-gray-400 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-200/60 transition-all backdrop-blur-sm resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full py-3.5 rounded-xl font-semibold text-sm btn-gradient flex items-center justify-center gap-2"
              >
                发送消息 <ArrowRight size={15} />
              </button>
              <p className="text-xs text-gray-400 text-center">
                第一阶段为静态演示，实际联系请通过社媒私信
              </p>
            </div>
          </div>
        </section>

        {/* ===== 底部引导 ===== */}
        <section className="py-6 pb-16">
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="font-semibold text-gray-800 mb-2">还没看过爆款案例？</p>
            <p className="text-sm text-gray-500 mb-4">先去看看我整理的 TikTok 爆款选品案例，免费公开。</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/videos" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-gradient">
                浏览爆款视频库 <ArrowRight size={14} />
              </Link>
              <Link href="/tool" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-outline-glass">
                了解选品工具
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
