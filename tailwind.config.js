/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pryColor: { DEFAULT: "#0E0C60", Light: "#F8FBFE" },
        secColor: "#DBB950",
        greyColr: "#352F36",
        lightGreyColor: "#777777",
        black: "#000000",
        negativeRed: "#EE443F",
        nagative: "#EE443F",
        positive: "#25A969",
        amount: "#162458",
      },
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', "sans-serif"],
        workSans: ['"Work Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
