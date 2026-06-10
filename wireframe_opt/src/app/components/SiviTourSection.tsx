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

const tourStops = [
  { icon: "🏛️", name: "Römerberg", desc: "Old Town · Lịch sử Frankfurt" },
  { icon: "🌉", name: "Main Riverbank", desc: "Sachsenhausen · Ẩm thực & văn hoá" },
  { icon: "🏙️", name: "Skyline Plaza", desc: "Trung tâm thành phố hiện đại" },
  { icon: "🌍", name: "EU Community", desc: "Gặp gỡ người trẻ từ khắp châu Âu" },
];

export function SiviTourSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="sivitour"
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(113,161,230,0.06) 0%, transparent 65%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionLabel>city exploration</SectionLabel>

        {/* Frankfurt hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative mt-6 mb-10 overflow-hidden"
          style={{ height: 180, borderTop: "2px solid rgba(113,161,230,0.3)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1642096633192-9290503a9a38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxGcmFua2Z1cnQlMjBhbSUyME1haW4lMjBHZXJtYW55JTIwc2t5bGluZSUyMGNpdHl8ZW58MXx8fHwxNzgxMDgzMTI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Frankfurt am Main city skyline at night"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5) saturate(0.75)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #07030f 0%, transparent 25%, transparent 75%, #07030f 100%), linear-gradient(to bottom, transparent 40%, #07030f 100%)" }}
          />
          <div className="absolute bottom-3 left-4" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.6rem", color: "rgba(113,161,230,0.7)", letterSpacing: "0.25em" }}>
            FRANKFURT AM MAIN · GERMANY
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — tour stops as a route */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Vertical route line */}
            <div
              className="absolute left-6 top-6 bottom-6 w-px pointer-events-none"
              style={{ background: "linear-gradient(to bottom, #71a1e6, rgba(113,161,230,0.1))" }}
            />

            <div className="flex flex-col gap-0">
              {tourStops.map(({ icon, name, desc }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className="flex items-start gap-5 py-5 group"
                >
                  {/* Route dot */}
                  <div className="relative shrink-0 flex flex-col items-center" style={{ width: 48 }}>
                    <div
                      className="w-12 h-12 flex items-center justify-center text-xl transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: "rgba(113,161,230,0.1)",
                        border: "1px solid rgba(113,161,230,0.25)",
                        borderRadius: 0,
                        zIndex: 1,
                      }}
                    >
                      {icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <div
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "#e8e0ff",
                        marginBottom: 3,
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        color: "#a896cc",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — mission info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="text-xs mb-3 tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#71a1e6" }}
            >
              MISSION_003
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
              SiviTour
            </h2>
            <div
              className="mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "#71a1e6" }}
            >
              "Explore · Connect · Belong"
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Khám phá Frankfurt — một trong những thành phố sôi động nhất châu Âu — cùng với những người bạn mới từ khắp nơi.",
                "SiviTour không chỉ là tham quan: đây là cơ hội gặp gỡ người trẻ từ nhiều quốc gia, chia sẻ câu chuyện và mở rộng mạng lưới quan hệ xuyên châu Âu.",
                "Tìm hiểu văn hoá, lịch sử và cuộc sống tại Đức — góc nhìn hoàn toàn khác ngoài giảng đường.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  style={{ color: "rgba(232,224,255,0.85)", lineHeight: 1.8, fontSize: "0.88rem" }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { val: "1", unit: "Thành phố", color: "#71a1e6" },
                { val: "EU", unit: "Network", color: "#cab1fd" },
                { val: "∞", unit: "Kết nối", color: "#eeb2ff" },
              ].map(({ val, unit, color }) => (
                <div
                  key={unit}
                  className="flex flex-col items-center py-4"
                  style={{ background: `${color}0a`, border: `1px solid ${color}20` }}
                >
                  <span
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "1.6rem",
                      fontWeight: 900,
                      color,
                      textShadow: `0 0 18px ${color}50`,
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.55rem",
                      color: "#7c6ea0",
                      letterSpacing: "0.12em",
                      marginTop: 4,
                    }}
                  >
                    {unit}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
