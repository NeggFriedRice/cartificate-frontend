/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'block-xs': '0.25rem 0.25rem black',
        'block-sm': '0.5rem 0.5rem black',
        'block-smmd': '0.75rem 0.75rem black',
        'block-md': '1rem 1rem',
        'block-lg': '1.5rem 1.5rem black',
      },
      colors: {
        setPurpleDark: '#583D72',
        setPurpleLight: '#9F5F80',
        setCoral: '#FF8474',
        setPeach: '#FFC996'
      },
  },
  plugins: [],
}}