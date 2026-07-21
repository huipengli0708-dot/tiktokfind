'use client'

import { useEffect, useRef } from 'react'

type Props = {
  /** 星星数量上限，默认 260（性能友好） */
  count?: number
  /** 鼠标引力半径 px，默认 260 */
  gravityRadius?: number
  /** 引力强度 0-1，默认 0.5 */
  gravity?: number
  /** 连线最大距离 px，默认 120 */
  linkDistance?: number
}

type Star = {
  /** 归属星团中心索引 */
  c: number
  /** 当前位置 */
  x: number
  y: number
  /** 星团内的原始锚点（相对星团中心） */
  ax: number
  ay: number
  /** 速度 */
  vx: number
  vy: number
  r: number
  a: number
  tw: number
  ph: number
  /** 0=普通 1=亮星 */
  glow: number
  hue: number
}

/** 4 种星色的预渲染贴图 */
const HUES = ['255,255,255', '160,200,255', '255,225,170', '190,170,255']

/**
 * 高性能星空：星团聚拢 + 鼠标引力 + 星座连线。
 * 优化点：
 *  - 光点/光晕预渲染成离屏贴图，主循环只做 drawImage（避免每帧 createRadialGradient）
 *  - 连线用网格分区，只比较相邻格，避免 O(n²)
 *  - 页面不可见时暂停，尊重 prefers-reduced-motion
 */
export default function Starfield({
  count = 260,
  gravityRadius = 260,
  gravity = 0.5,
  linkDistance = 120,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let raf = 0
    let running = true
    let w = 0
    let h = 0
    let stars: Star[] = []
    /** 星团中心 */
    let clusters: { x: number; y: number; dx: number; dy: number }[] = []

    /* ---------- 预渲染贴图 ---------- */
    const SPRITE = 32
    const sprites: HTMLCanvasElement[] = []
    const glowSprites: HTMLCanvasElement[] = []

    for (const hue of HUES) {
      // 小光点
      const s = document.createElement('canvas')
      s.width = s.height = SPRITE
      const sc = s.getContext('2d')!
      const g1 = sc.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2)
      g1.addColorStop(0, `rgba(${hue},1)`)
      g1.addColorStop(0.35, `rgba(${hue},0.5)`)
      g1.addColorStop(1, `rgba(${hue},0)`)
      sc.fillStyle = g1
      sc.fillRect(0, 0, SPRITE, SPRITE)
      sprites.push(s)

      // 大光晕
      const gsz = 96
      const gs = document.createElement('canvas')
      gs.width = gs.height = gsz
      const gc = gs.getContext('2d')!
      const g2 = gc.createRadialGradient(gsz / 2, gsz / 2, 0, gsz / 2, gsz / 2, gsz / 2)
      g2.addColorStop(0, `rgba(${hue},0.55)`)
      g2.addColorStop(0.25, `rgba(${hue},0.18)`)
      g2.addColorStop(1, `rgba(${hue},0)`)
      gc.fillStyle = g2
      gc.fillRect(0, 0, gsz, gsz)
      glowSprites.push(gs)
    }

    /* ---------- 构建 ---------- */
    function build() {
      if (!canvas) return
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

      // 星团中心：按面积决定 5~9 个
      const nC = Math.max(4, Math.min(9, Math.round((w * h) / 260000)))
      clusters = Array.from({ length: nC }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        dx: (Math.random() - 0.5) * 0.12,
        dy: (Math.random() - 0.5) * 0.12,
      }))

      const n = Math.min(count, Math.round((w * h) / 5200))
      stars = Array.from({ length: n }, () => {
        const c = Math.floor(Math.random() * clusters.length)
        // 向心分布：越靠近星团中心越密（sqrt 让分布自然聚拢）
        const ang = Math.random() * Math.PI * 2
        const rad = Math.sqrt(Math.random()) * (120 + Math.random() * 220)
        const glow = Math.random() < 0.07 ? 1 : 0
        return {
          c,
          x: clusters[c].x + Math.cos(ang) * rad,
          y: clusters[c].y + Math.sin(ang) * rad,
          ax: Math.cos(ang) * rad,
          ay: Math.sin(ang) * rad,
          vx: 0,
          vy: 0,
          r: glow ? 2.2 + Math.random() * 1.6 : 0.7 + Math.random() * 1.2,
          a: 0.3 + Math.random() * 0.6,
          tw: 0.5 + Math.random() * 1.5,
          ph: Math.random() * Math.PI * 2,
          glow,
          hue: Math.floor(Math.random() * HUES.length),
        }
      })
    }

    build()

    /* ---------- 鼠标 ---------- */
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
      mouse.active = true
    }
    function onLeave() {
      mouse.active = false
    }

    /* ---------- 主循环 ---------- */
    const t0 = performance.now()
    const gr2 = gravityRadius * gravityRadius
    const ld2 = linkDistance * linkDistance
    const cell = linkDistance
    const grid = new Map<number, number[]>()

    function frame(now: number) {
      raf = 0
      if (!running || !canvas || !ctx) return
      const t = (now - t0) / 1000

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // 鼠标缓动跟随
      if (mouse.active) {
        if (mouse.x < -9000) {
          mouse.x = mouse.tx
          mouse.y = mouse.ty
        } else {
          mouse.x += (mouse.tx - mouse.x) * 0.12
          mouse.y += (mouse.ty - mouse.y) * 0.12
        }
      }

      // 星团中心缓慢漂移（边界反弹）
      for (const c of clusters) {
        c.x += c.dx
        c.y += c.dy
        if (c.x < -150 || c.x > w + 150) c.dx *= -1
        if (c.y < -150 || c.y > h + 150) c.dy *= -1
      }

      grid.clear()

      /* ---- 更新 + 绘制星点 ---- */
      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const cl = clusters[s.c]

        // 1) 回归星团锚点的弹性力（形成聚拢感）
        const hx = cl.x + s.ax
        const hy = cl.y + s.ay
        s.vx += (hx - s.x) * 0.0022
        s.vy += (hy - s.y) * 0.0022

        // 2) 鼠标引力
        if (mouse.active) {
          const dx = mouse.x - s.x
          const dy = mouse.y - s.y
          const d2 = dx * dx + dy * dy
          if (d2 < gr2 && d2 > 1) {
            // 距离越近力越强，但近距离设下限避免抖动
            const f = (1 - d2 / gr2) * gravity * 0.35
            const inv = 1 / Math.sqrt(d2)
            s.vx += dx * inv * f
            s.vy += dy * inv * f
          }
        }

        // 3) 阻尼
        s.vx *= 0.94
        s.vy *= 0.94
        s.x += s.vx
        s.y += s.vy

        // 闪烁
        const alpha = s.a * (0.55 + 0.45 * Math.sin(t * s.tw + s.ph))

        // 绘制（drawImage 贴图，极快）
        const size = s.r * 6
        ctx.globalAlpha = alpha
        ctx.drawImage(sprites[s.hue], s.x - size / 2, s.y - size / 2, size, size)
        if (s.glow) {
          const gsz = s.r * 22
          ctx.globalAlpha = alpha * 0.7
          ctx.drawImage(glowSprites[s.hue], s.x - gsz / 2, s.y - gsz / 2, gsz, gsz)
        }

        // 入网格（用于连线）
        const gx = Math.floor(s.x / cell)
        const gy = Math.floor(s.y / cell)
        const key = gx * 10007 + gy
        const bucket = grid.get(key)
        if (bucket) bucket.push(i)
        else grid.set(key, [i])
      }

      /* ---- 连线：只比较同格与右/下相邻格 ---- */
      ctx.globalCompositeOperation = 'source-over'
      ctx.lineWidth = 0.6
      const NB = [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [-1, 1],
      ]
      for (const [key, bucket] of grid) {
        const gx = Math.round(key / 10007)
        const gy = key - gx * 10007
        for (const [ox, oy] of NB) {
          const other = ox === 0 && oy === 0 ? bucket : grid.get((gx + ox) * 10007 + (gy + oy))
          if (!other) continue
          for (let m = 0; m < bucket.length; m++) {
            const a = stars[bucket[m]]
            const start = ox === 0 && oy === 0 ? m + 1 : 0
            for (let n = start; n < other.length; n++) {
              const b = stars[other[n]]
              const dx = a.x - b.x
              const dy = a.y - b.y
              const d2 = dx * dx + dy * dy
              if (d2 < ld2) {
                ctx.strokeStyle = `rgba(150,180,255,${(1 - Math.sqrt(d2) / linkDistance) * 0.16})`
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
              }
            }
          }
        }
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    /* ---------- 启动 / 生命周期 ---------- */
    function start() {
      if (!raf && running) raf = requestAnimationFrame(frame)
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    function onVisibility() {
      running = document.visibilityState === 'visible'
      if (running) start()
      else stop()
    }

    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(build, 200)
    }

    if (reduced) {
      // 无障碍：只画一帧静态星空
      frame(performance.now())
      stop()
    } else {
      window.addEventListener('mousemove', onMove, { passive: true })
      window.addEventListener('mouseout', onLeave, { passive: true })
      document.addEventListener('visibilitychange', onVisibility)
      window.addEventListener('resize', onResize)
      start()
    }

    return () => {
      running = false
      stop()
      if (resizeTimer) clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [count, gravityRadius, gravity, linkDistance])

  return <canvas ref={canvasRef} className="pointer-events-none h-full w-full" aria-hidden />
}
