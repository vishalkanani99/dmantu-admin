/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
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
      },
      screens: {
        'xs': '360px',
        ...defaultTheme.screens,
      },
      keyframes: {
        "shake": {
          '0%, 100%': { transform: 'translateZ( 0 )' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate3d(-10px,0,0)' },
          '20%, 40%, 60%, 80%': { transform: 'translate3d(10px,0,0)' },
        }
      },
      animation: {  
        'shake': 'shake .5s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

