/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#E6004C',
          pinkHover: '#C70041',
          dark: '#111111',
          surface: '#F8F9FA',
          card: '#FFFFFF',
          border: '#E5E7EB',
          textMuted: '#6B7280',
          textDark: '#1E1E1E',
          accent: '#FF4D6D'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        archivo: ['"Archivo"', 'sans-serif'],
        caveat: ['"Caveat"', 'cursive']
      },
      boxShadow: {
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 20px 40px -15px rgba(230, 0, 76, 0.12), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'sticker': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 40px rgba(230, 0, 76, 0.25)'
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'wave': 'wave 2.5s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.03)' }
        }
      }
    },
  },
  plugins: [],
}
