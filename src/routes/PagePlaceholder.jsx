import { useEffect } from 'react'
import Reveal from '../components/Reveal.jsx'

// Shared scaffold for the not-yet-built pages so routing/layout works.
export default function PagePlaceholder({ label, title }) {
  useEffect(() => {
    document.title = `${title} — Amoire Social`
    return () => {
      document.title = 'Amoire Social — Creative Direction & Social Strategy'
    }
  }, [title])

  return (
    <section className="container-page pb-section pt-40 md:pt-48">
      <Reveal as="p" className="label-caps mb-8">
        {label}
      </Reveal>
      <Reveal
        as="h1"
        delay={0.06}
        className="font-display text-display-lg-mobile md:text-display-lg max-w-3xl text-on-surface"
      >
        {title}
      </Reveal>
      <Reveal as="p" delay={0.12} className="mt-8 max-w-xl text-body-lg text-secondary">
        This page is coming soon.
      </Reveal>
    </section>
  )
}
