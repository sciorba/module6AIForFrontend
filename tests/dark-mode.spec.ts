import { test, expect } from "@playwright/test";
import { goToDashboard, ensureLightMode } from "./helpers/test-helpers";

test.describe("Dark Mode", () => {
  test.beforeEach(async ({ page }) => {
    await goToDashboard(page);
    await ensureLightMode(page);
  });

  test("starts in light mode with correct toggle label", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    const toggle = page.getByLabel("Switch to dark mode");
    await expect(toggle).toBeVisible();
  });

  test("toggles to dark mode on click", async ({ page }) => {
    await page.getByLabel("Switch to dark mode").click();

    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    // Button label should change
    await expect(page.getByLabel("Switch to light mode")).toBeVisible();
  });

  test("toggles back to light mode", async ({ page }) => {
    // Go dark
    await page.getByLabel("Switch to dark mode").click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Go light
    await page.getByLabel("Switch to light mode").click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("persists dark mode preference in localStorage", async ({ page }) => {
    await page.getByLabel("Switch to dark mode").click();

    const stored = await page.evaluate(() => localStorage.getItem("theme"));
    expect(stored).toBe("dark");

    // Toggle back
    await page.getByLabel("Switch to light mode").click();
    const storedAfter = await page.evaluate(() => localStorage.getItem("theme"));
    expect(storedAfter).toBe("light");
  });

  test("dark mode persists across page reload", async ({ page }) => {
    await page.getByLabel("Switch to dark mode").click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Reload
    await page.reload();
    await page.waitForSelector("section[aria-label='Dashboard statistics']");

    // Should still be dark
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByLabel("Switch to light mode")).toBeVisible();
  });
});
