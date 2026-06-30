const sponsors = [
  {
    name: 'NVIDIA',
    src: `${import.meta.env.BASE_URL}logo/sponsors-optimized/NVIDIA.png`,
    width: 87.1,
  },
  {
    name: 'FPT',
    src: `${import.meta.env.BASE_URL}logo/sponsors-optimized/FPT.png`,
    width: 51.2,
  },
  {
    name: 'VietinBank',
    src: `${import.meta.env.BASE_URL}logo/sponsors-optimized/VietinBank.png`,
    width: 90.7,
  },
  {
    name: 'Code4You',
    src: `${import.meta.env.BASE_URL}logo/sponsors-optimized/Code4You.png`,
    width: 52.2,
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
        isolation: 'isolate',
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
        {items.map((sponsor, index) => (
          <div
            key={`${sponsor.name}-${index}`}
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
                flexShrink: 0,
              }}
            >
              <img
                src={sponsor.src}
                alt={sponsor.name}
                width={190}
                height={58}
                loading="lazy"
                decoding="async"
                draggable="false"
                style={{
                  width: sponsor.width,
                  height: 'auto',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: 'contain',
                  opacity: 1,
                  display: 'block',
                  transform: 'none',
                  filter: 'none',
                  mixBlendMode: 'normal',
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
