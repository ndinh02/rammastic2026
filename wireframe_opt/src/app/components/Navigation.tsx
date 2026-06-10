import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Về Rammastic", href: "#about" },
  { label: "SiviHack", href: "#sivihack" },
  { label: "SiviTa", href: "#sivita" },
  { label: "SiviTour", href: "#sivitour" },
  { label: "Chương Trình", href: "#schedule" },
  { label: "Ban Tổ Chức", href: "#org" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 md:px-8 py-4 transition-all duration-300"
        style={{
          background: scrolled || open ? "rgba(7,3,15,0.95)" : "transparent",
          backdropFilter: scrolled || open ? "blur(14px)" : "none",
          borderBottom: scrolled || open ? "1px solid rgba(202,177,253,0.1)" : "none",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#71a1e6", fontSize: "1rem", fontWeight: 700 }}>
            #
          </span>
          <span style={{ fontFamily: "'Orbitron', sans-serif", color: "#e8e0ff", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.08em" }}>
            RAMMASTIC
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-wide transition-colors duration-200 hover:text-[#cab1fd] relative group"
              style={{ color: "rgba(232,224,255,0.55)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#cab1fd] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#register"
          className="hidden md:flex items-center px-5 py-2 text-xs tracking-widest font-bold transition-all duration-200 hover:shadow-[0_0_18px_rgba(202,177,253,0.4)]"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: "linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: "0 3px 0 #5a30c0",
            clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
          }}
        >
          ĐĂNG KÝ
        </a>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-0.5"
            style={{ background: "#cab1fd", transformOrigin: "center" }}
          />
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5"
            style={{ background: "#cab1fd" }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-0.5"
            style={{ background: "#cab1fd", transformOrigin: "center" }}
          />
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 md:hidden"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden flex flex-col"
              style={{
                width: "min(80vw, 300px)",
                background: "rgba(10,5,22,0.98)",
                borderLeft: "1px solid rgba(202,177,253,0.15)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(202,177,253,0.1)" }}
              >
                <span style={{ fontFamily: "'Orbitron', sans-serif", color: "#cab1fd", fontSize: "0.75rem", letterSpacing: "0.15em" }}>
                  MENU
                </span>
                <button onClick={close} className="w-8 h-8 flex items-center justify-center" aria-label="Close">
                  <span style={{ color: "#7c6ea0", fontSize: "1.2rem", lineHeight: 1 }}>×</span>
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                    className="flex items-center gap-3 py-4 border-b transition-colors duration-200 hover:text-[#cab1fd]"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.85rem",
                      color: "rgba(232,224,255,0.65)",
                      letterSpacing: "0.05em",
                      borderColor: "rgba(202,177,253,0.07)",
                    }}
                  >
                    <span style={{ color: "#71a1e6", fontSize: "0.6rem" }}>{"// "}</span>
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="px-6 pb-10">
                <a
                  href="#register"
                  onClick={close}
                  className="flex items-center justify-center w-full py-4 font-bold tracking-widest text-sm"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    background: "linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)",
                    color: "#fff",
                    border: "2px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 4px 0 #5a30c0",
                    clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  }}
                >
                  ▶ ĐĂNG KÝ NGAY
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
