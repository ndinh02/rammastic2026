import { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { REGISTRATION_URL } from '@/config/links'

const FIREWORK_COLORS = [
  '#cab1fd',
  '#e879f9',
  '#67e8f9',
  '#60a5fa',
  '#a78bfa',
  '#ffffff',
]

const DESKTOP_REDIRECT_DELAY_MS = 620
const MOBILE_REDIRECT_DELAY_MS = 420
const SHOW_DURATION_MS = 1200

const PRESS_RESET_MS = 320
const PRESS_DUPLICATE_GUARD_MS = 140
const PRESS_MIN_VISIBLE_MS = 140

let registrationLocked = false
let scrollRestoreReady = false

function getNow() {
  return typeof performance !== 'undefined' ? performance.now() : Date.now()
}

function setupScrollRestore() {
  if (scrollRestoreReady || typeof window === 'undefined') return

  scrollRestoreReady = true

  const restore = () => {
    const raw = window.sessionStorage.getItem('registrationScrollY')
    if (!raw) return

    const y = Number(raw)
    if (!Number.isFinite(y)) return

    const jumpBack = () => {
      window.scrollTo({ top: y, left: 0, behavior: 'auto' })
    }

    window.requestAnimationFrame(jumpBack)
    window.setTimeout(jumpBack, 80)
    window.setTimeout(jumpBack, 240)

    window.setTimeout(() => {
      window.sessionStorage.removeItem('registrationScrollY')
    }, 1400)
  }

  window.addEventListener('pageshow', restore)

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) restore()
  })

  window.setTimeout(restore, 0)
}

setupScrollRestore()

function applyPressedStyle(element) {
  element.style.transition =
    'transform 130ms cubic-bezier(0.16, 1, 0.3, 1)'
  element.style.transform = 'translateY(2px) scale(0.97)'
}

export function pressRegistrationButton(event) {
  const element = event.currentTarget
  if (!element) return

  const now = getNow()

  if (
    element.__registrationLastPressAt &&
    now - element.__registrationLastPressAt < PRESS_DUPLICATE_GUARD_MS
  ) {
    return
  }

  element.__registrationLastPressAt = now

  window.clearTimeout(element.__registrationPressTimer)
  window.clearTimeout(element.__registrationReleaseTimer)
  window.cancelAnimationFrame?.(element.__registrationPressFrame)

  applyPressedStyle(element)

  element.__registrationPressFrame = window.requestAnimationFrame(() => {
    applyPressedStyle(element)
  })

  element.__registrationPressTimer = window.setTimeout(() => {
    element.style.transition =
      'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)'
    element.style.transform = ''
  }, PRESS_RESET_MS)
}

export function releaseRegistrationButton(event) {
  const element = event.currentTarget
  if (!element) return

  window.clearTimeout(element.__registrationReleaseTimer)

  const now = getNow()
  const lastPressAt = element.__registrationLastPressAt || 0
  const elapsed = now - lastPressAt
  const remaining = Math.max(0, PRESS_MIN_VISIBLE_MS - elapsed)

  element.__registrationReleaseTimer = window.setTimeout(() => {
    window.clearTimeout(element.__registrationPressTimer)
    window.cancelAnimationFrame?.(element.__registrationPressFrame)

    element.style.transition =
      'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)'
    element.style.transform = ''
  }, remaining)
}

export const registrationPressStyle = {
  WebkitTapHighlightColor: 'transparent',
  touchAction: 'manipulation',
  userSelect: 'none',
  transformOrigin: 'center',
}

function randomColor() {
  return FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]
}

function isCompactDevice() {
  if (typeof window === 'undefined') return false

  return window.innerWidth <= 768 || navigator.maxTouchPoints > 0
}

function createMiniBurst(cx, cy, burstIndex, delay, compact = false) {
  const count = compact
    ? burstIndex === 0
      ? 18
      : 9 + Math.floor(Math.random() * 5)
    : burstIndex === 0
      ? 40
      : 22 + Math.floor(Math.random() * 10)

  const radiusBase = compact
    ? burstIndex === 0
      ? 70
      : 38 + Math.random() * 24
    : burstIndex === 0
      ? 110
      : 60 + Math.random() * 55

  return {
    id: `burst-${Date.now()}-${burstIndex}-${Math.random()}`,
    x: cx,
    y: cy,
    delay,
    compact,
    coreColor: randomColor(),
    ringColor: randomColor(),
    sparks: Array.from({ length: count }, (_, index) => {
      const angle =
        (Math.PI * 2 * index) / count + (Math.random() - 0.5) * 0.18

      const distance =
        radiusBase +
        Math.random() *
          (compact
            ? burstIndex === 0
              ? 42
              : 30
            : burstIndex === 0
              ? 95
              : 65)

      return {
        id: `spark-${Date.now()}-${burstIndex}-${index}-${Math.random()}`,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: compact
          ? Math.random() < 0.16
            ? 5
            : 3 + Math.random() * 2
          : Math.random() < 0.18
            ? 8
            : 4 + Math.random() * 4,
        color: randomColor(),
        delay: delay + Math.random() * 0.05,
        duration: compact
          ? 0.3 + Math.random() * 0.12
          : 0.42 + Math.random() * 0.18,
      }
    }),
  }
}

function createFireworkShow(x, y) {
  const compact = isCompactDevice()

  const spreadX = compact
    ? Math.min(window.innerWidth * 0.18, 110)
    : Math.min(window.innerWidth * 0.26, 240)

  const spreadY = compact
    ? Math.min(window.innerHeight * 0.1, 76)
    : Math.min(window.innerHeight * 0.18, 160)

  const offsets = compact
    ? [
        [0, 0, 0],
        [-0.72, -0.35, 0.08],
        [0.72, -0.34, 0.14],
      ]
    : [
        [0, 0, 0],
        [-0.8, -0.45, 0.06],
        [0.8, -0.42, 0.11],
        [-0.42, 0.45, 0.16],
        [0.42, 0.42, 0.21],
        [0, -0.9, 0.26],
        [-0.95, 0.02, 0.31],
        [0.95, 0.02, 0.36],
      ]

  return {
    id: `show-${Date.now()}-${Math.random()}`,
    compact,
    bursts: offsets.map(([ox, oy, delay], index) =>
      createMiniBurst(
        x + ox * spreadX + (Math.random() - 0.5) * 14,
        y + oy * spreadY + (Math.random() - 0.5) * 14,
        index,
        delay,
        compact,
      ),
    ),
  }
}

export function useRegistrationFirework() {
  const [show, setShow] = useState(null)

  const handleRegistrationClick = useCallback((event) => {
    const target = event.currentTarget

    if (typeof event.button === 'number' && event.button !== 0) {
      return
    }

    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()

    if (!target) return

    target.blur?.()

    if (registrationLocked) return
    registrationLocked = true

    const pressedRecently =
      getNow() - (target.__registrationLastPressAt || 0) < 260

    if (!pressedRecently) {
      pressRegistrationButton({ currentTarget: target })

      window.setTimeout(() => {
        releaseRegistrationButton({ currentTarget: target })
      }, 180)
    }

    window.sessionStorage.setItem(
      'registrationScrollY',
      String(window.scrollY),
    )

    const rect = target.getBoundingClientRect()
    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const compact = isCompactDevice()
    const redirectDelay = compact
      ? MOBILE_REDIRECT_DELAY_MS
      : DESKTOP_REDIRECT_DELAY_MS

    if (!reduceMotion) {
      setShow(
        createFireworkShow(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
        ),
      )
    }

    window.setTimeout(() => {
      setShow(null)

      const tab = window.open(REGISTRATION_URL, '_blank')

      if (tab) {
        tab.opener = null
      }

      window.setTimeout(() => {
        registrationLocked = false
      }, 250)
    }, reduceMotion ? 0 : redirectDelay)

    window.setTimeout(() => {
      registrationLocked = false
      setShow(null)
    }, SHOW_DURATION_MS)
  }, [])

  return { burst: show, handleRegistrationClick }
}

function PixelShockwave({ burst }) {
  return (
    <>
      <motion.span
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.8, 0.9], opacity: [0, 1, 0] }}
        transition={{ duration: 0.26, delay: burst.delay, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          left: burst.x - 10,
          top: burst.y - 10,
          width: 20,
          height: 20,
          background: '#ffffff',
          boxShadow: burst.compact
            ? `0 0 7px #ffffff, 0 0 14px ${burst.coreColor}`
            : `0 0 12px #ffffff, 0 0 26px ${burst.coreColor}, 0 0 44px ${burst.coreColor}`,
        }}
      />

      <motion.span
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{
          scale: [0.3, burst.compact ? 3.4 : 5.4],
          opacity: [0, 0.85, 0],
        }}
        transition={{ duration: 0.34, delay: burst.delay, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          left: burst.x - 12,
          top: burst.y - 12,
          width: 24,
          height: 24,
          border: `2px solid ${burst.ringColor}`,
          boxShadow: burst.compact
            ? `0 0 7px ${burst.ringColor}`
            : `0 0 12px ${burst.ringColor}, inset 0 0 10px ${burst.ringColor}`,
        }}
      />

      <motion.span
        initial={{ scaleX: 0.15, opacity: 0 }}
        animate={{ scaleX: [0.15, 1.3, 0.7], opacity: [0, 1, 0] }}
        transition={{ duration: 0.22, delay: burst.delay, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          left: burst.x - 48,
          top: burst.y - 1,
          width: 96,
          height: 2,
          background: burst.coreColor,
          boxShadow: burst.compact
            ? `0 0 6px ${burst.coreColor}`
            : `0 0 12px ${burst.coreColor}, 0 0 28px ${burst.coreColor}`,
          transformOrigin: 'center',
        }}
      />

      <motion.span
        initial={{ scaleY: 0.15, opacity: 0 }}
        animate={{ scaleY: [0.15, 1.3, 0.7], opacity: [0, 1, 0] }}
        transition={{ duration: 0.22, delay: burst.delay, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          left: burst.x - 1,
          top: burst.y - 48,
          width: 2,
          height: 96,
          background: burst.coreColor,
          boxShadow: burst.compact
            ? `0 0 6px ${burst.coreColor}`
            : `0 0 12px ${burst.coreColor}, 0 0 28px ${burst.coreColor}`,
          transformOrigin: 'center',
        }}
      />
    </>
  )
}

function PixelSpark({ spark, x, y, compact }) {
  return (
    <motion.span
      initial={{
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        x: spark.dx,
        y: spark.dy,
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.4],
      }}
      transition={{
        duration: spark.duration,
        delay: spark.delay,
        ease: 'easeOut',
      }}
      style={{
        position: 'fixed',
        left: x - spark.size / 2,
        top: y - spark.size / 2,
        width: spark.size,
        height: spark.size,
        background: spark.color,
        boxShadow: compact
          ? `0 0 5px ${spark.color}`
          : `0 0 7px ${spark.color}`,
      }}
    />
  )
}

function MiniBurst({ burst }) {
  return (
    <>
      <PixelShockwave burst={burst} />
      {burst.sparks.map((spark) => (
        <PixelSpark
          key={spark.id}
          spark={spark}
          x={burst.x}
          y={burst.y}
          compact={burst.compact}
        />
      ))}
    </>
  )
}

export function RegistrationFireworkLayer({ burst }) {
  if (!burst || typeof document === 'undefined') return null

  return createPortal(
    <div
      key={burst.id}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {burst.bursts.map((miniBurst) => (
        <MiniBurst key={miniBurst.id} burst={miniBurst} />
      ))}
    </div>,
    document.body,
  )
}