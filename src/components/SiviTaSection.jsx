import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const HW = "'Helvetica World', 'Helvetica Neue', Helvetica, Arial, sans-serif"
const PIXEL = "'Pixelify Sans', sans-serif"
const VIET = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
const SCRIPT = "'Segoe Script', 'Brush Script MT', 'Lucida Handwriting', cursive"

function SectionLabel({ children }) {
  return (
    <div className="sivita-section-label">
      <span className="sivita-section-slashes">{'//'}</span>
      <span>{children}</span>
      <div />
    </div>
  )
}

export function SiviTaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sivita" ref={ref} className="sivita-section">
      <div className="sivita-wrap">
        <motion.div
          className="sivita-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel>TALENT SHOW · GALA NIGHT</SectionLabel>

          <div className="sivita-mission">MISSION_002</div>

          <h2 className="sivita-title">SiviTa</h2>

          <div className="sivita-quote-wrap">
            <div className="sivita-quote">
              “Everyone has a story worth sharing”
            </div>

            <span className="sivita-sparkle-main">✦</span>
            <span className="sivita-sparkle-small">✧</span>

            <div className="sivita-quote-lines">
              <span className="sivita-quote-line-short" />
              <span className="sivita-quote-line-long" />
            </div>
          </div>

          <div className="sivita-body">
            <p>
              SIVITA Gala Night là đêm biểu diễn tài năng khép lại SiviCamp 2026 —
              sân khấu thuộc về tất cả mọi người.
            </p>

            <p>
              Mỗi người đăng ký đều có cơ hội lên sân khấu: hát, múa, diễn xuất,
              độc tấu, hay bất kỳ hình thức sáng tạo nào bạn chọn.
            </p>

            <p>
              Đây không phải cuộc thi — đây là khoảnh khắc bạn{' '}
              <strong>kể câu chuyện của mình</strong> trước cộng đồng.
            </p>
          </div>

          <a href="#schedule" className="sivita-event-card">
            <div className="sivita-event-icon" aria-hidden="true">
              <span className="sivita-calendar-top" />
              <span className="sivita-calendar-left" />
              <span className="sivita-calendar-right" />
              <span className="sivita-calendar-star">☆</span>
            </div>

            <div className="sivita-event-copy">
              <div className="sivita-event-title">Last Day · Gala Night</div>
              <div className="sivita-event-date">19/09/2026</div>
              <div className="sivita-event-subtitle">
                Dành cho tất cả người đăng ký
              </div>
            </div>

            <div className="sivita-event-button">
              <span>XEM THÊM</span>
              <span className="sivita-event-arrow">›</span>
            </div>
          </a>
        </motion.div>
      </div>

      <style>{`
        .sivita-section {
          position: relative;
          padding: 64px 24px 72px;
          overflow: hidden;
          background: linear-gradient(180deg, #07030f 0%, #100818 60%, #07030f 100%);
        }

        .sivita-wrap {
          width: 100%;
          max-width: none;
          margin: 0 auto;
        }

        .sivita-copy {
          width: min(100%, 560px);
          margin-left: clamp(56px, 6vw, 98px);
        }

        .sivita-section-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 26px;
          font-family: ${HW};
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          color: rgba(202, 177, 253, 0.62);
          text-transform: uppercase;
        }

        .sivita-section-label > div {
          width: 96px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(202, 177, 253, 0.18),
            transparent
          );
        }

        .sivita-section-slashes {
          color: #71a1e6;
          letter-spacing: 0.04em;
        }

        .sivita-mission {
          margin-bottom: 14px;
          font-family: ${HW};
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #f1a7ff;
          text-shadow:
            0 0 10px rgba(238, 178, 255, 0.45),
            0 0 22px rgba(238, 178, 255, 0.16);
        }

        .sivita-title {
          margin: 0;
          font-family: ${PIXEL};
          font-size: clamp(3.85rem, 5.25vw, 5.45rem);
          font-weight: 800;
          line-height: 0.84;
          letter-spacing: -0.035em;
          color: #f7e9ff;
          text-shadow:
            0 0 16px rgba(238, 178, 255, 0.24),
            0 7px 0 rgba(124, 78, 168, 0.2);
        }

        .sivita-quote-wrap {
          position: relative;
          width: fit-content;
          max-width: 100%;
          margin-top: 22px;
          margin-bottom: 22px;
        }

        .sivita-quote {
          position: relative;
          z-index: 2;
          font-family: ${SCRIPT};
          font-size: clamp(1.34rem, 2.05vw, 2rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.08;
          color: #f1b5ff;
          white-space: nowrap;
          text-shadow:
            0 0 10px rgba(238, 178, 255, 0.48),
            0 0 24px rgba(180, 111, 255, 0.2);
        }

        .sivita-sparkle-main,
        .sivita-sparkle-small {
          position: absolute;
          color: #fff0b8;
          pointer-events: none;
          text-shadow:
            0 0 10px rgba(255, 232, 170, 0.9),
            0 0 20px rgba(238, 178, 255, 0.45);
        }

        .sivita-sparkle-main {
          right: 19%;
          top: -18px;
          font-size: 1.05rem;
        }

        .sivita-sparkle-small {
          right: 15.5%;
          top: 3px;
          font-size: 0.58rem;
          opacity: 0.85;
        }

        .sivita-quote-lines {
          position: relative;
          height: 18px;
          margin-top: -1px;
        }

        .sivita-quote-line-short {
          position: absolute;
          left: 0;
          top: 11px;
          width: 54px;
          height: 1px;
          background: rgba(202, 177, 253, 0.16);
        }

        .sivita-quote-line-long {
          position: absolute;
          left: 86px;
          top: 10px;
          width: min(365px, calc(100vw - 150px));
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(201, 124, 255, 0.98),
            rgba(238, 178, 255, 0.62),
            transparent
          );
          transform: rotate(-3deg);
          box-shadow: 0 0 10px rgba(238, 178, 255, 0.3);
        }

        .sivita-body {
          max-width: 560px;
          margin-top: 6px;
          font-family: ${VIET};
          font-size: clamp(0.86rem, 1.02vw, 0.98rem);
          font-weight: 500;
          line-height: 1.55;
          color: rgba(241, 236, 255, 0.84);
          text-shadow: 0 0 18px rgba(7, 3, 15, 0.75);
        }

        .sivita-body p {
          margin: 0 0 16px;
        }

        .sivita-body p:last-child {
          margin-bottom: 0;
        }

        .sivita-body strong {
          font-family: ${VIET};
          color: #f3a9ff;
          font-weight: 800;
          text-shadow: 0 0 14px rgba(238, 178, 255, 0.3);
        }

        .sivita-event-card {
          width: min(100%, 560px);
          min-height: 98px;
          margin-top: 28px;
          padding: 16px 18px;
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr) 128px;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          color: inherit;
          border: 1.5px solid rgba(238, 178, 255, 0.36);
          border-radius: 9px;
          background:
            linear-gradient(180deg, rgba(238, 178, 255, 0.045), rgba(7, 3, 15, 0.18)),
            rgba(7, 3, 15, 0.18);
          box-shadow:
            0 0 0 1px rgba(238, 178, 255, 0.05) inset,
            0 0 26px rgba(238, 178, 255, 0.08);
          backdrop-filter: blur(6px);
          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .sivita-event-card:hover {
          transform: translateY(-2px);
          border-color: rgba(238, 178, 255, 0.72);
          box-shadow:
            0 0 0 1px rgba(238, 178, 255, 0.08) inset,
            0 0 30px rgba(238, 178, 255, 0.16);
        }

        .sivita-event-icon {
          position: relative;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffb8ff;
          border: 2px solid rgba(238, 178, 255, 0.58);
          border-radius: 8px;
          box-shadow:
            0 0 14px rgba(238, 178, 255, 0.38),
            inset 0 0 16px rgba(238, 178, 255, 0.12);
        }

        .sivita-calendar-top {
          position: absolute;
          top: 11px;
          left: 13px;
          right: 13px;
          height: 2px;
          background: rgba(255, 210, 255, 0.92);
          box-shadow: 0 0 8px rgba(238, 178, 255, 0.65);
        }

        .sivita-calendar-left,
        .sivita-calendar-right {
          position: absolute;
          top: 6px;
          width: 4px;
          height: 12px;
          border-radius: 999px;
          background: #ffdca8;
          box-shadow: 0 0 8px rgba(255, 220, 168, 0.75);
        }

        .sivita-calendar-left {
          left: 15px;
        }

        .sivita-calendar-right {
          right: 15px;
        }

        .sivita-calendar-star {
          position: absolute;
          left: 50%;
          top: 54%;
          transform: translate(-50%, -50%);
          font-family: ${HW};
          font-size: 1.7rem;
          line-height: 1;
          color: #b986ff;
          text-shadow: 0 0 10px rgba(185, 134, 255, 0.85);
        }

        .sivita-event-copy {
          min-width: 0;
        }

        .sivita-event-title {
          margin-bottom: 5px;
          font-family: ${VIET};
          font-size: clamp(0.98rem, 1.42vw, 1.14rem);
          font-weight: 800;
          line-height: 1.2;
          color: #f1a7ff;
          text-shadow: 0 0 13px rgba(238, 178, 255, 0.3);
        }

        .sivita-event-date {
          margin-bottom: 4px;
          font-family: ${VIET};
          font-size: 0.88rem;
          font-weight: 700;
          color: rgba(241, 236, 255, 0.92);
        }

        .sivita-event-subtitle {
          font-family: ${VIET};
          font-size: 0.76rem;
          line-height: 1.3;
          color: rgba(241, 236, 255, 0.68);
        }

        .sivita-event-button {
          min-width: 124px;
          min-height: 40px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 2px solid rgba(238, 178, 255, 0.72);
          border-radius: 999px;
          color: #fff4ff;
          font-family: ${HW};
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(238, 178, 255, 0.45);
          box-shadow:
            0 0 16px rgba(238, 178, 255, 0.2),
            inset 0 0 14px rgba(238, 178, 255, 0.08);
        }

        .sivita-event-arrow {
          font-size: 1.32rem;
          line-height: 1;
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .sivita-section {
            padding: 88px 22px;
          }

          .sivita-copy {
            width: min(100%, 620px);
            margin-left: 0;
          }

          .sivita-title {
            font-size: clamp(3.9rem, 13vw, 5.4rem);
          }

          .sivita-quote {
            font-size: clamp(1.55rem, 5.8vw, 2.25rem);
            white-space: normal;
          }

          .sivita-event-card {
            grid-template-columns: auto minmax(0, 1fr);
          }

          .sivita-event-button {
            grid-column: 1 / -1;
            width: 100%;
          }
        }

        @media (max-width: 520px) {
          .sivita-section {
            padding: 76px 18px;
          }

          .sivita-section-label {
            gap: 10px;
            margin-bottom: 28px;
            font-size: 0.62rem;
            letter-spacing: 0.24em;
          }

          .sivita-section-label > div {
            width: 42px;
          }

          .sivita-mission {
            font-size: 0.72rem;
            margin-bottom: 14px;
          }

          .sivita-title {
            font-size: clamp(3.25rem, 17vw, 4.6rem);
          }

          .sivita-quote-wrap {
            margin-top: 22px;
            margin-bottom: 24px;
          }

          .sivita-quote {
            font-size: clamp(1.38rem, 7.4vw, 1.9rem);
          }

          .sivita-sparkle-main {
            right: 8%;
            top: -19px;
          }

          .sivita-sparkle-small {
            right: 3%;
          }

          .sivita-quote-line-long {
            left: 78px;
            width: min(280px, calc(100vw - 125px));
          }

          .sivita-body {
            font-size: 0.94rem;
            line-height: 1.66;
          }

          .sivita-body p {
            margin-bottom: 19px;
          }

          .sivita-event-card {
            min-height: 0;
            margin-top: 34px;
            padding: 18px;
            grid-template-columns: 54px minmax(0, 1fr);
            gap: 15px;
          }

          .sivita-event-icon {
            width: 54px;
            height: 54px;
          }

          .sivita-event-title {
            font-size: 1.02rem;
          }

          .sivita-event-date {
            font-size: 0.92rem;
          }

          .sivita-event-subtitle {
            font-size: 0.8rem;
          }

          .sivita-event-button {
            min-width: 0;
            min-height: 46px;
            font-size: 0.76rem;
          }
        }
      `}</style>
    </section>
  )
}