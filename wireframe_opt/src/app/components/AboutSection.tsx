import { useRef } from "react";
import { motion, useInView } from "motion/react";

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <span style={{ color: "#71a1e6", fontSize: "0.7rem" }}>{"//"}</span>
      <span style={{ color: "#6a5a90", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(113,161,230,0.15)" }} />
    </div>
  );
}

// Tetris / puzzle-piece shapes
const puzzlePieces = [
  {
    value: "100+",
    label: "Participants",
    color: "#7a50e0",
    bg: "rgba(122,80,224,0.15)",
    clip: "polygon(0 0, 75% 0, 75% 20%, 100% 20%, 100% 100%, 25% 100%, 25% 80%, 0 80%)",
  },
  {
    value: "24h",
    label: "Hacking",
    color: "#4a80cc",
    bg: "rgba(74,128,204,0.15)",
    clip: "polygon(0 0, 100% 0, 100% 80%, 75% 80%, 75% 100%, 0 100%, 0 20%, 25% 20%)",
  },
  {
    value: "3+",
    label: "Workshops",
    color: "#b06ad4",
    bg: "rgba(176,106,212,0.15)",
    clip: "polygon(0 20%, 25% 20%, 25% 0, 100% 0, 100% 100%, 75% 100%, 75% 80%, 0 80%)",
  },
  {
    value: "1st",
    label: "In Europe",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.12)",
    clip: "polygon(25% 0, 100% 0, 100% 80%, 75% 80%, 75% 100%, 0 100%, 0 0)",
  },
];

// macOS-style window chrome
function MacWindow({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: "rgba(60,40,100,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="ml-auto"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "rgba(232,224,255,0.35)", letterSpacing: "0.1em" }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

const infoItems = [
  { icon: "📍", label: "LOCATION", value: "Frankfurt am Main" },
  { icon: "🇩🇪", label: "COUNTRY", value: "Germany" },
  { icon: "📅", label: "DATE", value: "17–19 September 2026" },
  { icon: "⏱️", label: "DURATION", value: "3 days · 2 nights" },
];

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1a0f35 0%, #1e1040 40%, #150c30 100%)",
        borderTop: "1px solid rgba(202,177,253,0.1)",
        borderBottom: "1px solid rgba(202,177,253,0.1)",
      }}
    >
      {/* Bright grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(113,161,230,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(113,161,230,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 0%, rgba(202,177,253,0.08) 0%, transparent 65%)" }}
      />

      <div className="max-w-6xl mx-auto relative">
        <SectionLabel>về sự kiện</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mt-8">

          {/* Left — text inside macOS window */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <MacWindow title="rammastic_2026.txt">
              <div className="p-7" style={{ background: "rgba(18,10,36,0.85)" }}>
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    fontWeight: 800,
                    color: "#e8e0ff",
                    lineHeight: 1.1,
                  }}
                >
                  RAMmastic<br />
                  <span style={{ color: "#cab1fd" }}>là gì?</span>
                </h2>

                <div className="space-y-4 mb-8">
                  {[
                    "SiviCamp là sự kiện thường niên kết nối, khám phá và phát triển tài năng dành cho cộng đồng sinh viên và người trẻ Việt Nam tại Đức.",
                    `Với chủ đề (#) RAMmastic, SiviCamp 2026 kết hợp SiviHack — sân chơi công nghệ AI — cùng SIVITA Gala Night, nơi nghệ thuật và câu chuyện cá nhân được lan toả qua âm nhạc và sáng tạo.`,
                  ].map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                      style={{ color: "rgba(232,224,255,0.82)", lineHeight: 1.85, fontSize: "0.9rem" }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>

                {/* Clear event info block */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-2"
                >
                  {infoItems.map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col gap-0.5 px-3 py-3"
                      style={{
                        background: "rgba(202,177,253,0.05)",
                        border: "1px solid rgba(202,177,253,0.1)",
                        borderRadius: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.58rem",
                          color: "#7c6ea0",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {icon} {label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#cab1fd",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </MacWindow>
          </motion.div>

          {/* Right — puzzle-piece stat blocks */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {puzzlePieces.map(({ value, label, color, bg, clip }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.82, rotate: i % 2 === 0 ? -4 : 4 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1, type: "spring", stiffness: 180 }}
                className="flex flex-col items-center justify-center gap-2 py-10 px-4 cursor-default select-none transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.03]"
                style={{ background: bg, clipPath: clip }}
              >
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "2.6rem",
                    fontWeight: 900,
                    color,
                    textShadow: `0 0 24px ${color}60`,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.58rem",
                    color: "rgba(232,224,255,0.45)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
