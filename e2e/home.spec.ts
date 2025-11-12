import { test, expect } from "@playwright/test";

test("homepage has key sections", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("heading", { name: "让 AI 成为你的同事" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "主打特性" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "用户声音" })).toBeVisible();
});
