/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-dark-blue': '#27374D',
        'theme-blue': '#526D82',
        'theme-medium-blue': '#9DB2BF',
        'theme-light-blue': '#DDE6ED',
      }
    },
  },
  plugins: [],
}

