import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { asset } from '../utils/asset.js'

export default function HeroVideo() {
  const { pathname } = useLocation()
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0, opacity: pathname === '/' ? 1 : 0 }}
      aria-hidden
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={asset('/videos/hero.mp4')}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  )
}
