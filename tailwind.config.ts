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
              input: '#f1f5f9',
              ring: '#020817',
              background: '#f8fafc',
              foreground: '#020617',
              primary: {
                DEFAULT: '#0f172a',
                foreground: '#f8fafc',
              },
              secondary: {
                DEFAULT: '#bae6fd',
                foreground: '#334155',
              },
              destructive: {
                DEFAULT: '#ef4444',
                foreground: '#f8fafc',
              },
              muted: {
                DEFAULT: '#f1f5f9',
                foreground: '#64748b',
              },
              accent: {
                DEFAULT: '#f1f5f9',
                foreground: '#475569',
              },
              popover: {
                DEFAULT: '#ffffff',
                foreground: '#020617',
              },
              card: {
                DEFAULT: '#ffffff',
                foreground: '#020617',
              },
              navigation: '#f1f5f9',
              overlay: "#020817"
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
              background: '#0f172a',
              foreground: '#f8fafc',
              primary: {
                DEFAULT: '#f8fafc',
                foreground: '#0f172a',
              },
              secondary: {
                DEFAULT: '#082f49',
                foreground: '#cbd5e1',
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
                DEFAULT: '#020617',
                foreground: '#f8fafc',
              },
              card: {
                DEFAULT: '#020617',
                foreground: '#f8fafc',
              },
              navigation: '#1e293b',
              overlay: "#334155"
            },
          },
        },
      ],
    }),
  ],
}
export default config
