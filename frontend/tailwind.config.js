/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Marcellus', 'serif'],
        body: ['Mulish', 'sans-serif'],
      },
      colors: {
        forest: '#173505',
        cream: '#fbf7e4',
        ivory: '#f5f1cd',
        amber: '#ffc95c',
        orange: '#ef9821',
        brightOrange: '#f46b24',
        raspberry: '#c92e52',
        mint: '#96ae6d',
        olive: '#7c9853',
        moss: '#425422',
      },
    },
  },
  plugins: [],
};