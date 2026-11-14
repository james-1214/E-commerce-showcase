/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        obsidian: '#090909',
        deep: '#111111',
        crimson: {
          DEFAULT: '#A90D16',
          glow: 'rgba(169, 13, 22, 0.45)',
          light: '#d61b27'
        },
        fire: {
          DEFAULT: '#FF4B20',
          glow: 'rgba(255, 75, 32, 0.45)',
          light: '#ff6c47'
        },
        silver: {
          DEFAULT: '#C7C1BB',
          dim: '#8e8881',
          light: '#e2ded9'
        },
        soft: '#F4F0EB',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'flame-gradient': 'linear-gradient(135deg, #A90D16 0%, #FF4B20 100%)',
        'flame-glow': 'radial-gradient(circle at center, rgba(255, 75, 32, 0.18) 0%, rgba(169, 13, 22, 0.08) 50%, transparent 75%)',
        'dark-mesh': 'radial-gradient(circle at 50% 0%, rgba(169, 13, 22, 0.15) 0%, rgba(9, 9, 9, 0) 70%), radial-gradient(circle at 80% 60%, rgba(255, 75, 32, 0.1) 0%, rgba(9, 9, 9, 0) 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
