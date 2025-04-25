/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-claro': '#243cff',
        'azul-escuro': '#0d1b3e',
      },
    },
  },
  plugins: [],
}