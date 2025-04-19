/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: '#ff9d02',
        accent: '#ff9d02',
        background: '#151515',
        surface: '#1e1e1e',
        'surface-light': '#2a2a2a',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
      },
    },
  },
  plugins: [],
} 