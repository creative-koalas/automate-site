import { test, expect } from "@playwright/test";

// Theme toggle should change html class
test("theme toggle switches class on html", async ({ page }) => {
  await page.goto("http://localhost:3000");
  // initial dark by default
  const cls = await page.evaluate(() => document.documentElement.className);
  // click toggle
  await page.getByRole("button", { name: "切换主题" }).click();
  const cls2 = await page.evaluate(() => document.documentElement.className);
  expect(cls2).not.toBe(cls);
});
