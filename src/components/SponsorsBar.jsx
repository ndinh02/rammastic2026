const sponsors = [
  { name: 'NVIDIA',      src: '/sponsors/spon_nvidia_logo_fixed.svg', height: 40 },
  { name: 'FPT',         src: '/sponsors/spon_fpt_logo.svg',          height: 48 },
  { name: 'Vietinbank',  src: '/sponsors/spon_vietinbank_logo.svg',   height: 44 },
  { name: 'Code4You',    src: '/sponsors/spon_code4you_logo.png',     height: 44 },
]

const items = [...sponsors, ...sponsors, ...sponsors, ...sponsors,
               ...sponsors, ...sponsors, ...sponsors, ...sponsors]

export function SponsorsBar() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '18px 0', background: 'rgba(202,177,253,0.05)', borderTop: '1px solid rgba(202,177,253,0.12)', borderBottom: '1px solid rgba(202,177,253,0.12)' }}>
      <div style={{ position: 'absolute', insetBlock: 0, left: 0, width: 80, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #07030f, transparent)' }} />
      <div style={{ position: 'absolute', insetBlock: 0, right: 0, width: 80, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #07030f, transparent)' }} />
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 18s linear infinite', willChange: 'transform' }}>
        {items.map((s, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '0 48px' }}>
            <span style={{ width: 5, height: 5, background: 'rgba(202,177,253,0.25)', display: 'inline-block', flexShrink: 0, transform: 'rotate(45deg)' }} />
            <img
              src={s.src}
              alt={s.name}
              style={{
                height: s.height,
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.55,
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
