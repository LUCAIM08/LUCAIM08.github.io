/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: { 950: '#04060b', 900: '#070a12', 800: '#0c111c', 700: '#141b2b' },
        neon: { cyan: '#22d3ee', indigo: '#6366f1', volt: '#a3ff12' },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code Variable"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.35)',
        'glow-indigo': '0 0 24px rgba(99, 102, 241, 0.4)',
        'glow-volt': '0 0 14px rgba(163, 255, 18, 0.7)',
      },
      keyframes: {
        'ping-slow': {
          '75%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'border-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'ping-slow': 'ping-slow 2s cubic-bezier(0,0,0.2,1) infinite',
        float: 'float 2.4s ease-in-out infinite',
        'border-spin': 'border-spin 3s linear infinite',
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};