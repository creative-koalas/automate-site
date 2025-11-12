import { test, expect } from "@playwright/test";

test("video fallback on error", async ({ page }) => {
  await page.goto("/?broken=1");
  await expect(page.getByText(/视频加载失败/)).toBeVisible();
});
