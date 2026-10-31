/** @type {import('tailwindcss').Config} */

// Neutral (zinc), accent (ice) and white are CSS variables so themes can swap
// them at runtime. Values live in src/index.css under [data-theme=...].
const scale = (prefix, steps) =>
  Object.fromEntries(steps.map((s) => [s, `rgb(var(--${prefix}-${s}) / <alpha-value>)`]));

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        white: "rgb(var(--white) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        zinc: scale("z", [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
        ice: scale("i", [50, 200, 300, 400, 500, 600]),
      },
    },
  },
  plugins: [],
};
