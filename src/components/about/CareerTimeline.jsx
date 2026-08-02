import { useRef } from 'react'
import Reveal from '../Reveal.jsx'

const items = [
  { year: '2020', role: 'BSc Medical Physiology & Therapeutics', org: 'University of Nottingham' },
  { year: '2023', role: 'Social Media Assistant', org: 'Monzo Bank' },
  { year: '2024', role: 'MSc Marketing', org: 'University of Nottingham' },
  { year: '2025', role: 'Marketing Intern · Prada Beauty', org: 'Buttermilk Agency' },
  { year: '2025', role: 'Growth Marketing Intern', org: 'MHR' },
  { year: '2026', role: 'Marketer', org: 'The Team' },
]

const loopItems = [...items, ...items]

const BG = '#B0A08C'
const ITEM_W = 210
const GAP = 72
const DURATION = 26
const ONE_LOOP = (ITEM_W + GAP) * items.length // width of one full set in px

export default function CareerTimeline() {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startOffset: 0, currentOffset: 0 })

  const getAnimatedOffset = () => {
    const matrix = new DOMMatrix(window.getComputedStyle(trackRef.current).transform)
    return matrix.m41 // current translateX in px
  }

  const resumeAnimation = (pixelOffset) => {
    const el = trackRef.current
    // Normalise to [0, ONE_LOOP)
    const normalized = ((-pixelOffset) % ONE_LOOP + ONE_LOOP) % ONE_LOOP
    const delay = -((normalized / ONE_LOOP) * DURATION)

    el.style.animation = 'none'
    el.style.transform = `translateX(${-normalized}px)`
    void el.offsetWidth // force reflow so browser registers both changes
    el.style.transform = ''
    el.style.animation = `timeline-scroll ${DURATION}s ${delay}s linear infinite`
  }

  const onMouseDown = (e) => {
    const offset = getAnimatedOffset()
    // Pause animation and lock to current position
    trackRef.current.style.animation = 'none'
    trackRef.current.style.transform = `translateX(${offset}px)`
    drag.current = { active: true, startX: e.clientX, startOffset: offset, currentOffset: offset }
    trackRef.current.style.cursor = 'grabbing'
  }

  const onMouseMove = (e) => {
    if (!drag.current.active) return
    e.preventDefault()
    const newOffset = drag.current.startOffset + (e.clientX - drag.current.startX)
    drag.current.currentOffset = newOffset
    trackRef.current.style.transform = `translateX(${newOffset}px)`
  }

  const onMouseUp = () => {
    if (!drag.current.active) return
    drag.current.active = false
    trackRef.current.style.cursor = 'grab'
    resumeAnimation(drag.current.currentOffset)
  }

  return (
    <section style={{ background: BG }} className="py-12 overflow-hidden">
      <style>{`
        @keyframes timeline-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <Reveal>
        <div className="container-page mb-10">
          <h2 className="font-display text-display-lg-mobile md:text-display-lg text-white">
            My <span className="italic">journey</span>
          </h2>
        </div>
      </Reveal>

      <div
        className="overflow-hidden cursor-grab select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          ref={trackRef}
          className="relative flex"
          style={{
            width: 'max-content',
            height: '260px',
            animation: `timeline-scroll ${DURATION}s 0s linear infinite`,
          }}
        >
          {/* Horizontal white line */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: '50%', height: '1px', background: 'rgba(255,255,255,0.3)' }}
          />

          {loopItems.map((item, i) => {
            const above = i % 2 === 0
            return (
              <div
                key={i}
                className="relative flex-shrink-0 flex items-center justify-center"
                style={{ width: ITEM_W, marginRight: GAP }}
              >
                {/* Text — alternates above / below */}
                <div
                  className="absolute text-center px-2"
                  style={above
                    ? { bottom: 'calc(50% + 26px)', left: 0, right: 0 }
                    : { top: 'calc(50% + 26px)', left: 0, right: 0 }
                  }
                >
                  <span className="block text-white/70 text-[11px] tracking-[0.18em] uppercase font-mono font-semibold mb-1">
                    {item.year}
                  </span>
                  <h3 className="font-display text-[1rem] leading-snug text-white font-semibold">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-[0.82rem] text-white/75 leading-snug font-medium">
                    {item.org}
                  </p>
                </div>

                {/* Tick */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '1px',
                    background: 'rgba(255,255,255,0.3)',
                    ...(above
                      ? { bottom: '50%', height: '18px' }
                      : { top: '50%', height: '18px' }
                    ),
                  }}
                />

                {/* Dot */}
                <div
                  className="relative z-10 rounded-full"
                  style={{
                    width: 11,
                    height: 11,
                    background: 'white',
                    boxShadow: `0 0 0 3px ${BG}`,
                    outline: '1.5px solid rgba(255,255,255,0.5)',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
