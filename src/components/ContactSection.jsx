import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { asset } from '../utils/asset.js'

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-espresso-dark overflow-hidden">
      {/* Warm ambient glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-buttermilk/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-buttermilk/5 blur-[100px]" />

      <div className="container-page py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">

          {/* Text */}
          <div className="lg:col-span-7 lg:pr-12">
            <Reveal>
              <span className="text-label-caps uppercase tracking-[0.2em] text-white/35">
                Get in touch
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-display-lg-mobile md:text-display-lg text-white">
                Let's Create <span className="italic">Something</span><br className="hidden md:block" /> Worth Remembering.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-lg text-body-lg leading-relaxed text-white/55">
                Open to collaborations, creative campaigns, content partnerships, exciting new roles — or simply connecting with like-minded people. Drop me a message and let's make something happen.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <a href="mailto:alisha.mahmood012@gmail.com" className="btn-light">
                  Say Hello →
                </a>
                <span className="hidden h-px w-8 bg-white/20 sm:block" />
                <a
                  href="mailto:alisha.mahmood012@gmail.com"
                  className="text-sm text-white/40 transition-colors duration-300 hover:text-white/70"
                >
                  alisha.mahmood012@gmail.com
                </a>
              </div>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal delay={0.08} className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              style={{ rotate: 2 }}
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="overflow-hidden rounded-[2.5rem]" style={{ width: '300px' }}>
                <img
                  src={asset(asset('/images/alisha-portrait.jpg'))}
                  alt="Alisha Mahmood"
                  className="w-full aspect-[3/4] object-cover object-top"
                />
              </div>
              {/* Buttermilk warmth under image */}
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-buttermilk/25 blur-3xl" />
            </motion.div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
