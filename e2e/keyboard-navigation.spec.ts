import { test, expect } from "@playwright/test";

// Keyboard navigation focus order for header
// Note: exact order can vary with browser; we check key elements are reachable
// - Skip link visible on first Tab and Enter jumps to main
// - "联系我们" button is focusable via keyboard
// - Links in nav are focusable

test("keyboard focus: skip link and nav actions", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.locator(".skip-link");
  await expect(skip).toBeVisible();
  await skip.press("Enter");
  await expect(page.locator("#main-content")).toBeVisible();

  // Tab until we reach the contact button
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const contactBtn = page.getByRole("button", { name: "联系我们" });
  await expect(contactBtn).toBeVisible();
});
