/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
      },
      colors: {
        ...colors,
        "midnights": "#0A3260"
      },
      backgroundImage: {
        background: "url('/background.svg')",
        arrowLeft: "url('/arrow-left.svg')",
        arrowRight: "url('/arrow-right.svg')",
        info: "url('/info.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
