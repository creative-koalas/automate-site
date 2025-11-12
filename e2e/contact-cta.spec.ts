import { test, expect } from "@playwright/test";

test("CTA scrolls to contact section", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "联系我们" }).click();
  await expect(page).toHaveURL(/#contact/);
  await expect(page.locator("#contact")).toBeVisible();
});
