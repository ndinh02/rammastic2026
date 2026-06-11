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

export function SiviTaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sivita" ref={ref} style={{ position: 'relative', padding: '96px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #07030f 0%, #100818 60%, #07030f 100%)' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: '40%', background: 'linear-gradient(to bottom, rgba(238,178,255,0.3), transparent)', boxShadow: '0 0 60px 30px rgba(238,178,255,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, background: 'radial-gradient(ellipse at 50% 0%, rgba(238,178,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <SectionLabel>talent show · gala night</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginTop: 32 }}
        >
          <div style={{ fontFamily: HW, fontSize: '0.7rem', letterSpacing: '0.12em', color: '#eeb2ff', marginBottom: 16, fontWeight: 600 }}>MISSION_002</div>
          <h2 style={{ fontFamily: PIXEL, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e8e0ff', lineHeight: 1.1, marginBottom: 8 }}>SiviTa</h2>
          <div style={{ fontFamily: HW, fontSize: '1.2rem', color: '#eeb2ff', marginBottom: 24, fontStyle: 'italic' }}>"Everyone has a story worth sharing"</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
            {[
              'SIVITA Gala Night là đêm biểu diễn tài năng khép lại SiviCamp 2026 — sân khấu thuộc về tất cả mọi người.',
              'Mỗi người đăng ký đều có cơ hội lên sân khấu: hát, múa, diễn xuất, độc tấu, hay bất kỳ hình thức sáng tạo nào bạn chọn.',
              'Đây không phải cuộc thi — đây là khoảnh khắc bạn kể câu chuyện của mình trước cộng đồng.',
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ color: 'rgba(232,224,255,0.85)', lineHeight: 1.8, fontSize: '0.88rem', fontFamily: HW }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '14px 20px', border: '1px solid rgba(238,178,255,0.2)', background: 'rgba(238,178,255,0.05)' }}
          >
            <div style={{ width: 24, height: 24, border: '2px solid rgba(238,178,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, background: '#eeb2ff', boxShadow: '0 0 8px #eeb2ff' }} />
            </div>
            <div>
              <div style={{ fontFamily: HW, fontSize: '0.8rem', color: '#eeb2ff', fontWeight: 700 }}>Last Day · Gala Night</div>
              <div style={{ fontFamily: HW, fontSize: '0.65rem', color: '#7c6ea0', marginTop: 2 }}>19/09/2026 · Dành cho tất cả người đăng ký</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
