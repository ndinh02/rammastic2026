import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
      <span style={{ color: '#71a1e6', fontSize: '0.7rem' }}>{'//'}</span>
      <span style={{ color: '#6a5a90', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(113,161,230,0.15)' }} />
    </div>
  )
}

function MacWindow({ children, title }) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(60,40,100,0.7)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: 'rgba(232,224,255,0.35)', letterSpacing: '0.1em' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

const infoItems = [
  { symbol: '[LOC]', label: 'LOCATION', value: 'Frankfurt am Main' },
  { symbol: '[DE]', label: 'COUNTRY', value: 'Germany' },
  { symbol: '[CAL]', label: 'DATE', value: '17–19 September 2026' },
  { symbol: '[3D]', label: 'DURATION', value: '4 days · 3 nights' },
]

export function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ position: 'relative', padding: '96px 24px', overflow: 'hidden', background: 'linear-gradient(160deg, #1a0f35 0%, #1e1040 40%, #150c30 100%)', borderTop: '1px solid rgba(202,177,253,0.1)', borderBottom: '1px solid rgba(202,177,253,0.1)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(113,161,230,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(113,161,230,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 384, height: 384, pointerEvents: 'none', background: 'radial-gradient(circle at 100% 0%, rgba(202,177,253,0.08) 0%, transparent 65%)' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <SectionLabel>về sự kiện</SectionLabel>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginTop: 32 }}>
          <MacWindow title="rammastic_2026.txt">
            <div style={{ padding: 28, background: 'rgba(18,10,36,0.85)' }}>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e8e0ff', lineHeight: 1.1, marginBottom: 20 }}>
                RAMmastic<br /><span style={{ color: '#cab1fd' }}>là gì?</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                {[
                  'SiviCamp là sự kiện thường niên kết nối, khám phá và phát triển tài năng dành cho cộng đồng sinh viên và người trẻ Việt Nam tại Đức.',
                  'Với chủ đề # RAMmastic, SiviCamp 2026 kết hợp SiviHack — sân chơi công nghệ AI — cùng SIVITA Gala Night, nơi nghệ thuật và câu chuyện cá nhân được lan toả qua âm nhạc và sáng tạo.',
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                    style={{ color: 'rgba(232,224,255,0.82)', lineHeight: 1.85, fontSize: '0.9rem', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
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
                {infoItems.map(({ symbol, label, value }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px', background: 'rgba(202,177,253,0.05)', border: '1px solid rgba(202,177,253,0.1)', borderRadius: 6 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', color: '#7c6ea0', letterSpacing: '0.12em' }}>{symbol} {label}</span>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.78rem', fontWeight: 700, color: '#cab1fd' }}>{value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </MacWindow>
        </motion.div>
      </div>
    </section>
  )
}
