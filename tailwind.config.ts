import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: '#E63946',
        secondary: '#4fdbcc',
        tertiary: '#ffba27',
        surface: '#131318',
        'surface-high': '#2a292f',
        'surface-low': '#1b1b20',
        'surface-lowest': '#0e0e13',
        'on-surface': '#e4e1e9',
      },
    },
  },
  plugins: [],
};
export default config;
