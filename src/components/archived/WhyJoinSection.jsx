import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const PIXEL = "'Pixelify Sans', sans-serif"

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: HW }}>
      <span style={{ color: '#71a1e6', fontSize: '0.7rem' }}>{'//'}</span>
      <span style={{ color: '#7c6ea0', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(202,177,253,0.1)' }} />
    </div>
  )
}

const categories = [
  {
    key: 'coder', label: 'For Coders', symbol: '{ }', color: '#71a1e6',
    bg: 'linear-gradient(135deg, #0d1f3a 0%, #0a1628 100%)', accent: 'rgba(113,161,230,0.1)',
    tagline: 'Build. Ship. Win.',
    perks: [
      { mark: '▸', text: 'Real-world problem challenges with real stakes' },
      { mark: '▸', text: '1:1 mentoring from industry engineers' },
      { mark: '▸', text: 'Awards, prizes & public recognition' },
      { mark: '▸', text: 'Direct career & internship connections' },
    ],
  },
  {
    key: 'singer', label: 'For Performers', symbol: '♫', color: '#eeb2ff',
    bg: 'linear-gradient(135deg, #1e0a2e 0%, #160820 100%)', accent: 'rgba(238,178,255,0.08)',
    tagline: 'Your stage. Your story.',
    perks: [
      { mark: '▸', text: 'Perform at SIVITA Gala Night on the last evening' },
      { mark: '▸', text: 'Any art form — music, dance, poetry, spoken word' },
      { mark: '▸', text: 'Audience of 100+ peers & community members' },
      { mark: '▸', text: 'Celebrate your unique voice beyond the screen' },
    ],
  },
  {
    key: 'everyone', label: 'For Everyone', symbol: '✦', color: '#cab1fd',
    bg: 'linear-gradient(135deg, #170d30 0%, #120a28 100%)', accent: 'rgba(202,177,253,0.08)',
    tagline: 'Connect. Grow. Belong.',
    perks: [
      { mark: '▸', text: 'Meet Vietnamese talent from all over Europe' },
      { mark: '▸', text: 'Explore Frankfurt city with SiviTour' },
      { mark: '▸', text: 'Workshops on AI, UX & entrepreneurship' },
      { mark: '▸', text: '2 nights of genuine, unforgettable experience' },
    ],
  },
  {
    key: 'sponsor', label: 'For Sponsors', symbol: '⌘', color: '#4ade80',
    bg: 'linear-gradient(135deg, #051a10 0%, #040f0b 100%)', accent: 'rgba(74,222,128,0.07)',
    tagline: "Discover tomorrow's talent.",
    perks: [
      { mark: '▸', text: 'Direct access to 100+ vetted STEM profiles' },
      { mark: '▸', text: 'Brand visibility on stage, materials & digital' },
      { mark: '▸', text: 'Recruitment pipeline built into the event' },
      { mark: '▸', text: 'Support a growing Vietnamese community in the EU' },
    ],
  },
]

function StackCard({ cat, index, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <div ref={ref} style={{ position: 'sticky', top: `calc(64px + ${index * 22}px)`, zIndex: index + 1, paddingBottom: 8, width: '100%' }}>
      <motion.div initial={{ y: 80, opacity: 0, scale: 0.97 }} animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', overflow: 'hidden', background: cat.bg, border: `1px solid ${cat.color}22`, boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 0 0.5px ${cat.color}15` }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px', background: cat.accent, borderRight: `1px solid ${cat.color}18`, minHeight: 240 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
              <span style={{ marginLeft: 'auto', fontFamily: HW, fontSize: '0.62rem', color: 'rgba(232,224,255,0.2)', letterSpacing: '0.1em' }}>{String(index + 1).padStart(2, '0')}/{total}</span>
            </div>
            <div style={{ fontSize: '2.5rem', marginBottom: 14, lineHeight: 1, color: cat.color, fontFamily: HW }}>{cat.symbol}</div>
            {cat.key === 'coder' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 8 }}>
                {['Build.', 'Ship.', 'Win.'].map((word, wi) => (
                  <div key={wi} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={`${import.meta.env.BASE_URL}pixel_asset/pixeled_no_${wi + 1}.svg`} alt={`${wi + 1}`} style={{ width: 26, height: 26, imageRendering: 'pixelated', flexShrink: 0 }} />
                    <span style={{ fontFamily: HW, fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', fontWeight: 900, color: cat.color, textShadow: `0 0 28px ${cat.color}45`, lineHeight: 1.2 }}>{word}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontFamily: HW, fontSize: 'clamp(1rem, 2.5vw, 1.45rem)', fontWeight: 900, color: cat.color, textShadow: `0 0 28px ${cat.color}45`, lineHeight: 1.2, marginBottom: 8 }}>{cat.tagline}</div>
            )}
            <div style={{ fontFamily: HW, fontSize: '0.7rem', color: `${cat.color}70`, letterSpacing: '0.15em' }}>{cat.label.toUpperCase()}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 32px', gap: 20, background: 'rgba(7,3,15,0.45)', minHeight: 240 }}>
            {cat.perks.map(({ mark, text }, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ flexShrink: 0, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: cat.color, background: `${cat.color}0d`, border: `1px solid ${cat.color}25` }}>{mark}</div>
                <span style={{ color: 'rgba(232,224,255,0.68)', fontSize: '0.85rem', lineHeight: 1.55, paddingTop: 3, fontFamily: HW }}>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function WhyJoinSection() {
  return (
    <section id="why" style={{ position: 'relative', padding: '0 24px', background: 'linear-gradient(180deg, #07030f 0%, #0a0418 60%, #07030f 100%)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ paddingTop: 96, paddingBottom: 32 }}>
          <SectionLabel>tại sao bạn nên tham gia</SectionLabel>
          <h2 style={{ fontFamily: PIXEL, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e8e0ff', lineHeight: 1.1, marginTop: 32 }}>
            What&apos;s in it<br /><span style={{ color: '#cab1fd' }}>for you?</span>
          </h2>
          <p style={{ fontFamily: HW, fontSize: '0.75rem', color: '#4a3a6a', letterSpacing: '0.15em', marginTop: 12 }}>scroll to explore each group ↓</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: `${categories.length * 28 + 40}px` }}>
          {categories.map((cat, i) => (
            <StackCard key={cat.key} cat={cat} index={i} total={categories.length} />
          ))}
        </div>

        <div style={{ paddingTop: 96, paddingBottom: 96, display: 'flex', justifyContent: 'center' }}>
          <a
            href="#register"
            style={{
              padding: '16px 40px', fontFamily: HW, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em',
              background: 'linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)',
              color: '#fff', border: '2px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 20px rgba(90,48,192,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
              textShadow: '0 1px 2px rgba(0,0,0,0.35)',
              borderRadius: '9999px',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)' }}
            onMouseUp={e => { e.currentTarget.style.transform = '' }}
            onMouseLeave={e => { e.currentTarget.style.transform = '' }}
          >
            CLAIM YOUR SPOT
          </a>
        </div>
      </div>
    </section>
  )
}
