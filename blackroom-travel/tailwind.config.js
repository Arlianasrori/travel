/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
        sedgwickave: ["Sedgwick Ave, cursive"]
      },
      colors:{
        'snow' : '#F6EFEE',
        'secol' : '#5D92FF',
        'sectext': '#4A4A4A',
        'accent-color': '#4380FF',
        'main-bg': '#F9F9F9',
        'button-text' : '#F7F7F8',
        'text-color' : '#2B2B2B',
        'shadow-color' : '#B6B6B6',
        'box-color' : '#F7F7F8',
        'bg-color' : '#FBFBFB',
        'bg-color-ea' : '#EAEAEA',
        'gray-text' : '#0E0F1D',
        'card-color' : '#F7F7F8',
        'shadow-color' : '#B6B6B6'
      },
      brightness:{
        80: '.80'
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '12': '12px'
      },
      spacing:{
        '18' : '4.5rem',
        '22' : '86px',
        '86' : '22rem',
        '60' : '60px',
        '170' : '612px',
        '19' : '79px',
        '38' : '9.5rem'
      },fontSize: {
        'xxs' : '0.6rem',
        'sma' : '10px'
      }
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [
  ],
}

