/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#041B39",
        secondary: "#609D2F",
        green: "#A6D37F",
        gray: "#101828",
      },
    },
    container: {
      screens: {
        sm: "1280px",
        md: "1280px",
        lg: "1280px",
        xl: "1280px",
      },
      center: true,
    },
  },
  plugins: [],
};