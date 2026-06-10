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

const categories = [
  {
    key: "coder",
    label: "For Coders",
    emoji: "⚡",
    color: "#71a1e6",
    bg: "linear-gradient(135deg, #0d1f3a 0%, #0a1628 100%)",
    accent: "rgba(113,161,230,0.1)",
    tagline: "Build. Ship. Win.",
    perks: [
      { icon: "🧩", text: "Real-world problem challenges with real stakes" },
      { icon: "🤝", text: "1:1 mentoring from industry engineers" },
      { icon: "🏆", text: "Awards, prizes & public recognition" },
      { icon: "💼", text: "Direct career & internship connections" },
    ],
  },
  {
    key: "singer",
    label: "For Performers",
    emoji: "🎤",
    color: "#eeb2ff",
    bg: "linear-gradient(135deg, #1e0a2e 0%, #160820 100%)",
    accent: "rgba(238,178,255,0.08)",
    tagline: "Your stage. Your story.",
    perks: [
      { icon: "🎭", text: "Perform at SIVITA Gala Night on the last evening" },
      { icon: "🎶", text: "Any art form — music, dance, poetry, spoken word" },
      { icon: "👥", text: "Audience of 100+ peers & community members" },
      { icon: "✨", text: "Celebrate your unique voice beyond the screen" },
    ],
  },
  {
    key: "everyone",
    label: "For Everyone",
    emoji: "🌟",
    color: "#cab1fd",
    bg: "linear-gradient(135deg, #170d30 0%, #120a28 100%)",
    accent: "rgba(202,177,253,0.08)",
    tagline: "Connect. Grow. Belong.",
    perks: [
      { icon: "🌍", text: "Meet Vietnamese talent from all over Europe" },
      { icon: "🏙️", text: "Explore Frankfurt city with SiviTour" },
      { icon: "📚", text: "Workshops on AI, UX & entrepreneurship" },
      { icon: "🎉", text: "2 nights of genuine, unforgettable experience" },
    ],
  },
  {
    key: "sponsor",
    label: "For Sponsors",
    emoji: "🤝",
    color: "#4ade80",
    bg: "linear-gradient(135deg, #051a10 0%, #040f0b 100%)",
    accent: "rgba(74,222,128,0.07)",
    tagline: "Discover tomorrow's talent.",
    perks: [
      { icon: "🎯", text: "Direct access to 100+ vetted STEM profiles" },
      { icon: "📢", text: "Brand visibility on stage, materials & digital" },
      { icon: "🤲", text: "Recruitment pipeline built into the event" },
      { icon: "🌱", text: "Support a growing Vietnamese community in the EU" },
    ],
  },
];

function StackCard({
  cat,
  index,
  total,
}: {
  cat: (typeof categories)[0];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when the card's top edge enters the viewport
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div
      ref={ref}
      className="sticky w-full"
      style={{ top: `calc(64px + ${index * 22}px)`, zIndex: index + 1, paddingBottom: 8 }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.97 }}
        animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 overflow-hidden"
          style={{
            background: cat.bg,
            border: `1px solid ${cat.color}22`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 0 0.5px ${cat.color}15`,
          }}
        >
          {/* Left — identity */}
          <div
            className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12"
            style={{
              background: cat.accent,
              borderRight: `1px solid ${cat.color}18`,
              minHeight: 240,
            }}
          >
            {/* macOS traffic lights */}
            <div className="flex gap-1.5 mb-6">
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span
                className="ml-auto"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.56rem",
                  color: "rgba(232,224,255,0.2)",
                  letterSpacing: "0.1em",
                }}
              >
                {String(index + 1).padStart(2, "0")}/{total}
              </span>
            </div>

            <div style={{ fontSize: "3rem", marginBottom: 14, lineHeight: 1 }}>{cat.emoji}</div>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(1rem, 2.5vw, 1.45rem)",
                fontWeight: 900,
                color: cat.color,
                textShadow: `0 0 28px ${cat.color}45`,
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              {cat.tagline}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                color: `${cat.color}70`,
                letterSpacing: "0.2em",
              }}
            >
              {cat.label.toUpperCase()}
            </div>
          </div>

          {/* Right — perks */}
          <div
            className="flex flex-col justify-center px-5 py-6 md:px-8 md:py-10 gap-4 md:gap-5"
            style={{ background: "rgba(7,3,15,0.45)", minHeight: 240 }}
          >
            {cat.perks.map(({ icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: "easeOut" }}
                className="flex items-start gap-4"
              >
                <div
                  className="shrink-0 w-9 h-9 flex items-center justify-center text-base"
                  style={{
                    background: `${cat.color}0d`,
                    border: `1px solid ${cat.color}25`,
                    boxShadow: `1px 1px 0 ${cat.color}18`,
                  }}
                >
                  {icon}
                </div>
                <span
                  style={{
                    color: "rgba(232,224,255,0.68)",
                    fontSize: "0.85rem",
                    lineHeight: 1.55,
                    paddingTop: 5,
                  }}
                >
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function WhyJoinSection() {
  return (
    <section
      id="why"
      className="relative px-6"
      style={{
        background: "linear-gradient(180deg, #07030f 0%, #0a0418 60%, #07030f 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="pt-16 md:pt-24 pb-8 md:pb-12">
          <SectionLabel>tại sao bạn nên tham gia</SectionLabel>
          <h2
            className="mt-8"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#e8e0ff",
              lineHeight: 1.1,
            }}
          >
            What's in it
            <br />
            <span style={{ color: "#cab1fd" }}>for you?</span>
          </h2>
          <p
            className="mt-3"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#4a3a6a",
              letterSpacing: "0.15em",
            }}
          >
            scroll to explore each group ↓
          </p>
        </div>

        {/* Stacking cards — each is sticky, slides in via useInView */}
        <div className="flex flex-col" style={{ paddingBottom: `${categories.length * 28 + 40}px` }}>
          {categories.map((cat, i) => (
            <StackCard key={cat.key} cat={cat} index={i} total={categories.length} />
          ))}
        </div>

        {/* CTA */}
        <div className="py-24 flex justify-center">
          <a
            href="#register"
            className="px-10 py-4 font-bold tracking-widest text-sm transition-all duration-200"
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
            ▶ CLAIM YOUR SPOT
          </a>
        </div>
      </div>
    </section>
  );
}
