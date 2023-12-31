/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{tsx,html,css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
}

