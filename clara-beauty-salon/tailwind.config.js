/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        clara: {
          50:  '#FBEAF0',
          100: '#F4C0D1',
          200: '#ED93B1',
          300: '#E26A96',
          400: '#D4537E',
          500: '#B93D66',
          600: '#993556',
          700: '#7F2A47',
          800: '#72243E',
          900: '#4B1528',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #FBEAF0 0%, #F4C0D1 60%, #ED93B1 100%)',
        'section-gradient': 'linear-gradient(180deg, #FBEAF0 0%, #FFFFFF 100%)',
      },
      boxShadow: {
        'clara': '0 4px 24px rgba(212, 83, 126, 0.15)',
        'clara-lg': '0 8px 40px rgba(212, 83, 126, 0.2)',
      },
    },
  },
  plugins: [],
}
