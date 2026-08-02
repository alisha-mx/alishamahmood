import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { socials } from './SocialIcons.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const overHero = pathname === '/' && !scrolled
  const barColor = overHero ? 'bg-white' : 'bg-on-surface'
  const iconColor = overHero ? 'text-white/85 hover:text-white' : 'text-on-surface hover:opacity-60'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    [
      'nav-link text-label-caps tracking-[0.1em]',
      isActive ? 'is-active' : '',
      overHero
        ? isActive
          ? 'text-white'
          : 'text-white/80 hover:text-white'
        : isActive
          ? 'text-on-surface'
          : 'text-secondary hover:text-on-surface',
    ].join(' ')

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth',
        scrolled
          ? 'border-b border-outline-variant/60 bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav className="relative mx-auto flex h-20 w-full max-w-container items-center justify-between px-margin-mobile md:px-margin-desktop">
        {/* Logo (left) */}
        <Link
          to="/"
          aria-label="Alisha"
          className={overHero ? 'text-white' : 'text-on-surface'}
        >
          <Logo className="text-2xl" />
        </Link>

        {/* Nav links (centered) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Social icons (right) */}
        <div className="hidden items-center gap-5 md:flex">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className={`transition-all duration-300 ${iconColor}`}
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={[
                'absolute left-0 block h-px w-6 transition-all duration-300',
                barColor,
                open ? 'top-1/2 rotate-45' : 'top-0',
              ].join(' ')}
            />
            <span
              className={[
                'absolute bottom-0 left-0 block h-px w-6 transition-all duration-300',
                barColor,
                open ? 'bottom-1/2 -rotate-45' : '',
              ].join(' ')}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={[
          'overflow-hidden border-t border-outline-variant/60 bg-background/95 backdrop-blur-md transition-all duration-300 ease-smooth md:hidden',
          open ? 'max-h-[28rem]' : 'max-h-0 border-t-0',
        ].join(' ')}
      >
        <ul className="flex flex-col gap-6 px-6 py-8 md:px-10">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    'text-label-caps uppercase tracking-[0.1em]',
                    isActive ? 'font-bold text-on-surface' : 'text-secondary',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex gap-6 px-6 pb-8 md:px-10">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="text-on-surface transition-opacity duration-300 hover:opacity-60"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
