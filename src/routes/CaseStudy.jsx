import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { projects } from '../data/portfolioProjects.js'
import { asset } from '../utils/asset.js'

function HeroVideo({ src, startTime = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    let seekedOnce = false

    const play = () => { v.muted = true; v.play().catch(() => {}) }

    // Once playing, jump to startTime (only on first play after mount)
    const onPlaying = () => {
      if (startTime > 0 && !seekedOnce) {
        seekedOnce = true
        v.currentTime = startTime
      }
    }

    const onCanPlay = () => play()

    const onVisible = () => {
      if (document.visibilityState === 'visible') play()
    }

    v.addEventListener('playing', onPlaying)
    v.addEventListener('canplay', onCanPlay)
    document.addEventListener('visibilitychange', onVisible)

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) play() },
      { threshold: 0.1 }
    )
    observer.observe(v)

    v.muted = true
    play()

    return () => {
      v.removeEventListener('playing', onPlaying)
      v.removeEventListener('canplay', onCanPlay)
      document.removeEventListener('visibilitychange', onVisible)
      observer.disconnect()
    }
  }, [src, startTime])

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="h-full w-full object-cover"
    />
  )
}

function CarouselMedia({ item, active }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  // Play as soon as the card mounts (side or center), stop on unmount
  useEffect(() => {
    const v = ref.current
    if (!v || item.type !== 'video') return
    v.muted = true
    v.play().catch(() => {})
    return () => { v.pause() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // When navigating away from center, reset to muted
  useEffect(() => {
    if (active || item.type !== 'video') return
    const v = ref.current
    if (!v) return
    v.muted = true
    setMuted(true)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMute = (e) => {
    e.stopPropagation()
    const v = ref.current
    if (!v) return
    const next = !muted
    v.muted = next
    setMuted(next)
  }

  if (item.type === 'video') {
    const paddingBottom = item.landscape ? '56.25%' : '177.78%'
    return (
      <div style={{ position: 'relative', paddingBottom }}>
        <video
          ref={ref}
          src={asset(item.src)}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {active && (
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            style={{ position: 'absolute', bottom: '12px', right: '12px', zIndex: 10 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
          >
            {muted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>
        )}
      </div>
    )
  }
  return (
    <img
      src={asset(item.src)}
      alt={item.alt}
      loading="lazy"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  )
}

function WorkCarousel({ items }) {
  const [idx, setIdx] = useState(0)
  const total = items.length

  const CARD_W = 240
  const LANDSCAPE_CARD_W = 400
  const SIDE_SCALE = 0.85
  const GAP = 16
  const centerCardW = items[idx]?.landscape ? LANDSCAPE_CARD_W : CARD_W

  const getPos = (i) => {
    let p = ((i - idx) % total + total) % total
    if (p > total / 2) p -= total
    return p
  }

  return (
    <div className="select-none">
      {/* Carousel viewport — clips side cards so only a sliver peeks in */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{ maxWidth: '490px', minHeight: `${Math.round(CARD_W * 16 / 9)}px` }}
      >
        {/* Ombre fades on each edge */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-20 bg-gradient-to-l from-background to-transparent" />

        {items.map((item, i) => {
          const pos = getPos(i)
          if (Math.abs(pos) > 1) return null
          const isCenter = pos === 0
          const cardW = item.landscape ? LANDSCAPE_CARD_W : CARD_W
          const sideOffset = Math.round(centerCardW / 2 + cardW / 2 + GAP)
          return (
            <div
              key={i}
              className="absolute transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                width: `${cardW}px`,
                left: `calc(50% - ${cardW / 2}px)`,
                top: '50%',
                transform: `translateY(-50%) translateX(${pos * sideOffset}px) scale(${isCenter ? 1 : SIDE_SCALE})`,
                opacity: isCenter ? 1 : 0.5,
                zIndex: isCenter ? 10 : 5,
              }}
            >
              <div className="rounded-3xl overflow-hidden shadow-accent">
                <CarouselMedia item={item} active={isCenter} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Arrows + counter */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => setIdx((v) => (v - 1 + total) % total)}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant bg-surface-lowest text-on-surface transition-all duration-300 hover:border-outline hover:bg-surface-container"
        >
          ←
        </button>
        <span className="min-w-[3rem] text-center text-label-caps uppercase tracking-widest text-taupe">
          {idx + 1} / {total}
        </span>
        <button
          onClick={() => setIdx((v) => (v + 1) % total)}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant bg-surface-lowest text-on-surface transition-all duration-300 hover:border-outline hover:bg-surface-container"
        >
          →
        </button>
      </div>
    </div>
  )
}

function WebsitePreview({ url, title }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(0.5)

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1200)
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const containerH = 420
  const iframeH = Math.round(containerH / scale)

  return (
    <div className="flex-1 min-w-0">
      {/* Browser chrome */}
      <div className="rounded-t-xl border border-b-0 border-outline-variant bg-surface-lowest px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5 flex-shrink-0">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 rounded-md bg-surface-container px-3 py-1 text-xs text-taupe truncate">
          {url.replace('https://', '')}
        </div>
      </div>
      {/* Scaled iframe */}
      <div
        ref={containerRef}
        className="rounded-b-xl border border-outline-variant overflow-hidden"
        style={{ height: containerH }}
      >
        <iframe
          src={url}
          title={title}
          style={{
            width: '1200px',
            height: `${iframeH}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}

const SOCIAL_ICONS = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.53V7.16a4.85 4.85 0 0 1-1-.47z"/>
    </svg>
  ),
}

const TYPE_STYLES = {
  professional: 'bg-on-surface/90 text-white',
  freelance: 'bg-white text-on-surface border border-on-surface',
  personal: 'bg-white/90 text-taupe border border-taupe/40',
  web: 'bg-buttermilk text-on-surface',
}

function Stat({ metric, label, note }) {
  return (
    <div className="pt-2">
      <p className="font-display text-4xl md:text-5xl italic text-on-surface leading-none">
        {metric}
      </p>
      <p className="mt-2 text-label-caps uppercase tracking-widest text-taupe">
        {label}
      </p>
      {note && (
        <p className="mt-1 text-xs text-taupe/70 italic">{note}</p>
      )}
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const nextProject = project ? projects.find((p) => p.slug === project.nextSlug) : null
  const prevProject = project ? projects.find((p) => p.nextSlug === project.slug) : null

  if (!project) return <Navigate to="/portfolio" replace />

  return (
    <article className="bg-background min-h-screen">

      {/* Hero image / video */}
      <div className="relative h-[55vh] md:h-[70vh] w-full overflow-hidden">
        {project.heroVideo ? (
          <HeroVideo src={project.heroVideo} startTime={project.heroVideoStartTime ?? 0} />
        ) : (
          <img
            src={project.heroImage ?? project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="card-grain absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back link */}
        <div className="absolute left-6 top-28 md:left-16 z-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 text-label-caps uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/25"
          >
            ← Portfolio
          </Link>
        </div>

        {/* Project headline over hero */}
        <div className="absolute inset-x-0 bottom-0 z-10 container-page pb-10 md:pb-14">
          <span className={`rounded-full px-3 py-1.5 text-label-caps uppercase tracking-widest ${TYPE_STYLES[project.type]}`}>
            {project.typeLabel}
          </span>
          <h1 className="mt-4 font-display text-display-lg-mobile md:text-display-lg text-white leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-surface-lowest border-b border-outline-variant">
        <div className="container-page py-6">
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-label-caps uppercase tracking-widest text-taupe mb-1">Organisation</p>
              <p className="text-on-surface font-medium">{project.organisation}</p>
            </div>
            <div>
              <p className="text-label-caps uppercase tracking-widest text-taupe mb-1">Role</p>
              <p className="text-on-surface font-medium">{project.role}</p>
            </div>
            <div>
              <p className="text-label-caps uppercase tracking-widest text-taupe mb-1">Year</p>
              <p className="text-on-surface font-medium">{project.year}</p>
            </div>
            {project.website && (
              <div>
                <p className="text-label-caps uppercase tracking-widest text-taupe mb-1">Website</p>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-surface font-medium underline underline-offset-2 hover:opacity-60 transition-opacity duration-200"
                >
                  {project.website.replace('https://', '')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-page py-16 md:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

          {/* Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
            <nav className="space-y-2">
              {[
                { label: 'Overview', id: 'overview' },
                ...(project.objective ? [{ label: 'Objective', id: 'objective' }] : []),
                project.type === 'web'
                  ? { label: 'Design Focus', id: 'my-role' }
                  : { label: 'My Role', id: 'my-role' },
                ...(project.type !== 'web' ? [{ label: 'The Approach', id: 'approach' }] : []),
                project.type === 'web'
                  ? { label: 'Visit Page', id: 'results' }
                  : { label: 'Results', id: 'results' },
                ...(project.reflection ? [{ label: 'Reflection', id: 'reflection' }] : []),
                ...(project.selectedWorkNote || project.carouselItems?.length > 0 ? [{ label: 'Selected Work', id: 'selected-work' }] : []),
              ].map(({ label, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block text-sm text-taupe transition-colors duration-200 hover:text-on-surface"
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-9 space-y-16">

            {/* Overview */}
            <Reveal>
              <section id="overview">
                <h2 className="font-display text-headline-md italic text-on-surface mb-4">Overview</h2>
                <p className="text-body-lg text-on-surface/70 leading-relaxed max-w-2xl">
                  {project.overview}
                </p>
              </section>
            </Reveal>

            {/* Objective — optional */}
            {project.objective && (
              <>
                <div className="h-px bg-outline-variant" />
                <Reveal>
                  <section id="objective">
                    <h2 className="font-display text-headline-md italic text-on-surface mb-4">The Objective</h2>
                    <p className="text-body-lg text-on-surface/70 leading-relaxed max-w-2xl">
                      {project.objective}
                    </p>
                  </section>
                </Reveal>
              </>
            )}

            <div className="h-px bg-outline-variant" />

            {/* My Role / Design Focus */}
            <Reveal>
              <section id="my-role">
                <h2 className="font-display text-headline-md italic text-on-surface mb-6">
                  {project.type === 'web' ? 'Design Focus' : 'My Role'}
                </h2>
                <p className="mb-5 text-body-md text-on-surface/60">
                  {project.type === 'web' ? 'The project covered:' : 'My work includes:'}
                </p>
                <ul className="space-y-3">
                  {project.responsibilities.map((r) => (
                    <li key={r} className="flex items-center gap-3 text-body-md text-on-surface/75">
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-taupe" />
                      {r}
                    </li>
                  ))}
                </ul>
                {project.type === 'web' && project.approach && (
                  <p className="mt-8 text-body-lg text-on-surface/70 leading-relaxed max-w-2xl">
                    {project.approach}
                  </p>
                )}
                {project.type === 'web' && project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-on-surface font-medium hover:opacity-60 transition-opacity duration-300"
                  >
                    View Website →
                  </a>
                )}
              </section>
            </Reveal>

            {project.type !== 'web' && (
              <>
                <div className="h-px bg-outline-variant" />

                {/* Approach */}
                <Reveal>
                  <section id="approach">
                    <h2 className="font-display text-headline-md italic text-on-surface mb-4">The Approach</h2>
                    <p className="text-body-lg text-on-surface/70 leading-relaxed max-w-2xl">
                      {project.approach}
                    </p>
                  </section>
                </Reveal>
              </>
            )}

            <div className="h-px bg-outline-variant" />

            {/* Results / Visit Page */}
            <Reveal>
              <section id="results">
                {project.type === 'web' ? (
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
                    {/* Left: heading + CTA */}
                    <div className="flex-shrink-0">
                      <h2 className="font-display text-headline-md italic text-on-surface mb-4">Visit Page</h2>
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-primary inline-flex"
                        >
                          View Website →
                        </a>
                      )}
                    </div>

                    {/* Right: mini browser mockup */}
                    {project.website && (
                      <WebsitePreview url={project.website} title={`${project.title} website preview`} />
                    )}
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-headline-md italic text-on-surface mb-2">Results</h2>
                    {project.resultsSubtitle && (
                      <p className="text-body-md text-taupe italic mb-8">{project.resultsSubtitle}</p>
                    )}
                    <div className="grid grid-cols-4 gap-6">
                      {project.keyResults.map((r) => (
                        <Stat
                          key={r.label}
                          metric={r.metric}
                          label={r.label}
                          note={r.metric.includes('[') ? 'Placeholder — replace with actual figure' : null}
                        />
                      ))}
                    </div>
                  </>
                )}
                {project.keyResults.some((r) => r.metric.includes('[')) && (
                  <p className="mt-8 text-sm text-taupe/70 italic">
                    * Placeholder metrics. Results to be added when figures are available.
                  </p>
                )}
              </section>
            </Reveal>

            {/* Reflection — optional */}
            {project.reflection && (
              <>
                <div className="h-px bg-outline-variant" />
                <Reveal>
                  <section id="reflection">
                    <h2 className="font-display text-headline-md italic text-on-surface mb-4">Reflection</h2>
                    <p className="text-body-lg text-on-surface/70 leading-relaxed max-w-2xl">
                      {project.reflection}
                    </p>
                  </section>
                </Reveal>
              </>
            )}

            {/* Selected Work — optional, with carousel */}
            {(project.selectedWorkNote || project.carouselItems?.length > 0) && (
              <>
                <div className="h-px bg-outline-variant" />
                <Reveal>
                  <section id="selected-work">
                    <h2 className="font-display text-headline-md italic text-on-surface mb-4">Selected Work</h2>
                    {project.selectedWorkNote && (
                      <p className="text-body-lg text-on-surface/70 leading-relaxed max-w-2xl mb-10">
                        {project.selectedWorkNote}
                      </p>
                    )}
                    {project.carouselItems?.length > 0 && (
                      <div className="mt-6">
                        <WorkCarousel items={project.carouselItems} />
                      </div>
                    )}
                    {project.social && (
                      <div className="mt-8 flex justify-center">
                        <a
                          href={project.social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2.5 rounded-full border border-outline-variant bg-surface-lowest px-5 py-2.5 text-label-caps uppercase tracking-widest text-on-surface transition-all duration-300 hover:border-outline hover:shadow-soft"
                        >
                          {SOCIAL_ICONS[project.social.platform]}
                          See More
                        </a>
                      </div>
                    )}
                  </section>
                </Reveal>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Next project */}
      {nextProject && (
        <div className="bg-surface-lowest border-t border-outline-variant">
          <div className="container-page py-12 md:py-16">
            <p className="text-label-caps uppercase tracking-widest text-taupe mb-4">Next Project</p>
            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="group flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <span className={`rounded-full px-3 py-1 text-label-caps uppercase tracking-widest ${TYPE_STYLES[nextProject.type]}`}>
                  {nextProject.typeLabel}
                </span>
                <h3 className="mt-3 font-display text-headline-md md:text-display-lg-mobile text-on-surface group-hover:opacity-70 transition-opacity duration-300">
                  {nextProject.title}
                </h3>
              </div>
              <div className="relative h-28 w-44 flex-shrink-0 overflow-hidden rounded-2xl md:h-32 md:w-52">
                <img
                  src={nextProject.thumbnail}
                  alt={nextProject.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>
        </div>
      )}

    </article>
  )
}
