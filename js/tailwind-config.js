// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  safelist: [
    "dark:bg-gray-800",
    "dark:bg-gray-700",
    "dark:text-white",
    "dark:border-gray-600",
    "dark:bg-blue-500"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
