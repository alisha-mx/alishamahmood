import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'

const FORMSPREE_ID = 'xvzjbdvl'

const queries = [
  'Work Together',
  'Job Opportunity',
  'Content Collaboration',
  'Just Saying Hi',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', query: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-surface-lowest min-h-[calc(100vh-5rem)] flex items-center">
      <div className="container-page w-full py-24 md:py-32">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">

          {/* Left: heading + subtitle + portrait */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-label-caps uppercase tracking-[0.2em] text-secondary">
                Get in touch
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-display-lg-mobile md:text-display-lg text-on-surface">
                Let's <span className="italic">Connect.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-body-lg leading-relaxed text-on-surface/55">
                Whether it's a collaboration, a new role, or just a chat, I'd love to hear from you.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <motion.div
                className="mt-10 inline-block"
                style={{ rotate: 2 }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="overflow-hidden rounded-[2rem]" style={{ width: '260px' }}>
                  <img
                    src="/images/alisha-portrait.jpg"
                    alt="Alisha Mahmood"
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Right: form — top-aligned with the subtitle on the left */}
          <div className="lg:col-span-7 lg:pt-[160px]">
            <div className="rounded-3xl bg-background p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-5 py-8"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-buttermilk">
                      <svg className="h-5 w-5 text-on-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-display text-headline-md text-on-surface">Message sent!</h2>
                      <p className="mt-2 text-body-md text-on-surface/55">Thanks for reaching out — I'll get back to you soon.</p>
                    </div>
                    <button
                      onClick={() => { setStatus('idle'); setForm({ name: '', query: '', message: '' }) }}
                      className="text-sm text-taupe underline underline-offset-4 transition-colors hover:text-on-surface"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <Reveal delay={0.1}>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-label-caps uppercase tracking-[0.1em] text-secondary">Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={set('name')}
                          className="w-full rounded-xl border border-outline-variant bg-surface-lowest px-4 py-3 text-sm text-on-surface placeholder-taupe/60 outline-none transition-colors duration-200 focus:border-taupe"
                        />
                      </div>
                    </Reveal>
                    <Reveal delay={0.13}>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-label-caps uppercase tracking-[0.1em] text-secondary">What's this about?</label>
                        <select
                          required
                          value={form.query}
                          onChange={set('query')}
                          className="w-full rounded-xl border border-outline-variant bg-surface-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors duration-200 focus:border-taupe appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select a topic</option>
                          {queries.map((q) => <option key={q} value={q}>{q}</option>)}
                        </select>
                      </div>
                    </Reveal>
                    <Reveal delay={0.16}>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-label-caps uppercase tracking-[0.1em] text-secondary">Message</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell me a bit more…"
                          value={form.message}
                          onChange={set('message')}
                          className="w-full resize-none rounded-xl border border-outline-variant bg-surface-lowest px-4 py-3 text-sm text-on-surface placeholder-taupe/60 outline-none transition-colors duration-200 focus:border-taupe"
                        />
                      </div>
                    </Reveal>
                    {status === 'error' && (
                      <p className="text-sm text-red-500">Something went wrong — please try emailing me directly at alisha.mahmood012@gmail.com</p>
                    )}
                    <Reveal delay={0.19}>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-primary self-start disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? 'Sending…' : 'Send Message →'}
                      </button>
                    </Reveal>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
