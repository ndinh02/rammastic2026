import { useState, useEffect } from "react";
import { motion } from "motion/react";

function GlitchText({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 160);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      style={{
        fontFamily: "'Orbitron', sans-serif",
        color: "#cab1fd",
        textShadow: glitching
          ? "3px 0 #71a1e6, -3px 0 #ff66aa, 0 0 40px rgba(202,177,253,0.9)"
          : "0 0 40px rgba(202,177,253,0.35)",
        transition: "text-shadow 0.1s",
        display: "inline-block",
        transform: glitching ? "translateX(3px) skewX(-1deg)" : "none",
        letterSpacing: "0.06em",
      }}
    >
      {text}
    </span>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date("2026-09-17T09:00:00+02:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "NGÀY", val: timeLeft.d },
    { label: "GIỜ", val: timeLeft.h },
    { label: "PHÚT", val: timeLeft.m },
    { label: "GIÂY", val: timeLeft.s },
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {units.map(({ label, val }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            {/* XP-pixel style box — double border with image-rendering */}
            <div
              className="w-12 h-12 sm:w-[60px] sm:h-[60px]"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(202,177,253,0.07)",
                border: "2px solid rgba(202,177,253,0.35)",
                boxShadow: "inset 0 0 0 1px rgba(202,177,253,0.1), 2px 2px 0 rgba(0,0,0,0.4)",
                imageRendering: "pixelated",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#cab1fd",
                  fontSize: "clamp(0.95rem, 3.5vw, 1.3rem)",
                  fontWeight: 700,
                  textShadow: "0 0 10px rgba(202,177,253,0.5)",
                }}
              >
                {String(val).padStart(2, "0")}
              </span>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "#a896cc",
                letterSpacing: "0.12em",
                marginTop: 5,
              }}
            >
              {label}
            </span>
          </div>
          {i < 3 && (
            <span
              style={{
                color: "rgba(202,177,253,0.4)",
                fontSize: "1.1rem",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 20,
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() < 0.3 ? 3 : Math.random() * 1.5 + 0.5, // some pixel-sized dots
    duration: Math.random() * 9 + 5,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.08,
    isPixel: Math.random() < 0.3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "#cab1fd" : p.id % 3 === 1 ? "#71a1e6" : "#eeb2ff",
            opacity: p.opacity,
            borderRadius: p.isPixel ? 0 : "50%", // pixels = square, others = circle
          }}
          animate={{ y: [0, -24, 0], opacity: [p.opacity, p.opacity * 0.2, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: 64, paddingBottom: 48 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% 15%, rgba(32,19,69,0.98) 0%, #07030f 65%)",
        }}
      />
      {/* Pixel grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(113,161,230,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(113,161,230,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 35%, black 0%, transparent 75%)",
        }}
      />
      <ParticleField />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center gap-7 text-center">

        {/* SIVICAMP 2026 label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-1"
        >
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.78rem",
              color: "#71a1e6",
              letterSpacing: "0.4em",
              fontWeight: 600,
            }}
          >
            SIVICAMP 2026
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(232,224,255,0.35)",
              letterSpacing: "0.18em",
            }}
          >
            17–19 SEPT · FRANKFURT AM MAIN, GERMANY
          </span>
        </motion.div>

        {/* Main title — # inline before RAMMASTIC */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="flex flex-col items-center gap-2"
        >
          <h1
            className="flex items-baseline justify-center gap-3 flex-wrap"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(2.8rem, 11vw, 6rem)",
              fontWeight: 900,
              lineHeight: 1,
              margin: 0,
            }}
          >
            {/* Pixel # — XP accent */}
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.45em",
                color: "#71a1e6",
                fontWeight: 700,
                letterSpacing: "0",
                textShadow: "0 0 16px rgba(113,161,230,0.6)",
                alignSelf: "center",
                marginBottom: "0.08em",
              }}
            >
              #
            </span>
            <GlitchText text="RAMMASTIC" />
          </h1>

          {/* Registrations open pill */}
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="w-1.5 h-1.5 shrink-0"
              style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80", borderRadius: 0 }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#cab1fd",
                letterSpacing: "0.2em",
              }}
            >
              REGISTRATIONS OPEN
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            color: "rgba(232,224,255,0.52)",
            fontSize: "0.92rem",
            lineHeight: 1.75,
            maxWidth: 460,
          }}
        >
          Trại hè tài năng đầu tiên cho sinh viên và người trẻ Việt Nam tại Đức.{" "}
          <span style={{ color: "rgba(232,224,255,0.3)" }}>Nơi công nghệ gặp gỡ văn hoá.</span>
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#7c6ea0",
              letterSpacing: "0.2em",
            }}
          >
            EVENT_STARTS_IN
          </span>
          <Countdown />
        </motion.div>

        {/* CTA Buttons — XP / macOS style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#register"
            className="w-full sm:w-auto px-9 font-bold tracking-widest text-sm transition-all duration-200 flex items-center justify-center"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: "linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)",
              color: "#fff",
              border: "2px solid #fff3",
              boxShadow: "0 4px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.25)",
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              minHeight: 52,
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(2px) scale(0.97)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.15)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.25)";
            }}
          >
            ▶ START QUEST
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-7 text-sm tracking-widest transition-all duration-200 hover:text-[#cab1fd] hover:border-[#cab1fd] flex items-center justify-center"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "rgba(232,224,255,0.78)",
              border: "2px solid rgba(202,177,253,0.35)",
              minHeight: 52,
            }}
          >
            EXPLORE →
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-7" style={{ background: "linear-gradient(to bottom, rgba(202,177,253,0.4), transparent)" }} />
      </motion.div>
    </section>
  );
}
