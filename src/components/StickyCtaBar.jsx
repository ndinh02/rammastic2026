import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { REGISTRATION_URL } from '@/config/links'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"

const FIREWORK_COLORS = ['#cab1fd', '#eeb2ff', '#71a1e6', '#f9d4ff', '#fbbf24', '#f472b6', '#ff6b6b', '#4ade80', '#fff', '#a78bfa']

function NavRocket({ x, y, targetX, targetY, color, duration, onComplete }) {
  const angle = Math.atan2(targetY - y, targetX - x) * (180 / Math.PI) + 90
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x - 2,
        top: y - 8,
        width: 4,
        height: 10,
        background: `linear-gradient(to top, transparent, ${color}, #fff)`,
        borderRadius: 3,
        pointerEvents: 'none',
        zIndex: 200,
        rotate: angle,
        boxShadow: `0 0 8px 2px ${color}`,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: targetX - x, y: targetY - y, opacity: [1, 1, 0.7] }}
      transition={{ duration, ease: [0.4, 0, 0.6, 1] }}
      onAnimationComplete={onComplete}
    />
  )
}

function NavSpark({ x, y, angle, speed, color, size, gravity }) {
  const rad = (angle * Math.PI) / 180
  const vx = Math.cos(rad) * speed
  const vy = Math.sin(rad) * speed
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size > 5 ? '50%' : 1,
        background: color,
        pointerEvents: 'none',
        zIndex: 200,
        boxShadow: `0 0 ${size * 2.5}px ${color}`,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: [0, vx * 0.55, vx],
        y: [0, vy * 0.55, vy + gravity],
        opacity: [1, 0.85, 0],
        scale: [1, 0.8, 0.15],
      }}
      transition={{ duration: 1.1 + Math.random() * 0.5, times: [0, 0.4, 1], ease: 'easeIn' }}
    />
  )
}

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false)
  const [rockets, setRockets] = useState([])
  const [sparks, setSparks] = useState([])
  const buttonRef = useRef(null)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const spawnExplosion = useCallback((cx, cy) => {
    const count = 32
    const newSparks = Array.from({ length: count }, (_, i) => ({
      id: `sticky-spark-${Date.now()}-${Math.random()}`,
      x: cx,
      y: cy,
      angle: (360 / count) * i + (Math.random() - 0.5) * 14,
      speed: 70 + Math.random() * 110,
      color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
      size: Math.random() < 0.2 ? 7 : Math.random() * 4 + 2,
      gravity: 80 + Math.random() * 100,
    }))
    setSparks((prev) => [...prev, ...newSparks])
    const ids = new Set(newSparks.map((s) => s.id))
    setTimeout(() => setSparks((prev) => prev.filter((s) => !ids.has(s.id))), 2000)
  }, [])

  const handleRocketDone = useCallback(
    (rocketId, tx, ty) => {
      setRockets((prev) => prev.filter((r) => r.id !== rocketId))
      spawnExplosion(tx, ty)
    },
    [spawnExplosion],
  )

  const handleClick = useCallback(
    (e) => {
      e.preventDefault()
      if (!buttonRef.current) return
      const btnRect = buttonRef.current.getBoundingClientRect()
      const cx = btnRect.left + btnRect.width / 2
      const cy = btnRect.top + btnRect.height / 2

      const newRockets = Array.from({ length: 6 }, (_, i) => ({
        id: `sticky-rocket-${Date.now()}-${i}`,
        x: cx + (Math.random() - 0.5) * 40,
        y: cy,
        targetX: cx + (Math.random() - 0.5) * (window.innerWidth * 0.7),
        targetY: cy - window.innerHeight * (0.25 + Math.random() * 0.5),
        color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
        duration: 0.45 + Math.random() * 0.35,
      }))
      setRockets((prev) => [...prev, ...newRockets])
      setTimeout(() => window.open(REGISTRATION_URL, '_blank'), 1800)
    },
    [],
  )

  return (
  <>
    <style>{`
      .mobile-sticky-cta {
        display: none !important;
      }

      @media (max-width: 640px) {
        .mobile-sticky-cta {
          display: block !important;
        }
      }
    `}</style>

    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
            background: 'rgba(7,3,15,0.97)',
            borderTop: '1px solid rgba(202,177,253,0.18)',
            backdropFilter: 'blur(16px)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
          className="mobile-sticky-cta"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', padding: '6px 10px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: HW, fontSize: '0.75rem', color: '#4ade80', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>100 chỗ</span>
            </div>
            <a
              ref={buttonRef}
              href={REGISTRATION_URL}
              target="_blank"
              onClick={handleClick}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 48,
                fontFamily: HW, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em',
                background: 'linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)',
                color: '#fff', border: '2px solid rgba(255,255,255,0.15)',
                boxShadow: '0 4px 16px rgba(90,48,192,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                borderRadius: '9999px',
              }}
              onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
              onTouchEnd={e => { e.currentTarget.style.transform = '' }}
            >
              ĐĂNG KÝ NGAY
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {rockets.map((r) => (
      <NavRocket
        key={r.id}
        {...r}
        onComplete={() => handleRocketDone(r.id, r.targetX, r.targetY)}
      />
    ))}
    {sparks.map((s) => (
      <NavSpark key={s.id} {...s} />
    ))}
  </>
  )
}
