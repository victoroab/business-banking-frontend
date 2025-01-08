/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pryColor: { DEFAULT: "#0E0C60", Light: "#F8FBFE" },
        secColor: { DEFAULT: "#DBB950", Light: "#FDFCF8" },
        greyColr: "#352F36",
        lightGreyColor: "#777777",
        black: "#000000",
        negativeRed: "#EE443F",
        nagative: { DEFAULT: "#EE443F", Light: "#FFF8F8" },
        positive: { DEFAULT: "#25A969", Light: "#F6FCF9" },
        amount: "#162458",
        statusBlue: "#1C7CD5",
      },
      boxShadow: {
        default: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
      },
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', "sans-serif"],
        workSans: ['"Work Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
