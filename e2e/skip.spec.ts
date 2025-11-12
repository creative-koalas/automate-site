import { test, expect } from "@playwright/test";

// Skip link should appear on Tab and jump to main content
test("skip link focus and jump", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.keyboard.press("Tab");
  const skip = page.locator(".skip-link");
  await expect(skip).toBeVisible();
  await skip.press("Enter");
  await expect(page.locator("#main-content")).toBeVisible();
});
