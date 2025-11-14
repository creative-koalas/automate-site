import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx,css}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3B82F6", // 主色（可替换）
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          foreground: "#ffffff",
        },
        surface: {
          DEFAULT: "#0b1220",
          soft: "#0e1526",
        }
      },
      borderRadius: {
        brand: "1rem"
      }
    },
  },
  plugins: [heroui()],
} satisfies Config;
