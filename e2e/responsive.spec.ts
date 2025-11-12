import { test, expect } from "@playwright/test";

// Responsive checks for nav visibility on breakpoints
test.describe("responsive nav", () => {
  test("mobile: nav links hidden until menu open", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "特性" })).toBeHidden();
    await page.getByLabel("打开菜单").click();
    await expect(page.getByRole("link", { name: "特性" })).toBeVisible();
  });

  test("desktop: nav links visible", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");
    await expect(page.getByRole("link", { name: "特性" })).toBeVisible();
  });
});
