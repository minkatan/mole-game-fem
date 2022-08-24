/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      cursor:{
        'bird': 'url(./assets/cursor.png), default',
        'feed': 'url(./assets/cursor-worm.png), pointer',
      }
    },
  },
  plugins: [],
}