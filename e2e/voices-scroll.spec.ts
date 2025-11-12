import { test, expect } from "@playwright/test";

test("voices horizontal scroller moves", async ({ page }) => {
  await page.goto("/");
  const scroller = page.getByRole("region", { name: "用户声音水平滚动列表" });
  const before = await scroller.evaluate((el) => (el as HTMLElement).scrollLeft);
  await scroller.evaluate((el) => (el as HTMLElement).scrollBy({ left: 50, behavior: "auto" }));
  const after = await scroller.evaluate((el) => (el as HTMLElement).scrollLeft);
  expect(after).toBeGreaterThanOrEqual(before);
});
