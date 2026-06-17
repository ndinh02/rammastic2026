import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { REGISTRATION_URL } from '@/config/links'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"

const navLinks = [
  { label: 'Về RAMmastic', href: '#about' },
  { label: 'SiviHack', href: '#sivihack' },
  // { label: 'SiviTa', href: '#sivita' },
  // { label: 'SiviTour', href: '#sivitour' },
  { label: 'Chương Trình', href: '#schedule' },
  { label: 'Ban Tổ Chức', href: '#org' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px',
          background: scrolled || open ? 'rgba(7,3,15,0.95)' : 'transparent',
          backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
          borderBottom: scrolled || open ? '1px solid rgba(202,177,253,0.1)' : 'none',
          transition: 'all 0.3s',
        }}
      >
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            flexShrink: 0,
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo/logo_RAMmastic.svg`}
            alt="Rammastic"
            style={{
              height: '100%',
              maxHeight: 56,
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </a>

        <div style={{ display: 'none', alignItems: 'center', gap: 28 }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontFamily: HW, color: 'rgba(232,224,255,0.55)', fontSize: '0.85rem', letterSpacing: '0.05em', position: 'relative' }}
              onMouseEnter={e => e.currentTarget.style.color = '#cab1fd'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,224,255,0.55)'}
            >
              {link.label === 'Về RAMmastic' ? (
                <>
                  Về <strong style={{ fontWeight: 700 }}>RAMmastic</strong>
                </>
              ) : (
                link.label
              )}
            </a>
          ))}
        </div>

        <a
          href={REGISTRATION_URL}
          target="_blank"
          className="desktop-cta"
          style={{
            fontFamily: HW,
            background: 'linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)',
            color: '#fff', border: '2px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 16px rgba(90,48,192,0.4)',
            borderRadius: '9999px',
            padding: '10px 20px', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 700,
          }}
        >
          ĐĂNG KÝ
        </a>

        <button
          className="hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 40, height: 40, gap: 6 }}
        >
          <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} style={{ display: 'block', width: 24, height: 2, background: '#cab1fd', transformOrigin: 'center' }} />
          <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} style={{ display: 'block', width: 24, height: 2, background: '#cab1fd' }} />
          <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} style={{ display: 'block', width: 24, height: 2, background: '#cab1fd', transformOrigin: 'center' }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 50,
                width: 'min(80vw, 300px)',
                background: 'rgba(10,5,22,0.98)',
                borderLeft: '1px solid rgba(202,177,253,0.15)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(202,177,253,0.1)' }}>
                <span style={{ fontFamily: HW, color: '#cab1fd', fontSize: '0.85rem', letterSpacing: '0.1em', fontWeight: 700 }}>MENU</span>
                <button onClick={close} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#7c6ea0', fontSize: '1.2rem', lineHeight: 1 }}>×</span>
                </button>
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', padding: '32px 24px', gap: 4, flex: 1 }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                    style={{ fontFamily: HW, fontSize: '0.95rem', color: 'rgba(232,224,255,0.65)', letterSpacing: '0.05em', padding: '16px 0', borderBottom: '1px solid rgba(202,177,253,0.07)', display: 'flex', alignItems: 'center', gap: 12 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#cab1fd'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,224,255,0.65)'}
                  >
                    <span style={{ color: '#71a1e6', fontSize: '0.7rem' }}>{'// '}</span>
                    {link.label === 'Về RAMmastic' ? (
                      <>
                        Về <strong style={{ fontWeight: 700 }}>RAMmastic</strong>
                      </>
                    ) : (
                      link.label
                    )}
                  </motion.a>
                ))}
              </nav>
              <div style={{ padding: '0 24px 40px' }}>
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '16px 0',
                    fontFamily: HW, fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.85rem',
                    background: 'linear-gradient(180deg, #d4c0ff 0%, #9b78f0 45%, #7a50e0 100%)',
                    color: '#fff', border: '2px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 4px 16px rgba(90,48,192,0.4)',
                    borderRadius: '9999px',
                  }}
                >
                  ĐĂNG KÝ NGAY
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </>
  )
}
