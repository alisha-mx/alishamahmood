import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../Reveal.jsx'

const projects = [
  {
    n: '01',
    title: 'Home by Nox',
    copy: 'A visual website concept focused on warm design, storytelling and creating a stronger digital presence for a short-stay rental brand.',
  },
  {
    n: '02',
    title: 'Shamrock Social',
    copy: 'A playful web concept exploring hospitality, events and interactive brand moments for an Irish bar.',
  },
  {
    n: '03',
    title: 'Outlaw Triathlon',
    copy: 'Social content, event storytelling and marketing work across race weekends and digital campaigns.',
  },
]

export default function LovedProjects() {
  return (
    <section className="bg-surface-lowest">
      <div className="container-page py-24 md:py-32">

        <Reveal>
          <h2 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
            Projects I've <span className="italic">loved creating</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.07}>
              <Link to="/portfolio" className="block h-full group">
                <motion.div
                  className="h-full rounded-3xl border border-outline-variant bg-surface-lowest p-8 flex flex-col"
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 48px -12px rgba(23,23,23,0.14)',
                    borderColor: 'rgb(184,168,154)',
                  }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className="font-display italic text-2xl text-taupe">{p.n}</span>
                  <h3 className="mt-6 font-display text-headline-sm text-on-surface">{p.title}</h3>
                  <p className="mt-3 text-body-md text-on-surface/60 leading-relaxed flex-1">{p.copy}</p>
                  <span className="mt-6 text-sm text-taupe transition-colors duration-300 group-hover:text-on-surface">
                    View work →
                  </span>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
