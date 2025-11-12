import { test, expect } from "@playwright/test";

// Mobile menu toggle
test.describe("mobile nav", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("open menu", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.getByLabel("打开菜单").click();
    await expect(page.getByRole("link", { name: "特性" })).toBeVisible();
  });
});
