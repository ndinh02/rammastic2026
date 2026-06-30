import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"

// LINE1: AI (static) + cũng + phải
// LINE2: bắt đầu + từ + đâu đó
const LINE1 = [
  { text: 'cũng', range: [0.00, 0.40], y: 80  },
  { text: 'phải', range: [0.08, 0.46], y: 100 },
]
const LINE2 = [
  { text: 'bắt đầu', range: [0.16, 0.52], y: 120 },
  { text: 'từ',       range: [0.24, 0.58], y: 100 },
  { text: 'đâu đó',  range: [0.32, 0.64], y: 80  },
]

function PixelShaderLines() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const CELL = 4
    const LINE_EVERY = 9
    let offset = 0
    let animId

    const noise = (x, y) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
      return n - Math.floor(n)
    }

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      const w = canvas.width
      const h = canvas.height
      if (!w || !h) { animId = requestAnimationFrame(draw); return }

      ctx.clearRect(0, 0, w, h)

      const cols = Math.ceil(w / CELL)
      const totalRows = Math.ceil(h / CELL) + LINE_EVERY + 2
      const pixelOffset = offset % (LINE_EVERY * CELL)

      for (let row = -LINE_EVERY - 1; row < totalRows; row++) {
        const ry = row * CELL - pixelOffset
        if (ry > h + CELL || ry < -CELL * 2) continue
        if ((row + 1000) % LINE_EVERY !== 0) continue

        for (let col = 0; col < cols; col++) {
          const n = noise(col, row)
          const shine = noise(col + 7, row + 3)
          const alpha = shine > 0.88
            ? (n * 0.12 + 0.05) * 3.5
            : (n * 0.07 + 0.025)

          ctx.fillStyle = `rgba(202,177,253,${alpha.toFixed(3)})`
          ctx.fillRect(col * CELL, ry, CELL, CELL)
        }
      }

      offset += 0.55
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        imageRendering: 'pixelated',
      }}
    />
  )
}

function Word({ text, scrollYProgress, range, startY }) {
  const y       = useTransform(scrollYProgress, range, [startY, 0])
  const opacity = useTransform(scrollYProgress, range, [0, 1])

  return (
    <motion.span
      style={{
        display: 'inline-block',
        fontFamily: HW,
        fontSize: 'var(--quote-fs)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1.15,
        color: 'rgba(232,224,255,0.92)',
        y,
        opacity,
      }}
    >
      {text}
    </motion.span>
  )
}

export function QuoteSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(64px, 10vw, 120px) 16px',
        overflow: 'hidden',
      }}
    >
      <PixelShaderLines />

      {/* edge vignette so lines fade out */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(7,3,15,0.65) 100%)',
        }}
      />

      {/* Quote */}
      <div
        className="quote-container"
        style={{ '--quote-fs': 'clamp(1.6rem, 6vw, 5.5rem)' }}
      >
        {/* Desktop: single row */}
        <div className="quote-row quote-desktop-row">
          <span className="quote-ai">AI</span>
          {[...LINE1, ...LINE2].map(({ text, range, y }) => (
            <Word key={text} text={text} scrollYProgress={scrollYProgress} range={range} startY={y} />
          ))}
        </div>

        {/* Mobile: two rows */}
        <div className="quote-mobile-rows">
          <div className="quote-row">
            <span className="quote-ai">AI</span>
            {LINE1.map(({ text, range, y }) => (
              <Word key={text} text={text} scrollYProgress={scrollYProgress} range={range} startY={y} />
            ))}
          </div>
          <div className="quote-row">
            {LINE2.map(({ text, range, y }) => (
              <Word key={text} text={text} scrollYProgress={scrollYProgress} range={range} startY={y} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .quote-container {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .quote-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.3em;
          white-space: nowrap;
        }

        .quote-ai {
          font-family: ${HW};
          font-size: var(--quote-fs);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #cab1fd;
          text-shadow:
            0 0 10px rgba(202,177,253,0.95),
            0 0 28px rgba(202,177,253,0.55),
            0 0 60px rgba(202,177,253,0.22);
          animation: aiGlow 3s ease-in-out infinite;
        }

        /* Desktop: show single row, hide two-row */
        .quote-desktop-row { display: flex; }
        .quote-mobile-rows  { display: none;  }

        /* Mobile: hide single row, show two-row */
        @media (max-width: 767px) {
          .quote-container { --quote-fs: clamp(2rem, 9.5vw, 3.2rem); }
          .quote-desktop-row { display: none;  }
          .quote-mobile-rows  {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.15em;
          }
        }

        @keyframes aiGlow {
          0%, 100% {
            text-shadow:
              0 0 10px rgba(202,177,253,0.95),
              0 0 28px rgba(202,177,253,0.55),
              0 0 60px rgba(202,177,253,0.22);
          }
          50% {
            text-shadow:
              0 0 16px rgba(202,177,253,1),
              0 0 44px rgba(202,177,253,0.75),
              0 0 90px rgba(202,177,253,0.35);
          }
        }
      `}</style>
    </section>
  )
}
