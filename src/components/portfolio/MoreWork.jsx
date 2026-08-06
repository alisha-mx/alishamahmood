import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../Reveal.jsx'
import { asset } from '../../utils/asset.js'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Professional Work', value: 'professional' },
  { label: 'Content Creation', value: 'content' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Web Design', value: 'web' },
]

const TYPE_STYLES = {
  professional: 'bg-on-surface/90 text-white',
  freelance: 'bg-white text-on-surface border border-on-surface',
  personal: 'bg-white/90 text-taupe border border-taupe/40',
  web: 'bg-buttermilk text-on-surface',
}

const PROJECTS = {
  professional: [
    {
      title: 'Cambridge Half Marathon',
      type: 'professional',
      typeLabel: 'Professional Work',
      categories: ['Campaign Marketing', 'Social Media', 'Content'],
      shortDescription:
        'Marketing support across social media, content creation, launch activity, website updates, partner campaigns, paid ad assets and performance reporting.',
      year: '2026 – Present',
      thumbnail: asset('/images/cambridge.jpeg'),
      link: '/portfolio/cambridge-half-marathon',
    },
    {
      title: 'Outlaw Triathlon Series',
      type: 'professional',
      typeLabel: 'Professional Work',
      categories: ['Social Media', 'Content', 'Event Marketing'],
      shortDescription:
        'Marketing support across three Outlaw events in Nottingham and Norfolk, including social media management, athlete interviews, content creation and live event coverage.',
      year: '2026 – Present',
      thumbnail: asset('/images/outlaw.jpeg'),
      link: '/portfolio/outlaw-triathlon',
    },
  ],
  content: [
    {
      title: 'Content Creation',
      type: 'personal',
      typeLabel: 'Personal Project',
      categories: ['Content Creation', 'Video', 'Photography'],
      shortDescription:
        'A selection of personal videos and creative work across travel, lifestyle, photography and short-form content.',
      year: 'Ongoing',
      thumbnail: asset('/images/content.jpeg'),
      link: '/portfolio/content-creation',
    },
  ],
  freelance: [
    {
      title: 'NottsHappening',
      type: 'freelance',
      typeLabel: 'Freelance Collaboration',
      categories: ['Short-Form Video', 'Social Content'],
      shortDescription:
        'Short-form content created for NottsHappening, featuring venues, food, experiences and places across Nottingham.',
      year: '2026 – Present',
      thumbnail: asset('/images/nottshappening.jpeg'),
      link: '/portfolio/nottshappening',
    },
  ],
  web: [
    {
      title: 'Home by Nox',
      type: 'web',
      typeLabel: 'Web Design Concept',
      categories: ['Website Design'],
      shortDescription:
        'A website concept for a lifestyle and Airbnb brand, focused on warm visuals, beautiful stays and a simple browsing experience.',
      year: '2026',
      thumbnail: asset('/images/home-by-nox.jpeg'),
      link: '/portfolio/home-by-nox',
    },
    {
      title: 'Shamrock Social',
      type: 'web',
      typeLabel: 'Web Design Concept',
      categories: ['Website Design'],
      shortDescription:
        'A website concept for an Irish pub in Nottingham, designed to bring its personality, events and social atmosphere into one clear and easy-to-use website.',
      year: '2026',
      thumbnail: asset('/images/shamrock-social.webp'),
      link: '/portfolio/shamrock-social',
    },
  ],
}

function SmallCard({ item }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="h-full"
    >
      <Link to={item.link} className="group flex h-full">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-surface-lowest shadow-soft">
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] flex-shrink-0 overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-600 ease-smooth group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            <div className="absolute left-3 top-3">
              <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${TYPE_STYLES[item.type]}`}>
                {item.typeLabel}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {item.categories.map((cat) => (
                <span key={cat} className="text-[10px] uppercase tracking-widest text-taupe">
                  {cat}
                </span>
              ))}
            </div>
            <h3 className="font-display text-headline-sm leading-snug text-on-surface">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-on-surface/55 leading-relaxed">
              {item.shortDescription}
            </p>
            <div className="mt-auto pt-3">
              <p className="text-xs uppercase tracking-widest text-taupe">
                {item.year}
              </p>
              <p className="mt-2 text-sm text-on-surface/50 transition-colors duration-300 group-hover:text-on-surface">
                View Project →
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function MoreWork() {
  const [searchParams] = useSearchParams()
  const [active, setActive] = useState(() => searchParams.get('filter') ?? 'all')

  useEffect(() => {
    const f = searchParams.get('filter')
    if (f && PROJECTS[f]) {
      setActive(f)
      setTimeout(() => {
        document.getElementById('explore-my-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    }
  }, [searchParams])
  const items = active === 'all'
    ? Object.values(PROJECTS).flat()
    : PROJECTS[active]

  return (
    <section id="explore-my-work" className="bg-surface-lowest pt-20 pb-10 md:pt-28 md:pb-14">
      <div className="container-page">

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between mb-12">
          <Reveal>
            <h2 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
              Explore <span className="italic">My Work</span>
            </h2>
          </Reveal>

          {/* Filter pills — horizontally scrollable on mobile */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={[
                    'rounded-full px-4 py-2 text-label-caps uppercase tracking-widest transition-all duration-300 ease-smooth',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface',
                    active === f.value
                      ? 'bg-on-surface text-white'
                      : 'border border-outline-variant text-taupe hover:border-outline hover:text-on-surface',
                  ].join(' ')}
                  aria-pressed={active === f.value}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item) => (
              <SmallCard key={item.title} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
