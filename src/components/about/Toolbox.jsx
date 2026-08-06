import { useEffect, useRef, useCallback } from 'react'
import Reveal from '../Reveal.jsx'
import { asset } from '../../utils/asset.js'

const tools = [
  { name: 'Canon G7X Mark III',  img: asset('/images/tools/6536C026AA.png'),                        w: 150 },
  { name: 'DJI Mini Drone',      img: asset('/images/tools/Drone.png'),                             w: 170 },
  { name: 'DJI Osmo Pocket 4',  img: asset('/images/tools/OsmoPocket4-4.png'),                      w: 130 },
  { name: 'iPhone',              img: asset('/images/tools/iphone.png'),                             w: 110 },
  { name: 'MacBook Air',         img: asset('/images/tools/macbook-air-2025-skyblue-1-800x800.png'), w: 180 },
  { name: 'CapCut',              img: asset('/images/tools/capcut-logo.webp'),                       w: 130, labelGap: 2 },
  { name: 'Canva',               img: asset('/images/tools/canva-logo.png'),                         w: 190, radius: '25%' },
]

const BOX_H  = 380
const MAX_SPD = 1.4

// Varied velocities — no two tools moving in exactly the same direction
const VELOCITIES = [
  { vx:  1.1, vy:  0.8 },
  { vx: -0.9, vy:  1.2 },
  { vx:  1.0, vy: -0.7 },
  { vx: -1.0, vy:  1.0 },
  { vx:  0.8, vy: -1.3 },
  { vx:  1.2, vy:  0.9 },
  { vx: -1.1, vy: -1.0 },
]

export default function Toolbox() {
  const containerRef = useRef(null)
  const itemRefs     = useRef([])
  const heightsRef   = useRef(new Array(tools.length).fill(140))
  const maxZRef      = useRef(tools.length)
  const rafRef       = useRef(null)
  const dragRef      = useRef(null)
  // positions are initialised in useEffect once we know container width
  const physRef      = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const W = container.offsetWidth

    // Spread tools across two rows, guaranteed in-bounds for any container width
    const rowY = [20, 220]
    const xSlots = [
      [0.04, 0.22, 0.42, 0.62, 0.80],  // top row  (5 tools)
      [0.10, 0.55],                      // bottom row (2 tools)
    ]
    const order = [0, 1, 2, 3, 4, 5, 6]
    physRef.current = order.map((ti, idx) => {
      const row   = idx < 5 ? 0 : 1
      const col   = idx < 5 ? idx : idx - 5
      const xPct  = xSlots[row][col]
      const x     = Math.min(xPct * W, W - tools[ti].w - 2)
      return { x, y: rowY[row], ...VELOCITIES[ti], dragging: false }
    })

    // Also set initial DOM positions
    physRef.current.forEach((s, i) => {
      const el = itemRefs.current[i]
      if (el) { el.style.left = `${s.x}px`; el.style.top = `${s.y}px` }
    })

    const tick = () => {
      const CW = container.offsetWidth
      const n  = tools.length

      // Update cached heights
      itemRefs.current.forEach((el, i) => {
        if (el && el.offsetHeight > 0) heightsRef.current[i] = el.offsetHeight
      })

      // 1. Move non-dragging tools
      physRef.current.forEach((s) => {
        if (s.dragging) return
        s.x += s.vx
        s.y += s.vy
      })

      // 2. Wall bounce
      physRef.current.forEach((s, i) => {
        if (s.dragging) return
        const tw = tools[i].w
        const th = heightsRef.current[i]
        if (s.x < 0)              { s.x = 0;          s.vx =  Math.abs(s.vx) }
        if (s.x + tw > CW)        { s.x = CW - tw;    s.vx = -Math.abs(s.vx) }
        if (s.y < 0)              { s.y = 0;          s.vy =  Math.abs(s.vy) }
        if (s.y + th > BOX_H)     { s.y = BOX_H - th; s.vy = -Math.abs(s.vy) }
      })

      // 3. Tool-tool collision — 3 passes to resolve cascading overlaps
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < n; i++) {
          if (physRef.current[i].dragging) continue
          for (let j = i + 1; j < n; j++) {
            if (physRef.current[j].dragging) continue

            const a  = physRef.current[i]
            const b  = physRef.current[j]
            const aw = tools[i].w,  ah = heightsRef.current[i]
            const bw = tools[j].w,  bh = heightsRef.current[j]

            const ox = Math.min(a.x + aw, b.x + bw) - Math.max(a.x, b.x)
            const oy = Math.min(a.y + ah, b.y + bh) - Math.max(a.y, b.y)

            if (ox <= 0 || oy <= 0) continue  // no overlap

            // Separate along minimum-overlap axis, then reflect only if approaching
            if (ox < oy) {
              const push = ox / 2 + 2
              if (a.x < b.x) {
                a.x -= push; b.x += push
                if (a.vx > 0) a.vx = -a.vx   // a moving right toward b → flip
                if (b.vx < 0) b.vx = -b.vx   // b moving left toward a → flip
              } else {
                a.x += push; b.x -= push
                if (a.vx < 0) a.vx = -a.vx
                if (b.vx > 0) b.vx = -b.vx
              }
            } else {
              const push = oy / 2 + 2
              if (a.y < b.y) {
                a.y -= push; b.y += push
                if (a.vy > 0) a.vy = -a.vy
                if (b.vy < 0) b.vy = -b.vy
              } else {
                a.y += push; b.y -= push
                if (a.vy < 0) a.vy = -a.vy
                if (b.vy > 0) b.vy = -b.vy
              }
            }

            // Clamp speed so collisions don't accelerate tools
            for (const s of [a, b]) {
              s.vx = Math.max(-MAX_SPD, Math.min(MAX_SPD, s.vx))
              s.vy = Math.max(-MAX_SPD, Math.min(MAX_SPD, s.vy))
            }
          }
        }
      }

      // 4. Write to DOM
      physRef.current.forEach((s, i) => {
        const el = itemRefs.current[i]
        if (el) { el.style.left = `${s.x}px`; el.style.top = `${s.y}px` }
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMouseDown = useCallback((e, idx) => {
    e.preventDefault()
    if (!physRef.current) return
    const s = physRef.current[idx]
    s.dragging = true
    dragRef.current = {
      index:   idx,
      startMx: e.clientX,
      startMy: e.clientY,
      startPx: s.x,
      startPy: s.y,
    }
    const el = itemRefs.current[idx]
    if (el) el.style.zIndex = ++maxZRef.current
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current || !physRef.current) return
    const { index, startMx, startMy, startPx, startPy } = dragRef.current
    const container = containerRef.current
    if (!container) return

    const CW   = container.offsetWidth
    const tw   = tools[index].w
    const th   = heightsRef.current[index]
    const newX = Math.max(0, Math.min(CW - tw,      startPx + (e.clientX - startMx)))
    const newY = Math.max(0, Math.min(BOX_H - th,   startPy + (e.clientY - startMy)))

    const s = physRef.current[index]
    s.x = newX; s.y = newY
    const el = itemRefs.current[index]
    if (el) { el.style.left = `${newX}px`; el.style.top = `${newY}px` }
  }, [])

  const onRelease = useCallback(() => {
    if (!dragRef.current || !physRef.current) return
    const { index } = dragRef.current
    const s = physRef.current[index]
    s.dragging = false
    const speed = 0.8 + Math.random() * 0.5
    s.vx = (Math.random() > 0.5 ? 1 : -1) * speed
    s.vy = (Math.random() > 0.5 ? 1 : -1) * speed
    dragRef.current = null
  }, [])

  return (
    <section className="bg-white">
      <div className="container-page py-24 md:py-28">
        <div className="max-w-2xl mb-12">
          <Reveal>
            <h2 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
              Tools I keep <span className="italic">coming back to</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-body-lg text-on-surface/55">
              A few of the cameras, apps and tools I use to create, plan, edit and build.
            </p>
          </Reveal>
        </div>

        {/* Bouncing canvas */}
        <div
          ref={containerRef}
          className="relative w-full rounded-3xl overflow-hidden select-none"
          style={{ height: BOX_H, background: '#F5F0EA', cursor: 'default' }}
          onMouseMove={onMouseMove}
          onMouseUp={onRelease}
          onMouseLeave={onRelease}
        >
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              ref={el => { itemRefs.current[i] = el }}
              style={{
                position:   'absolute',
                left:       0,
                top:        0,
                zIndex:     i + 1,
                width:      tool.w,
                cursor:     'grab',
                userSelect: 'none',
              }}
              onMouseDown={(e) => onMouseDown(e, i)}
            >
              <img
                src={tool.img}
                alt={tool.name}
                draggable={false}
                style={{
                  width:         '100%',
                  height:        'auto',
                  display:       'block',
                  pointerEvents: 'none',
                  borderRadius:  tool.radius ?? 0,
                }}
              />
              <p
                style={{
                  marginTop:     tool.labelGap ?? 6,
                  fontSize:      11.5,
                  textAlign:     'center',
                  color:         'rgba(0,0,0,0.5)',
                  letterSpacing: '0.02em',
                  pointerEvents: 'none',
                }}
              >
                {tool.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
