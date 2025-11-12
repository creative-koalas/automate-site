import { test, expect } from "@playwright/test";

// Validate reduced motion toggles video attributes
// In reduced-motion, video should not be muted or loop (per implementation)
test("video attributes respect reduced motion", async ({ page, context }) => {
  await context.grantPermissions([]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const video = page.locator("video");
  await expect(video).toBeVisible();
  // evaluate properties instead of attributes
  const muted = await video.evaluate((el: HTMLVideoElement) => el.muted);
  const loop = await video.evaluate((el: HTMLVideoElement) => el.loop);
  expect(muted).toBeFalsy();
  expect(loop).toBeFalsy();
});
