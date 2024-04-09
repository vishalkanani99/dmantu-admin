/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-900': '#27374D',
        'theme-600': '#526D82',
        'theme-300': '#9DB2BF',
        'theme-100': '#DDE6ED',
      }
    },
  },
  plugins: [],
}

