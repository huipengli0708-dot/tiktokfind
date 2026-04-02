import { loginAction } from './action'
import { Lock, AlertCircle } from 'lucide-react'

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams

  return (
    <div className="page-bg min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / 标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl btn-gradient mb-4">
            <Lock size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">后台登录</h1>
          <p className="text-sm text-gray-400 mt-1">阿光选品 · 管理后台</p>
        </div>

        {/* 表单卡片 */}
        <div className="glass-card rounded-2xl p-6 space-y-4">

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-rose-50/80 border border-rose-200/60 text-rose-600 text-sm">
              <AlertCircle size={14} className="shrink-0" />
              密码错误，请重试
            </div>
          )}

          <form action={loginAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                管理密码
              </label>
              <input
                type="password"
                name="password"
                required
                autoFocus
                placeholder="请输入密码"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white/60 border border-white/50 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-200/60 focus:border-indigo-300/50 transition-all backdrop-blur-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-sm font-semibold btn-gradient"
            >
              进入后台
            </button>
          </form>

        </div>

      </div>
    </div>
  )
}
