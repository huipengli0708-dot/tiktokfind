'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'
import { Heart, LogOut, Mail, Phone, ChevronRight, MessageCircle, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getMyFavorites } from '@/lib/favorites'
import Logo from '@/components/Logo'
import StarBackdrop from '@/components/StarBackdrop'

type Mode = 'email' | 'phone'
type Country = 'CN' | 'US'

const COUNTRY = {
  CN: { code: '+86', label: '中国 +86', digits: 11, hint: '13800138000' },
  US: { code: '+1', label: '美国 +1', digits: 10, hint: '4155551234' },
} as const

export default function MePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [favCount, setFavCount] = useState(0)

  // 登录表单
  const [mode, setMode] = useState<Mode>('email')
  const [country, setCountry] = useState<Country>('CN')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setLoading(false)
      if (data.user) getMyFavorites().then((f) => setFavCount(f.length))
    })
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  function startCountdown() {
    setCountdown(60)
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  function normalizedPhone(): string | null {
    const digits = phone.replace(/\D/g, '')
    const { code: cc, digits: len } = COUNTRY[country]
    if (digits.length !== len) return null
    if (country === 'CN' && !digits.startsWith('1')) return null
    return cc + digits
  }

  async function sendCode() {
    setMsg('')
    if (mode === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMsg('请输入正确的邮箱地址')
        return
      }
      setBusy(true)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      })
      setBusy(false)
      if (error) {
        setMsg('发送失败：' + error.message)
        return
      }
    } else {
      const p = normalizedPhone()
      if (!p) {
        setMsg(`请输入正确的${country === 'CN' ? '11 位中国' : '10 位美国'}手机号`)
        return
      }
      setBusy(true)
      const { error } = await supabase.auth.signInWithOtp({ phone: p })
      setBusy(false)
      if (error) {
        setMsg('发送失败：' + error.message)
        return
      }
    }
    setCodeSent(true)
    startCountdown()
    setMsg(mode === 'email' ? '验证码已发送到邮箱，请查收（含垃圾箱）' : '验证码已发送，请查收短信')
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setBusy(true)
    setMsg('')

    const result =
      mode === 'email'
        ? await supabase.auth.verifyOtp({ email, token: code.trim(), type: 'email' })
        : await supabase.auth.verifyOtp({ phone: normalizedPhone()!, token: code.trim(), type: 'sms' })

    setBusy(false)
    if (result.error) {
      setMsg('验证失败：验证码错误或已过期')
      return
    }
    setUser(result.data.user)
    getMyFavorites().then((f) => setFavCount(f.length))
    router.refresh()
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
    setFavCount(0)
    router.refresh()
  }

  function switchMode(m: Mode) {
    setMode(m)
    setCode('')
    setCodeSent(false)
    setMsg('')
  }

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <StarBackdrop />
        <p className="relative z-10 text-gray-500">加载中…</p>
      </div>
    )
  }

  /* ===== 已登录 ===== */
  if (user) {
    const displayName = user.email?.split('@')[0] ?? user.phone ?? '用户'
    return (
      <div className="relative min-h-screen">
        <StarBackdrop />
        <div className="relative z-10 mx-auto max-w-2xl px-6 pb-24 pt-24">
          {/* 用户卡 */}
          <div className="card-dark p-8 text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-3xl text-white shadow-lg">
              {displayName[0].toUpperCase()}
            </span>
            <h2 className="mt-4 text-xl font-bold text-white">{displayName}</h2>
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-gray-400">
              {user.email ? (
                <>
                  <Mail size={14} /> {user.email}
                </>
              ) : (
                <>
                  <Phone size={14} /> {user.phone}
                </>
              )}
            </p>
          </div>

          {/* 菜单 */}
          <div className="card-dark mt-6 divide-y divide-white/5">
            <Link href="/favorites" className="flex items-center justify-between p-5 transition-colors hover:bg-white/5">
              <span className="flex items-center gap-3 font-semibold text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0655A]/15 text-[#F0655A]">
                  <Heart size={18} />
                </span>
                我的收藏
                <span className="text-sm font-normal text-gray-500">{favCount} 个</span>
              </span>
              <ChevronRight size={18} className="text-gray-600" />
            </Link>

            <a
              href="https://www.xiaohongshu.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-5 transition-colors hover:bg-white/5"
            >
              <span className="flex items-center gap-3 font-semibold text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/15 text-[#7CB1FF]">
                  <MessageCircle size={18} />
                </span>
                关注阿光小红书
              </span>
              <ChevronRight size={18} className="text-gray-600" />
            </a>

            <a
              href="mailto:support@tiktokfind.com"
              className="flex items-center justify-between p-5 transition-colors hover:bg-white/5"
            >
              <span className="flex items-center gap-3 font-semibold text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3B44F]/15 text-[#E3B44F]">
                  <Mail size={18} />
                </span>
                联系我们
                <span className="text-sm font-normal text-gray-500">support@tiktokfind.com</span>
              </span>
              <ChevronRight size={18} className="text-gray-600" />
            </a>

            <div className="flex items-center justify-between p-5">
              <span className="flex items-center gap-3 font-semibold text-gray-300">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5D77C]/15 text-[#F5D77C]">
                  <Shield size={18} />
                </span>
                数据仅供参考，选品前请自行核实
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="card-dark card-dark-hover mt-6 flex w-full items-center justify-center gap-2 p-4 font-semibold text-[#F0655A]"
          >
            <LogOut size={18} /> 退出登录
          </button>
        </div>
      </div>
    )
  }

  /* ===== 未登录：验证码登录（注册合一）===== */
  return (
    <div className="relative min-h-screen">
      <StarBackdrop />
      <div className="relative z-10 mx-auto max-w-md px-6 pb-24 pt-28">
        <div className="flex flex-col items-center text-center">
          <Logo size={64} className="text-white" />
          <h1 className="mt-4 text-2xl font-black text-white">阿光选品</h1>
          <p className="mt-1 text-sm text-gray-400">验证码登录，未注册会自动创建账号</p>
        </div>

        {/* 邮箱 / 手机号切换 */}
        <div className="mt-8 flex justify-center gap-2.5">
          <button
            className={`chip-dark ${mode === 'email' ? 'chip-dark-active' : ''}`}
            onClick={() => switchMode('email')}
          >
            邮箱
          </button>
          <button
            className={`chip-dark ${mode === 'phone' ? 'chip-dark-active' : ''}`}
            onClick={() => switchMode('phone')}
          >
            手机号
          </button>
        </div>

        <form onSubmit={verify} className="card-dark mt-6 flex flex-col gap-4 p-8">
          {mode === 'email' ? (
            <label className="text-sm font-semibold text-gray-300">
              邮箱
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-dark mt-1.5 w-full px-4 py-3 text-[15px]"
              />
            </label>
          ) : (
            <label className="text-sm font-semibold text-gray-300">
              手机号
              <div className="mt-1.5 flex gap-2">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as Country)}
                  className="input-dark px-3 py-3 text-[15px] [&>option]:bg-[#11151E]"
                >
                  <option value="CN">{COUNTRY.CN.label}</option>
                  <option value="US">{COUNTRY.US.label}</option>
                </select>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={COUNTRY[country].hint}
                  className="input-dark w-full px-4 py-3 text-[15px]"
                />
              </div>
            </label>
          )}

          {/* 验证码 */}
          <label className="text-sm font-semibold text-gray-300">
            验证码
            <div className="mt-1.5 flex gap-2">
              <input
                inputMode="numeric"
                maxLength={8}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6 位验证码"
                className="input-dark w-full px-4 py-3 text-[15px] tracking-widest"
              />
              <button
                type="button"
                onClick={sendCode}
                disabled={busy || countdown > 0}
                className="btn-blue shrink-0 whitespace-nowrap px-5 py-3 text-sm disabled:opacity-50"
              >
                {countdown > 0 ? `${countdown}s` : codeSent ? '重新发送' : '获取验证码'}
              </button>
            </div>
          </label>

          {msg && <p className="text-sm font-medium text-[#F5D77C]">{msg}</p>}

          <button
            type="submit"
            disabled={busy || !codeSent || !code.trim()}
            className="btn-blue mt-2 py-3 text-base disabled:opacity-50"
          >
            {busy ? '处理中…' : '登录 / 注册'}
          </button>
        </form>
      </div>
    </div>
  )
}
