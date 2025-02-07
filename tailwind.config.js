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
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};