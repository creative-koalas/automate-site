import { test, expect } from "@playwright/test";

// Video element visible with poster and controls
test("video has poster and controls", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const video = page.locator("video");
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("poster", /og\.svg$/);
  await expect(video).toHaveAttribute("controls", /.+/);
});
