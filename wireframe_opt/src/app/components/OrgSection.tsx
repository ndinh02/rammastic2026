import { useRef } from "react";
import { motion, useInView } from "motion/react";

const orgs = [
  {
    id: "ORG_001",
    name: "SIVIDUC e.V.",
    color: "#cab1fd",
    role: "Main Organizer",
    roleVi: "Đơn vị tổ chức chính",
    description: "Dẫn dắt toàn bộ sự kiện SiviCamp 2026 và là đơn vị sáng lập SiviHack.",
    stats: [
      { label: "FOUNDED", value: "2019" },
      { label: "MEMBERS", value: "200+" },
    ],
    icon: "◆",
  },
  {
    id: "ORG_002",
    name: "VGI e.V.",
    color: "#71a1e6",
    role: "Technical Partner",
    roleVi: "Chuyên môn & Hội đồng đánh giá",
    description: "Đồng hành về chuyên môn kỹ thuật và tham gia hội đồng đánh giá các đội thi.",
    stats: [
      { label: "EXPERTS", value: "15+" },
      { label: "WORKSHOPS", value: "3" },
    ],
    icon: "▲",
  },
  {
    id: "ORG_003",
    name: "VSAF e.V.",
    color: "#eeb2ff",
    role: "Operations Partner",
    roleVi: "Vận hành & Hậu cần",
    description: "Đảm nhận vận hành và hậu cần để mang đến trải nghiệm cộng đồng chất lượng.",
    stats: [
      { label: "VOLUNTEERS", value: "30+" },
      { label: "CAPACITY", value: "200" },
    ],
    icon: "●",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <span style={{ color: "#71a1e6", fontSize: "0.7rem", letterSpacing: "0.15em" }}>{"//"}</span>
      <span style={{ color: "#7c6ea0", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(202,177,253,0.1)" }} />
    </div>
  );
}

export function OrgSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="org"
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden"
      style={{
        background: "#0d0720",
        borderTop: "1px solid rgba(202,177,253,0.08)",
        borderBottom: "1px solid rgba(202,177,253,0.08)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(202,177,253,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(202,177,253,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 80% at 50% 50%, black 0%, transparent 80%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <SectionLabel>ban tổ chức</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mt-8 mb-12 text-center"
        >
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#e8e0ff",
            }}
          >
            Được tổ chức bởi
          </h2>
          <p
            className="mt-3 max-w-2xl mx-auto text-sm leading-relaxed"
            style={{ color: "rgba(232,224,255,0.5)" }}
          >
            SiviCamp 2026 được dẫn dắt bởi ba tổ chức sinh viên Việt Nam hàng đầu tại Đức,
            cùng nhau xây dựng một trải nghiệm cộng đồng chất lượng và bền vững.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orgs.map((org, i) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              className="group relative p-6 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(18,11,36,0.8)",
                border: `1px solid rgba(202,177,253,0.12)`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = `1px solid ${org.color}50`;
                el.style.boxShadow = `0 8px 40px ${org.color}12`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = `1px solid rgba(202,177,253,0.12)`;
                el.style.boxShadow = "none";
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${org.color}60, transparent)` }}
              />

              {/* Icon + ID */}
              <div className="flex items-start justify-between">
                <div
                  className="w-14 h-14 flex items-center justify-center text-3xl"
                  style={{
                    background: `${org.color}0d`,
                    border: `1px solid ${org.color}30`,
                    color: org.color,
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {org.icon}
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#7c6ea0",
                    letterSpacing: "0.15em",
                  }}
                >
                  {org.id}
                </span>
              </div>

              {/* Name + role */}
              <div>
                <div
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: org.color,
                    textShadow: `0 0 20px ${org.color}40`,
                    marginBottom: 4,
                  }}
                >
                  {org.name}
                </div>
                <div
                  className="text-xs tracking-widest"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#7c6ea0",
                  }}
                >
                  {org.role}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: "rgba(232,224,255,0.82)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                {org.description}
              </p>

              {/* Stats */}
              <div
                className="flex gap-4 pt-4 border-t"
                style={{ borderColor: "rgba(202,177,253,0.08)" }}
              >
                {org.stats.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: org.color,
                      }}
                    >
                      {value}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.55rem",
                        color: "#7c6ea0",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
