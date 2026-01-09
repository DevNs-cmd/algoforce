/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6e9f0',
          100: '#ccd3e1',
          200: '#99a7c3',
          300: '#667ba5',
          400: '#334f87',
          500: '#002369',
          600: '#001c54',
          700: '#00153f',
          800: '#000e2a',
          900: '#000715',
        },
        purple: {
          50: '#f3e5ff',
          100: '#e7ccff',
          200: '#cf99ff',
          300: '#b766ff',
          400: '#9f33ff',
          500: '#8700ff',
          600: '#6c00cc',
          700: '#510099',
          800: '#360066',
          900: '#1b0033',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
