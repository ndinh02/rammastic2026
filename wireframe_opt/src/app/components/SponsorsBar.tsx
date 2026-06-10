// Pure CSS marquee — GPU-accelerated via translate3d, no JS animation loop.
// Duplicated content creates seamless infinite scroll on all devices.

const sponsors = [
  { name: "NVIDIA" },
  { name: "FPT" },
  { name: "Vietinbank" },
  { name: "Code4You" },
];

// 8 copies so the loop is seamless at any screen width
const items = [...sponsors, ...sponsors, ...sponsors, ...sponsors,
               ...sponsors, ...sponsors, ...sponsors, ...sponsors];

export function SponsorsBar() {
  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "rgba(202,177,253,0.05)",
        borderTop: "1px solid rgba(202,177,253,0.12)",
        borderBottom: "1px solid rgba(202,177,253,0.12)",
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-12 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #07030f, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-12 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #07030f, transparent)" }}
      />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 22s linear infinite", willChange: "transform" }}
      >
        {items.map((s, i) => (
          <div key={i} className="inline-flex items-center gap-3 px-8">
            <span
              style={{
                width: 5,
                height: 5,
                background: "rgba(202,177,253,0.3)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.68rem",
                color: "rgba(202,177,253,0.5)",
                letterSpacing: "0.2em",
                fontWeight: 700,
              }}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
