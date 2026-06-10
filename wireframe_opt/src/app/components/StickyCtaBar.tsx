import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
          style={{
            background: "rgba(7,3,15,0.97)",
            borderTop: "1px solid rgba(202,177,253,0.18)",
            backdropFilter: "blur(16px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Urgency pill */}
            <div
              className="flex items-center gap-1.5 shrink-0"
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
                padding: "6px 10px",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "#4ade80", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                100 chỗ
              </span>
            </div>

            {/* CTA */}
            <a
              href="#register"
              className="flex-1 flex items-center justify-center gap-2 font-bold tracking-widest"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.78rem",
                background: "linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.15)",
                boxShadow: "0 3px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.2)",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                minHeight: 48,
              }}
              onTouchStart={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onTouchEnd={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              ▶ Đăng ký ngay
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
