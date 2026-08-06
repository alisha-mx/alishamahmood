import Reveal from '../Reveal.jsx'

const categories = ['Campaigns', 'Social Media', 'Content', 'Digital Marketing', 'Creative Direction']

export default function PortfolioHero() {
  return (
    <section className="bg-background pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="container-page">
        <div className="max-w-3xl">
          <Reveal>
            <span className="label-caps">Portfolio</span>
          </Reveal>

          <Reveal delay={0.04}>
            <h1 className="mt-4 font-display text-display-lg-mobile md:text-display-lg text-on-surface">
              Selected <span className="italic">Work.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-body-lg text-on-surface/60 leading-relaxed">
              A mix of professional, freelance and personal projects that show how I bring ideas to life! From shaping campaigns and managing social channels to filming, editing, building websites and working with brand partners, this is a selection of the work I've loved creating and contributing to.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-outline-variant px-4 py-1.5 text-label-caps uppercase text-taupe tracking-widest"
                >
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
