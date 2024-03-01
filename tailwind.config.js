/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
 ],
  theme: {
    extend: {
      colors: {
         //'raw-blue': '#5D96FF',
         'raw-blue': '#2d7aff',
        // 'raw-blue-light': '#96bcff',
        'raw-blue-light': '#aec8fc',
        'raw-white': '#E4E5E7'
      },
      fontFamily: {
				rawFont: ['raw-frontend/src/lib/fonts/SpaceGrotesk-VariableFont_wght.ttf', 'sans-serif'],
			},
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};