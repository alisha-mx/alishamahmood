import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../Reveal.jsx'
import { projects } from '../../data/portfolioProjects.js'

const TYPE_STYLES = {
  professional: 'bg-on-surface text-white',
  freelance: 'border border-outline bg-transparent text-on-surface',
  personal: 'bg-buttermilk text-on-surface',
}

function FeaturedCard({ project, aspectClass = 'aspect-[4/5]', priority = false }) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group relative block overflow-hidden rounded-3xl"
      aria-label={`View case study: ${project.title}`}
    >
      <div className={`relative w-full overflow-hidden ${aspectClass}`}>
        <img
          src={project.thumbnail}
          alt={project.title}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />

        {/* Film grain */}
        <div className="card-grain absolute inset-0 z-10 pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />

        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Type badge */}
        <div className="absolute left-5 top-5 z-30">
          <span className={`rounded-full px-3 py-1 text-label-caps uppercase tracking-widest ${TYPE_STYLES[project.type]}`}>
            {project.typeLabel}
          </span>
        </div>

        {/* Text content */}
        <div className="absolute inset-x-0 bottom-0 z-30 p-6 md:p-7">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.categories.map((cat) => (
              <span key={cat} className="text-[11px] uppercase tracking-widest text-white/60">
                {cat}
              </span>
            ))}
          </div>

          <h3 className="font-display text-headline-sm md:text-headline-md leading-tight text-white">
            {project.title}
          </h3>

          <p className="mt-1 text-sm text-white/70">
            {project.role} · {project.year}
          </p>

          {/* Key results — slide up on hover */}
          <div className="mt-3 translate-y-3 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex flex-wrap gap-4">
              {project.keyResults.map((r) => (
                <div key={r.label}>
                  <p className="font-display text-lg italic text-white leading-none">{r.metric}</p>
                  <p className="text-[11px] uppercase tracking-wider text-white/60 mt-0.5">{r.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/80 group-hover:text-white transition-colors duration-300">
              View case study
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedProjects() {
  const [p1, p2, p3, p4, p5, p6] = projects

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container-page">
        <Reveal>
          <h2 className="font-display text-headline-md text-on-surface mb-10">
            Featured <span className="italic">Projects</span>
          </h2>
        </Reveal>

        {/* Editorial grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">

          {/* Card 1 — largest, hero prominence */}
          <Reveal className="lg:col-span-7" delay={0}>
            <FeaturedCard project={p1} aspectClass="aspect-[4/5] lg:aspect-auto lg:h-[580px]" priority />
          </Reveal>

          {/* Card 2 — tall portrait */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <FeaturedCard project={p2} aspectClass="aspect-[4/5] lg:aspect-auto lg:h-[580px]" />
          </Reveal>

          {/* Card 3 — wide landscape */}
          <Reveal className="md:col-span-2 lg:col-span-8" delay={0.08}>
            <FeaturedCard project={p3} aspectClass="aspect-[4/3] lg:aspect-[16/7]" />
          </Reveal>

          {/* Card 4 — narrow portrait */}
          <Reveal className="lg:col-span-4" delay={0.1}>
            <FeaturedCard project={p4} aspectClass="aspect-[4/3] lg:aspect-auto lg:h-full" />
          </Reveal>

          {/* Card 5 — medium */}
          <Reveal className="lg:col-span-5" delay={0.12}>
            <FeaturedCard project={p5} aspectClass="aspect-[4/3]" />
          </Reveal>

          {/* Card 6 — medium landscape */}
          <Reveal className="lg:col-span-7" delay={0.14}>
            <FeaturedCard project={p6} aspectClass="aspect-[4/3]" />
          </Reveal>

        </div>
      </div>
    </section>
  )
}
