import Reveal from '../Reveal.jsx'
import CameraHero from './CameraHero.jsx'

export default function AboutHero() {
  return (
    <section className="bg-surface-lowest overflow-hidden pt-10 h-screen flex items-center">
      <div className="container-page w-full">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-16">

          <div className="lg:col-span-5 lg:pr-4">
            <Reveal>
              <span className="text-label-caps uppercase tracking-[0.2em] text-secondary">
                About
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-display-lg-mobile md:text-display-lg text-on-surface">
                Hey, I'm <span className="italic">Alisha.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-body-lg leading-relaxed text-on-surface/60">
                Marketer, creator and someone who can't stop turning everyday moments into creative projects.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-7 flex justify-center overflow-visible">
            <CameraHero />
          </Reveal>

        </div>
      </div>
    </section>
  )
}
