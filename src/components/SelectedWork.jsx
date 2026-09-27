import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gallery } from '../data/projects.js'
import Reveal from './Reveal.jsx'

function AutoPlayVideo({ src, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    // React doesn't reliably set the muted DOM property via JSX — set it imperatively
    v.muted = true
    v.play().catch(() => {})

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.muted = true
            v.play().catch(() => {})
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onLoadedMetadata={(e) => { e.target.muted = true; e.target.play().catch(() => {}) }}
      onCanPlay={(e) => { e.target.muted = true; e.target.play().catch(() => {}) }}
      className={className}
    />
  )
}

export default function SelectedWork() {
  return (
    <section id="work" className="bg-surface-lowest py-24 md:py-32">
      <div className="container-page">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left: sticky heading */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal
              as="h2"
              className="font-display text-display-lg-mobile md:text-display-lg text-on-surface"
            >
              My <span className="italic">Studio.</span>
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-6 max-w-sm text-body-lg text-on-surface">
              A living scrapbook of recent projects, content and photos that caught my eye.
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <Link to="/portfolio" className="btn-outline">
                View Full Portfolio
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Right: Pinterest masonry */}
        <div className="lg:col-span-7">
          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5">
            {gallery.map((g, i) => (
              <Reveal
                key={g.src}
                delay={(i % 5) * 0.04}
                className="mb-3 break-inside-avoid"
              >
                <div className="group overflow-hidden rounded-xl shadow-soft">
                  {g.type === 'video' ? (
                    <AutoPlayVideo
                      src={g.src}
                      className="pointer-events-none block h-auto w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                    />
                  ) : (
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className="block h-auto w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
