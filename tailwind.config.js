/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mu-red': '#DA291C',
        'mu-red-dark': '#9B1C1C',
        'mu-gold': '#FBE122',
        'mu-black': '#0A0A0A',
        'betway-green': '#00A651',
        'betway-green-dark': '#007A3D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
