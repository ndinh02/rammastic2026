import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false)

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

  return (
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
              href="#register"
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
              DANG KY NGAY
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
