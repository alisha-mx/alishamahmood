import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { asset } from '../utils/asset.js'

const services = [
  {
    n: '01',
    title: 'Content That Connects',
    desc: "Whether I'm creating content professionally, working with a client or developing something independently, I focus on making it feel natural, relevant and genuinely enjoyable to watch. From UGC and behind-the-scenes footage to campaign content and polished visuals, everything starts with understanding the audience.",
    img: asset('/images/masonry/masonry-5.jpg'),
    rotate: -1.5,
    hoverRotate: -0.4,
  },
  {
    n: '02',
    title: 'Marketing That Makes Sense',
    desc: "I'm interested in more than just how a campaign looks. I like understanding why people stop scrolling, what encourages them to engage and how different elements work together to make a brand memorable. In my work, I combine creative ideas with audience insight to create marketing that has a clear purpose.",
    img: asset('/images/masonry/masonry-8.jpg'),
    rotate: 1.2,
    hoverRotate: 0.3,
  },
  {
    n: '03',
    title: 'Creative Direction',
    desc: "I enjoy shaping the overall look and feel of a project, from the initial idea through to the final execution. Colours, composition, tone, storytelling and consistency all matter, and I'm always considering how the smaller creative decisions contribute to the bigger picture.",
    img: asset('/images/masonry/masonry-6.jpg'),
    rotate: -0.8,
    hoverRotate: -0.2,
  },
  {
    n: '04',
    title: 'Creating Just Because',
    desc: "Not everything I create begins with a campaign or client brief. I'm naturally curious and often find inspiration through travel, photography and everyday moments. Creating independently gives me the space to experiment, develop new skills and bring fresh ideas into my professional work.",
    img: asset('/images/masonry/masonry-1.jpg'),
    rotate: 1.5,
    hoverRotate: 0.4,
  },
]

export default function WhatIDo() {
  return (
    <section id="services" className="bg-background overflow-x-hidden">
      <div className="container-page pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="max-w-2xl">
          <Reveal as="h2" className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
            Currently <span className="italic">Inspired By.</span>
          </Reveal>
        </div>

        {/* Mobile: horizontal scroll carousel — Desktop: 4-column grid */}
        <div className="mt-16 flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory -mx-6 px-6 py-10 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:gap-6">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.08}
              className="flex-shrink-0 w-[75vw] max-w-[290px] snap-center lg:w-auto lg:max-w-none"
            >
              <motion.article
                className="group relative w-full cursor-pointer select-none rounded-3xl"
                style={{ rotate: s.rotate }}
                whileHover={{
                  y: -12,
                  rotate: s.hoverRotate,
                  boxShadow: '0 32px 64px -16px rgba(23,23,23,0.42)',
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Separate overflow-hidden from the transform element to preserve border-radius */}
                <div className="relative h-[440px] w-full overflow-hidden rounded-3xl">
                  {/* Background photo */}
                  <img
                    src={s.img}
                    alt={s.title}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                  />

                  {/* Film grain */}
                  <div className="card-grain absolute inset-0 z-10 pointer-events-none" />

                  {/* Permanent bottom gradient for legibility */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Extra dark overlay — fades in on hover */}
                  <div className="absolute inset-0 z-20 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Text content */}
                  <div className="absolute inset-x-0 bottom-0 z-30 px-6 pt-6 pb-12 text-left">
                    <span className="block font-display italic text-2xl leading-none text-white/75">
                      {s.n}
                    </span>
                    <h3 className="mt-2 font-display text-headline-sm leading-snug text-white">
                      {s.title}
                    </h3>
                    {/* Description slides up and fades in on hover */}
                    <div className="translate-y-4 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="mt-3 text-sm leading-relaxed text-white/80">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
