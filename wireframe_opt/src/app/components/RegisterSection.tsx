import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

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

function InputField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: focused ? "#cab1fd" : "#7c6ea0",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          transition: "color 0.2s",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="px-4 py-3 bg-transparent outline-none transition-all duration-200 placeholder-[#3a2d5a] text-sm"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "#e8e0ff",
          border: `1px solid ${focused ? "rgba(202,177,253,0.5)" : "rgba(202,177,253,0.15)"}`,
          boxShadow: focused ? "0 0 20px rgba(202,177,253,0.1)" : "none",
          background: focused ? "rgba(202,177,253,0.03)" : "transparent",
        }}
      />
    </div>
  );
}

export function RegisterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [track, setTrack] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tracks = [
    { key: "participant", label: "Participant", icon: "⚡", desc: "Hack & Build" },
    { key: "mentor", label: "Mentor", icon: "🧠", desc: "Guide & Share" },
    { key: "sponsor", label: "Sponsor", icon: "🤝", desc: "Partner Up" },
  ];

  return (
    <section
      id="register"
      ref={ref}
      className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden"
      style={{
        background: "#07030f",
        borderTop: "1px solid rgba(202,177,253,0.08)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(32,19,69,0.8) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <SectionLabel>đăng ký</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">
          {/* Left — CTA text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <h2
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900,
                color: "#e8e0ff",
                lineHeight: 1.05,
              }}
            >
              Sẵn sàng
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #cab1fd, #71a1e6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                chưa?
              </span>
            </h2>

            <p style={{ color: "rgba(232,224,255,0.82)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              SiviCamp 2026 chỉ có{" "}
              <span style={{ color: "#cab1fd", fontWeight: 600 }}>giới hạn 100 chỗ</span>.
              Đăng ký sớm để giữ vị trí của bạn và chuẩn bị cho một hành trình 48 giờ hack, học và kết nối.
            </p>

            {/* Quick facts */}
            {[
              { label: "Ngày tổ chức", value: "17–19 September 2026" },
              { label: "Địa điểm", value: "Frankfurt am Main, Germany" },
              { label: "Số đội", value: "~20 teams × 3–6 người" },
              { label: "Phí tham dự", value: "Free — Miễn phí" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-3 border-b"
                style={{ borderColor: "rgba(202,177,253,0.08)" }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#7c6ea0",
                    letterSpacing: "0.1em",
                  }}
                >
                  {label}
                </span>
                <span style={{ color: "#e8e0ff", fontSize: "0.85rem", fontWeight: 500 }}>
                  {value}
                </span>
              </div>
            ))}

            {/* Social links */}
            <div className="flex gap-3">
              {["Facebook", "Discord", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-4 py-2 text-xs tracking-widest transition-all duration-200 hover:border-[#cab1fd] hover:text-[#cab1fd]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#7c6ea0",
                    border: "1px solid rgba(202,177,253,0.15)",
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="p-8 relative"
              style={{
                background: "rgba(18,11,36,0.9)",
                border: "1px solid rgba(202,177,253,0.2)",
              }}
            >
              {/* Top glow line */}
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, #cab1fd60, transparent)",
                }}
              />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div
                    className="text-xs tracking-widest mb-2"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#7c6ea0",
                    }}
                  >
                    {">"} REGISTRATION_FORM_v2.1
                  </div>

                  <InputField label="Họ và Tên *" placeholder="Nguyen Van A" />
                  <InputField label="Email *" placeholder="you@example.com" type="email" />
                  <InputField label="Đang học / làm tại *" placeholder="TU Darmstadt / Bosch GmbH" />

                  {/* Track selection */}
                  <div className="flex flex-col gap-2">
                    <label
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        color: "#7c6ea0",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Track *
                    </label>
                    <div className="flex gap-2">
                      {tracks.map((t) => (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setTrack(t.key)}
                          className="flex-1 flex flex-col items-center gap-2 transition-all duration-200 relative"
                          style={{
                            border: `2px solid ${track === t.key ? "#cab1fd" : "rgba(202,177,253,0.15)"}`,
                            background: track === t.key ? "rgba(202,177,253,0.12)" : "transparent",
                            minHeight: 72,
                            justifyContent: "center",
                          }}
                        >
                          {track === t.key && (
                            <span
                              className="absolute top-1.5 right-1.5 w-3.5 h-3.5 flex items-center justify-center rounded-full"
                              style={{ background: "#cab1fd", fontSize: "0.5rem", color: "#07030f", fontWeight: 900 }}
                            >
                              ✓
                            </span>
                          )}
                          <span style={{ fontSize: "1.1rem" }}>{t.icon}</span>
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.62rem",
                              color: track === t.key ? "#cab1fd" : "#a896cc",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {t.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <InputField label="Kỹ năng chính (optional)" placeholder="React, Python, ML, UX..." />

                  <button
                    type="submit"
                    className="mt-2 font-bold tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(202,177,253,0.4)] active:scale-[0.97]"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      background: "linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 0 #5a30c0, inset 0 1px 0 rgba(255,255,255,0.2)",
                      textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                      clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                      minHeight: 52,
                    }}
                  >
                    ▶ Đăng ký ngay
                  </button>

                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: "#7c6ea0",
                      textAlign: "center",
                    }}
                  >
                    By submitting you agree to our terms. · Đây là form đăng ký sơ bộ.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 py-8 text-center"
                >
                  <div
                    className="w-20 h-20 flex items-center justify-center text-4xl"
                    style={{
                      border: "2px solid #4ade80",
                      background: "rgba(74,222,128,0.08)",
                      boxShadow: "0 0 30px rgba(74,222,128,0.2)",
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "1.2rem",
                        fontWeight: 800,
                        color: "#4ade80",
                        textShadow: "0 0 20px rgba(74,222,128,0.4)",
                        marginBottom: 8,
                      }}
                    >
                      QUEST ACCEPTED
                    </div>
                    <p style={{ color: "rgba(232,224,255,0.82)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                      Cảm ơn bạn đã đăng ký!
                      <br />
                      Chúng tôi sẽ liên hệ sớm qua email.
                    </p>
                  </div>
                  <div
                    className="px-6 py-3"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      color: "#4ade80",
                      border: "1px solid rgba(74,222,128,0.3)",
                      background: "rgba(74,222,128,0.05)",
                    }}
                  >
                    +100 XP UNLOCKED · WELCOME_TO_SIVICAMP
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="max-w-6xl mx-auto mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(202,177,253,0.08)" }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.75rem",
            color: "#cab1fd",
            letterSpacing: "0.2em",
          }}
        >
          {"{#}"} RAMMASTIC · SIVICAMP 2026
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#7c6ea0",
          }}
        >
          SIVIDUC e.V. · VGI e.V. · VSAF e.V.
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#7c6ea0",
          }}
        >
          Frankfurt am Main, Germany · Sept 2026
        </div>
      </div>
    </section>
  );
}
