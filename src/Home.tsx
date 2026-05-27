"use client"
 
import { useState, useEffect, useCallback, useRef } from "react"
import React from "react"
 
interface StarProps {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}
 
interface LanternProps {
  x: string
  color1: string
  color2: string
  delay: number
  swing: number
}
 
interface PetalProps {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  color: string
}
 
interface ArabicStarProps {
  style: React.CSSProperties
}
 
interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  life: number
  type: "spark" | "star" | "ring"
}
 
interface FloatingMsg {
  id: number
  x: number
  y: number
  text: string
  color: string
}
 
interface Ripple {
  id: number
  x: number
  y: number
}

interface SheepObj {
  id: number
  x: number
  y: number
  dx: number
  emoji: string
  special: boolean
  caught: boolean
  slaughtered: boolean
}
 
const STARS: StarProps[] = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 60,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}))
 
const LANTERNS: LanternProps[] = [
  { x: "8%",  color1: "#e8b84b", color2: "#c0392b", delay: 0,   swing: 12  },
  { x: "18%", color1: "#9b59b6", color2: "#e8b84b", delay: 0.4, swing: -10 },
  { x: "75%", color1: "#e67e22", color2: "#27ae60", delay: 0.2, swing: 10  },
  { x: "88%", color1: "#2980b9", color2: "#e8b84b", delay: 0.6, swing: -12 },
]
 
const PETALS: PetalProps[] = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 6 + 8,
  size: Math.random() * 10 + 6,
  color: ["#e8b84b", "#c0392b", "#9b59b6", "#e67e22", "#f1c40f"][Math.floor(Math.random() * 5)],
}))
 
const CORNER_POSITIONS: React.CSSProperties[] = [
  { top: -14, left: -14 },
  { top: -14, right: -14 },
  { bottom: -14, left: -14 },
  { bottom: -14, right: -14 },
]
 
const BLESSINGS = [
  "Eid Mubarak! 🌙",
  "Taqabbal Allah! ✨",
  "Peace & Joy! 🕌",
  "عيد سعيد 🌟",
  "Blessings! 💫",
  "Alhamdulillah! 🤲",
  "Barakallah! ⭐",
  "Joy & Peace! 🌸",
]
 
const FIREWORK_COLORS = [
  "#e8b84b", "#f9e04b", "#c0392b", "#9b59b6",
  "#e67e22", "#27ae60", "#2980b9", "#fffde7",
  "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff",
]

const SHEEP_EMOJIS = ["🐑", "🐑", "🐑", "🐑", "🐑"]
 
function Star({ x, y, size, delay, duration }: StarProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#fff",
        animation: `twinkle ${duration}s ${delay}s ease-in-out infinite`,
        boxShadow: `0 0 ${size * 2}px #fff`,
      }}
    />
  )
}
 
function Lantern({ x, color1, color2, delay, swing }: LanternProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: x,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: `swing ${3 + Math.abs(swing) * 0.1}s ${delay}s ease-in-out infinite`,
        transformOrigin: "top center",
      }}
    >
      <div style={{ width: 1.5, height: 60, background: "rgba(255,220,100,0.5)" }} />
      <div
        style={{
          position: "relative",
          width: 32,
          height: 48,
          borderRadius: "6px 6px 12px 12px",
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          boxShadow: `0 0 18px ${color1}cc, 0 0 40px ${color1}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {[0.3, 0.5, 0.7].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0, right: 0,
              top: `${p * 100}%`,
              height: 1,
              background: "rgba(255,255,255,0.3)",
            }}
          />
        ))}
        <div
          style={{
            width: 14, height: 14,
            borderRadius: "50%",
            background: "#fffde7",
            boxShadow: `0 0 12px #fff, 0 0 24px ${color1}`,
            animation: `glow 2s ${delay}s ease-in-out infinite`,
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 1.5,
              height: 14 + i * 3,
              background: color1,
              borderRadius: 2,
              animation: `tassel 2s ${delay + i * 0.1}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
 
function Petal({ x, delay, duration, size, color }: PetalProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: -20,
        width: size,
        height: size * 0.6,
        borderRadius: "50% 0 50% 0",
        background: color,
        opacity: 0.7,
        animation: `fall ${duration}s ${delay}s linear infinite`,
      }}
    />
  )
}
 
function CrescentMoon() {
  return (
    <div
      style={{
        position: "relative",
        width: 90,
        height: 90,
        animation: "moonrise 1.2s 0.3s cubic-bezier(0.34,1.56,0.64,1) both, moonGlow 4s 1.5s ease-in-out infinite",
      }}
    >
      <svg viewBox="0 0 90 90" width="90" height="90">
        <defs>
          <radialGradient id="moonGrad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#fffde7" />
            <stop offset="60%" stopColor="#f9e04b" />
            <stop offset="100%" stopColor="#e8b84b" />
          </radialGradient>
          <filter id="moonBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="45" cy="45" r="42" fill="#f9e04b" opacity="0.08" />
        <circle cx="45" cy="45" r="36" fill="#f9e04b" opacity="0.12" />
        <path
          d="M45 10 A35 35 0 1 1 44.99 10 A24 28 0 1 0 45 10 Z"
          fill="url(#moonGrad)"
          filter="url(#moonBlur)"
          transform="rotate(-20, 45, 45)"
        />
      </svg>
    </div>
  )
}
 
function ArabicStar({ style }: ArabicStarProps) {
  return (
    <svg viewBox="0 0 40 40" style={style}>
      {[0, 45].map((angle) => (
        <polygon
          key={angle}
          points="20,4 24,16 36,16 26,24 30,36 20,28 10,36 14,24 4,16 16,16"
          fill="#e8b84b"
          opacity={angle === 45 ? 0.6 : 1}
          transform={`rotate(${angle}, 20, 20)`}
        />
      ))}
    </svg>
  )
}
 
function FireworksCanvas({ triggerCount, triggerAt }: { triggerCount: number; triggerAt?: { x: number; y: number } | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
 
  const spawnBurst = useCallback((cx: number, cy: number) => {
    const count = 60
    const color1 = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
    const color2 = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const speed = Math.random() * 6 + 2
      const type: Particle["type"] = i % 5 === 0 ? "star" : i % 8 === 0 ? "ring" : "spark"
      particlesRef.current.push({
        id: Date.now() + Math.random(),
        x: cx, y: cy,
        vx: Math.cos(angle) * speed * (Math.random() * 0.5 + 0.75),
        vy: Math.sin(angle) * speed * (Math.random() * 0.5 + 0.75),
        color: Math.random() > 0.5 ? color1 : color2,
        size: Math.random() * 4 + 2,
        life: 1,
        type,
      })
    }
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push({
        id: Date.now() + Math.random() + 1000,
        x: cx + (Math.random() - 0.5) * 30,
        y: cy + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: "#fffde7",
        size: Math.random() * 2 + 1,
        life: 1,
        type: "spark",
      })
    }
  }, [])
 
  useEffect(() => {
    if (triggerCount === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    if (triggerAt) {
      spawnBurst(triggerAt.x, triggerAt.y)
      setTimeout(() => spawnBurst(triggerAt.x + (Math.random()-0.5)*80, triggerAt.y + (Math.random()-0.5)*40), 150)
    } else {
      const count = Math.floor(Math.random() * 3) + 3
      for (let b = 0; b < count; b++) {
        setTimeout(() => {
          spawnBurst(w * (0.15 + Math.random() * 0.7), h * (0.1 + Math.random() * 0.5))
        }, b * 180)
      }
    }
  }, [triggerCount, triggerAt, spawnBurst])
 
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
 
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)
 
    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) => {
      ctx.save()
      ctx.fillStyle = color
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2
        const ai = ((i * 4 + 2) * Math.PI) / 5 - Math.PI / 2
        ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
        ctx.lineTo(cx + (r * 0.4) * Math.cos(ai), cy + (r * 0.4) * Math.sin(ai))
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
 
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter(p => p.life > 0.01)
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12
        p.vx *= 0.97
        p.life -= 0.016
        ctx.globalAlpha = Math.max(0, p.life)
        if (p.type === "star") {
          drawStar(ctx, p.x, p.y, p.size * 1.5, p.color)
        } else if (p.type === "ring") {
          ctx.strokeStyle = p.color
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2)
          ctx.stroke()
        } else {
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = 6
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
        ctx.globalAlpha = 1
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])
 
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  )
}

// ─── SHEEP GAME ────────────────────────────────────────────────────────────────
function SheepGame({ onFW }: { onFW: (x: number, y: number) => void }) {
  const [phase, setPhase] = useState<"idle" | "playing" | "over">("idle")
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [level, setLevel] = useState(1)
  const [sheep, setSheep] = useState<SheepObj[]>([])
  const [floats, setFloats] = useState<{ id: number; x: number; y: number; text: string }[]>([])
  const [slaughterEffect, setSlaughterEffect] = useState<{ id: number; x: number; y: number } | null>(null)

  const sheepIdRef = useRef(0)
  const floatIdRef = useRef(0)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const spawnTimerRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scoreRef = useRef(0)
  const levelRef = useRef(1)
  const phaseRef = useRef<"idle" | "playing" | "over">("idle")
  const streakRef = useRef(0)

  const addFloat = useCallback((x: number, y: number, text: string) => {
    const id = ++floatIdRef.current
    setFloats(f => [...f, { id, x, y, text }])
    setTimeout(() => setFloats(f => f.filter(m => m.id !== id)), 900)
  }, [])

  const spawnSheep = useCallback(() => {
    if (phaseRef.current !== "playing") return
    const spd = 0.06 + (levelRef.current - 1) * 0.018 + Math.random() * 0.03
    const fromLeft = Math.random() > 0.5
    const newSheep: SheepObj = {
      id: ++sheepIdRef.current,
      x: fromLeft ? -8 : 108,
      y: 20 + Math.random() * 52,
      dx: fromLeft ? spd : -spd,
      emoji: "🐑",
      special: false,
      caught: false,
      slaughtered: false,
    }
    setSheep(prev => [...prev, newSheep])
  }, [])

  const startGame = useCallback(() => {
    scoreRef.current = 0
    levelRef.current = 1
    streakRef.current = 0
    phaseRef.current = "playing"
    setScore(0)
    setLevel(1)
    setStreak(0)
    setTimeLeft(30)
    setPhase("playing")
    setSheep([])
    setFloats([])
    spawnSheep()
    spawnSheep()
  }, [spawnSheep])

  // countdown timer
  useEffect(() => {
    if (phase !== "playing") return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          phaseRef.current = "over"
          setPhase("over")
          setBest(b => Math.max(b, scoreRef.current))
          cancelAnimationFrame(rafRef.current)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  }, [phase])

  // movement loop
  useEffect(() => {
    if (phase !== "playing") return
    let spawnAcc = 0
    const spawnInterval = () => Math.max(1400 - levelRef.current * 120, 700)

    const loop = (ts: number) => {
      const dt = ts - lastTimeRef.current
      lastTimeRef.current = ts
      spawnAcc += dt
      if (spawnAcc > spawnInterval()) {
        spawnAcc = 0
        spawnSheep()
        if (levelRef.current >= 3) spawnSheep()
      }
      setSheep(prev => {
        const next = prev
          .map(s => {
            if (s.caught || s.slaughtered) return s
            const nx = s.x + s.dx * dt
            if (nx < -12 || nx > 112) return null as unknown as SheepObj
            return { ...s, x: nx }
          })
          .filter(Boolean) as SheepObj[]
        return next
      })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase, spawnSheep])

  const catchSheep = useCallback((id: number, e: React.MouseEvent) => {
    if (phaseRef.current !== "playing") return
    e.stopPropagation()

    setSheep(prev => {
      const s = prev.find(x => x.id === id)
      if (!s || s.caught || s.slaughtered) return prev
      return prev.map(x => x.id === id ? { ...x, slaughtered: true } : x)
    })

    streakRef.current += 1
    const newStreak = streakRef.current
    setStreak(newStreak)

    const pts = newStreak >= 5 ? 2 : 1
    scoreRef.current += pts
    const newScore = scoreRef.current
    setScore(newScore)

    // level up
    const newLevel = 1 + Math.floor(newScore / 8)
    if (newLevel !== levelRef.current) {
      levelRef.current = newLevel
      setLevel(newLevel)
    }

    // float text
    const rect = gameAreaRef.current?.getBoundingClientRect()
    if (rect) {
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top) / rect.height) * 100
      addFloat(px, py, newStreak >= 5 ? `+${pts} 🔥` : `+${pts}`)
      setSlaughterEffect({ id: Date.now(), x: px, y: py })
      setTimeout(() => setSlaughterEffect(null), 600)
      onFW(e.clientX, e.clientY)
    }

    // remove after anim
    setTimeout(() => {
      setSheep(prev => prev.filter(x => x.id !== id))
    }, 500)
  }, [addFloat, onFW])

  const missedSheep = streak > 0

  return (
    <div style={{ width: "100%", marginTop: "0.5rem" }}>
      {/* game arena */}
      <div
        ref={gameAreaRef}
        style={{
          position: "relative",
          width: "100%",
          height: 270,
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(232,184,75,0.3)",
          background: "linear-gradient(180deg,#091525 0%,#0d2040 55%,#0a1520 100%)",
          cursor: phase === "playing" ? "crosshair" : "default",
        }}
      >
        {/* night stars */}
        {[...Array(24)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37 + 7) % 100}%`,
            top: `${(i * 23 + 5) % 65}%`,
            width: 2, height: 2,
            borderRadius: "50%",
            background: "white",
            opacity: 0.35,
          }} />
        ))}

        {/* moon */}
        <div style={{ position: "absolute", top: 8, right: 18, opacity: 0.6 }}>
          <svg viewBox="0 0 40 40" width="32" height="32">
            <path d="M20 5 A15 15 0 1 1 19.99 5 A10 12 0 1 0 20 5 Z" fill="#f9e04b" transform="rotate(-20,20,20)" />
          </svg>
        </div>

        {/* grass */}
        <div style={{
          position: "absolute", bottom: 0, width: "100%", height: 60,
          background: "linear-gradient(180deg,#1f6b2f 0%,#145220 100%)",
          borderRadius: "0 0 20px 20px",
          zIndex: 1,
        }} />
        {/* fence posts */}
        <div style={{ position: "absolute", bottom: 48, width: "100%", zIndex: 2, display: "flex", justifyContent: "space-around" }}>
          {[...Array(14)].map((_, i) => (
            <div key={i} style={{ width: 4, height: 18, background: "#8B6914", borderRadius: "2px 2px 0 0" }} />
          ))}
        </div>
        {/* fence rail */}
        <div style={{ position: "absolute", bottom: 56, width: "100%", height: 3, background: "#7a5c10", zIndex: 2 }} />
        <div style={{ position: "absolute", bottom: 50, width: "100%", height: 2, background: "#7a5c10", zIndex: 2 }} />

        {/* HUD */}
        <div style={{ position: "absolute", top: 8, left: 12, right: 12, display: "flex", justifyContent: "space-between", zIndex: 20 }}>
          <div style={{ color: "#fffde7", fontSize: "0.8rem", fontWeight: "bold" }}>
            🐑 Slaughter Rush!
          </div>
          <div style={{ color: "#f9e04b", fontSize: "0.8rem", fontWeight: "bold" }}>
            Score: {score}
          </div>
        </div>
        <div style={{ position: "absolute", top: 28, left: 12, right: 12, display: "flex", justifyContent: "space-between", zIndex: 20 }}>
          <div style={{ color: "#27ae60", fontSize: "0.72rem" }}>Lv.{level}</div>
          <div style={{
            color: timeLeft <= 10 ? "#c0392b" : "#e67e22",
            fontSize: "0.78rem", fontWeight: "bold",
            animation: timeLeft <= 10 ? "timerPulse 0.5s ease-in-out infinite" : "none"
          }}>
            ⏱ {timeLeft}s
          </div>
        </div>

        {/* sheep */}
        {sheep.map(s => (
          <div
            key={s.id}
            onClick={(e) => catchSheep(s.id, e)}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: `translate(-50%,-50%) scaleX(${s.dx > 0 ? 1 : -1})`,
              fontSize: "2.4rem",
              cursor: "pointer",
              zIndex: 10,
              userSelect: "none",
              transition: s.slaughtered ? "none" : "none",
              animation: s.slaughtered ? "slaughterAnim 0.5s ease forwards" : "sheepBob 0.8s ease-in-out infinite",
              filter: s.slaughtered ? "none" : "none",
            }}
          >
            {s.slaughtered ? "🥩" : "🐑"}
          </div>
        ))}

        {/* slaughter blood-burst effect */}
        {slaughterEffect && (
          <div
            key={slaughterEffect.id}
            style={{
              position: "absolute",
              left: `${slaughterEffect.x}%`,
              top: `${slaughterEffect.y}%`,
              transform: "translate(-50%,-50%)",
              fontSize: "1.6rem",
              pointerEvents: "none",
              animation: "splashAnim 0.6s ease forwards",
              zIndex: 25,
            }}
          >
            ✨
          </div>
        )}

        {/* float score texts */}
        {floats.map(f => (
          <div key={f.id} style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: "translateX(-50%)",
            color: "#f9e04b",
            fontWeight: "bold",
            fontSize: "1rem",
            pointerEvents: "none",
            animation: "floatScore 0.9s ease forwards",
            zIndex: 30,
            textShadow: "0 0 8px #e8b84b",
          }}>
            {f.text}
          </div>
        ))}

        {/* OVERLAY: idle / game over */}
        {phase !== "playing" && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(5,5,25,0.84)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "0.8rem", zIndex: 40, borderRadius: 20,
          }}>
            <div style={{ fontSize: "2.2rem" }}>🕌</div>
            {phase === "over" ? (
              <>
                <div style={{ color: "#f9e04b", fontSize: "1.1rem", fontWeight: "bold", textAlign: "center" }}>
                  Time&apos;s Up! 🎉
                </div>
                <div style={{ color: "#fffde7", fontSize: "0.95rem", textAlign: "center" }}>
                  You slaughtered <span style={{ color: "#f9e04b", fontWeight: "bold" }}>{score}</span> sheep!
                </div>
                <div style={{ color: "rgba(255,220,140,0.6)", fontSize: "0.75rem" }}>
                  {score >= 25 ? "Masha Allah! 🌟" : score >= 12 ? "Well done! ✨" : "Practice more! 🐑"}
                </div>
              </>
            ) : (
              <>
                <div style={{ color: "#f9e04b", fontSize: "1.15rem", fontWeight: "bold", textAlign: "center" }}>
                  Eid Slaughter Rush!
                </div>
                <div style={{ color: "rgba(255,220,140,0.75)", fontSize: "0.8rem", textAlign: "center", maxWidth: 260, lineHeight: 1.5 }}>
                  Tap the sheep before they escape the pen. Speed increases every level!
                </div>
              </>
            )}
            <button
              onClick={startGame}
              style={{
                border: "none",
                padding: "0.7rem 1.8rem",
                borderRadius: 999,
                background: "linear-gradient(90deg,#c89b3c,#f9e04b)",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.95rem",
                color: "#0a0820",
              }}
            >
              {phase === "over" ? "🐑 Play Again" : "🐑 Start Game"}
            </button>
          </div>
        )}
      </div>

      {/* stats row */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "0.7rem" }}>
        {[
          { label: "Best", value: best, color: "#f9e04b" },
          { label: "Streak", value: `${streak} 🔥`, color: "#e67e22" },
          { label: "Level", value: level, color: "#9b59b6" },
        ].map(item => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <div style={{ color: "rgba(255,220,140,0.55)", fontSize: "0.7rem" }}>{item.label}</div>
            <div style={{ color: item.color, fontWeight: "bold", fontSize: "0.95rem" }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
 
export default function Home() {
  const [visible, setVisible] = useState(false)
  const [showSub, setShowSub] = useState(false)
  const [showDec, setShowDec] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [showGame, setShowGame] = useState(false)
 
  const [fireworkTrigger, setFireworkTrigger] = useState(0)
  const [fireworkAt, setFireworkAt] = useState<{ x: number; y: number } | null>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [floatingMsgs, setFloatingMsgs] = useState<FloatingMsg[]>([])
  const [btnPressed, setBtnPressed] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [btnPulse, setBtnPulse] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const msgIdRef = useRef(0)
  const rippleIdRef = useRef(0)
 
  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible(true), 100),
      setTimeout(() => setShowDec(true), 400),
      setTimeout(() => setShowGreeting(true), 700),
      setTimeout(() => setShowSub(true), 1200),
      setTimeout(() => setShowFooter(true), 1800),
      setTimeout(() => setShowBtn(true), 2200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])
 
  const handleBless = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const rx = e.clientX - rect.left
    const ry = e.clientY - rect.top
    const rid = ++rippleIdRef.current
    setRipples(prev => [...prev, { id: rid, x: rx, y: ry }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rid)), 700)
    setFireworkAt(null)
    setFireworkTrigger(c => c + 1)
    setBtnPressed(true)
    setTimeout(() => setBtnPressed(false), 150)
    setBtnPulse(true)
    setTimeout(() => setBtnPulse(false), 600)
    setClickCount(c => c + 1)
    const text = BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)]
    const colors = ["#f9e04b", "#e8b84b", "#9b59b6", "#27ae60", "#e67e22", "#fffde7"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    const msgId = ++msgIdRef.current
    const mx = 20 + Math.random() * 60
    const my = 30 + Math.random() * 30
    setFloatingMsgs(prev => [...prev, { id: msgId, x: mx, y: my, text, color }])
    setTimeout(() => setFloatingMsgs(prev => prev.filter(m => m.id !== msgId)), 2200)
  }, [])

  const handleGameFW = useCallback((x: number, y: number) => {
    setFireworkAt({ x, y })
    setFireworkTrigger(c => c + 1)
  }, [])
 
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0a0a2e 0%, #0d1b4b 35%, #1a1040 65%, #0f0820 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        paddingBottom: "5rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
 
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes swing {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.7; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes tassel {
          0%, 100% { transform: skewX(-5deg); }
          50% { transform: skewX(5deg); }
        }
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          80% { opacity: 0.5; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes moonrise {
          0% { opacity: 0; transform: translateY(30px) scale(0.6); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes moonGlow {
          0%, 100% { filter: drop-shadow(0 0 12px #f9e04b88); }
          50% { filter: drop-shadow(0 0 28px #f9e04bcc) drop-shadow(0 0 50px #e8b84b44); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 15px #e8b84b44, inset 0 0 15px #e8b84b11; }
          50% { box-shadow: 0 0 35px #e8b84b88, inset 0 0 30px #e8b84b22; }
        }
        @keyframes patternFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.06; }
          50% { transform: translateY(-12px) rotate(3deg); opacity: 0.1; }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        @keyframes ornamentPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px #e8b84b55, 0 2px 4px #0004; }
          50% { text-shadow: 0 0 40px #e8b84baa, 0 0 80px #e8b84b44, 0 2px 4px #0004; }
        }
        @keyframes ropeWave {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.005); }
        }
        @keyframes btnAppear {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          70% { transform: translateY(-4px) scale(1.04); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes btnIdlePulse {
          0%, 100% { box-shadow: 0 0 20px #e8b84b55, 0 0 0px #e8b84b00; }
          50% { box-shadow: 0 0 35px #e8b84b99, 0 0 60px #e8b84b33; }
        }
        @keyframes btnShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rippleOut {
          0% { transform: scale(0); opacity: 0.8; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(0) scale(0.6); }
          15% { opacity: 1; transform: translateY(-10px) scale(1.1); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-90px) scale(0.9); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes btnStarSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.3); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes countPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        @keyframes sheepBob {
          0%, 100% { transform: translate(-50%,-50%) translateY(0px) scaleX(var(--sx,1)); }
          50% { transform: translate(-50%,-50%) translateY(-5px) scaleX(var(--sx,1)); }
        }
        @keyframes slaughterAnim {
          0% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
          40% { transform: translate(-50%,-50%) scale(1.5) rotate(15deg); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(0) rotate(30deg); opacity: 0; }
        }
        @keyframes splashAnim {
          0% { transform: translate(-50%,-50%) scale(0.5); opacity: 1; }
          60% { transform: translate(-50%,-50%) scale(1.8); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
        }
        @keyframes floatScore {
          0% { opacity: 0; transform: translateX(-50%) translateY(0) scale(0.7); }
          20% { opacity: 1; transform: translateX(-50%) translateY(-8px) scale(1.1); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(-55px) scale(0.9); }
        }
        @keyframes timerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes gameReveal {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
 
        .eid-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(2.8rem, 8vw, 5.5rem);
          font-weight: 700;
          background: linear-gradient(90deg, #c89b3c, #f9e04b, #e8b84b, #fffde7, #e8b84b, #f9e04b, #c89b3c);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          line-height: 1.15;
          text-align: center;
          margin: 0;
        }
        .eid-mubarak {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(1.4rem, 4vw, 2.6rem);
          font-weight: 400;
          color: #e8b84b;
          letter-spacing: 0.18em;
          text-align: center;
          animation: textGlow 3s ease-in-out infinite;
        }
        .sub-text {
          font-family: 'Lora', serif;
          font-size: clamp(0.9rem, 2.2vw, 1.15rem);
          color: rgba(255,220,140,0.8);
          text-align: center;
          font-style: italic;
          line-height: 1.7;
          max-width: 480px;
          margin: 0;
        }
        .arabic-text {
          font-size: clamp(1.6rem, 4.5vw, 2.4rem);
          color: #f9e04b;
          text-align: center;
          letter-spacing: 0.05em;
          direction: rtl;
          animation: textGlow 4s 0.5s ease-in-out infinite;
          font-family: 'Lora', serif;
        }
        .bless-btn {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: none;
          outline: none;
          padding: 0.85rem 2.4rem;
          border-radius: 50px;
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(0.85rem, 2vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #0a0820;
          background: linear-gradient(90deg, #c89b3c, #f9e04b, #fffde7, #f9e04b, #c89b3c);
          background-size: 200% auto;
          animation: btnAppear 0.7s cubic-bezier(0.34,1.56,0.64,1) both, btnShimmer 2.5s linear infinite, btnIdlePulse 2.5s ease-in-out infinite;
          transition: transform 0.1s ease, filter 0.1s ease;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .bless-btn:hover { filter: brightness(1.15); transform: translateY(-2px) scale(1.03); }
        .bless-btn:active { transform: scale(0.94) translateY(1px); filter: brightness(0.95); }
        .bless-btn-pressed { transform: scale(0.93) translateY(2px) !important; }
        .play-btn {
          border: 1px solid rgba(232,184,75,0.5);
          background: rgba(232,184,75,0.08);
          color: #f9e04b;
          padding: 0.6rem 1.8rem;
          border-radius: 50px;
          font-family: 'Cinzel Decorative', serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .play-btn:hover { background: rgba(232,184,75,0.18); transform: translateY(-1px); }
      `}</style>
 
      <FireworksCanvas triggerCount={fireworkTrigger} triggerAt={fireworkAt} />
 
      {floatingMsgs.map(m => (
        <div
          key={m.id}
          style={{
            position: "fixed",
            left: `${m.x}%`,
            top: `${m.y}%`,
            zIndex: 100,
            pointerEvents: "none",
            animation: "floatUp 2.2s ease-out forwards",
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(0.75rem, 2vw, 1rem)",
            fontWeight: 700,
            color: m.color,
            textShadow: `0 0 12px ${m.color}, 0 0 24px ${m.color}88`,
            whiteSpace: "nowrap",
            letterSpacing: "0.05em",
          }}
        >
          {m.text}
        </div>
      ))}
 
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {STARS.map((s) => <Star key={s.id} {...s} />)}
      </div>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {PETALS.map((p) => <Petal key={p.id} {...p} />)}
      </div>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, transparent, rgba(255,210,80,0.4) 15%, rgba(255,210,80,0.6) 50%, rgba(255,210,80,0.4) 85%, transparent)",
        animation: "ropeWave 4s ease-in-out infinite",
      }} />
      {LANTERNS.map((l, i) => <Lantern key={i} {...l} />)}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 2) * 40}%`,
            animation: `patternFloat ${5 + i * 0.7}s ${i * 0.5}s ease-in-out infinite`,
          }}>
            <ArabicStar style={{ width: 40 + (i % 3) * 20, height: 40 + (i % 3) * 20, opacity: 0.07 }} />
          </div>
        ))}
      </div>
 
      {/* Main card */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          padding: "clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 6vw, 4rem)",
          margin: "0 1rem",
          borderRadius: 24,
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(232,184,75,0.06) 50%, rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(232,184,75,0.25)",
          backdropFilter: "blur(12px)",
          animation: visible ? "borderGlow 4s ease-in-out infinite" : "none",
          maxWidth: 640,
          width: "100%",
        }}
      >
        {CORNER_POSITIONS.map((pos, i) => (
          <div key={i} style={{ position: "absolute", ...pos, animation: `ornamentPulse 3s ${i * 0.3}s ease-in-out infinite` }}>
            <ArabicStar style={{ width: 28, height: 28 }} />
          </div>
        ))}
 
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%", opacity: showDec ? 1 : 0, transition: "opacity 0.8s" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #e8b84b88)" }} />
          <ArabicStar style={{ width: 22, height: 22 }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, #e8b84b88)" }} />
        </div>
 
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CrescentMoon />
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${50 + 55 * Math.cos((i * Math.PI * 2) / 6)}%`,
              top: `${50 + 55 * Math.sin((i * Math.PI * 2) / 6)}%`,
              animation: `sparkle 2s ${i * 0.33}s ease-in-out infinite`,
            }}>
              <ArabicStar style={{ width: 12, height: 12 }} />
            </div>
          ))}
        </div>
 
        <div style={{ opacity: showGreeting ? 1 : 0, transform: showGreeting ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.34,1.3,0.64,1)" }}>
          <div className="arabic-text">عيد مبارك</div>
        </div>
        <div style={{ opacity: showGreeting ? 1 : 0, transform: showGreeting ? "translateY(0)" : "translateY(24px)", transition: "all 0.9s 0.15s cubic-bezier(0.34,1.3,0.64,1)" }}>
          <h1 className="eid-title">Eid Mubarak</h1>
        </div>
        <div className="eid-mubarak" style={{ opacity: showGreeting ? 1 : 0, transform: showGreeting ? "translateY(0)" : "translateY(18px)", transition: "all 0.9s 0.25s cubic-bezier(0.34,1.3,0.64,1)" }}>
          ✦ Blessed Eid ✦
        </div>
 
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "80%", opacity: showSub ? 1 : 0, transition: "opacity 0.8s" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(232,184,75,0.5))" }} />
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {["✦", "◆", "✦"].map((s, i) => <span key={i} style={{ color: "#e8b84b", fontSize: "0.6rem", opacity: 0.7 }}>{s}</span>)}
          </div>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(232,184,75,0.5))" }} />
        </div>
 
        <p className="sub-text" style={{ opacity: showSub ? 1 : 0, transform: showSub ? "translateY(0)" : "translateY(16px)", transition: "all 0.9s cubic-bezier(0.34,1.3,0.64,1)" }}>
          May this blessed occasion bring joy, peace, and prosperity to you and your loved ones.
          Taqabbal Allahu minna wa minkum — from the{" "}
          <span style={{ color: "#f9e04b", fontStyle: "normal", fontWeight: 600 }}>Payao Family</span>.
        </p>
 
        {/* ── CELEBRATE + PLAY GAME BUTTONS ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.85rem",
          opacity: showBtn ? 1 : 0,
          transform: showBtn ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
            {btnPulse && (
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%", height: "100%",
                borderRadius: 50,
                border: "2px solid #e8b84b",
                animation: "pulseRing 0.6s ease-out forwards",
                pointerEvents: "none",
              }} />
            )}
            <button
              ref={btnRef}
              className={`bless-btn${btnPressed ? " bless-btn-pressed" : ""}`}
              onClick={handleBless}
              aria-label="Send blessings"
            >
              {ripples.map(r => (
                <span key={r.id} style={{
                  position: "absolute", left: r.x, top: r.y,
                  width: 20, height: 20, marginLeft: -10, marginTop: -10,
                  borderRadius: "50%", background: "rgba(255,255,255,0.5)",
                  animation: "rippleOut 0.7s ease-out forwards", pointerEvents: "none",
                }} />
              ))}
              <span style={{ display: "inline-block", marginRight: "0.5rem", animation: "btnStarSpin 3s linear infinite", fontSize: "0.9em" }}>✦</span>
              Celebrate Eid
              <span style={{ display: "inline-block", marginLeft: "0.5rem", animation: "btnStarSpin 3s linear infinite reverse", fontSize: "0.9em" }}>✦</span>
            </button>
            {clickCount > 0 && (
              <div key={clickCount} style={{
                fontFamily: "'Lora', serif", fontSize: "0.72rem",
                color: "rgba(232,184,75,0.65)", letterSpacing: "0.08em",
                fontStyle: "italic", animation: "countPop 0.3s ease",
              }}>
                {clickCount === 1 ? "✨ 1 blessing sent!" : `✨ ${clickCount} blessings sent!`}
              </div>
            )}
          </div>

          {/* Play Game button */}
          <button
            className="play-btn"
            onClick={() => setShowGame(g => !g)}
          >
            {showGame ? "🙈 Hide Game" : "🐑 Play Slaughter Rush"}
          </button>
        </div>

        {/* ── SHEEP GAME (collapsible) ── */}
        {showGame && (
          <div style={{ width: "100%", animation: "gameReveal 0.5s cubic-bezier(0.34,1.3,0.64,1) both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(232,184,75,0.4))" }} />
              <span style={{ color: "rgba(232,184,75,0.6)", fontSize: "0.7rem", letterSpacing: "0.12em", fontFamily: "Cinzel Decorative, serif" }}>MINI GAME</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(232,184,75,0.4))" }} />
            </div>
            <SheepGame onFW={handleGameFW} />
          </div>
        )}
 
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%", opacity: showDec ? 1 : 0, transition: "opacity 0.8s 0.2s" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #e8b84b88)" }} />
          <ArabicStar style={{ width: 22, height: 22 }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, #e8b84b88)" }} />
        </div>
      </div>
 
      {/* FOOTER */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem",
        padding: "1rem 1rem 1.4rem",
        background: "linear-gradient(to top, rgba(5,3,20,0.9) 0%, transparent 100%)",
        opacity: showFooter ? 1 : 0,
        transform: showFooter ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem" }}>
          <div style={{ width: 40, height: 1, background: "rgba(232,184,75,0.3)" }} />
          <span style={{ color: "rgba(232,184,75,0.45)", fontSize: "0.55rem" }}>✦</span>
          <div style={{ width: 40, height: 1, background: "rgba(232,184,75,0.3)" }} />
        </div>
        <p style={{
          margin: 0, fontFamily: "'Lora', serif",
          fontSize: "clamp(0.72rem, 1.8vw, 0.82rem)",
          color: "rgba(255,210,120,0.5)", letterSpacing: "0.07em", textAlign: "center",
        }}>
          Developed by{" "}
          <span style={{ color: "#e8b84b", fontWeight: 600, opacity: 0.9 }}>mjdev</span>
        </p>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "60%", height: 120,
        background: "radial-gradient(ellipse at 50% 100%, rgba(232,184,75,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
    </div>
  )
}