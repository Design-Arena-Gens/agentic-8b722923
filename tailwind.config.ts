import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#4338ca",
          600: "#3730a3",
          700: "#312e81"
        },
        secondary: {
          100: "#f3f4f6",
          500: "#6b7280",
          700: "#374151"
        }
      }
    }
  },
  plugins: []
};

export default config;
