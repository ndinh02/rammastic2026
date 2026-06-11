import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { SiviTourMap } from './SiviTourMap'

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

const tourStops = [
  {
    marker: '01',
    name: 'Römerberg',
    desc: 'Old Town · Lịch sử Frankfurt',
    detail: 'Quảng trường cổ nhất Frankfurt, được xây dựng từ thế kỷ 15. Kiến trúc khung gỗ truyền thống và Römer — tòa thị chính lịch sử — là điểm chụp ảnh không thể bỏ qua. Đây cũng là nơi diễn ra các sự kiện văn hóa lớn của thành phố.',
    color: '#71a1e6',
  },
  {
    marker: '02',
    name: 'Main Riverbank',
    desc: 'Sachsenhausen · Ẩm thực & văn hoá',
    detail: 'Bờ sông Main với hàng quán cà phê và nhà hàng dọc hai bên. Sachsenhausen nổi tiếng với rượu táo Apfelwein — đặc sản Frankfurt. Buổi tối ở đây cực kỳ sôi động với nhiều quán bar và sự kiện.',
    color: '#cab1fd',
  },
  {
    marker: '03',
    name: 'Skyline Plaza',
    desc: 'Trung tâm thành phố hiện đại',
    detail: 'Trung tâm mua sắm hiện đại nằm giữa lòng thành phố, bao quanh bởi những tòa nhà chọc trời — đặc trưng của Frankfurt, thành phố duy nhất ở Đức có skyline mang phong cách Manhattan.',
    color: '#eeb2ff',
  },
  {
    marker: '04',
    name: 'EU Community',
    desc: 'Gặp gỡ người trẻ từ khắp châu Âu',
    detail: 'Frankfurt là trung tâm tài chính của châu Âu và nơi đặt trụ sở Ngân hàng Trung ương châu Âu (ECB). SiviTour sẽ kết nối bạn với sinh viên và người trẻ Việt Nam từ nhiều quốc gia EU khác nhau.',
    color: '#4ade80',
  },
]

function AccordionItem({ stop, isOpen, onToggle, inView, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1 }}
      style={{ borderBottom: '1px solid rgba(113,161,230,0.12)' }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <span style={{
          flexShrink: 0,
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: HW,
          fontSize: '0.75rem', fontWeight: 700,
          color: stop.color,
          background: `${stop.color}12`,
          border: `1px solid ${stop.color}30`,
          transition: 'all 0.2s',
        }}>{stop.marker}</span>

        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: HW, fontSize: '0.9rem', fontWeight: 700, color: '#e8e0ff', marginBottom: 2 }}>{stop.name}</div>
          <div style={{ fontFamily: HW, fontSize: '0.72rem', color: '#a896cc', letterSpacing: '0.06em' }}>{stop.desc}</div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ flexShrink: 0, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stop.color, fontSize: '0.9rem' }}
        >
          ▸
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              paddingLeft: 56,
              paddingRight: 8,
              paddingBottom: 18,
            }}>
              <p style={{
                fontFamily: HW,
                fontSize: '0.85rem',
                color: 'rgba(232,224,255,0.68)',
                lineHeight: 1.75,
                borderLeft: `2px solid ${stop.color}40`,
                paddingLeft: 14,
              }}>{stop.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function SiviTourSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="sivitour" ref={ref} style={{ position: 'relative', padding: '96px 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(113,161,230,0.06) 0%, transparent 65%)' }} />

      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <SectionLabel>city exploration</SectionLabel>

        {/* Interactive Frankfurt map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', marginTop: 24, marginBottom: 48, height: 320, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(113,161,230,0.2)' }}
        >
          <SiviTourMap />
          <div style={{ position: 'absolute', bottom: 10, left: 14, fontFamily: HW, fontSize: '0.62rem', color: 'rgba(113,161,230,0.65)', letterSpacing: '0.18em', fontWeight: 600, pointerEvents: 'none', zIndex: 10 }}>
            FRANKFURT AM MAIN · GERMANY
          </div>
        </motion.div>

        {/* SiviTour description — full width, stacked above city list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 48, maxWidth: 720 }}
        >
          <div style={{ fontFamily: HW, fontSize: '0.7rem', letterSpacing: '0.12em', color: '#71a1e6', marginBottom: 16, fontWeight: 600 }}>MISSION_003</div>
          <h2 style={{ fontFamily: PIXEL, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e8e0ff', lineHeight: 1.1, marginBottom: 8 }}>SiviTour</h2>
          <div style={{ fontFamily: HW, fontSize: '1.2rem', color: '#71a1e6', marginBottom: 24, fontStyle: 'italic' }}>"Explore · Connect · Belong"</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Khám phá Frankfurt — một trong những thành phố sôi động nhất châu Âu — cùng với những người bạn mới từ khắp nơi.',
              'SiviTour không chỉ là tham quan: đây là cơ hội gặp gỡ người trẻ từ nhiều quốc gia, chia sẻ câu chuyện và mở rộng mạng lưới quan hệ xuyên châu Âu.',
              'Tìm hiểu văn hoá, lịch sử và cuộc sống tại Đức — góc nhìn hoàn toàn khác ngoài giảng đường.',
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                style={{ color: 'rgba(232,224,255,0.85)', lineHeight: 1.8, fontSize: '0.88rem', fontFamily: HW }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* City exploration accordion — below SiviTour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #71a1e6, rgba(113,161,230,0.1))', pointerEvents: 'none' }} />
            <div style={{ paddingLeft: 0 }}>
              {tourStops.map((stop, i) => (
                <AccordionItem
                  key={stop.name}
                  stop={stop}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                  inView={inView}
                  index={i}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
