import Reveal from '../Reveal.jsx'
import { asset } from '../../utils/asset.js'

const photos = [
  { src: asset('/images/gallery-1.jpg'),  alt: 'Travel photography' },
  { src: asset('/images/gallery-2.jpg'),  alt: 'Travel photography' },
  { src: asset('/images/gallery-3.jpg'),  alt: 'Photography' },
  { src: asset('/images/gallery-4.jpg'),  alt: 'Photography' },
  { src: asset('/images/gallery-5.jpg'),  alt: 'Travel photography' },
  { src: asset('/images/gallery-6.jpg'),  alt: 'Photography' },
  { src: asset('/images/gallery-7.jpg'),  alt: 'Photography' },
  { src: asset('/images/gallery-8.jpg'),  alt: 'Photography' },
]

export default function OutsideBrief() {
  return (
    <section className="bg-surface-lowest py-20 md:py-28">
      <div className="container-page">

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start">

          {/* Heading col */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <span className="label-caps">Personal Work</span>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="mt-3 font-display text-display-lg-mobile md:text-display-lg text-on-surface">
                Outside<br />the <span className="italic">Brief.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-body-lg text-on-surface/55 max-w-xs leading-relaxed">
                Not everything I create begins with a campaign or client brief. Personal projects
                give me space to experiment, explore new ideas and bring fresh inspiration into
                my professional work.
              </p>
            </Reveal>
          </div>

          {/* Photo grid */}
          <Reveal className="lg:col-span-8" delay={0.06}>
            <div className="columns-2 gap-3 sm:columns-3">
              {photos.map((photo, i) => (
                <div
                  key={photo.src}
                  className="group mb-3 break-inside-avoid overflow-hidden rounded-2xl"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="block h-auto w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  )
}
