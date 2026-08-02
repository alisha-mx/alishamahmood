/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Light cream page base
        background: '#FAF6EF',
        surface: {
          DEFAULT: '#FAF6EF',
          lowest: '#FFFFFF', // pure white cards
          container: '#E8DCCF', // soft beige
          'container-low': '#F2E9DE',
          'container-high': '#E0D2C2',
          'container-highest': '#D6C6B4',
        },
        // Neutral accent (black) — no brown
        accent: {
          DEFAULT: '#171717',
          dark: '#000000',
          soft: '#E8DCCF', // soft beige for light accents/tints
        },
        // Buttermilk yellow accent
        buttermilk: {
          DEFAULT: '#F4E3A0',
          soft: '#FBF3CC',
          deep: '#E9D27A',
        },
        // Black for dark contrast blocks (CTA + footer)
        espresso: {
          DEFAULT: '#171717',
          dark: '#0D0D0D',
        },
        // Text / structure
        primary: '#171717',
        'on-surface': '#171717',
        secondary: '#7A6B5C',
        outline: {
          DEFAULT: '#B8A89A', // taupe
          variant: '#E0D4C6',
        },
        taupe: {
          DEFAULT: '#B8A89A',
          dim: '#9C8A7A',
        },
      },
      fontFamily: {
        // Cohesive pairing across the whole site: Playfair display + DM Sans body
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        brand: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['80px', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-lg': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg-mobile': ['44px', { lineHeight: '1.12', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '500' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'label-caps': ['12px', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        'margin-mobile': '24px',
        'margin-desktop': '64px',
        gutter: '32px',
        section: '120px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgba(23, 23, 23, 0.22)',
        accent: '0 16px 40px -18px rgba(23, 23, 23, 0.3)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
