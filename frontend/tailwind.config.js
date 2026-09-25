/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF8",
        ink: {
          900: "#1C1B1A",
          500: "#78766E",
          300: "#B5B2A8",
        },
        line: "#DEDBD1",
        mark: "#B3261E",
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
}

