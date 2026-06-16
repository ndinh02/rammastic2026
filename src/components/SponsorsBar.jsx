const sponsors = [
  {
    name: 'NVIDIA',
    src: `${import.meta.env.BASE_URL}logo/NVIDIA.svg`,
    width: 165,
    scale: 2.05,
  },
  {
    name: 'FPT',
    src: `${import.meta.env.BASE_URL}logo/FPT.svg`,
    width: 110,
    scale: 1.1,
  },
  {
    name: 'VietinBank',
    src: `${import.meta.env.BASE_URL}logo/VietinBank.svg`,
    width: 175,
    scale: 2.2,
  },
  {
    name: 'Code4You',
    src: `${import.meta.env.BASE_URL}logo/Code4You.svg`,
    width: 130,
    scale: 1.25,
  },
]

const items = [
  ...sponsors,
  ...sponsors,
  ...sponsors,
  ...sponsors,
  ...sponsors,
  ...sponsors,
  ...sponsors,
  ...sponsors,
]

export function SponsorsBar() {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '8px 0',
        background: 'rgba(202,177,253,0.05)',
        borderTop: '1px solid rgba(202,177,253,0.12)',
        borderBottom: '1px solid rgba(202,177,253,0.12)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          insetBlock: 0,
          left: 0,
          width: 80,
          zIndex: 10,
          pointerEvents: 'none',
          background: 'linear-gradient(to right, #07030f, transparent)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          insetBlock: 0,
          right: 0,
          width: 80,
          zIndex: 10,
          pointerEvents: 'none',
          background: 'linear-gradient(to left, #07030f, transparent)',
        }}
      />

      <div
        style={{
          display: 'flex',
          width: 'max-content',
          whiteSpace: 'nowrap',
          animation: 'marquee 50s linear infinite',
          willChange: 'transform',
        }}
      >
        {items.map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '0 26px',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                flexShrink: 0,
                display: 'inline-block',
                background: 'rgba(202,177,253,0.3)',
                transform: 'rotate(45deg)',
              }}
            />

            <div
              style={{
                width: 190,
                height: 58,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible',
              }}
            >
              <img
                src={s.src}
                alt={s.name}
                style={{
                  width: s.width,
                  height: 'auto',
                  maxHeight: 48,
                  objectFit: 'contain',
                  opacity: 1,
                  display: 'block',
                  transform: `scale(${s.scale})`,
                  transformOrigin: 'center',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}