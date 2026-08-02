import { motion } from 'framer-motion'
import Reveal from '../Reveal.jsx'

const cards = [
  {
    title: "You'll usually find me...",
    copy: "Behind a camera, editing something or planning the next place I want to explore.",
    hoverRotate: -1,
  },
  {
    title: "My perfect afternoon",
    copy: "A coffee, a laptop, good music and a new idea I can't stop thinking about.",
    hoverRotate: 0.8,
  },
  {
    title: "Currently inspired by",
    copy: "Thoughtful marketing, beautiful design, art, travel and everyday moments that most people walk past.",
    hoverRotate: -0.6,
  },
  {
    title: "Always planning",
    copy: "Another project, another trip or another random idea in my Notes app.",
    hoverRotate: 1,
  },
]

export default function AboutCards() {
  return (
    <section className="bg-surface-lowest overflow-x-hidden">
      <div className="container-page py-24 md:py-32">

        <Reveal>
          <h2 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
            A few things <span className="italic">about me</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <motion.div
                className="h-full rounded-3xl border border-outline-variant bg-surface-lowest p-8 cursor-default"
                whileHover={{
                  y: -8,
                  rotate: card.hoverRotate,
                  boxShadow: '0 20px 48px -12px rgba(23,23,23,0.16)',
                  borderColor: 'rgb(184,168,154)',
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <h3 className="font-display text-headline-sm italic text-on-surface leading-snug">
                  {card.title}
                </h3>
                <p className="mt-4 text-body-md text-on-surface/60 leading-relaxed">
                  {card.copy}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
