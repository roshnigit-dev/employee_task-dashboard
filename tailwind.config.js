

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ledger: {
          paper: '#F3EFE6',
          paperDark: '#EAE4D4',
          ink: '#1F2420',
          inkSoft: '#4A4F47',
          hairline: '#D8D2C2',
          brass: '#B8843A',
          brassDark: '#96692C',
          sage: '#5C7A5C',
          sageDark: '#46603F',
          rust: '#A4453A',
          rustDark: '#7E332A',
        },
        dusk: {
          bg: '#171714',
          panel: '#1F1F1B',
          panelAlt: '#262620',
          text: '#E8E3D6',
          textSoft: '#B6AF9C',
          hairline: '#34332B',
        },
      },
      fontFamily: {
        display: ['Spectral', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(31,36,32,0.06), 0 1px 0 rgba(31,36,32,0.04)',
        cardHover: '0 4px 14px rgba(31,36,32,0.12)',
      },
      borderRadius: {
        card: '3px',
      },
    },
  },
  plugins: [],
};