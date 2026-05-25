/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#FFF8E7',
        warm: {
          50: '#FFF8E7',
          100: '#FFEAD1',
          200: '#FFD4A3',
          300: '#FFB86C',
          400: '#FF943B',
          500: '#FF6B35',
          600: '#E04D1A',
          700: '#B83812',
        }
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
