import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1a1a2e",
        foreground: "#eaeaea",
        primary: "#4f46e5",
        secondary: "#6b7280",
        accent: "#00f5d4",
        backgroundLiquid: "linear-gradient(to right, #6a11cb, #2575fc)",
        foregroundLiquid: "linear-gradient(to right, #6a11cb, #2575fc)",
      },
    },
  },
  plugins: [],
} satisfies Config;
