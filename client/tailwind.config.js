/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", // all React files
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        lightgreen: "#7EB77F",
        grey: "#ADB6B0",
        lime: "#D8FF91",
      }
    },
  },
  plugins: [],
};
