/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: {
          50: 'var(--color-surface-50)',
          100: 'var(--color-surface-100)',
          200: 'var(--color-surface-200)',
          300: 'var(--color-surface-300)',
        },
        card: {
          dark: 'var(--color-card-dark)',
          border: 'var(--color-card-border)',
          hover: 'var(--color-card-hover)',
        },
        brand: {
          primary: 'var(--color-brand-primary)',
          hover: 'var(--color-brand-hover)',
          accent: 'var(--color-brand-accent)',
          gold: '#F59E0B',
          silver: '#94A3B8',
          bronze: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
