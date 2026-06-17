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

const orgs = [
  {
    name: 'VGI e.V.', color: '#71a1e6',
    role: 'Technical Partner', roleVi: 'Chuyên môn & Hội đồng đánh giá',
    description: 'Mạng lưới Đổi mới Sáng tạo Việt Đức',
    stats: [{ label: 'FOUNDED', value: '2019' }], //{ label: 'WORKSHOPS', value: '3' }],
    logo: `${import.meta.env.BASE_URL}logo/vgi.svg`,
    logoWidth: 100,
  },
  {
    name: 'SIVIDUC e.V.', color: '#cab1fd',
    role: 'Main Organizer', roleVi: 'Đơn vị tổ chức chính',
    description: 'Hội Sinh viên Việt Nam tại CHLB Đức',
    stats: [{ label: 'FOUNDED', value: '2012' }],//, { label: 'MEMBERS', value: '200+' }],
    logo: `${import.meta.env.BASE_URL}logo/sividuc.svg`,
    logoWidth: 105,
  },
  {
    name: 'VSAF e.V.', color: '#eeb2ff',
    role: 'Operations Partner', roleVi: 'Vận hành & Hậu cần',
    description: 'Hội Sinh viên Việt Nam tại TP. Frankfurt am Main',
    stats: [{ label: 'FOUNDED', value: '2015' }], //{ label: 'CAPACITY', value: '200' }],
    logo: `${import.meta.env.BASE_URL}logo/vsaf.svg`,
    logoWidth: 100,
  },
]

export function OrgSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="org" ref={ref} style={{ position: 'relative', padding: '96px 24px', overflow: 'hidden', background: '#0d0720', borderTop: '1px solid rgba(202,177,253,0.08)', borderBottom: '1px solid rgba(202,177,253,0.08)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.3, backgroundImage: 'linear-gradient(rgba(202,177,253,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(202,177,253,0.08) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 0%, transparent 80%)' }} />

      <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative' }}>
        <SectionLabel>ban tổ chức</SectionLabel>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginTop: 32, marginBottom: 48, textAlign: 'center' }}>
          <h2 style={{ fontFamily: PIXEL, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: '#e8e0ff' }}>ORGANISED BY</h2>
          <p style={{ marginTop: 12, maxWidth: 672, margin: '12px auto 0', fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(232,224,255,0.5)', fontFamily: HW }}>
            SiviCamp 2026 được dẫn dắt bởi ba tổ chức phi lợi nhuận, hướng tới phát triển phong trào Thanh niên Sinh viên Việt Nam tại Châu Âu
          </p>
        </motion.div>

        <div
          className="org-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {orgs.map((org, i) => (
            <motion.div
              key={org.name}
              className={
                org.name.startsWith('SIVIDUC')
                  ? 'org-card org-card-sividuc'
                  : org.name.startsWith('VGI')
                  ? 'org-card org-card-vgi'
                  : 'org-card org-card-vsaf'
              }
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              style={{ position: 'relative', padding: 24, display: 'flex', flexDirection: 'column', gap: 20, background: 'rgba(18,11,36,0.8)', border: '1px solid rgba(202,177,253,0.12)', transition: 'all 0.3s', alignItems: 'center', textAlign: 'center' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.border = `1px solid ${org.color}50`; el.style.boxShadow = `0 8px 40px ${org.color}12`; el.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.border = '1px solid rgba(202,177,253,0.12)'; el.style.boxShadow = 'none'; el.style.transform = 'none' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${org.color}60, transparent)` }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    width: 112,
                    height: 88,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    marginBottom: 4,
                  }}
                >
                  <img
                    src={org.logo}
                    alt={org.name}
                    style={{
                      width: org.logoWidth,
                      height: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ fontFamily: HW, fontSize: '1.1rem', fontWeight: 800, color: org.color, textShadow: `0 0 20px ${org.color}40`, marginBottom: 4 }}>{org.name}</div>
                <div style={{ fontFamily: HW, fontSize: '0.75rem', letterSpacing: '0.15em', color: '#7c6ea0' }}>{org.role}</div>
              </div>

              <p style={{ color: 'rgba(232,224,255,0.82)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: HW }}>{org.description}</p>

              <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: '1px solid rgba(202,177,253,0.08)' }}>
                {org.stats.map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: HW, fontSize: '1rem', fontWeight: 800, color: org.color }}>{value}</span>
                    <span style={{ fontFamily: HW, fontSize: '0.6rem', color: '#7c6ea0', letterSpacing: '0.12em' }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    
        <style>{`
      @media (max-width: 640px) {
        .org-grid {
          grid-template-columns: 1fr !important;
        }

        .org-card-sividuc {
          order: -1;
        }
      }
    `}</style>
    </section>
  )
}
