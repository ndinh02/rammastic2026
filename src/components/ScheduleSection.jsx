import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const PIXEL = "'Pixelify Sans', sans-serif"

// September 2026: Sep 1 = Tuesday (DOW index 2, Sun=0)
const SEP_FIRST_DOW = 2
const SEP_DAYS = 30
const WEEK_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: HW }}>
      <span style={{ color: '#71a1e6', fontSize: '0.7rem' }}>{'//'}</span>
      <span style={{ color: '#7c6ea0', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(202,177,253,0.1)' }} />
    </div>
  )
}

const typeColors = {
  CEREMONY:   '#cab1fd',
  HACK:       '#f97316',
  WORKSHOP:   '#4ade80',
  SOCIAL:     '#fbbf24',
  CHECKPOINT: '#71a1e6',
  GALA:       '#eeb2ff',
  TOUR:       '#34d399',
}

const schedule = [
  {
    date: 17,
    dayIndex: 0,
    weekday: 'Thứ Năm',
    color: '#cab1fd',
    title: 'Kick-off SiviHack',
    subtitle: 'Ý tưởng 24 giờ Hackathon thách mọi giới hạn!',
    location: 'Deutschherrnufer 12, 60594 Frankfurt am Main',
    events: [
      {
        time: '11:00', endTime: '13:00',
        title: 'Check-in & Welcome Bag',
        desc: 'Giao lưu và Networking.',
        type: 'SOCIAL',
      },
      {
        time: '13:00', endTime: '15:00',
        title: 'Khai mạc SiviHack 2026',
        desc: 'Công bố Đề thi và Cơ Cấu Giải thưởng.',
        type: 'CEREMONY',
      },
      {
        time: '15:00', endTime: '22:00',
        title: 'Hackathon 24 Tiếng Bắt Đầu',
        desc: 'Nhận đề và bắt đầu Hackathon.',
        type: 'HACK',
      },
      {
        time: '22:00', endTime: '',
        title: 'Trại Sinh sinh hoạt tự do',
        desc: 'Vui chơi, bonding, nghỉ ngơi.',
        type: 'SOCIAL',
      },
    ],
  },
  {
    date: 18,
    dayIndex: 1,
    weekday: 'Thứ Sáu',
    color: '#71a1e6',
    title: 'The Final Showdown - SiviHack',
    subtitle: 'Ý tưởng lên tiếng, bản lĩnh toả sáng — trận đấu cuối cùng!',
    location: 'Deutschherrnufer 12, 60594 Frankfurt am Main',
    events: [
      {
        time: '09:00', endTime: '',
        title: 'Tập Trung & Điểm Danh',
        desc: 'Điểm danh buổi sáng.',
        type: 'CHECKPOINT',
      },
      {
        time: '09:00', endTime: '15:00',
        title: 'Nước Rút Cuối Cùng',
        desc: 'Những giờ phút nước rút cuối cùng của SiviHack.',
        type: 'HACK',
      },
      {
        time: '15:00', endTime: '',
        title: 'Nộp Bài!',
        desc: 'Giờ phút quyết định đã điểm.',
        type: 'CHECKPOINT',
      },
      {
        time: '16:00', endTime: '19:00',
        title: 'Thuyết Trình Vòng Chung Kết',
        desc: 'Trình bày sản phẩm trước ban giám khảo.',
        type: 'CEREMONY',
      },
      {
        time: '19:00', endTime: '',
        title: 'Trại Sinh sinh hoạt tự do',
        desc: 'Vui chơi, bonding, nghỉ ngơi.',
        type: 'SOCIAL',
      },
    ],
  },
  {
    date: 19,
    dayIndex: 2,
    weekday: 'Thứ Bảy',
    color: '#eeb2ff',
    title: 'SiviTour & SIVITA Gala',
    subtitle: 'Trò chơi tập thể, Tìm kiếm Tài năng & Đêm Gala Trao giải.',
    location: 'Goetheplatz · Ben-Gurion-Ring 110a, 60437 Frankfurt am Main',
    events: [
      {
        time: '09:00', endTime: '10:00',
        title: 'Tập Trung & Chụp Ảnh Tập Thể',
        desc: 'Chụp ảnh kỷ niệm SiviCamp 2026.',
        type: 'SOCIAL',
      },
      {
        time: '10:00', endTime: '15:00',
        title: 'Main Game — SiviTour',
        desc: 'Trò chơi gắn kết tập thể khám phá Frankfurt.',
        type: 'TOUR',
      },
      {
        time: '18:00', endTime: '23:00',
        title: 'SIVITA Gala Night & Trao Giải',
        desc: 'Cuộc thi Tài năng Thanh niên, Đêm Gala Trao giải & After Party.',
        type: 'GALA',
      },
    ],
  },
]

const eventDateSet = new Set(schedule.map(d => d.date))

function buildCalendarCells() {
  const cells = []
  for (let i = 0; i < SEP_FIRST_DOW; i++) cells.push(null)
  for (let d = 1; d <= SEP_DAYS; d++) cells.push(d)
  return cells
}

const calendarCells = buildCalendarCells()

function EventCard({ ev, index, color }) {
  const evColor = typeColors[ev.type] || color
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, delay: 0.05 + index * 0.06 }}
      style={{
        display: 'flex',
        gap: 0,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(202,177,253,0.08)',
        borderLeft: `3px solid ${evColor}`,
      }}
    >
      {/* Time column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: '14px 12px 14px 16px',
        minWidth: 80,
        borderRight: '1px solid rgba(202,177,253,0.06)',
        gap: 3,
      }}>
        <span style={{ fontFamily: HW, fontSize: '0.78rem', fontWeight: 700, color: evColor, whiteSpace: 'nowrap' }}>
          {ev.time}
        </span>
        {ev.endTime && (
          <span style={{ fontFamily: HW, fontSize: '0.65rem', color: 'rgba(232,224,255,0.3)', whiteSpace: 'nowrap' }}>
            — {ev.endTime}
          </span>
        )}
      </div>

      {/* Content column */}
      <div style={{ padding: '14px 16px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: HW, fontSize: '0.85rem', fontWeight: 700, color: '#e8e0ff', lineHeight: 1.3 }}>
            {ev.title}
          </span>
          <span style={{
            flexShrink: 0,
            padding: '2px 7px',
            fontFamily: HW, fontSize: '0.56rem', letterSpacing: '0.1em',
            color: evColor, background: `${evColor}14`,
            border: `1px solid ${evColor}30`,
          }}>
            {ev.type}
          </span>
        </div>
        <p style={{ fontFamily: HW, fontSize: '0.75rem', color: 'rgba(232,224,255,0.45)', lineHeight: 1.5, margin: 0 }}>
          {ev.desc}
        </p>
      </div>
    </motion.div>
  )
}

export function ScheduleSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeDay, setActiveDay] = useState(0)

  const currentDay = schedule[activeDay]

  return (
    <section id="schedule" ref={ref} style={{ position: 'relative', padding: '96px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <SectionLabel>chương trình</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ fontFamily: PIXEL, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e8e0ff', lineHeight: 1.1, marginTop: 32, marginBottom: 8 }}
        >
          17 – 19/09/2026
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: HW, fontSize: '0.72rem', color: '#4a3a6a', letterSpacing: '0.18em', marginBottom: 56, textTransform: 'uppercase' }}
        >
          Frankfurt am Main, Germany
        </motion.p>

        {/* iOS Calendar + Events layout */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 380px) 1fr',
            gap: 0,
            border: '1px solid rgba(202,177,253,0.12)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(202,177,253,0.08)',
            overflow: 'hidden',
          }}
          className="calendar-layout"
        >
          {/* ── LEFT: Calendar widget ── */}
          <div style={{
            background: 'linear-gradient(180deg, #0f0a1e 0%, #0a0617 100%)',
            borderRight: '1px solid rgba(202,177,253,0.1)',
            padding: '28px 24px 32px',
          }}>
            {/* Month header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontFamily: HW, fontSize: '1rem', fontWeight: 700, color: '#e8e0ff', letterSpacing: '-0.01em' }}>
                September <span style={{ color: '#cab1fd' }}>2026</span>
              </span>
              <div style={{ display: 'flex', gap: 2 }}>
                {[ChevronLeft, ChevronRight].map((Icon, i) => (
                  <button
                    key={i}
                    style={{
                      width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(202,177,253,0.06)', border: '1px solid rgba(202,177,253,0.12)',
                      color: 'rgba(202,177,253,0.5)', cursor: 'default',
                      transition: 'opacity 0.15s',
                    }}
                  >
                    <Icon size={13} />
                  </button>
                ))}
              </div>
            </div>

            {/* Week day headers */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
              marginBottom: 8,
            }}>
              {WEEK_LABELS.map(d => (
                <div key={d} style={{
                  textAlign: 'center', fontFamily: HW, fontSize: '0.62rem',
                  fontWeight: 600, color: 'rgba(202,177,253,0.35)', letterSpacing: '0.05em',
                  paddingBottom: 8,
                }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0' }}>
              {calendarCells.map((day, i) => {
                const isEvent = day && eventDateSet.has(day)
                const dayEntry = isEvent ? schedule.find(s => s.date === day) : null
                const isActive = dayEntry && dayEntry.dayIndex === activeDay
                const isWeekend = (i % 7 === 0) || (i % 7 === 6)

                return (
                  <div
                    key={i}
                    onClick={() => dayEntry && setActiveDay(dayEntry.dayIndex)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 0',
                      cursor: dayEntry ? 'pointer' : 'default',
                    }}
                  >
                    <div style={{
                      width: 32, height: 32,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%',
                      background: isActive ? `${dayEntry.color}` : 'transparent',
                      border: isEvent && !isActive ? `1.5px solid ${dayEntry.color}55` : 'none',
                      transition: 'background 0.2s, transform 0.15s',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      fontFamily: HW,
                      fontSize: '0.8rem',
                      fontWeight: isEvent ? 700 : 400,
                      color: isActive
                        ? '#07030f'
                        : isEvent
                          ? dayEntry.color
                          : isWeekend
                            ? 'rgba(232,224,255,0.28)'
                            : day
                              ? 'rgba(232,224,255,0.55)'
                              : 'transparent',
                      boxShadow: isActive ? `0 0 20px ${dayEntry.color}50` : 'none',
                    }}>
                      {day}
                    </div>
                    {/* Event dot */}
                    {isEvent && !isActive && (
                      <div style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: dayEntry.color,
                        boxShadow: `0 0 6px ${dayEntry.color}80`,
                      }} />
                    )}
                    {isEvent && isActive && (
                      <div style={{ width: 5, height: 5 }} />
                    )}
                    {!isEvent && <div style={{ width: 5, height: 5 }} />}
                  </div>
                )
              })}
            </div>

          </div>

          {/* ── RIGHT: Day detail ── */}
          <div style={{
            background: '#07030f',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 500,
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Day header */}
                <div style={{
                  padding: '28px 28px 20px',
                  borderBottom: `2px solid ${currentDay.color}30`,
                  background: `linear-gradient(180deg, ${currentDay.color}08 0%, transparent 100%)`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: currentDay.color,
                      boxShadow: `0 0 12px ${currentDay.color}`,
                    }} />
                    <span style={{
                      fontFamily: HW, fontSize: '0.65rem', letterSpacing: '0.2em',
                      color: currentDay.color, textTransform: 'uppercase', fontWeight: 600,
                    }}>
                      {currentDay.weekday} · {currentDay.date}/09/2026
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: PIXEL,
                    fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                    color: '#e8e0ff',
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}>
                    {currentDay.title}
                  </h3>
                  <p style={{
                    fontFamily: HW, fontSize: '0.78rem',
                    color: 'rgba(232,224,255,0.45)', lineHeight: 1.5,
                    marginBottom: 12,
                  }}>
                    {currentDay.subtitle}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={11} color={`${currentDay.color}80`} />
                    <span style={{ fontFamily: HW, fontSize: '0.68rem', color: 'rgba(232,224,255,0.35)', lineHeight: 1.4 }}>
                      {currentDay.location}
                    </span>
                  </div>
                </div>

                {/* Events list */}
                <div style={{
                  padding: '20px 28px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  flex: 1,
                  overflowY: 'auto',
                }}>
                  {currentDay.events.map((ev, i) => (
                    <EventCard key={i} ev={ev} index={i} color={currentDay.color} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24, justifyContent: 'center' }}
        >
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}60` }} />
              <span style={{ fontFamily: HW, fontSize: '0.62rem', color: '#a896cc', letterSpacing: '0.1em' }}>{type}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .calendar-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
