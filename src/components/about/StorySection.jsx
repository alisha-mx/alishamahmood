import Reveal from '../Reveal.jsx'

export default function StorySection() {
  return (
    <section className="bg-background">
      <div className="container-page py-24 md:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">

          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface lg:sticky lg:top-28">
                A little <span className="italic">about me</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <p className="text-body-lg leading-relaxed text-on-surface/65">
                I'm a marketer and content creator based in the UK, and I'm happiest when I'm working on something creative! That could be planning a campaign, filming and editing a video, coming up with a website idea or finding a more interesting way to bring a brand to life.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-body-lg leading-relaxed text-on-surface/65">
                Outside of work, I love travelling, taking photos and creating content just because I feel like it. This website is a mix of the professional projects I've worked on, the freelance bits I've picked up along the way and the things I make for fun.
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}
