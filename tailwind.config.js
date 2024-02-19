/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
 ],
  theme: {
    extend: {
      colors: {
        'raw-blue': '#5D96FF',
        'raw-blue-light': '#96bcff',
        'raw-white': '#E4E5E7'
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};