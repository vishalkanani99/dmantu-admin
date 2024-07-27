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
        'theme-800': '#334866',
        'theme-700': '#455c6e',
        'theme-600': '#526D82',
        'theme-500': '#62839d',
        'theme-400': '#829cb0',
        'theme-300': '#a1b5c4',
        'theme-200': '#bccedc',
        'theme-100': '#DDE6ED',
        'theme-50' : '#eef3f6',
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

