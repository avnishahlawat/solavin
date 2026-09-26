/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D13',
        surface: {
          50: '#1B202E',
          100: '#161A26',
          200: '#11141E',
          300: '#0C0E16',
        },
        card: {
          dark: '#141824',
          border: '#23293D',
          hover: '#2D354E',
        },
        brand: {
          primary: '#4F46E5', // Indigo accent
          hover: '#4338CA',
          accent: '#06B6D4',  // Cyan subtle secondary
          gold: '#F59E0B',    // 1st place
          silver: '#94A3B8',  // 2nd place
          bronze: '#D97706',  // 3rd place
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
