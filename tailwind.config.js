/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cardiff: {
          red: '#D50032', 
          dark: '#231F20', 
          grey: '#A7A8AA', 
          light: '#F5F5F5', 
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 