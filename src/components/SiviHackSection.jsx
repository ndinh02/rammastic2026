import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { REGISTRATION_URL } from '@/config/links'
import {
  RegistrationFireworkLayer,
  useRegistrationFirework,
  pressRegistrationButton,
  releaseRegistrationButton,
  registrationPressStyle,
} from './ui/registration-firework'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const PIXEL = "'Pixelify Sans', sans-serif"
const VIET = "system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif"

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: HW }}>
      <span style={{ color: '#71a1e6', fontSize: '0.7rem' }}>{'//'}</span>
      <span style={{ color: '#7c6ea0', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(202,177,253,0.1)' }} />
    </div>
  )
}

const folders = [
  {
    id: 'stem',
    title: 'Cơ cấu giải thưởng',
    subtitle: '',
    body: '1) Giải Nhất, Nhì, Ba chung cuộc\n2) Giải Nhất theo từng Challenge/Chủ đề\n3) Giải thưởng phụ và Giấy khen',
    folderBody: '#7a9ee0',
    tabColor: '#5a80cc',
    textColor: 'rgba(0,0,0,0.92)',
    rotate: -5,
    zIndex: 1,
  },
  {
    id: 'edu',
    title: 'Chủ đề: Applied AI for Business & Community Innovation',
    subtitle: '',
    body: 'Xây dựng giải pháp AI cho doanh nghiệp, sản phẩm, dịch vụ hoặc vấn đề cộng đồng.',
    folderBody: '#c9a8f0',
    tabColor: '#a880d8',
    textColor: 'rgba(0,0,0,0.88)',
    rotate: 4,
    zIndex: 2,
  },
  {
    id: 'age',
    title: '18–35 tuổi',
    subtitle: 'Thanh niên và Sinh viên Việt Nam',
    body: 'Dành cho sinh viên, học sinh, Azubi, cử nhân, thạc sĩ và người trẻ Việt Nam tại Châu Âu',
    folderBody: '#b8a4e8',
    tabColor: '#9078cc',
    textColor: 'rgba(0,0,0,0.9)',
    rotate: -2,
    zIndex: 3,
  },
  {
    id: 'viet',
    title: 'Người Việt',
    subtitle: 'Người Việt hoặc người gốc Việt',
    body: 'Đang học tập hoặc làm việc tại châu Âu.',
    folderBody: '#f0ece8',
    tabColor: '#d0c8c0',
    textColor: 'rgba(0,0,0,1)',
    rotate: 1,
    zIndex: 4,
  },
]

const benefits = [
  {
    id: 'certificate',
    icon: `${import.meta.env.BASE_URL}pixel_asset/benefit_certificate.svg`,
    headline: 'Workshop + Certificate',
    body: 'Tham gia miễn phí workshop và nhận chứng chỉ trị giá 90 USD từ NVIDIA',
  },
  {
    id: 'prize',
    icon: `${import.meta.env.BASE_URL}pixel_asset/benefit_prize.svg`,
    headline: '1000,00€',
    body: 'Tổng giá trị giải thưởng lên đến 4 con số!',
  },
  {
    id: 'networking',
    icon: `${import.meta.env.BASE_URL}pixel_asset/benefit_networking.svg`,
    headline: 'Industry Networking',
    body: 'Cơ hội networking với doanh nghiệp và chuyên gia đầu ngành',
  },
]

const teamChars = [
  { src: `${import.meta.env.BASE_URL}pixel_asset/pixeled_girl.svg`, alt: 'girl' },
  { src: `${import.meta.env.BASE_URL}pixel_asset/pixeled_boy.svg`,  alt: 'boy' },
  { src: `${import.meta.env.BASE_URL}pixel_asset/pixeled_dog.svg`,  alt: 'dog' },
  { src: `${import.meta.env.BASE_URL}pixel_asset/pixeled_frog.svg`, alt: 'frog' },
]

function FolderCard( {folder, index, inView, isHovered, isFront, onHover, onLeave,} ) {
  return (
    <motion.div
      className={`folder-item folder-${folder.id}`}
      initial={{ opacity: 0, y: 40, rotate: folder.rotate * 2 }}
      animate={inView ? {
      opacity: 1,
      y: isHovered ? -14 : 0,
      scale: 1,
      rotate: isHovered ? 0 : folder.rotate,
      zIndex: isFront ? 20 : folder.zIndex,
    } : {}}
      transition={{
      opacity: {
        duration: 0.5,
        delay: 0.15 + index * 0.12,
      },
      y: {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      },
      rotate: {
        duration: 0.36,
        ease: [0.22, 1, 0.36, 1],
      },
    }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ cursor: 'default' }}
    >
      <div style={{
        width: 88, height: 22,
        background: folder.tabColor,
        borderRadius: '7px 7px 0 0',
        marginLeft: 16,
        marginBottom: -1,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
      }} />
      <div style={{
        background: folder.folderBody,
        borderRadius: '0 8px 8px 8px',
        padding: '16px 18px 20px',
        minHeight: 140,
        boxShadow: isHovered
          ? '0 20px 50px rgba(0,0,0,0.5), 0 4px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)'
          : '0 8px 32px rgba(0,0,0,0.35), 0 2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
        transition: 'box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        <p style={{
          fontFamily: VIET,
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          fontWeight: 800,
          color: folder.textColor,
          opacity: 1,
          lineHeight: 1.25,
          marginBottom: 8,
          letterSpacing: '-0.01em',
        }}>
          {folder.title}
        </p>
        <p style={{
          fontFamily: VIET,
          fontSize: 'clamp(0.72rem, 2vw, 0.85rem)',
          color: folder.textColor,
          opacity: 0.9,
          lineHeight: 1.5,
          marginBottom: 10,
          fontWeight: 600,
        }}>
          {folder.subtitle}
        </p>
        <p style={{
          fontFamily: VIET,
          fontSize: 'clamp(0.67rem, 1.8vw, 0.78rem)',
          color: folder.textColor,
          opacity: 0.85,
          lineHeight: 1.65,
          whiteSpace: 'pre-line',
        }}>
          {folder.body}
        </p>
      </div>
    </motion.div>
  )
}

export function SiviHackSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredId, setHoveredId] = useState(null)
  const [frontId, setFrontId] = useState(null)
  const hoverTimerRef = useRef(null)
  const { burst, handleRegistrationClick } = useRegistrationFirework()

  const handleFolderEnter = id => {
    clearTimeout(hoverTimerRef.current)

    setHoveredId(id)

    hoverTimerRef.current = setTimeout(() => {
      setFrontId(id)
    }, 90)
  }

  const handleFolderLeave = id => {
    clearTimeout(hoverTimerRef.current)

    setHoveredId(null)

    hoverTimerRef.current = setTimeout(() => {
      setFrontId(current => (current === id ? null : current))
    }, 140)
  }

  return (
    <section id="sivihack" ref={ref} style={{ position: 'relative', padding: '96px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #07030f 0%, #0d0720 55%, #07030f 100%)' }}>
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 288, height: 288, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(202,177,253,0.05) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <SectionLabel>first hackathon at sivicamp</SectionLabel>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start', marginTop: 32 }}>
          {/* Left: description */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <div style={{ fontFamily: HW, fontSize: '0.7rem', letterSpacing: '0.12em', color: '#cab1fd', marginBottom: 16, fontWeight: 600 }}>MISSION_001</div>
            <h2 style={{ fontFamily: PIXEL, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#e8e0ff', lineHeight: 1.1, marginBottom: 4 }}>SiviHack</h2>
            <div style={{ fontFamily: HW, fontSize: '1.1rem', color: '#71a1e6', marginBottom: 24, fontStyle: 'italic' }}>"The First-ever Hackathon for Young Vietnamese Talents in Europe"</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {[
                'SiviHack là một sân chơi Hackathon chuyên nghiệp, uy tín, quy mô toàn châu Âu - lần đầu tiên được tổ chức dành riêng cho bạn trẻ Việt Nam!',
                'Trong 24 giờ, 100 tài năng trẻ sẽ làm việc theo đội 3-6 để giải quyết bài toán thực tế và xây dựng prototype. Mentoring, workshop thực chiến, kết nối đối tác - cầu nối giữa học thuật và thực tiễn.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ color: 'rgba(232,224,255,0.85)', lineHeight: 1.8, fontSize: '0.88rem', fontFamily: HW }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
            </motion.div>


          {/* Right: scattered folders */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{ fontFamily: HW, fontSize: '0.65rem', letterSpacing: '0.12em', color: '#7c6ea0', marginBottom: 16 }}>
            </div>

            {/* Desktop: scattered layout | Mobile: 2-col grid */}
            <div className="folders-scatter">
              {folders.map((folder, i) => (
                <FolderCard
                  key={folder.id}
                  folder={folder}
                  index={i}
                  inView={inView}
                  isHovered={hoveredId === folder.id}
                  isFront={frontId === folder.id}
                  onHover={() => handleFolderEnter(folder.id)}
                  onLeave={() => handleFolderLeave(folder.id)}
                />
              ))}
            </div>

            <p style={{ fontFamily: HW, fontSize: '0.65rem', color: '#3a2a5a', letterSpacing: '0.12em', textAlign: 'center', marginTop: 16 }}>
            </p>
                    </motion.div>
        </div>

        {/* Full-width benefits area */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="benefits-section"
        >
          <h3 className="benefits-title">
            Quyền lợi nổi bật
          </h3>

          <p className="benefits-subtitle">
            Giải thưởng, chứng chỉ và kết nối chuyên môn.
          </p>

          <div className="benefits-grid">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.6 + i * 0.08,
                }}
                className="benefit-item"
              >
                <img
                  src={benefit.icon}
                  alt=""
                  aria-hidden="true"
                  className="benefit-icon"
                />

                <div className="benefit-copy">
                  <div className="benefit-headline">
                    {benefit.headline}
                  </div>

                  <p className="benefit-body">
                    {benefit.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRegistrationClick}
            onPointerDown={pressRegistrationButton}
            onPointerUp={releaseRegistrationButton}
            onPointerCancel={releaseRegistrationButton}
            onPointerLeave={releaseRegistrationButton}
            onBlur={releaseRegistrationButton}
            onTouchStart={pressRegistrationButton}
            onTouchEnd={releaseRegistrationButton}
            onTouchCancel={releaseRegistrationButton}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.85 }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1, scale: 0.99 }}
            className="benefits-cta"
          >
            NẮM BẮT CƠ HỘI TỪ HÔM NAY !
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 0.9, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.95 }}
            className="benefits-mascots"
          >
            {teamChars.map(({ src, alt }) => (
              <img
                key={alt}
                src={src}
                alt={alt}
              />
            ))}
          </motion.div>
        </motion.div>
        </div>
      <RegistrationFireworkLayer burst={burst} />
      <style>{`
        .folders-scatter {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 10px;
          row-gap: 0;
          align-items: start;
          padding: 8px 2px 20px;
          overflow: visible;
        }

        .folder-item {
          position: relative;
          width: 100%;
        }

        .folder-stem {
          top: 14px;
          left: 12px;
        }

        .folder-edu {
          top: 2px;
          left: -10px;
        }

        .folder-age {
          margin-top: -88px;
          left: 30px;
          z-index: 3;
        }

        .folder-viet {
          margin-top: -58px;
          left: -16px;
          z-index: 4;
        }

        .benefits-section {
          width: 100%;
          max-width: 980px;
          margin: 36px auto 0;
          text-align: center;
        }

        .benefits-title {
          margin: 0 0 4px;
          font-family: ${VIET};
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          line-height: 1.25;
          color: #f1e9ff;
        }

        .benefits-subtitle {
          margin: 0 0 24px;
          font-family: ${VIET};
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(232,224,255,0.65);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          align-items: start;
        }

        .benefit-item {
          min-width: 0;
          padding: 8px 14px 12px;
          text-align: center;
        }

        .benefit-icon {
          width: 92px;
          height: 92px;
          margin: 0 auto 12px;
          display: block;
          object-fit: contain;
          image-rendering: pixelated;
        }

        .benefit-headline {
          margin-bottom: 8px;
          font-family: ${VIET};
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-weight: 800;
          line-height: 1.3;
          color: #f1e9ff;
        }

        .benefit-body {
          max-width: 250px;
          margin: 0 auto;
          font-family: ${VIET};
          font-size: 0.8rem;
          line-height: 1.6;
          color: rgba(232,224,255,0.75);
        }

        .benefits-cta {
          width: min(760px, 100%);
          min-height: 54px;
          margin: 32px auto 0;
          padding: 14px 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: ${HW};
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(
            180deg,
            #d4c0ff 0%,
            #9b78f0 45%,
            #7a50e0 100%
          );
          border: 2px solid rgba(255,255,255,0.15);
          border-radius: 9999px;
          box-shadow:
            0 4px 20px rgba(90,48,192,0.45),
            inset 0 1px 0 rgba(255,255,255,0.2);
          text-shadow: 0 1px 2px rgba(0,0,0,0.35);
        }

        .benefits-mascots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
        }

        .benefits-mascots img {
          width: 50px;
          height: 50px;
          display: block;
          image-rendering: pixelated;
        }

        @media (max-width: 640px) {
          .folders-scatter {
            position: relative;
            height: auto;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .folder-item {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            margin-top: 0 !important;
          }

          .benefits-section {
            margin-top: 28px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .benefit-item {
            display: grid;
            grid-template-columns: 76px minmax(0, 1fr);
            grid-template-rows: auto auto;
            column-gap: 14px;
            padding: 10px 12px;
            text-align: left;
          }

          .benefit-icon {
            width: 72px;
            height: 72px;
            margin: 0;
            grid-row: 1 / 3;
            align-self: center;
          }

          .benefit-headline {
            margin-bottom: 4px;
            align-self: end;
          }

          .benefit-body {
            max-width: none;
            margin: 0;
          }

          .benefits-cta {
            margin-top: 24px;
            min-height: 50px;
          }

          .benefits-mascots {
            margin-top: 12px;
          }
        }
      `}</style>
    </section>
  )
}
