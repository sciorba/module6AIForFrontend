import { test, expect } from "@playwright/test";
import { goToDashboard, selectors } from "./helpers/test-helpers";

test.describe("Responsive Design", () => {
  test("mobile: sidebar is hidden, hamburger is visible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await goToDashboard(page);

    // Desktop sidebar should be hidden on mobile
    const sidebar = page.locator("aside").first();
    await expect(sidebar).toBeHidden();

    // Hamburger button should be visible
    const toggle = page.locator(selectors.sidebarToggle);
    await expect(toggle).toBeVisible();
  });

  test("mobile: hamburger opens sidebar overlay", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await goToDashboard(page);

    await page.locator(selectors.sidebarToggle).click();

    // Mobile sidebar overlay should now be visible
    const mobileSidebar = page.locator("aside.fixed").last();
    await expect(mobileSidebar).toBeVisible();
    await expect(mobileSidebar.getByText("Dashboard")).toBeVisible();
  });

  test("mobile: KPI cards stack in single column", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await goToDashboard(page);

    const grid = page.locator(selectors.statsSection).locator("div").first();
    const style = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
    // Single column should have only one column track
    expect(style.split(" ").length).toBe(1);
  });

  test("tablet: sidebar is visible, hamburger is hidden", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await goToDashboard(page);

    // Desktop sidebar should be visible
    const sidebar = page.locator("aside").first();
    await expect(sidebar).toBeVisible();

    // Hamburger should be hidden on tablet
    const toggle = page.locator(selectors.sidebarToggle);
    await expect(toggle).toBeHidden();
  });

  test("desktop: sidebar shows full labels", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await goToDashboard(page);

    const nav = page.locator(selectors.sidebarNav);
    await expect(nav.getByText("Dashboard")).toBeVisible();
    await expect(nav.getByText("Settings")).toBeVisible();
  });

  test("desktop: KPI cards display in 4 columns", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await goToDashboard(page);

    const grid = page.locator(selectors.statsSection).locator("div").first();
    const style = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
    // 4 columns at lg breakpoint
    expect(style.split(" ").length).toBe(4);
  });
});
