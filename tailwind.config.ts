import type { Config } from 'tailwindcss'
const themeSwapper = require('tailwindcss-theme-swapper')
// const colors = require('tailwindcss/colors')

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    themeSwapper({
      themes: [
        {
          name: 'base',
          selectors: [':root'],
          theme: {
            colors: {
              border: '#e2e8f0',
              input: '#e2e8f0',
              ring: '#020817',
              background: '#ffffff',
              foreground: '#020817',
              primary: {
                DEFAULT: '#0f172a',
                foreground: '#f8fafc',
              },
              secondary: {
                DEFAULT: '#cef5e6',
                foreground: '#f1f5f9',
              },
              destructive: {
                DEFAULT: '#ef4444',
                foreground: '#f8fafc',
              },
              muted: {
                DEFAULT: '#f1f5f9',
                foreground: '#4b5770',
              },
              accent: {
                DEFAULT: '#f1f5f9',
                foreground: '#4b5770',
              },
              popover: {
                DEFAULT: '#ffffff',
                foreground: '#020817',
              },
              card: {
                DEFAULT: '#ffffff',
                foreground: '#020817',
              },
              navigation: '#f1f5f9',
            },
          },
        },
        {
          name: 'dark',
          selectors: ['[data-theme="dark"]'],
          theme: {
            colors: {
              border: '#1e293b',
              input: '#1e293b',
              ring: '#cbd5e1',
              background: '#020817',
              foreground: '#f8fafc',
              primary: {
                DEFAULT: '#f8fafc',
                foreground: '#0f172a',
              },
              secondary: {
                DEFAULT: '#002326', /*#00281c*/
                foreground: '#f8fafc',
              },
              destructive: {
                DEFAULT: '#7f1d1d',
                foreground: '#f8fafc',
              },
              muted: {
                DEFAULT: '#1e293b',
                foreground: '#94a3b8',
              },
              accent: {
                DEFAULT: '#1e293b',
                foreground: '#f8fafc',
              },
              popover: {
                DEFAULT: '#020817',
                foreground: '#f8fafc',
              },
              card: {
                DEFAULT: '#020817',
                foreground: '#f8fafc',
              },
              navigation: '#050E1E',
            },
          },
        },
      ],
    }),
  ],
}
export default config
