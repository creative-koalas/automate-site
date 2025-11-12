import { test, expect } from "@playwright/test";

test("nav highlights active section on anchor", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "特性" }).click();
  const featuresLink = page.getByRole("link", { name: "特性" });
  await expect(featuresLink).toHaveAttribute("aria-current", "page");
});
