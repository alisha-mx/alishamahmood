import { useEffect, useRef } from 'react'
import Reveal from './Reveal.jsx'
import { asset } from '../utils/asset.js'

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
    tryPlay()
    v.addEventListener('loadeddata', tryPlay)
    v.addEventListener('canplay', tryPlay)
    return () => {
      v.removeEventListener('loadeddata', tryPlay)
      v.removeEventListener('canplay', tryPlay)
    }
  }, [])

  return (
    <section className="relative h-screen min-h-[620px] overflow-hidden bg-espresso-dark">
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={asset('/videos/hero.mp4')}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/25 to-black/20" />

      {/* Name across the hero */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <Reveal
          as="h1"
          className="whitespace-nowrap text-center font-brand font-extrabold leading-none tracking-[-0.03em] text-white text-[clamp(2rem,10.5vw,12rem)]"
        >
          Alisha Mahmood
        </Reveal>
        <Reveal
          as="p"
          delay={0.12}
          className="mt-6 text-center text-label-caps uppercase tracking-[0.3em] text-buttermilk"
        >
          Welcome to my digital diary
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/55">
          Scroll
        </span>
        <div className="relative h-14 w-px overflow-hidden bg-white/20">
          <div className="scroll-line absolute left-0 top-0 h-1/2 w-full bg-white/75" />
        </div>
      </div>
    </section>
  )
}
