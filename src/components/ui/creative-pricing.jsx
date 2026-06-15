import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { REGISTRATION_URL } from '@/config/links'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const PIXEL = "'Pixelify Sans', sans-serif"

const colorConfigs = {
  amber: {
    primary: '#f0a500',
    border: 'rgba(240,165,0,0.28)',
    bg: 'linear-gradient(135deg, #1c1100 0%, #110b00 100%)',
    accent: 'rgba(240,165,0,0.07)',
    glow: '0 0 70px rgba(240,165,0,0.10), 0 24px 60px rgba(0,0,0,0.75)',
    topBar: 'linear-gradient(90deg, rgba(240,165,0,0.7), rgba(240,165,0,0.2), transparent)',
  },
  blue: {
    primary: '#71a1e6',
    border: 'rgba(113,161,230,0.35)',
    bg: 'linear-gradient(135deg, #0c1d38 0%, #081325 100%)',
    accent: 'rgba(113,161,230,0.09)',
    glow: '0 0 80px rgba(113,161,230,0.16), 0 24px 60px rgba(0,0,0,0.75)',
    topBar: 'linear-gradient(90deg, rgba(113,161,230,0.7), rgba(113,161,230,0.2), transparent)',
  },
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: HW }}>
      <span style={{ color: '#71a1e6', fontSize: '0.7rem' }}>{'//'}</span>
      <span style={{ color: '#7c6ea0', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(202,177,253,0.1)' }} />
    </div>
  )
}

function StackCard({ tier, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const cfg = colorConfigs[tier.color] || colorConfigs.blue

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        top: `calc(64px + ${index * 24}px)`,
        zIndex: index + 1,
        paddingBottom: 8,
        width: '100%',
      }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.97 }}
        animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          overflow: 'hidden',
          background: cfg.bg,
          border: `1px solid ${cfg.border}`,
          boxShadow: cfg.glow,
        }}
      >
        {/* Left panel — price + identity */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '48px 40px',
            background: cfg.accent,
            borderRight: `1px solid ${cfg.border}`,
            minHeight: 260,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: cfg.topBar }} />

          {/* Window dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
            {tier.popular && (
              <span style={{
                marginLeft: 'auto',
                fontFamily: HW, fontSize: '0.58rem', color: cfg.primary,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '2px 8px', border: `1px solid ${cfg.border}`,
                background: `${cfg.primary}12`,
              }}>
                POPULAR
              </span>
            )}
          </div>

          {/* Icon */}
          <div style={{
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${cfg.primary}14`,
            border: `1px solid ${cfg.border}`,
            color: cfg.primary,
            marginBottom: 20,
          }}>
            {tier.icon}
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
            <span style={{ fontFamily: HW, fontSize: '1.1rem', fontWeight: 700, color: cfg.primary }}>€</span>
            <span style={{
              fontFamily: PIXEL,
              fontSize: 'clamp(2.8rem, 5vw, 3.6rem)',
              color: cfg.primary,
              lineHeight: 1,
              textShadow: `0 0 50px ${cfg.primary}55`,
            }}>
              {tier.price}
            </span>
          </div>
          <div style={{ fontFamily: HW, fontSize: '0.65rem', color: `${cfg.primary}60`, letterSpacing: '0.12em', marginBottom: 16 }}>
            PER PERSON
          </div>

          <div style={{ fontFamily: PIXEL, fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', color: '#e8e0ff', lineHeight: 1.25, marginBottom: 10 }}>
            {tier.name}
          </div>
          <p style={{ fontFamily: HW, fontSize: '0.78rem', color: 'rgba(232,224,255,0.4)', lineHeight: 1.55, maxWidth: 220 }}>
            {tier.description}
          </p>
        </div>

        {/* Right panel — features + CTA */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 36px',
            gap: 0,
            background: 'rgba(7,3,15,0.45)',
            minHeight: 260,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
            {tier.features.map(({ mark, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}
              >
                <div style={{
                  flexShrink: 0, width: 28, height: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', color: cfg.primary,
                  background: `${cfg.primary}0d`,
                  border: `1px solid ${cfg.primary}25`,
                }}>
                  ▸
                </div>
                <span style={{ color: 'rgba(232,224,255,0.68)', fontSize: '0.85rem', lineHeight: 1.55, paddingTop: 3, fontFamily: HW }}>
                  {text}
                </span>
              </motion.div>
            ))}
          </div>

          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '14px 24px',
              fontFamily: HW,
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: tier.popular ? '#07030f' : cfg.primary,
              background: tier.popular
                ? `linear-gradient(180deg, ${cfg.primary} 0%, ${cfg.primary}cc 100%)`
                : 'transparent',
              border: `1.5px solid ${cfg.primary}`,
              boxShadow: tier.popular ? `0 6px 24px ${cfg.primary}35` : 'none',
              transition: 'opacity 0.18s, transform 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = '' }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(1px)' }}
            onMouseUp={e => { e.currentTarget.style.transform = '' }}
          >
            Đăng ký ngay
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export function CreativePricing({ tag, title, description, tiers }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  // Normalize features to { mark, text } shape
  const normalizedTiers = tiers.map(t => ({
    ...t,
    features: t.features.map(f => (typeof f === 'string' ? { mark: '▸', text: f } : f)),
  }))

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: '96px 24px 0',
        background: 'linear-gradient(180deg, #07030f 0%, #0a0418 50%, #07030f 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '50%',
        transform: 'translateX(-50%)',
        width: 700, height: 350,
        background: 'radial-gradient(ellipse, rgba(202,177,253,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingBottom: 48 }}
        >
          <SectionLabel>{tag}</SectionLabel>
          <h2 style={{
            fontFamily: PIXEL,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: '#e8e0ff',
            lineHeight: 1.1,
            marginTop: 32,
            marginBottom: 16,
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: HW,
            fontSize: '0.88rem',
            color: 'rgba(232,224,255,0.48)',
            maxWidth: 480,
            lineHeight: 1.7,
          }}>
            {description}
          </p>
        </motion.div>

        {/* Sticky-stack cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: `${normalizedTiers.length * 28 + 80}px`,
        }}>
          {normalizedTiers.map((tier, i) => (
            <StackCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{
            textAlign: 'center',
            fontFamily: HW,
            fontSize: '0.7rem',
            color: 'rgba(202,177,253,0.28)',
            letterSpacing: '0.08em',
            paddingBottom: 64,
          }}
        >
          * Giá vé chưa bao gồm chỗ ở — đặt sớm để giữ chỗ!
        </motion.p>
      </div>
    </section>
  )
}
