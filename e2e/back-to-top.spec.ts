import { test, expect } from "@playwright/test";

test("back to top scrolls to #top", async ({ page }) => {
  await page.goto("/");
  // scroll down
  await page.evaluate(() => window.scrollTo({ top: 1000, behavior: "auto" }));
  const before = await page.evaluate(() => window.scrollY);
  expect(before).toBeGreaterThan(0);
  // click button
  await page.getByRole("link", { name: "返回顶部" }).click();
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => window.scrollY);
  expect(after).toBeLessThan(before);
});
