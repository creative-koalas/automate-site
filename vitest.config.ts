import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import path from "path";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(root, "."),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    globals: true,
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    exclude: ["e2e/**", "node_modules/**"],
  },
});
