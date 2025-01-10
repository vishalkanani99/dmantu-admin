/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme' : {
          '900': '#27374D',
          '800': '#334866',
          '700': '#455c6e',
          '600': '#526D82',
          '500': '#62839d',
          '400': '#829cb0',
          '300': '#a1b5c4',
          '200': '#bccedc',
          '100': '#DDE6ED',
          '50' : '#eef3f6',
        }
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
    plugin(function ({ addUtilities }) {
			addUtilities({
				'.drag-none': {
					'-webkit-user-drag': 'none',
					'-khtml-user-drag': 'none',
					'-moz-user-drag': 'none',
					'-o-user-drag': 'none',
					'user-drag': 'none'
				}
			});
		})
  ],
}

