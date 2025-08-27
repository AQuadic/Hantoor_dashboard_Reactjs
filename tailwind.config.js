// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(checkbox|select|form|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js",
  ],
  theme: {
    extend: {
      // Font configuration moved to CSS-first approach in index.css
      // Using Tailwind v4 @theme directive for optimal performance
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
