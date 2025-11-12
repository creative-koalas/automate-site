import { test, expect } from "@playwright/test";

// Verify sections presence and content
test("sections present and feature cards", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("heading", { name: "让 AI 成为你的同事" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "主打特性" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "用户声音" })).toBeVisible();
  const cards = page.locator("section#features .card, section#features [data-slot='card']");
  await expect(cards).toHaveCount(4);
});
