// tailwind.config.js
const { heroui } = require("@heroui/theme");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(checkbox|select|form|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary custom font with proper fallbacks
        primary: [
          '"Helvetica Neue W23 for SKY"',
          '"Helvetica Neue"',
          ...fontFamily.sans,
        ],
        // Override default sans to use our custom font
        sans: [
          '"Helvetica Neue W23 for SKY"',
          '"Helvetica Neue"',
          ...fontFamily.sans,
        ],
        // Specific utility classes
        sky: [
          '"Helvetica Neue W23 for SKY"',
          '"Helvetica Neue"',
          ...fontFamily.sans,
        ],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
