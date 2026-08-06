import Reveal from '../Reveal.jsx'

const columns = [
  {
    heading: 'Marketing',
    items: [
      'Campaign planning',
      'Social media strategy',
      'Audience research',
      'Community management',
      'Email marketing',
      'Partnerships',
      'Reporting & analysis',
    ],
  },
  {
    heading: 'Creative',
    items: [
      'Content creation',
      'Short-form video',
      'Photography',
      'Video editing',
      'Copywriting',
      'Graphic design',
      'Creative direction',
    ],
  },
  {
    heading: 'Tools',
    items: [
      'Canva',
      'CapCut',
      'Adobe Premiere Pro',
      'Google Analytics',
      'Meta Business Suite',
      'Campaign Monitor',
      'Microsoft Office',
    ],
  },
]

export default function PortfolioCapabilities() {
  return (
    <section className="bg-white pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="container-page">
        <div className="mb-14">
          <Reveal>
            <span className="label-caps">Capabilities</span>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="mt-3 font-display text-display-lg-mobile md:text-display-lg text-on-surface">
              What I <span className="italic">Do.</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative px-10 pt-12 pb-12 md:px-16 md:pt-14 md:pb-14">
          {/* Wavy SVG border frame */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1000 400"
            fill="none"
          >
            <path
              d="M60,12 C120,4 180,20 240,10 C300,0 360,18 420,8 C480,-2 540,16 600,6
                 C660,-4 720,14 780,6 C840,-2 900,12 950,8 C975,6 990,16 992,40
                 C994,70 988,110 992,150 C996,190 990,230 993,270
                 C996,310 990,350 988,380 C986,396 974,400 950,396
                 C900,388 840,400 780,394 C720,388 660,400 600,395
                 C540,390 480,400 420,396 C360,392 300,400 240,396
                 C180,392 120,400 60,395 C30,393 8,386 6,370
                 C2,340 10,300 7,260 C4,220 10,180 7,140
                 C4,100 10,60 7,30 C5,16 20,4 60,12 Z"
              stroke="#DDD5C8"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {columns.map((col, i) => (
              <Reveal key={col.heading} delay={i * 0.06}>
                <div>
                  <h3 className="font-display text-headline-sm italic text-on-surface mb-6 pb-5 border-b border-outline-variant">
                    {col.heading}
                  </h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-body-md text-on-surface/80">
                        <span className="h-1 w-1 flex-shrink-0 rounded-full bg-taupe" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
