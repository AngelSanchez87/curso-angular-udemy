/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat Alternates"', 'sans-serif'],
      },
      animation: {
        fadeIn: "fadeIn 0.7s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      }
    }
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["night"],
  },
}
