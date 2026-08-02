import Reveal from '../Reveal.jsx'

export default function StorySection() {
  return (
    <section className="bg-background">
      <div className="container-page py-24 md:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">

          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-headline-md text-on-surface lg:sticky lg:top-28">
                A little <span className="italic">about me</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <p className="text-body-lg leading-relaxed text-on-surface/65">
                I'm based in the UK and have always been drawn to anything creative. I love travelling, discovering new places, finding interesting details that most people walk straight past and turning them into something worth watching. Whether it's capturing a photo, filming a reel or piecing together an edit, I'm always thinking about how a story can be told in a way that makes someone stop scrolling.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-body-lg leading-relaxed text-on-surface/65">
                I'm inspired by great design, art, beautiful spaces and the little moments that often go unnoticed. This is simply a place for all of that to live.
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}
