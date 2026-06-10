import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
      <span style={{ color: '#71a1e6', fontSize: '0.7rem' }}>{'//'}</span>
      <span style={{ color: '#7c6ea0', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(202,177,253,0.1)' }} />
    </div>
  )
}

const typeColors = {
  CEREMONY:   { text: '#cab1fd', bg: 'rgba(202,177,253,0.12)' },
  HACK:       { text: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  WORKSHOP:   { text: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  SOCIAL:     { text: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  CHECKPOINT: { text: '#71a1e6', bg: 'rgba(113,161,230,0.12)' },
  GALA:       { text: '#eeb2ff', bg: 'rgba(238,178,255,0.12)' },
  TOUR:       { text: '#34d399', bg: 'rgba(52,211,153,0.12)' },
}

const days = [
  {
    label: 'Do', fullLabel: 'Thứ Năm', date: '17/09', color: '#cab1fd',
    events: [
      { time: '09:00', title: 'Opening Ceremony', type: 'CEREMONY' },
      { time: '10:30', title: 'Team Formation & Kickoff', type: 'HACK' },
      { time: '12:00', title: 'Networking Lunch', type: 'SOCIAL' },
      { time: '14:00', title: 'Workshop: AI & Applications', type: 'WORKSHOP' },
      { time: '16:00', title: 'Hacking Begins', type: 'HACK' },
      { time: '20:00', title: 'Checkpoint #1', type: 'CHECKPOINT' },
      { time: '22:00', title: 'Late night session', type: 'HACK' },
    ],
  },
  {
    label: 'Fr', fullLabel: 'Thứ Sáu', date: '18/09', color: '#71a1e6',
    events: [
      { time: '09:00', title: 'Morning Stand-up', type: 'CHECKPOINT' },
      { time: '11:00', title: 'Workshop: Product & UX', type: 'WORKSHOP' },
      { time: '13:00', title: 'Hacking · Lunch Break', type: 'HACK' },
      { time: '16:00', title: 'Mentor Sessions', type: 'CHECKPOINT' },
      { time: '19:00', title: 'SIVITA Gala Night', type: 'GALA' },
      { time: '22:00', title: 'SiviTour — Frankfurt', type: 'TOUR' },
    ],
  },
  {
    label: 'Sa', fullLabel: 'Thứ Bảy', date: '19/09', color: '#eeb2ff',
    events: [
      { time: '09:00', title: 'Final Sprint', type: 'HACK' },
      { time: '11:00', title: 'Submission Deadline', type: 'CHECKPOINT' },
      { time: '13:00', title: 'Demo Day Prep', type: 'HACK' },
      { time: '14:00', title: 'Jury Presentations', type: 'CEREMONY' },
      { time: '16:30', title: 'Award Ceremony', type: 'CEREMONY' },
      { time: '18:00', title: 'Farewell & Networking', type: 'SOCIAL' },
    ],
  },
]

function EventRow({ time, title, type, color, delay }) {
  const c = typeColors[type] ?? { text: color, bg: `${color}12` }
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 0', borderBottom: '1px solid rgba(202,177,253,0.05)' }}
    >
      <span style={{ flexShrink: 0, width: 48, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', fontWeight: 700, color }}>{time}</span>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.text, flexShrink: 0, marginTop: 6 }} />
      <span style={{ flex: 1, color: 'rgba(232,224,255,0.75)', fontSize: '0.78rem', lineHeight: 1.4 }}>{title}</span>
      <span style={{ flexShrink: 0, padding: '2px 6px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', color: c.text, background: c.bg, letterSpacing: '0.08em' }}>{type}</span>
    </motion.div>
  )
}

export function ScheduleSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeDay, setActiveDay] = useState(0)
  const currentDay = days[activeDay]

  return (
    <section id="schedule" ref={ref} style={{ position: 'relative', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <SectionLabel>chương trình</SectionLabel>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginTop: 32, marginBottom: 32 }}>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', fontWeight: 800, color: '#e8e0ff', lineHeight: 1.2 }}>
            17/09 – 19/09/2026<br />
            <span style={{ color: '#71a1e6', fontSize: '0.55em', letterSpacing: '0.05em' }}>FRANKFURT AM MAIN, GERMANY</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {Object.entries(typeColors).map(([type, { text }]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: text }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#a896cc', letterSpacing: '0.1em' }}>{type}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile tab selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(202,177,253,0.1)', marginBottom: 0 }} className="mobile-tabs">
          {days.map((day, i) => (
            <button
              key={day.label}
              onClick={() => setActiveDay(i)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 2,
                background: activeDay === i ? 'rgba(202,177,253,0.06)' : 'transparent',
                borderBottom: activeDay === i ? `2px solid ${day.color}` : '2px solid transparent',
              }}
            >
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', fontWeight: 900, color: activeDay === i ? day.color : 'rgba(232,224,255,0.35)', textShadow: activeDay === i ? `0 0 12px ${day.color}50` : 'none', lineHeight: 1, transition: 'color 0.2s' }}>{day.label}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem', color: activeDay === i ? 'rgba(232,224,255,0.7)' : 'rgba(232,224,255,0.3)', letterSpacing: '0.05em' }}>{day.date}</span>
            </button>
          ))}
        </div>

        {/* Mobile single day view */}
        <div className="mobile-schedule">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              style={{ borderTop: `2px solid ${currentDay.color}` }}
            >
              <div style={{ padding: '12px 8px', display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#a896cc' }}>{currentDay.fullLabel} · {currentDay.date}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {currentDay.events.map((ev, i) => (
                  <EventRow key={ev.time} {...ev} color={currentDay.color} delay={0.02 + i * 0.04} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop 3-col */}
        <div className="desktop-schedule" style={{ display: 'none', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {days.map((day, dayIdx) => (
            <motion.div
              key={day.label}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + dayIdx * 0.12 }}
              style={{ display: 'flex', flexDirection: 'column', borderLeft: dayIdx > 0 ? '1px solid rgba(202,177,253,0.08)' : 'none', borderTop: `2px solid ${day.color}` }}
            >
              <div style={{ padding: '16px', display: 'flex', alignItems: 'baseline', gap: 12, position: 'sticky', top: 0, background: '#07030f', borderBottom: '1px solid rgba(202,177,253,0.06)' }}>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2rem', fontWeight: 900, color: day.color, textShadow: `0 0 20px ${day.color}50`, lineHeight: 1 }}>{day.label}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#e8e0ff', fontWeight: 500 }}>{day.fullLabel}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#a896cc' }}>{day.date}</span>
                </div>
              </div>
              <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column' }}>
                {day.events.map((ev, i) => (
                  <EventRow key={ev.time} {...ev} color={day.color} delay={inView ? 0.25 + dayIdx * 0.1 + i * 0.05 : 0} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-tabs { display: none !important; }
          .mobile-schedule { display: none !important; }
          .desktop-schedule { display: grid !important; }
        }
      `}</style>
    </section>
  )
}
