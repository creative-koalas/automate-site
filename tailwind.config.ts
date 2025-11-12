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
          DEFAULT: "#3B82F6",
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
