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
        // Primary font for normal text (fallback fonts for regular weight)
        primary: ['"Helvetica Neue"', ...fontFamily.sans],
        // Custom bold font
        "primary-bold": [
          '"Helvetica Neue W23 for SKY"',
          '"Helvetica Neue"',
          ...fontFamily.sans,
        ],
        // Override default sans to use normal fallback for regular text
        sans: ['"Helvetica Neue"', ...fontFamily.sans],
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
