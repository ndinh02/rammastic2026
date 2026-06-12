import { useState, useRef } from 'react'
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

function InputField({ label, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontFamily: HW, fontSize: '0.72rem', color: focused ? '#cab1fd' : '#7c6ea0', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'color 0.2s' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: '12px 16px', background: focused ? 'rgba(202,177,253,0.03)' : 'transparent', outline: 'none',
          fontFamily: HW, color: '#e8e0ff', fontSize: '0.875rem',
          border: `1px solid ${focused ? 'rgba(202,177,253,0.5)' : 'rgba(202,177,253,0.15)'}`,
          boxShadow: focused ? '0 0 20px rgba(202,177,253,0.1)' : 'none',
          transition: 'all 0.2s',
        }}
      />
    </div>
  )
}

const tracks = [
  { key: 'participant', label: 'Participant', icon: '{ }', desc: 'Hack & Build' },
  { key: 'mentor', label: 'Mentor', icon: '[ M ]', desc: 'Guide & Share' },
  { key: 'sponsor', label: 'Sponsor', icon: '[ $ ]', desc: 'Partner Up' },
]

export function RegisterSection() {
  const [submitted, setSubmitted] = useState(false)
  const [track, setTrack] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <section id="register" ref={ref} style={{ position: 'relative', padding: '96px 24px', overflow: 'hidden', background: '#07030f', borderTop: '1px solid rgba(202,177,253,0.08)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(32,19,69,0.8) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
        <SectionLabel>đăng ký</SectionLabel>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start', marginTop: 32 }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2 style={{ fontFamily: PIXEL, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#e8e0ff', lineHeight: 1.05 }}>
              Sẵn sàng<br />
              <span style={{ background: 'linear-gradient(135deg, #cab1fd, #71a1e6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>chưa?</span>
            </h2>

            <p style={{ color: 'rgba(232,224,255,0.82)', lineHeight: 1.8, fontSize: '0.95rem', fontFamily: HW }}>
              SiviCamp 2026 chỉ có <span style={{ color: '#cab1fd', fontWeight: 600 }}>giới hạn 100 chỗ</span>. Đăng ký sớm để giữ vị trí của bạn và chuẩn bị cho một hành trình 24 giờ hack, học và kết nối.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'Ngày tổ chức', value: '17–19 September 2026' },
                { label: 'Địa điểm', value: 'Frankfurt am Main, Germany' },
                { label: 'Số đội', value: '~20 teams × 3–6 người' },
                { label: 'Phí tham dự', value: 'Free — Miễn phí' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(202,177,253,0.08)' }}>
                  <span style={{ fontFamily: HW, fontSize: '0.75rem', color: '#7c6ea0', letterSpacing: '0.1em' }}>{label}</span>
                  <span style={{ color: '#e8e0ff', fontSize: '0.85rem', fontWeight: 500, fontFamily: HW }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              {['Facebook', 'Discord', 'LinkedIn'].map((social) => (
                <a key={social} href="#" style={{ padding: '8px 16px', fontFamily: HW, fontSize: '0.8rem', letterSpacing: '0.15em', color: '#7c6ea0', border: '1px solid rgba(202,177,253,0.15)', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#cab1fd'; e.currentTarget.style.color = '#cab1fd' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(202,177,253,0.15)'; e.currentTarget.style.color = '#7c6ea0' }}>{social}</a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ padding: 32, position: 'relative', background: 'rgba(18,11,36,0.9)', border: '1px solid rgba(202,177,253,0.2)' }}>
              <div style={{ position: 'absolute', top: 0, left: 32, right: 32, height: 1, background: 'linear-gradient(90deg, transparent, #cab1fd60, transparent)' }} />

              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ fontFamily: HW, fontSize: '0.78rem', letterSpacing: '0.15em', color: '#7c6ea0', marginBottom: 8 }}>{'>'} REGISTRATION_FORM_v2.1</div>

                  <InputField label="Họ và Tên *" placeholder="Nguyen Van A" />
                  <InputField label="Email *" placeholder="you@example.com" type="email" />
                  <InputField label="Đang học / làm tại *" placeholder="TU Darmstadt / Bosch GmbH" />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontFamily: HW, fontSize: '0.72rem', color: '#7c6ea0', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Track *</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {tracks.map((t) => (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setTrack(t.key)}
                          style={{
                            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative', minHeight: 72,
                            border: `2px solid ${track === t.key ? '#cab1fd' : 'rgba(202,177,253,0.15)'}`,
                            background: track === t.key ? 'rgba(202,177,253,0.12)' : 'transparent',
                            transition: 'all 0.2s',
                          }}
                        >
                          {track === t.key && <span style={{ position: 'absolute', top: 6, right: 6, width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#cab1fd', fontSize: '0.5rem', color: '#07030f', fontWeight: 900 }}>✓</span>}
                          <span style={{ fontFamily: HW, fontSize: '0.7rem', color: track === t.key ? '#cab1fd' : '#7c6ea0' }}>{t.icon}</span>
                          <span style={{ fontFamily: HW, fontSize: '0.68rem', color: track === t.key ? '#cab1fd' : '#a896cc', letterSpacing: '0.08em' }}>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <InputField label="Kỹ năng chính (optional)" placeholder="React, Python, ML, UX..." />

                  <button
                    type="submit"
                    style={{
                      marginTop: 8, minHeight: 52, fontFamily: HW, fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.15em',
                      background: 'linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)',
                      color: '#fff', border: 'none', boxShadow: '0 4px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.2)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.35)',
                      borderRadius: '9999px',
                      transition: 'box-shadow 0.2s',
                    }}
                    onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)' }}
                    onMouseUp={e => { e.currentTarget.style.transform = '' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = '' }}
                  >
                    ▶ Đăng ký ngay
                  </button>

                  <p style={{ fontFamily: HW, fontSize: '0.7rem', color: '#7c6ea0', textAlign: 'center' }}>By submitting you agree to our terms. · Đây là form đăng ký sơ bộ.</p>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '32px 0', textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: '2px solid #4ade80', background: 'rgba(74,222,128,0.08)', boxShadow: '0 0 30px rgba(74,222,128,0.2)' }}>✓</div>
                  <div>
                    <div style={{ fontFamily: HW, fontSize: '1.2rem', fontWeight: 800, color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)', marginBottom: 8 }}>QUEST ACCEPTED</div>
                    <p style={{ color: 'rgba(232,224,255,0.82)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: HW }}>Cảm ơn bạn đã đăng ký!<br />Chúng tôi sẽ liên hệ sớm qua email.</p>
                  </div>
                  <div style={{ padding: '12px 24px', fontFamily: HW, fontSize: '0.75rem', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.05)' }}>
                    +100 XP UNLOCKED · WELCOME_TO_SIVICAMP
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 1152, margin: '80px auto 0', paddingTop: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderTop: '1px solid rgba(202,177,253,0.08)' }}>
        <div style={{ fontFamily: HW, fontSize: '0.8rem', color: '#cab1fd', letterSpacing: '0.2em', fontWeight: 700 }}>{'{#}'} RAMMASTIC · SIVICAMP 2026</div>
        <div style={{ fontFamily: HW, fontSize: '0.72rem', color: '#7c6ea0' }}>SIVIDUC e.V. · VGI e.V. · VSAF e.V.</div>
        <div style={{ fontFamily: HW, fontSize: '0.72rem', color: '#7c6ea0' }}>Frankfurt am Main, Germany · Sept 2026</div>
      </div>
    </section>
  )
}
