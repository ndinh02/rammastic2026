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

// Reference image: 4 large macOS folders in a 2×2 staggered fan
// Top-left (behind): blue — "Nền tảng STEM…"
// Top-right (behind): light purple — "Chưa vượt quá trình độ Thạc sĩ"
// Bottom-left (mid): lavender — "18–35 tuổi"
// Bottom-center (front): white/cream — "Người Việt hoặc có nguồn gốc Việt"
const folders = [
  {
    id: "stem",
    title: "Nền tảng STEM",
    subtitle: "IT, Engineering, Data, AI",
    body: "Bạn đã có nền tảng kỹ thuật — đây là sân chơi của bạn.",
    folderBody: "#7a9ee0",   // blue
    tabColor: "#5a80cc",
    textColor: "rgba(255,255,255,0.92)",
    // position in the stacked layout (top-left, partially behind)
    gridRow: 1, gridCol: 1,
    zIndex: 1,
    offsetX: 0,
    offsetY: 0,
    rotate: -3,
  },
  {
    id: "edu",
    title: "≤ Thạc Sĩ",
    subtitle: "Chưa vượt quá trình độ Thạc sĩ",
    body: "Dành cho tài năng trẻ đang trên đà phát triển.",
    folderBody: "#c9a8f0",   // light purple
    tabColor: "#a880d8",
    textColor: "rgba(20,10,40,0.88)",
    gridRow: 1, gridCol: 2,
    zIndex: 2,
    offsetX: 0,
    offsetY: 0,
    rotate: 2,
  },
  {
    id: "age",
    title: "18–35 tuổi",
    subtitle: "Sinh viên & người trẻ",
    body: "Người trẻ Việt Nam năng động, sáng tạo tại châu Âu.",
    folderBody: "#b8a4e8",   // lavender / medium purple
    tabColor: "#9078cc",
    textColor: "rgba(255,255,255,0.9)",
    gridRow: 2, gridCol: 1,
    zIndex: 3,
    offsetX: 0,
    offsetY: 0,
    rotate: -1.5,
  },
  {
    id: "viet",
    title: "Người Việt",
    subtitle: "Hoặc có nguồn gốc Việt",
    body: "Đang học tập hoặc làm việc tại Đức. Cộng đồng của chúng ta.",
    folderBody: "#f0ece8",   // white / cream
    tabColor: "#d0c8c0",
    textColor: "rgba(20,10,40,0.85)",
    gridRow: 2, gridCol: 2,
    zIndex: 4,
    offsetX: 0,
    offsetY: 0,
    rotate: 1,
  },
];

function MacOSFolder({
  folder,
  index,
  inView,
}: {
  folder: (typeof folders)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: folder.rotate * 2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: folder.rotate } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.13,
        type: "spring",
        stiffness: 140,
        damping: 18,
      }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 20, transition: { duration: 0.25 } }}
      style={{
        zIndex: folder.zIndex,
        cursor: "default",
        width: "100%",
      }}
    >
      {/* Folder tab */}
      <div
        style={{
          width: 88,
          height: 22,
          background: folder.tabColor,
          borderRadius: "7px 7px 0 0",
          marginLeft: 16,
          marginBottom: -1,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      />

      {/* Folder body */}
      <div
        style={{
          background: folder.folderBody,
          borderRadius: "0 8px 8px 8px",
          padding: "14px 16px 18px",
          minHeight: 140,
          boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <p
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(0.72rem, 2.5vw, 0.95rem)",
            fontWeight: 800,
            color: folder.textColor,
            lineHeight: 1.3,
            marginBottom: 5,
          }}
        >
          {folder.title}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.62rem, 2vw, 0.78rem)",
            color: folder.textColor,
            opacity: 0.75,
            lineHeight: 1.5,
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {folder.subtitle}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.58rem, 1.8vw, 0.72rem)",
            color: folder.textColor,
            opacity: 0.6,
            lineHeight: 1.6,
          }}
        >
          {folder.body}
        </p>
      </div>
    </motion.div>
  );
}

export function SiviHackSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="sivihack"
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07030f 0%, #0d0720 55%, #07030f 100%)" }}
    >
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(202,177,253,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionLabel>first hackathon at sivicamp</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">

          {/* Left — mission info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              className="text-xs mb-3 tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#cab1fd" }}
            >
              MISSION_001
            </div>
            <h2
              className="mb-1"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#e8e0ff",
                lineHeight: 1.1,
              }}
            >
              SiviHack
            </h2>
            <div
              className="mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "#71a1e6" }}
            >
              "Technology starts with people"
            </div>

            <div className="space-y-4 mb-8">
              {[
                "SiviHack là hackathon đầu tiên do SIVIDUC e.V. tổ chức — mô hình đầu tiên trong cộng đồng sinh viên Việt Nam tại châu Âu.",
                "~100 người làm việc theo đội 3–6 để giải quyết bài toán thực tế và xây dựng prototype trong 24 giờ.",
                "Mentoring, workshop thực chiến, kết nối đối tác — cầu nối giữa học thuật và thực tiễn.",
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
              className="inline-flex items-center gap-4 px-5 py-3 mb-6"
              style={{ border: "1px solid rgba(113,161,230,0.2)", background: "rgba(113,161,230,0.05)" }}
            >
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#71a1e6",
                  textShadow: "0 0 20px rgba(113,161,230,0.4)",
                }}
              >
                3–6
              </span>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#71a1e6", letterSpacing: "0.15em" }}>
                  TEAM_SIZE
                </div>
                <div style={{ color: "rgba(232,224,255,0.45)", fontSize: "0.78rem" }}>
                  người mỗi đội · 24 giờ hacking
                </div>
              </div>
            </motion.div>

            <motion.a
              href="#register"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold tracking-widest transition-all duration-200"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                background: "linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.15)",
                boxShadow: "0 4px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.2)",
                textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(2px)"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              ▶ ĐĂNG KÝ NGAY
            </motion.a>
          </motion.div>

          {/* Right — large macOS folder stack (2×2 grid, staggered) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="text-xs tracking-widest mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "#7c6ea0" }}
            >
              {"// access_requirements — tap each card"}
            </div>

            {/* 2×2 grid of large folders */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {folders.map((folder, i) => (
                <MacOSFolder key={folder.id} folder={folder} index={i} inView={inView} />
              ))}
            </div>

            <p
              className="mt-4 text-center"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                color: "#3a2a5a",
                letterSpacing: "0.12em",
              }}
            >
              all 4 conditions required · hover to lift
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
