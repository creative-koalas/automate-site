import { test, expect } from "@playwright/test";

test("features grid renders four cards", async ({ page }) => {
  await page.goto("/");
  const features = page.locator("section#features h3");
  await expect(features).toHaveCount(4);
});
