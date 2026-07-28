/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#fbfaf8',
          secondary: '#f3f0e9',
          glass: 'rgba(251, 250, 248, 0.7)',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        success: {
          DEFAULT: '#10b981',
          bg: 'rgba(16, 185, 129, 0.1)',
        },
        danger: {
          DEFAULT: '#ef4444',
          bg: 'rgba(239, 68, 68, 0.1)',
        },
        border: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(99, 102, 241, 0)' },
          '100%': { transform: 'scale(0.8)', boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
