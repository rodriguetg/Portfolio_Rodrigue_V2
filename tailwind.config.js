/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Managed manually or by system preference, but we'll enforce dark for this theme
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Cyberpunk / Tech Accents
        neon: {
          blue: '#00f3ff',
          purple: '#bc13fe',
          green: '#0aff00',
        },
        dark: {
          bg: '#050505',
          surface: '#0a0a12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tech: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 243, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 243, 255, 0.8)' },
        }
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(to right, #050505, #0a0a12)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
