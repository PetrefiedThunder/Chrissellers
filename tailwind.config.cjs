/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          page: 'rgb(var(--bg-page) / <alpha-value>)',
          surface: 'rgb(var(--bg-surface) / <alpha-value>)',
          sunken: 'rgb(var(--bg-sunken) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          accent: 'rgb(var(--text-accent) / <alpha-value>)',
        },
        rule: 'rgb(var(--rule) / <alpha-value>)',
      },

      fontSize: {
        'display-lg': ['clamp(3rem, 5vw + 1rem, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['clamp(2rem, 3vw + 1rem, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],

        'title-lg': ['clamp(1.5rem, 1.5vw + 1rem, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' }],
        'title-md': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],

        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body-md': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55' }],

        label: ['0.75rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
