import { useState, useRef, useCallback } from 'react'
import Reveal from '../Reveal.jsx'
import { asset } from '../../utils/asset.js'

const tools = [
  { name: 'Canon G7X Mark III',   img: asset('/images/tools/6536C026AA.png'),                   w: 150 },
  { name: 'DJI Mini Drone',        img: asset('/images/tools/Drone.png'),                        w: 170 },
  { name: 'DJI Osmo Pocket 4',    img: asset('/images/tools/OsmoPocket4-4.png'),                 w: 130 },
  { name: 'iPhone',               img: asset('/images/tools/iphone.png'),                        w: 110 },
  { name: 'MacBook Air',          img: asset('/images/tools/macbook-air-2025-skyblue-1-800x800.png'), w: 180 },
]

// Spread tools across the banner initially
const INITIAL = [
  { x: 40,  y: 40  },
  { x: 240, y: 30  },
  { x: 450, y: 50  },
  { x: 660, y: 28  },
  { x: 870, y: 40  },
]

export default function Toolbox() {
  const [positions, setPositions] = useState(INITIAL)
  const [zOrders, setZOrders]   = useState(tools.map((_, i) => i + 1))
  const dragging = useRef(null) // { index, startMx, startMy, startPx, startPy }
  const containerRef = useRef(null)

  const bringToFront = useCallback((idx) => {
    setZOrders(prev => {
      const max = Math.max(...prev)
      const next = [...prev]
      next[idx] = max + 1
      return next
    })
  }, [])

  const onMouseDown = useCallback((e, idx) => {
    e.preventDefault()
    bringToFront(idx)
    dragging.current = {
      index: idx,
      startMx: e.clientX,
      startMy: e.clientY,
      startPx: positions[idx].x,
      startPy: positions[idx].y,
    }
  }, [positions, bringToFront])

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return
    const { index, startMx, startMy, startPx, startPy } = dragging.current
    const container = containerRef.current
    if (!container) return

    const bounds = container.getBoundingClientRect()
    const toolW = tools[index].w
    const newX = Math.max(0, Math.min(bounds.width  - toolW - 8, startPx + (e.clientX - startMx)))
    const newY = Math.max(0, Math.min(bounds.height - 140,       startPy + (e.clientY - startMy)))

    setPositions(prev => {
      const next = [...prev]
      next[index] = { x: newX, y: newY }
      return next
    })
  }, [])

  const onMouseUp = useCallback(() => {
    dragging.current = null
  }, [])

  return (
    <section className="bg-surface-lowest">
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

        {/* Drag canvas */}
        <div
          ref={containerRef}
          className="relative w-full rounded-3xl overflow-hidden select-none"
          style={{
            height: 380,
            background: '#F5F0EA',
            cursor: dragging.current ? 'grabbing' : 'default',
          }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              style={{
                position: 'absolute',
                left: positions[i].x,
                top:  positions[i].y,
                zIndex: zOrders[i],
                width: tool.w,
                cursor: 'grab',
                userSelect: 'none',
              }}
              onMouseDown={(e) => onMouseDown(e, i)}
            >
              {/* Image with multiply blend to strip white bg */}
              <img
                src={tool.img}
                alt={tool.name}
                draggable={false}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
              {/* Label */}
              <p
                style={{
                  marginTop: 6,
                  fontSize: 11.5,
                  textAlign: 'center',
                  color: 'rgba(0,0,0,0.5)',
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
