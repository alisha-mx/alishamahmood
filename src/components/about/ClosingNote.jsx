import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'

export default function ClosingNote() {
  return (
    <section className="bg-surface-lowest">
      <div className="container-page py-24 md:py-32 text-center">

        <Reveal>
          <h2 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">
            Thanks for <span className="italic">stopping by.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 text-body-lg text-on-surface/55 max-w-md mx-auto">
            This space is always evolving, just like the things I'm creating.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            to="/portfolio"
            className="mt-8 inline-block text-body-md text-taupe underline underline-offset-4 transition-colors duration-300 hover:text-on-surface"
          >
            View my work →
          </Link>
        </Reveal>

      </div>
    </section>
  )
}
