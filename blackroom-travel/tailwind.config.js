/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins, sans-serif"]
      },
      colors:{
        'snow' : '#F6EFEE',
        'secol' : '#5D92FF',
        'sectext': '#4A4A4A',
        'accent-color': '#4380FF',
        'main-bg': '#F9F9F9',
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
        '86' : '22rem',
        '60' : '60px'
      }
    }
  },
  plugins: [],
}

