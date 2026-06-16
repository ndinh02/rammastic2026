import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const PIXEL = "'Pixelify Sans', sans-serif"

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: HW }}>
      <span style={{ color: '#71a1e6', fontSize: '0.7rem' }}>{'//'}</span>
      <span style={{ color: '#6a5a90', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(113,161,230,0.15)' }} />
    </div>
  )
}

function PixelIcon({ type }) {
  const commonProps = {
    width: 18,
    height: 18,
    viewBox: '0 0 16 16',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
    style: {
      imageRendering: 'pixelated',
      flexShrink: 0,
      display: 'block',
    },
  }

  if (type === 'location') {
    return (
      <svg {...commonProps}>
        <rect x="5" y="1" width="6" height="2" fill="#62d6ff" />
        <rect x="3" y="3" width="10" height="6" fill="#62d6ff" />
        <rect x="5" y="9" width="6" height="2" fill="#cab1fd" />
        <rect x="7" y="11" width="2" height="4" fill="#ff5fd2" />
        <rect x="6" y="4" width="4" height="4" fill="#120a24" />
        <rect x="7" y="5" width="2" height="2" fill="#ffe066" />
      </svg>
    )
  }

  if (type === 'germany') {
    return (
      <svg {...commonProps}>
        <rect x="1" y="3" width="14" height="3" fill="#111111" />
        <rect x="1" y="6" width="14" height="3" fill="#e5484d" />
        <rect x="1" y="9" width="14" height="3" fill="#ffd166" />
        <rect x="1" y="3" width="14" height="9" fill="none" stroke="#cab1fd" strokeWidth="0.6" />
      </svg>
    )
  }

  if (type === 'calendar') {
    return (
      <svg {...commonProps}>
        <rect x="2" y="3" width="12" height="11" fill="#cab1fd" />
        <rect x="2" y="3" width="12" height="3" fill="#ff5fd2" />
        <rect x="4" y="1" width="2" height="4" fill="#62d6ff" />
        <rect x="10" y="1" width="2" height="4" fill="#62d6ff" />
        <rect x="4" y="7" width="2" height="2" fill="#120a24" />
        <rect x="7" y="7" width="2" height="2" fill="#71a1e6" />
        <rect x="10" y="7" width="2" height="2" fill="#120a24" />
        <rect x="4" y="10" width="2" height="2" fill="#120a24" />
        <rect x="7" y="10" width="2" height="2" fill="#ffe066" />
      </svg>
    )
  }

  if (type === 'duration') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="2" width="8" height="1" fill="#62d6ff" />
        <rect x="3" y="3" width="10" height="10" fill="#cab1fd" />
        <rect x="5" y="5" width="6" height="6" fill="#120a24" />
        <rect x="7" y="6" width="1" height="3" fill="#ff5fd2" />
        <rect x="8" y="8" width="2" height="1" fill="#ffd166" />
        <rect x="4" y="13" width="8" height="1" fill="#62d6ff" />
      </svg>
    )
  }

  return null
}

function MacWindow({ children, title }) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#3c2864', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        {title && (
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: HW,
              fontSize: '0.65rem',
              color: 'rgba(232,224,255,0.35)',
              letterSpacing: '0.1em',
            }}
          >
            {title}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

const infoItems = [
  { icon: 'location', label: 'LOCATION', value: 'Frankfurt am Main' },
  { icon: 'germany', label: 'COUNTRY', value: 'Germany' },
  { icon: 'calendar', label: 'DATE', value: '17–19 September 2026' },
  { icon: 'duration', label: 'DURATION', value: '3 days · 3 nights' },
]

const BUG_SLOTS = [16, 60, 104, 148, 192]

export function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [rightPos, setRightPos] = useState(48)
  const [bugKey, setBugKey] = useState(0)
  // 'idle' | 'bouncing' | 'hidden'
  const [phase, setPhase] = useState('idle')

  const handleHoverStart = () => {
    if (phase !== 'idle' || !inView) return
    setPhase('bouncing')
  }

  const handleAnimationComplete = () => {
    if (phase !== 'bouncing') return

    // Instantly hide, then change slot + remount in the next frame
    setPhase('hidden')
    setTimeout(() => {
      const others = BUG_SLOTS.filter(p => Math.abs(p - rightPos) > 40)
      const newPos = others[Math.floor(Math.random() * others.length)]
      setRightPos(newPos)
      setBugKey(k => k + 1)
      setPhase('idle')
    }, 16)
  }

  // Keyframe bounce in-place: stay at peek → fly up → return to peek
  const bugAnimate =
    !inView
      ? { y: 80, opacity: 0 }
      : phase === 'bouncing'
      ? { y: [-42, -130, -42], opacity: 1 }
      : phase === 'hidden'
      ? { y: -42, opacity: 0 }
      : { y: -42, opacity: 1 }

  const bugTransition =
    phase === 'bouncing'
      ? { duration: 0.55, times: [0, 0.38, 1], ease: ['easeOut', 'easeIn'] }
      : phase === 'hidden'
      ? { duration: 0 }
      : { type: 'spring', stiffness: 200, damping: 18, delay: bugKey === 0 ? 0.55 : 0.06 }

  return (
    <section id="about" ref={ref} style={{ position: 'relative', padding: '96px 24px', overflow: 'hidden', background: 'linear-gradient(160deg, #1a0f35 0%, #1e1040 40%, #150c30 100%)', borderTop: '1px solid rgba(202,177,253,0.1)', borderBottom: '1px solid rgba(202,177,253,0.1)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(113,161,230,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(113,161,230,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 384, height: 384, pointerEvents: 'none', background: 'radial-gradient(circle at 100% 0%, rgba(202,177,253,0.08) 0%, transparent 65%)' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <SectionLabel>về sự kiện</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginTop: 32, position: 'relative' }}
        >
          <motion.img
            key={bugKey}
            src={`${import.meta.env.BASE_URL}pixel_asset/pixeled_bug.svg`}
            alt=""
            aria-hidden="true"
            initial={{ y: 80, opacity: 0 }}
            animate={bugAnimate}
            transition={bugTransition}
            onHoverStart={handleHoverStart}
            onAnimationComplete={handleAnimationComplete}
            style={{
              position: 'absolute',
              top: 0,
              right: rightPos,
              width: 96,
              height: 96,
              zIndex: 2,
              imageRendering: 'pixelated',
              pointerEvents: phase === 'idle' && inView ? 'auto' : 'none',
              cursor: 'pointer',
            }}
          />

          <div style={{ position: 'relative', zIndex: 3 }}>
            <MacWindow>
              <div style={{ padding: 28, background: 'rgba(18,10,36,0.85)' }}>
                <h2 style={{ fontFamily: PIXEL, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e8e0ff', lineHeight: 1.1, marginBottom: 20 }}>
                  RAMmastic<br /><span style={{ color: '#cab1fd' }}>là gì?</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                  {[
                      'SiviCamp là Trại hè thường niên lớn nhất dành cho cộng đồng Thanh niên - Sinh viên Việt Nam tại Đức.',
                      <>
                        Trở lại với tên gọi <strong style={{ fontWeight: 800 }}>RAMmastic</strong>, Trại hè 2026 sẽ mở ra không gian giao thoa giữa khoa học công nghệ và nghệ thuật sân khấu. Nơi những đam mê tưởng chừng khác biệt sẽ cùng gặp nhau trong một sân chơi chung.
                      </>,
                    ].map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                      style={{ color: 'rgba(232,224,255,0.82)', lineHeight: 1.85, fontSize: '0.9rem', fontFamily: HW }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
                >
                    {infoItems.map(({ icon, label, value }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px', background: 'rgba(202,177,253,0.05)', border: '1px solid rgba(202,177,253,0.1)', borderRadius: 6 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <PixelIcon type={icon} />

                        <span
                          style={{
                            fontFamily: HW,
                            fontSize: '0.65rem',
                            color: '#7c6ea0',
                            letterSpacing: '0.12em',
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      <span style={{ fontFamily: HW, fontSize: '0.78rem', fontWeight: 700, color: '#cab1fd' }}>{value}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </MacWindow>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
