import { motion } from 'framer-motion'
import Reveal from '../Reveal.jsx'
import { asset } from '../../utils/asset.js'

const cards = [
  {
    n: '01',
    title: 'Content That Feels Real',
    desc: "Whether it's UGC, behind-the-scenes moments or beautifully shot visuals, I love creating content that feels authentic and genuinely enjoyable to watch.",
    img: asset('/images/masonry/masonry-5.jpg'),
    rotate: -1.5,
    hoverRotate: -0.4,
  },
  {
    n: '02',
    title: 'Marketing That Makes Sense',
    desc: 'Marketing has always fascinated me, not just the campaigns, but understanding why people stop scrolling, what grabs attention and what makes a brand memorable.',
    img: asset('/images/masonry/masonry-8.jpg'),
    rotate: 1.2,
    hoverRotate: 0.3,
  },
  {
    n: '03',
    title: 'Creative Direction',
    desc: "I love spotting the little details that bring everything together. From colours and composition to storytelling and aesthetics, it's often the smallest decisions that have the biggest impact.",
    img: asset('/images/masonry/masonry-6.jpg'),
    rotate: -0.8,
    hoverRotate: -0.2,
  },
  {
    n: '04',
    title: 'Creating Just Because',
    desc: "Some of my favourite work isn't for a client at all. I love picking up my camera, exploring somewhere new and creating simply because something caught my eye.",
    img: asset('/images/masonry/masonry-1.jpg'),
    rotate: 1.5,
    hoverRotate: 0.4,
  },
]

export default function InspiredBy() {
  return (
    <section className="bg-background overflow-x-hidden">
      <div className="container-page pt-24 md:pt-32 pb-20 md:pb-28">

        <div className="max-w-2xl">
          <Reveal as="h2" className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
            Currently <span className="italic">Inspired</span> By.
          </Reveal>
          <Reveal as="p" delay={0.05} className="mt-4 text-body-lg text-on-surface/55">
            These aren't projects — they're the ideas, places and little moments that constantly shape the way I create.
          </Reveal>
        </div>

        <div className="mt-16 flex gap-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory -mx-6 px-6 py-10 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:gap-6">
          {cards.map((s, i) => (
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
                <div className="relative h-[440px] w-full overflow-hidden rounded-3xl">
                  <img
                    src={s.img}
                    alt={s.title}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                  />
                  <div className="card-grain absolute inset-0 z-10 pointer-events-none" />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-0 z-20 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 z-30 p-6">
                    <span className="block font-display italic text-2xl leading-none text-white/75">
                      {s.n}
                    </span>
                    <h3 className="mt-2 font-display text-headline-sm leading-snug text-white">
                      {s.title}
                    </h3>
                    <div className="translate-y-4 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="mt-3 text-sm leading-relaxed text-white/80">{s.desc}</p>
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
