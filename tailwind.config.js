/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '431px',
      'lg': '767px',
      'xxl': '2000px'
    },
    extend: {
      keyframes: {
        breathe: {
          '0%, 100%': {transform: 'scale(100%)'},
          '50%': {transform: 'scale(105%)'}
        },
        float: {
          '0%, 100%' : { transform: 'translateY(0px)' },
          '50%' : { transform: 'translateY(10px)' },
        },
        floatxs: {
          '0%, 100%' : { transform: 'translateY(0px)' },
          '50%' : { transform: 'translateY(5px)' },
        }
      },
      animationDuration: {
        '1s': '1s',
        '1.25s': '1.25s',
        '1.35s': '1.35s',
        '1.45s': '1.45s',
        '1.5s': '1.5s',
        '1.55s': '1.55s',
        '1.6s': '1.6s',
        '1.65s': '1.65s',
        '1.75s' : '1.75s',
        '1.8s' : '1.8s',
        '1.85s' : '1.85s',
        '1.9s' : '1.9s',
        '1.95s' : '1.95s',
        '2s': '2s',
        '2.25s' : '2.25s',
        '2.5s' : '2.5s',
        '3s': '3s',
        '5s': '5s',
      },
      animation: {
        bobble: 'bobble 3s ease-in-out infinite',
        bobbleFast: 'bobble 1s ease-in-out infinite',
        breathe: 'breathe 2s ease-in-out infinite',
        float: 'float 2s ease-in-out infinite',
        floatxs: 'floatxs 2.5s ease-in-out infinite'
      },
      transitionDuration: {
        '1s': '1s',
        '1.25s': '1.25s',
        '1.5s': '1.5s',
        '2s': '2s',
      },
      boxShadow: {
        'block-xs': '0.25rem 0.25rem',
        'block-sm': '0.5rem 0.5rem',
        'block-smmd': '0.75rem 0.75rem',
        'block-md': '1rem 1rem',
        'block-lg': '1.5rem 1.5rem',
      },
      colors: {
        setPurpleDark: '#583D72',
        setPurpleDarkHover: '#795999',
        setPurpleLight: '#9F5F80',
        setCoral: '#FF8474',
        setPeach: '#ffe5cc',
        setPeachLight: '#FFC996',
        setRed: '#f7b2c5'
      }
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}}