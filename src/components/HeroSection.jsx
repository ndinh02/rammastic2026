import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { SponsorsBar } from './SponsorsBar'
// import {
//   RegistrationFireworkLayer,
//   useRegistrationFirework,
//   pressRegistrationButton,
//   releaseRegistrationButton,
//   registrationPressStyle,
// } from './ui/registration-firework'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const target = new Date('2026-07-31T00:00:00+02:00').getTime()

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
            <div
              style={{
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(7, 3, 15, 0.72)',
                boxShadow:
                  'inset 0 0 0 1px rgba(202,177,253,0.18), 2px 2px 0 rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span
                style={{
                  fontFamily: HW,
                  color: '#cab1fd',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  textShadow: '0 0 10px rgba(202,177,253,0.5)',
                }}
              >
                {String(val).padStart(2, '0')}
              </span>
            </div>

            <span
              style={{
                fontFamily: HW,
                fontSize: '0.65rem',
                color: '#a896cc',
                letterSpacing: '0.08em',
                marginTop: 6,
              }}
            >
              {label}
            </span>
          </div>

          {i < 3 && (
            <span
              style={{
                color: 'rgba(202,177,253,0.4)',
                fontSize: '1.1rem',
                fontFamily: HW,
                marginBottom: 20,
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() < 0.3 ? 3 : Math.random() * 1.5 + 0.5,
    duration: Math.random() * 9 + 5,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.08,
    isPixel: Math.random() < 0.3,
  }))

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0 ? '#cab1fd' : p.id % 3 === 1 ? '#71a1e6' : '#eeb2ff',
            opacity: p.opacity,
            borderRadius: p.isPixel ? 0 : '50%',
          }}
          animate={{
            y: [0, -24, 0],
            opacity: [p.opacity, p.opacity * 0.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  // const { burst, handleRegistrationClick } = useRegistrationFirework()

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: '100svh',
        paddingBottom: 120,
      }}
    >
      {/* Hero image background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `url(${import.meta.env.BASE_URL}hero/hero.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 90% 65% at 50% 15%, rgba(32,19,69,0.5) 0%, rgba(7,3,15,0.70) 65%)',
        }}
      />

      {/* Optional grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(113,161,230,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(113,161,230,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 35%, black 0%, transparent 75%)',
        }}
      />

      <ParticleField />

      {/* <RegistrationFireworkLayer burst={burst} /> */}

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 768,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
          textAlign: 'center',
        }}
      >
        <motion.div
        className="hero-event-info"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span
          style={{
            fontFamily: HW,
            fontSize: 'clamp(1.17rem, 1.5vw, 1.33rem)',
            fontWeight: 700,
            letterSpacing: '0.18em',
            lineHeight: 1.5,
            color: '#71a1e6',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          TRẠI HÈ TÀI NĂNG THANH NIÊN SINH VIÊN VIỆT NAM TẠI ĐỨC
        </span>

        <span
          style={{
            fontFamily: HW,
            fontSize: 'clamp(0.68rem, 2vw, 0.78rem)',
            fontWeight: 700,
            letterSpacing: '0.18em',
            lineHeight: 1.5,
            color: '#ffffff',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          17–19 SEPT · FRANKFURT AM MAIN, GERMANY
        </span>
      </motion.div>

        {/* Center SiviCamp logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            margin: '-4px 0 -2px',
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}hero/logo_SiviCamp-512.webp?v=lcp-1`}
            width={512}
            height={512}
            fetchPriority="high"
            loading="eager"
            alt="SiviCamp 2026"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              width: 'min(68vw, 380px)',
              height: 'auto',
              display: 'block',
              margin: 0,
              padding: 0,
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 0 }}>
            <span
              style={{
                width: 6,
                height: 6,
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />

            <span
              style={{
                fontFamily: HW,
                fontSize: '0.7rem',
                color: '#cab1fd',
                letterSpacing: '0.15em',
              }}
            >
              REGISTRATIONS OPEN
            </span>
          </div>
        </motion.div>

        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            color: 'rgba(232,224,255,0.52)',
            fontSize: '0.92rem',
            lineHeight: 1.75,
            maxWidth: 460,
            fontFamily: HW,
            margin: 0,
          }}
        >
          Trại hè Tài năng đầu tiên cho Thanh niên, Sinh viên và người trẻ Việt Nam tại Đức và Châu Âu.{' '}
          <span style={{ color: 'rgba(232,224,255,0.3)' }}>
            Nơi Công nghệ gặp gỡ Văn hoá.
          </span>
        </motion.p> */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: HW,
              fontSize: '0.65rem',
              color: '#7c6ea0',
              letterSpacing: '0.15em',
            }}
          >
            REGULAR_ENDS_IN
          </span>

          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <a
              href="#pricing"
              style={{
                fontFamily: HW,
                background:
                  'linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.15)',
                boxShadow:
                  '0 4px 20px rgba(90,48,192,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
                textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                borderRadius: '9999px',
                minHeight: 52,
                padding: '0 36px',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(2px) scale(0.97)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = ''
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''
              }}
            >
              START QUEST
            </a>

            <a
              href="#about"
              style={{
                fontFamily: HW,
                color: 'rgba(232,224,255,0.78)',
                border: '2px solid rgba(202,177,253,0.35)',
                borderRadius: '9999px',
                minHeight: 52,
                padding: '0 28px',
                fontSize: '0.875rem',
                letterSpacing: '0.15em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#cab1fd'
                e.currentTarget.style.borderColor = '#cab1fd'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(232,224,255,0.78)'
                e.currentTarget.style.borderColor = 'rgba(202,177,253,0.35)'
              }}
            >
              EXPLORE →
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          style={{
            width: 1,
            height: 28,
            background: 'linear-gradient(to bottom, rgba(202,177,253,0.4), transparent)',
          }}
        />
      </motion.div>

      {/* Partners strip — in-frame with hero */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 5,
        }}
      >
        <SponsorsBar />
      </div>
      <style>{`
        .hero-section {
          padding-top: 104px;
        }

        .hero-event-info {
          width: 100%;
          max-width: 960px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 0 16px;
          text-align: center;
        }

        @media (max-width: 767px) {
          .hero-section {
            justify-content: flex-start !important;
            padding-top: 142px;
            padding-bottom: 120px;
          }

          .hero-event-info {
            gap: 12px;
            padding-left: 18px;
            padding-right: 18px;
            margin-bottom: 4px;
          }

          .hero-event-info span:first-child {
            font-size: clamp(1.14rem, 4.7vw, 1.36rem) !important;
            letter-spacing: 0.14em !important;
            line-height: 1.5 !important;
            max-width: min(94vw, 680px);
          }

          .hero-event-info span:last-child {
            font-size: 0.76rem !important;
            letter-spacing: 0.1em !important;
            line-height: 1.45 !important;
          }
        }

        @media (max-width: 430px) {
          .hero-section {
            padding-top: 136px;
          }

          .hero-event-info span:first-child {
            font-size: 1.17rem !important;
            letter-spacing: 0.12em !important;
            line-height: 1.5 !important;
          }

          .hero-event-info span:last-child {
            font-size: 0.7rem !important;
            letter-spacing: 0.08em !important;
          }
        }
      `}</style>
    </section>
  )
}