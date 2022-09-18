module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#282260",
        theme: "#716DFF",
        light: "#E9E8F6",
        white: "#FBF7F6",

        red: "#FF5857",
        red_light: "#f77070",
        orange: "#FCB068",
        green: "#9AE0BA",
      },
      spacing: {
        "0.5px": "0.5px",
        "1px": "1px",
      },
      boxShadow: {
        alpha: "0px 20px 30px -10px",
      },
    },
  },
  plugins: [],
};
