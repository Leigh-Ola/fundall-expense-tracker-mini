module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "theme-green": "#4DE897",
        "theme-green-dark": "#4CE895",
        "theme-green-darkest": "#27AE60",
        "theme-grayish": "#F2F3F7",
        "theme-grayish-dark": "#EFEFEF",
        "theme-grayish-base": "#E5E5E5",
        "theme-border": "#CAD0C9",
      },
    },
  },
  plugins: [],
};
