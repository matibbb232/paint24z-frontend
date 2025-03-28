import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        highlightRed: "#A13F3F",
        backgroundSecondary: "var(--background-secondary)",
        gray: "#808080",
        highlightGreen: "#3FA160",
        highlightYellow: "#D89A27"
      },
      fontFamily: {
        jaro: ['"Jaro"']
      }
    },
  },
  plugins: [],
} satisfies Config;
