import { test, expect } from "@playwright/test";

test("anchor links jump", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "特性" }).click();
  await expect(page).toHaveURL(/#features/);
  await expect(page.locator("#features")).toBeVisible();
});
