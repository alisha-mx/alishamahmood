import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import Reveal from './Reveal.jsx'
import { asset } from '../utils/asset.js'

const places = [
  { name: 'Sharm El Sheikh', lat: 27.9158, lng: 34.3300, img: asset('/images/places/sharm.jpeg') },
  { name: 'Cairo',           lat: 30.0444, lng: 31.2357, img: asset('/images/places/cairo.jpeg') },
  { name: 'Budapest',        lat: 47.4979, lng: 19.0402, img: asset('/images/places/budapest.jpeg') },
  { name: 'Brussels',        lat: 50.8503, lng:  4.3517, img: asset('/images/places/brussels.jpeg') },
  { name: 'Limoges',         lat: 45.8336, lng:  1.2611, img: asset('/images/places/limoges.jpeg') },
  { name: 'Bordeaux',        lat: 44.8378, lng: -0.5792, img: asset('/images/places/bordeaux.jpeg') },
  { name: 'Amsterdam',       lat: 52.3676, lng:  4.9041, img: asset('/images/places/amsterdam.jpeg') },
  { name: 'Antalya',         lat: 36.8969, lng: 30.7133, img: asset('/images/places/antalya.jpeg') },
  { name: 'Rhodes',          lat: 36.4341, lng: 28.2176, img: asset('/images/places/rhodes.jpeg') },
  { name: 'Corfu',           lat: 39.6243, lng: 19.9217, img: asset('/images/places/corfu.jpeg') },
  { name: 'Istanbul',        lat: 41.0082, lng: 28.9784, img: asset('/images/places/istanbul.jpeg') },
  { name: 'Verona',          lat: 45.4384, lng: 10.9916, img: asset('/images/places/verona.jpeg') },
  { name: 'Venice',          lat: 45.4408, lng: 12.3155, img: asset('/images/places/venice.jpeg') },
  { name: 'Milan',           lat: 45.4654, lng:  9.1859, img: asset('/images/places/milan.jpeg') },
  { name: 'Lake Garda',      lat: 45.6389, lng: 10.6680, img: asset('/images/places/lake-garda.jpeg') },
  { name: 'Tunisia',         lat: 36.8188, lng: 10.1658, img: asset('/images/places/tunisia.jpeg') },
  { name: 'Dubrovnik',       lat: 42.6507, lng: 18.0944, img: asset('/images/places/dubrovnik.jpeg') },
  { name: 'Rome',            lat: 41.9028, lng: 12.4964, img: asset('/images/places/rome.jpeg') },
]

const RINGS = places.map((p, i) => ({
  lat: p.lat, lng: p.lng,
  maxR: 4.5,
  propagationSpeed: 0.9,
  repeatPeriod: 1400 + i * 70,
}))

const CARD_W = 176  // px — used to flip card left when near right edge

export default function GlobeSection() {
  const globeEl      = useRef(null)
  const containerRef = useRef(null)
  const rotateTimer  = useRef(null)

  const [Globe,        setGlobe]        = useState(null)
  const [lands,        setLands]        = useState([])
  const [dims,         setDims]         = useState({ w: 500, h: 420 })
  const [hovered,      setHovered]      = useState(null)
  const [mousePos,     setMousePos]     = useState({ x: 0, y: 0 })
  const [failedImgs,   setFailedImgs]   = useState(() => new Set())
  const [hasInteracted, setHasInteracted] = useState(false)

  const oceanMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color:             new THREE.Color('#A8D8EA'),
    emissive:          new THREE.Color('#4AACCF'),
    emissiveIntensity: 0.3,
    shininess:         55,
  }), [])

  useEffect(() => {
    import('react-globe.gl').then((mod) => setGlobe(() => mod.default))
  }, [])

  useEffect(() => {
    fetch('/data/world.geojson')
      .then((r) => r.json())
      .then((data) => setLands(data.features))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      setDims({ w, h: Math.min(Math.round(w * 0.85), 420) })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Preload all place images so hover cards appear instantly
  useEffect(() => {
    places.forEach(p => {
      if (p.img) { const i = new Image(); i.src = p.img }
    })
  }, [])

const onGlobeReady = useCallback(() => {
    const g = globeEl.current
    if (!g) return
    const ctrl = g.controls()
    ctrl.autoRotate      = true
    ctrl.autoRotateSpeed = 0.5
    ctrl.enableDamping   = true
    ctrl.dampingFactor   = 0.08
    // On touch devices enable zoom always (pinch-to-zoom); desktop trackMouse controls it
    ctrl.enableZoom      = 'ontouchstart' in window
    g.pointOfView({ lat: 38, lng: 18, altitude: 2.0 }, 1200)
  }, [])

  const handleMouseEnter = useCallback(() => {
    clearTimeout(rotateTimer.current)
    const ctrl = globeEl.current?.controls()
    if (ctrl) ctrl.autoRotate = false
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(null)
    const g = globeEl.current
    if (!g) return
    const ctrl = g.controls()
    if (ctrl) { ctrl.autoRotate = true; ctrl.enableZoom = false }
    const pov = g.pointOfView()
    g.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: 2.0 }, 800)
  }, [])

  const handleDragStart = useCallback(() => {
    setHasInteracted(true)
    const ctrl = globeEl.current?.controls()
    if (ctrl) ctrl.autoRotate = false
  }, [])

  const handleDragEnd = useCallback(() => {
    // autoRotate re-enabled by handleMouseLeave when the cursor leaves the globe
  }, [])

  const trackMouse = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    const cx = rect.width / 2
    const cy = rect.height / 2
    const r  = rect.height / 2
    const inside = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= r
    const ctrl = globeEl.current?.controls()
    if (ctrl) ctrl.enableZoom = inside
  }, [])

  // Position the card: right of cursor normally, flip left near the right edge
  const cardLeft = mousePos.x + 20 + CARD_W > dims.w
    ? mousePos.x - CARD_W - 20
    : mousePos.x + 20
  // Keep card top within the container height (card height ~180px)
  const cardTop = Math.max(8, Math.min(mousePos.y - 90, dims.h - 188))

  return (
    <section id="globe" className="bg-surface-lowest py-14 md:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">

          {/* Left: heading */}
          <div className="lg:col-span-4">
            <Reveal as="h2" className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
              Places I've <span className="italic">Explored.</span>
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-5 text-body-lg text-on-surface/55">
              {places.length} destinations and counting. Drag to spin and explore some of the moments I've captured along the way!
            </Reveal>
          </div>

          {/* Right: globe + hover card (both relative to this column) */}
          <div className="relative lg:col-span-8">
            {/* Globe */}
            <div
              ref={containerRef}
              className="relative w-full overflow-hidden"
              style={{ height: `${dims.h}px`, cursor: 'grab', touchAction: 'none' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={trackMouse}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleMouseLeave}
            >
              {Globe ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <Globe
                    ref={globeEl}
                    width={dims.w}
                    height={dims.h}
                    backgroundColor="rgba(0,0,0,0)"
                    globeMaterial={oceanMaterial}
                    atmosphereColor="#C5E6F5"
                    atmosphereAltitude={0.12}
                    polygonsData={lands}
                    polygonCapColor={() => '#88C07A'}
                    polygonSideColor={() => '#76A868'}
                    polygonStrokeColor={() => 'rgba(255,255,255,0.4)'}
                    polygonAltitude={0.006}
                    pointsData={places}
                    pointLat="lat"
                    pointLng="lng"
                    pointColor={() => '#ffffff'}
                    pointRadius={0.52}
                    pointAltitude={0.06}
                    pointResolution={12}
                    pointLabel=""
                    ringsData={RINGS}
                    ringColor={() => (t) => `rgba(255,255,255,${Math.sqrt(1 - t) * 1.0})`}
                    ringMaxRadius="maxR"
                    ringPropagationSpeed="propagationSpeed"
                    ringRepeatPeriod="repeatPeriod"
                    onPointHover={setHovered}
                    onGlobeReady={onGlobeReady}
                  />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-surface/20" />
                </div>
              )}

            </div>

            {/* Interact badge — outside overflow:hidden so the canvas can't cover it */}
            <AnimatePresence>
              {!hasInteracted && Globe && (
                <motion.div
                  className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: [0, -5, 0] }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                >
                  <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-soft backdrop-blur-sm border-2 border-buttermilk">
                    <span className="text-base">✋</span>
                    <span className="font-display text-sm italic text-on-surface">drag me!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover card — outside overflow:hidden so it's never clipped */}
            {hovered && (
              <div
                className="pointer-events-none absolute z-30"
                style={{ left: cardLeft, top: cardTop, width: CARD_W }}
              >
                <div className="overflow-hidden rounded-2xl bg-white shadow-accent">
                  {/* Image */}
                  <div className="relative h-28 w-full overflow-hidden bg-surface-container">
                    {hovered.img && !failedImgs.has(hovered.name) ? (
                      <img
                        src={hovered.img}
                        alt={hovered.name}
                        onError={() => setFailedImgs(prev => new Set([...prev, hovered.name]))}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-surface-container-high">
                        <span className="font-display text-xs italic text-taupe">No photo yet</span>
                      </div>
                    )}
                  </div>
                  {/* Title */}
                  <div className="px-3 py-2.5">
                    <p className="font-display text-sm italic leading-tight text-on-surface">
                      {hovered.name}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
