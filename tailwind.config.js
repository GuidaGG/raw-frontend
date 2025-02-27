/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
 ],
  theme: {
    extend: {
      colors: {
         //'raw-blue': '#5D96FF',
        'raw-blue': "var(--full-color)",
        // 'raw-blue-light': '#96bcff',
        'raw-blue-light': "var(--light-color)",
        'raw-white': 'white'
      },
      fontFamily: {
				rawFont: ['raw-frontend/src/lib/fonts/SpaceGrotesk-VariableFont_wght.ttf', 'sans-serif'],
			},
      backgroundImage: {
        'pattern': "url('src/lib/images/Background.svg')",
      },
      animation: {
        spin: 'spin 2s linear infinite',
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      }
      
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};