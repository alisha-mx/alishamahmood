import { createElement, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Trigger driven by scroll + bounding-rect (event-based, no rAF/observer),
// so above-the-fold content reveals on load and the rest reveals on scroll.
function useReveal(ref, margin = 80) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown) return
    const check = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < vh - margin && rect.bottom > 0) setShown(true)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [shown, margin])

  return shown
}

// Decide once whether motion should run. Frame-driven animations freeze in a
// hidden/background tab, so in that case (or with reduced-motion) we render the
// final visible state directly and never leave content stuck at opacity 0.
function canAnimate() {
  if (typeof window === 'undefined') return false
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return !reduced && document.visibilityState === 'visible'
}

// Subtle scroll-reveal: fades + lifts content into place once on enter.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  className = '',
}) {
  const ref = useRef(null)
  const shown = useReveal(ref)
  const [animate] = useState(canAnimate)

  if (!animate) {
    return createElement(as, { ref, className }, children)
  }

  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.9, delay }}
    >
      {children}
    </MotionTag>
  )
}
