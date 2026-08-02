import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

export default function AboutMe() {
  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-gutter md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <Reveal className="md:col-span-5">
          <div className="overflow-hidden rounded-4xl bg-surface-container shadow-soft">
            <img
              src="/images/alisha-portrait.jpg"
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
            I&apos;m a marketer and creative based in the UK. I love travelling,
            discovering new places, finding interesting details that most people walk
            straight past and turning them into something worth watching. Whether
            it&apos;s capturing a photo, filming a reel or piecing together an edit,
            I&apos;m always thinking about how a story can be told in a way that makes
            someone stop scrolling!
          </Reveal>

          <Reveal as="p" delay={0.1} className="mt-6 max-w-xl text-body-md text-on-surface">
            I&apos;m inspired by great design, art, beautiful spaces and the little
            moments that often go unnoticed. This is my little corner of the internet
            where I bring all of those things together, sharing the projects I&apos;m
            working on, showcasing my talent and everything that keeps me creating!
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
