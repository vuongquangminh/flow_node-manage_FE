// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/images/My-Khe-Beach-in-Da-Nang.png')",
      },
      colors: {
        primary: "#0000c8",
        "gray-250": "#484885",
        "white-150": "#f4f9f8"
      },
    },
  },
  plugins: [],
};
