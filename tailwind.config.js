/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#eebd2b",
        "background-light": "#f8f7f6",
        "background-dark": "#1a1814",
        "warm-beige": "#f2eee3",
        "soft-cream": "#fdfaf5",
        "pale-sand": "#f7f3e9",
        "royal-blue": "#1E3A8A",
        "ivory-luxury": "#FCFAF7",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
