import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Swap accent to #FFFD74 if you want the thegoodscale.com butter yellow
        accent: "#FFE14D",
        "accent-soft": "#FFF9DB",
        ink: "#111111",
        surface: "#FAFAF7",
        card: "#FFFFFF",
        line: "#ECECE6",
        muted: "#8A8A82",
        up: "#1F9D55",
        down: "#D64545",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(17, 17, 17, 0.04)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
