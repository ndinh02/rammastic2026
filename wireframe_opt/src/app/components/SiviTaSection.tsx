import { useRef } from "react";
import { motion, useInView } from "motion/react";

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

const performanceTypes = [
  { icon: "🎤", label: "Âm nhạc" },
  { icon: "🎭", label: "Diễn xuất" },
  { icon: "💃", label: "Vũ đạo" },
  { icon: "🎶", label: "Độc tấu" },
  { icon: "🖌️", label: "Nghệ thuật" },
  { icon: "✨", label: "Sáng tạo" },
];

export function SiviTaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="sivita"
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07030f 0%, #100818 60%, #07030f 100%)" }}
    >
      {/* Decorative spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
        style={{
          height: "40%",
          background: "linear-gradient(to bottom, rgba(238,178,255,0.3), transparent)",
          boxShadow: "0 0 60px 30px rgba(238,178,255,0.06)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(ellipse at 50% 0%, rgba(238,178,255,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionLabel>talent show · gala night</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-8">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              className="text-xs mb-3 tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#eeb2ff" }}
            >
              MISSION_002
            </div>
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#e8e0ff",
                lineHeight: 1.1,
              }}
            >
              SiviTa
            </h2>
            <div
              className="mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "#eeb2ff" }}
            >
              "Everyone has a story worth sharing"
            </div>

            <div className="space-y-4 mb-8">
              {[
                "SIVITA Gala Night là đêm biểu diễn tài năng khép lại SiviCamp 2026 — sân khấu thuộc về tất cả mọi người.",
                "Mỗi người đăng ký đều có cơ hội lên sân khấu: hát, múa, diễn xuất, độc tấu, hay bất kỳ hình thức sáng tạo nào bạn chọn.",
                "Đây không phải cuộc thi — đây là khoảnh khắc bạn kể câu chuyện của mình trước cộng đồng.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ color: "rgba(232,224,255,0.85)", lineHeight: 1.8, fontSize: "0.88rem" }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Key fact pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-4 px-5 py-3"
              style={{ border: "1px solid rgba(238,178,255,0.2)", background: "rgba(238,178,255,0.05)" }}
            >
              <span style={{ fontSize: "1.8rem" }}>🌙</span>
              <div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem", color: "#eeb2ff", fontWeight: 700 }}>
                  Last Day · Gala Night
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#7c6ea0" }}>
                  19/09/2026 · Dành cho tất cả người đăng ký
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — performance type grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Stage visual */}
            <div
              className="relative flex flex-col items-center justify-end overflow-hidden"
              style={{
                height: 180,
                background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(238,178,255,0.12) 0%, transparent 70%)",
                border: "1px solid rgba(238,178,255,0.12)",
              }}
            >
              {/* Spotlight beams */}
              {[-30, 0, 30].map((angle, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 origin-top pointer-events-none"
                  style={{
                    width: 2,
                    height: "100%",
                    background: `linear-gradient(to bottom, rgba(238,178,255,${0.15 + i * 0.05}), transparent)`,
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    filter: "blur(8px)",
                  }}
                />
              ))}
              {/* Stage floor */}
              <div
                className="w-full flex items-center justify-center py-3"
                style={{
                  background: "rgba(238,178,255,0.06)",
                  borderTop: "1px solid rgba(238,178,255,0.15)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.7rem",
                    color: "rgba(238,178,255,0.5)",
                    letterSpacing: "0.4em",
                  }}
                >
                  STAGE
                </span>
              </div>
            </div>

            {/* Performance types */}
            <div className="grid grid-cols-3 gap-2">
              {performanceTypes.map(({ icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 200 }}
                  className="flex flex-col items-center gap-1.5 py-4 transition-all duration-200 hover:-translate-y-1 cursor-default"
                  style={{ background: "rgba(238,178,255,0.05)", border: "1px solid rgba(238,178,255,0.1)" }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{icon}</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: "rgba(238,178,255,0.6)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                color: "#4a3a6a",
                textAlign: "center",
                letterSpacing: "0.1em",
              }}
            >
              + bất kỳ hình thức nào bạn chọn
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
