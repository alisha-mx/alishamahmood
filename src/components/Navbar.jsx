import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { socials } from './SocialIcons.jsx'

const links = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const portfolioDropdown = [
  { label: 'Professional Work', filter: 'professional' },
  { label: 'Freelance',         filter: 'freelance' },
  { label: 'Content Creation',  filter: 'content' },
  { label: 'Web Design',        filter: 'web' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const darkHeroPages = ['/portfolio/cambridge-half-marathon', '/portfolio/outlaw-triathlon']
  const overHero = (pathname === '/' || darkHeroPages.includes(pathname)) && !scrolled
  const alwaysBg = pathname.startsWith('/portfolio/') && !darkHeroPages.includes(pathname)
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
        scrolled || alwaysBg
          ? 'border-b border-outline-variant/60 bg-background'
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
          {/* Home */}
          <li>
            <NavLink to="/" end className={linkClass}>Home</NavLink>
          </li>

          {/* Portfolio with dropdown */}
          <li className="relative group">
            <NavLink to="/portfolio" className={linkClass}>
              Portfolio
            </NavLink>
            {/* Dropdown */}
            <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-2xl border border-outline-variant bg-background shadow-soft py-2 min-w-[190px]">
                {portfolioDropdown.map(({ label, filter }) => (
                  <Link
                    key={filter}
                    to={`/portfolio?filter=${filter}`}
                    className="block px-5 py-2.5 text-label-caps uppercase tracking-widest text-secondary transition-colors duration-200 hover:text-on-surface hover:bg-surface-lowest"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </li>

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
          {socials.map(({ label, href, Icon, internal, iconClass }) => (
            internal ? (
              <Link
                key={label}
                to={href}
                aria-label={label}
                className={`transition-all duration-300 ${iconColor}`}
              >
                <Icon className={iconClass ?? 'h-[18px] w-[18px]'} />
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className={`transition-all duration-300 ${iconColor}`}
              >
                <Icon className={iconClass ?? 'h-[18px] w-[18px]'} />
              </a>
            )
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
          <li>
            <NavLink to="/" end onClick={() => setOpen(false)}
              className={({ isActive }) => ['text-label-caps uppercase tracking-[0.1em]', isActive ? 'font-bold text-on-surface' : 'text-secondary'].join(' ')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" onClick={() => setOpen(false)}
              className={({ isActive }) => ['text-label-caps uppercase tracking-[0.1em]', isActive ? 'font-bold text-on-surface' : 'text-secondary'].join(' ')}>
              Portfolio
            </NavLink>
            <ul className="mt-3 flex flex-col gap-3 pl-4 border-l border-outline-variant">
              {portfolioDropdown.map(({ label, filter }) => (
                <li key={filter}>
                  <Link
                    to={`/portfolio?filter=${filter}`}
                    onClick={() => setOpen(false)}
                    className="text-label-caps uppercase tracking-widest text-secondary hover:text-on-surface transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
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
          {socials.map(({ label, href, Icon, internal, iconClass }) => (
            internal ? (
              <Link
                key={label}
                to={href}
                aria-label={label}
                onClick={() => setOpen(false)}
                className="text-on-surface transition-opacity duration-300 hover:opacity-60"
              >
                <Icon className={iconClass ?? 'h-5 w-5'} />
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="text-on-surface transition-opacity duration-300 hover:opacity-60"
              >
                <Icon className={iconClass ?? 'h-5 w-5'} />
              </a>
            )
          ))}
        </div>
      </div>
    </header>
  )
}
