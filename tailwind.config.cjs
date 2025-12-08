/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Semantic Color Mapping
      colors: {
        bg: {
          page: 'rgb(var(--bg-page) / <alpha-value>)',
          surface: 'rgb(var(--bg-surface) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          accent: 'rgb(var(--text-accent) / <alpha-value>)',
        },
        border: {
          light: 'rgb(var(--border-light) / <alpha-value>)',
          strong: 'rgb(var(--border-strong) / <alpha-value>)',
        },
        // Keep primitives for specific one-offs
        studio: {
          paper: '#F4F4F0',
          ink: '#2B2B2B',
          sage: '#8A9A8A',
        }
      },
      
      // 2. Strict Typography Scale
      // Maps to: Role (Mobile Size / Desktop Size)
      fontSize: {
        'display-lg': ['clamp(3rem, 5vw + 1rem, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '700' }], // Hero
        'display-md': ['clamp(2.5rem, 4vw + 1rem, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '600' }], // Section Headers
        
        'title-lg':   ['clamp(1.5rem, 2vw + 1rem, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '500' }], // Card Titles
        'title-md':   ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        
        'body-lg':    ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }], // Lead text
        'body-md':    ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],     // Standard text
        'body-sm':    ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }], // Metadata
        
        'label':      ['0.75rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }], // Uppercase labels
      },
      
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },

      // 3. Spacing System (Vertical Rhythm)
      spacing: {
        'section-sm': '5rem',  // 80px
        'section-md': '8rem',  // 128px
        'section-lg': '12rem', // 192px
      }
    },
  },
  plugins: [],
}
