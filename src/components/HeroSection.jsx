import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { SponsorsBar } from './SponsorsBar'

function GlitchText({ text }) {
  const [glitching, setGlitching] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 160)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  return (
    <span style={{
      fontFamily: "'Press Start 2P', 'Orbitron', sans-serif",
      color: '#cab1fd',
      textShadow: glitching
        ? '3px 0 #71a1e6, -3px 0 #ff66aa, 0 0 40px rgba(202,177,253,0.9)'
        : '0 0 40px rgba(202,177,253,0.35)',
      transition: 'text-shadow 0.1s',
      display: 'inline-block',
      transform: glitching ? 'translateX(3px) skewX(-1deg)' : 'none',
      letterSpacing: '0.06em',
    }}>
      {text}
    </span>
  )
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const target = new Date('2026-09-17T09:00:00+02:00').getTime()
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) return
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'NGÀY', val: timeLeft.d },
    { label: 'GIỜ', val: timeLeft.h },
    { label: 'PHÚT', val: timeLeft.m },
    { label: 'GIÂY', val: timeLeft.s },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {units.map(({ label, val }, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(202,177,253,0.07)', border: '2px solid rgba(202,177,253,0.35)',
              boxShadow: 'inset 0 0 0 1px rgba(202,177,253,0.1), 2px 2px 0 rgba(0,0,0,0.4)',
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#cab1fd', fontSize: '1.3rem', fontWeight: 700, textShadow: '0 0 10px rgba(202,177,253,0.5)' }}>
                {String(val).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', color: '#a896cc', letterSpacing: '0.08em', marginTop: 6 }}>
              {label}
            </span>
          </div>
          {i < 3 && <span style={{ color: 'rgba(202,177,253,0.4)', fontSize: '1.1rem', fontFamily: "'JetBrains Mono', monospace", marginBottom: 20 }}>:</span>}
        </div>
      ))}
    </div>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() < 0.3 ? 3 : Math.random() * 1.5 + 0.5,
    duration: Math.random() * 9 + 5,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.08,
    isPixel: Math.random() < 0.3,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.id % 3 === 0 ? '#cab1fd' : p.id % 3 === 1 ? '#71a1e6' : '#eeb2ff',
            opacity: p.opacity,
            borderRadius: p.isPixel ? 0 : '50%',
          }}
          animate={{ y: [0, -24, 0], opacity: [p.opacity, p.opacity * 0.2, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="hero" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: '100svh', paddingTop: 64, paddingBottom: 120 }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 90% 65% at 50% 15%, rgba(32,19,69,0.98) 0%, #07030f 65%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(113,161,230,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(113,161,230,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 35%, black 0%, transparent 75%)' }} />
      <ParticleField />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 768, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center' }}>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: "'Press Start 2P', sans-serif", fontSize: '0.62rem', color: '#71a1e6', letterSpacing: '0.3em', fontWeight: 400 }}>SIVICAMP 2026</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: 'rgba(232,224,255,0.35)', letterSpacing: '0.18em' }}>17–19 SEPT · FRANKFURT AM MAIN, GERMANY</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <h1 style={{ fontFamily: "'Press Start 2P', 'Orbitron', sans-serif", fontSize: 'clamp(1.8rem, 7vw, 4.2rem)', fontWeight: 400, lineHeight: 1.1, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.45em', color: '#71a1e6', fontWeight: 700, textShadow: '0 0 16px rgba(113,161,230,0.6)', alignSelf: 'center', marginBottom: '0.08em' }}>#</span>
            <GlitchText text="RAMMASTIC" />
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', color: '#cab1fd', letterSpacing: '0.15em' }}>REGISTRATIONS OPEN</span>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ color: 'rgba(232,224,255,0.52)', fontSize: '0.92rem', lineHeight: 1.75, maxWidth: 460, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
          Trại hè tài năng đầu tiên cho sinh viên và người trẻ Việt Nam tại Đức.{' '}
          <span style={{ color: 'rgba(232,224,255,0.3)' }}>Nơi công nghệ gặp gỡ văn hoá.</span>
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.45rem', color: '#7c6ea0', letterSpacing: '0.15em' }}>EVENT_STARTS_IN</span>
          <Countdown />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <a
              href="#register"
              style={{
                fontFamily: "'Press Start 2P', sans-serif",
                background: 'linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)',
                color: '#fff', border: '2px solid rgba(255,255,255,0.15)',
                boxShadow: '0 4px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.25)',
                textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                minHeight: 52, padding: '0 36px', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.1em',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px) scale(0.97)' }}
              onMouseUp={e => { e.currentTarget.style.transform = '' }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}
            >
              START QUEST
            </a>
            <a
              href="#about"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'rgba(232,224,255,0.78)', border: '2px solid rgba(202,177,253,0.35)',
                minHeight: 52, padding: '0 28px', fontSize: '0.875rem', letterSpacing: '0.15em',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#cab1fd'; e.currentTarget.style.borderColor = '#cab1fd' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(232,224,255,0.78)'; e.currentTarget.style.borderColor = 'rgba(202,177,253,0.35)' }}
            >
              EXPLORE →
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, rgba(202,177,253,0.4), transparent)' }} />
      </motion.div>

      {/* Partners strip — in-frame with hero */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5 }}>
        <SponsorsBar />
      </div>
    </section>
  )
}
