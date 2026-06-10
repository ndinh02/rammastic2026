import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <span style={{ color: "#71a1e6", fontSize: "0.7rem" }}>{"//"}</span>
      <span style={{ color: "#7c6ea0", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(202,177,253,0.1)" }} />
    </div>
  );
}

const typeColors: Record<string, { text: string; bg: string }> = {
  CEREMONY:   { text: "#cab1fd", bg: "rgba(202,177,253,0.12)" },
  HACK:       { text: "#f97316", bg: "rgba(249,115,22,0.12)" },
  WORKSHOP:   { text: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  SOCIAL:     { text: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  CHECKPOINT: { text: "#71a1e6", bg: "rgba(113,161,230,0.12)" },
  GALA:       { text: "#eeb2ff", bg: "rgba(238,178,255,0.12)" },
  TOUR:       { text: "#34d399", bg: "rgba(52,211,153,0.12)" },
};

const days = [
  {
    label: "Do",
    fullLabel: "Thứ Năm",
    date: "17/09",
    color: "#cab1fd",
    events: [
      { time: "09:00", title: "Opening Ceremony", type: "CEREMONY" },
      { time: "10:30", title: "Team Formation & Kickoff", type: "HACK" },
      { time: "12:00", title: "Networking Lunch", type: "SOCIAL" },
      { time: "14:00", title: "Workshop: AI & Applications", type: "WORKSHOP" },
      { time: "16:00", title: "Hacking Begins 🚀", type: "HACK" },
      { time: "20:00", title: "Checkpoint #1", type: "CHECKPOINT" },
      { time: "22:00", title: "Late night session", type: "HACK" },
    ],
  },
  {
    label: "Fr",
    fullLabel: "Thứ Sáu",
    date: "18/09",
    color: "#71a1e6",
    events: [
      { time: "09:00", title: "Morning Stand-up", type: "CHECKPOINT" },
      { time: "11:00", title: "Workshop: Product & UX", type: "WORKSHOP" },
      { time: "13:00", title: "Hacking · Lunch Break", type: "HACK" },
      { time: "16:00", title: "Mentor Sessions", type: "CHECKPOINT" },
      { time: "19:00", title: "SIVITA Gala Night ✨", type: "GALA" },
      { time: "22:00", title: "SiviTour — Frankfurt", type: "TOUR" },
    ],
  },
  {
    label: "Sa",
    fullLabel: "Thứ Bảy",
    date: "19/09",
    color: "#eeb2ff",
    events: [
      { time: "09:00", title: "Final Sprint 🏃", type: "HACK" },
      { time: "11:00", title: "Submission Deadline", type: "CHECKPOINT" },
      { time: "13:00", title: "Demo Day Prep", type: "HACK" },
      { time: "14:00", title: "Jury Presentations", type: "CEREMONY" },
      { time: "16:30", title: "Award Ceremony 🏆", type: "CEREMONY" },
      { time: "18:00", title: "Farewell & Networking", type: "SOCIAL" },
    ],
  },
];

function EventRow({ time, title, type, color, delay }: {
  time: string; title: string; type: string; color: string; delay: number;
}) {
  const c = typeColors[type] ?? { text: color, bg: `${color}12` };
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-start gap-2 py-2.5 group border-b"
      style={{ borderColor: "rgba(202,177,253,0.05)" }}
    >
      <span
        className="shrink-0 w-12 text-right"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color }}
      >
        {time}
      </span>
      <div className="w-1 shrink-0 mt-1.5 h-1.5 rounded-full" style={{ background: c.text }} />
      <div className="flex-1 min-w-0">
        <span style={{ color: "rgba(232,224,255,0.75)", fontSize: "0.78rem", lineHeight: 1.4 }}>
          {title}
        </span>
      </div>
      <span
        className="shrink-0 px-1.5 py-0.5 text-xs"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.52rem",
          color: c.text,
          background: c.bg,
          letterSpacing: "0.08em",
          opacity: 0.9,
        }}
      >
        {type}
      </span>
    </motion.div>
  );
}

export function ScheduleSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeDay, setActiveDay] = useState(0);

  const currentDay = days[activeDay];

  return (
    <section id="schedule" ref={ref} className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>chương trình</SectionLabel>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-8 mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
              fontWeight: 800,
              color: "#e8e0ff",
              lineHeight: 1.2,
            }}
          >
            17/09 – 19/09/2026
            <br />
            <span style={{ color: "#71a1e6", fontSize: "0.55em", letterSpacing: "0.05em" }}>
              FRANKFURT AM MAIN, GERMANY
            </span>
          </motion.h2>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden md:flex flex-wrap gap-3"
          >
            {Object.entries(typeColors).map(([type, { text }]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: text }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "#a896cc", letterSpacing: "0.1em" }}>
                  {type}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile tab selector */}
        <div className="flex md:hidden gap-0 mb-0" style={{ borderBottom: "1px solid rgba(202,177,253,0.1)" }}>
          {days.map((day, i) => (
            <button
              key={day.label}
              onClick={() => setActiveDay(i)}
              className="flex-1 flex flex-col items-center py-3 gap-0.5 transition-all duration-200"
              style={{
                background: activeDay === i ? "rgba(202,177,253,0.06)" : "transparent",
                borderBottom: activeDay === i ? `2px solid ${day.color}` : "2px solid transparent",
              }}
            >
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 900,
                  color: activeDay === i ? day.color : "rgba(232,224,255,0.35)",
                  textShadow: activeDay === i ? `0 0 12px ${day.color}50` : "none",
                  lineHeight: 1,
                  transition: "color 0.2s",
                }}
              >
                {day.label}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.52rem",
                  color: activeDay === i ? "rgba(232,224,255,0.7)" : "rgba(232,224,255,0.3)",
                  letterSpacing: "0.05em",
                }}
              >
                {day.date}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile — single day view */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              style={{ borderTop: `2px solid ${currentDay.color}` }}
            >
              <div className="px-2 py-3 flex items-baseline gap-3">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#a896cc" }}>
                  {currentDay.fullLabel} · {currentDay.date}
                </span>
              </div>
              <div className="flex flex-col">
                {currentDay.events.map((ev, i) => (
                  <EventRow
                    key={ev.time}
                    {...ev}
                    color={currentDay.color}
                    delay={0.02 + i * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop — all 3 days side by side */}
        <div className="hidden md:grid md:grid-cols-3 gap-0">
          {days.map((day, dayIdx) => (
            <motion.div
              key={day.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + dayIdx * 0.12 }}
              className="flex flex-col"
              style={{
                borderLeft: dayIdx > 0 ? "1px solid rgba(202,177,253,0.08)" : "none",
                borderTop: "2px solid " + day.color,
              }}
            >
              <div
                className="px-4 py-4 flex items-baseline gap-3 sticky top-0"
                style={{ background: "#07030f", borderBottom: "1px solid rgba(202,177,253,0.06)" }}
              >
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "2rem", fontWeight: 900, color: day.color, textShadow: `0 0 20px ${day.color}50`, lineHeight: 1 }}>
                  {day.label}
                </span>
                <div className="flex flex-col">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#e8e0ff", fontWeight: 500 }}>{day.fullLabel}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#a896cc" }}>{day.date}</span>
                </div>
              </div>
              <div className="px-4 py-2 flex flex-col">
                {day.events.map((ev, i) => (
                  <EventRow key={ev.time} {...ev} color={day.color} delay={inView ? 0.25 + dayIdx * 0.1 + i * 0.05 : 0} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
