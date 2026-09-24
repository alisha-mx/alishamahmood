import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { asset } from '../utils/asset.js'

export default function AboutMe() {
  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-gutter md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <Reveal className="md:col-span-5">
          <div className="overflow-hidden rounded-4xl bg-surface-container shadow-soft">
            <img
              src={asset('/images/alisha-portrait.jpg')}
              alt="Alisha Mahmood"
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div className="md:col-span-7 md:pl-8">
          <Reveal
            as="h2"
            className="font-display text-display-lg-mobile md:text-display-lg text-on-surface"
          >
            Hi, I&apos;m <span className="italic">Alisha.</span>
          </Reveal>

          <Reveal as="p" delay={0.06} className="mt-8 max-w-xl text-body-lg text-on-surface">
            I&apos;m Alisha, a UK-based marketer and creative with a love for travel,
            visual storytelling and the details that make a place, brand or idea feel
            memorable. I&apos;m most inspired by fashion, design, new experiences and
            the kind of content that makes you want to look twice.
          </Reveal>

          <Reveal as="p" delay={0.1} className="mt-6 max-w-xl text-body-lg text-on-surface">
            Professionally, I work across social media and marketing, bringing together
            creative ideas, content and strategy to help brands connect with people in a
            way that feels current and considered.
          </Reveal>

          <Reveal as="p" delay={0.13} className="mt-6 max-w-xl text-body-lg text-on-surface">
            This is a fun little space for the work I&apos;m creating, the projects
            I&apos;m building and the things that continue to inspire me, both in and
            outside of work!
          </Reveal>

          <Reveal delay={0.14} className="mt-10">
            <Link to="/about" className="btn-outline">
              Learn More About Me
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
