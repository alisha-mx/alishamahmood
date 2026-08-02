import Logo from './Logo.jsx'
import { socials } from './SocialIcons.jsx'

export default function Footer() {
  return (
    <footer className="bg-background">
      {/* Wave divider — espresso dark on top, beige below */}
      <div className="overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full"
          style={{ height: '80px' }}
        >
          <path
            d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      <div className="container-page pb-20 pt-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo className="text-3xl text-on-surface" />
            <p className="mt-4 text-body-md text-on-surface">
              Thanks for stopping by on the coolest digital diary!
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="text-on-surface transition-opacity duration-300 hover:opacity-50"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-outline-variant pt-8">
          <p className="text-center text-label-caps uppercase tracking-[0.1em] text-on-surface">
            © 2026 ALISHA MAHMOOD. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
