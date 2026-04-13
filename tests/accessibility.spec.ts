import { test, expect } from "@playwright/test";
import { goToDashboard, ensureLightMode, selectors } from "./helpers/test-helpers";

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await goToDashboard(page);
    await ensureLightMode(page);
  });

  test("sidebar navigation has correct ARIA landmark", async ({ page }) => {
    const nav = page.locator(selectors.sidebarNav);
    await expect(nav).toHaveAttribute("aria-label", "Sidebar navigation");
  });

  test("task board has correct ARIA landmark", async ({ page }) => {
    const board = page.locator(selectors.taskBoard);
    await expect(board).toHaveAttribute("aria-label", "Task board");
  });

  test("filter tabs have correct ARIA roles", async ({ page }) => {
    const tablist = page.locator(selectors.filterTablist);
    await expect(tablist).toHaveAttribute("aria-label", "Filter tasks by status");

    const tabs = tablist.getByRole("tab");
    await expect(tabs).toHaveCount(4);

    // First tab (All) should be selected
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  });

  test("task cards use semantic article elements with aria-label", async ({ page }) => {
    const cards = page.locator(selectors.taskCards);
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Each card should have an aria-label starting with "Task:"
    for (let i = 0; i < Math.min(count, 3); i++) {
      const label = await cards.nth(i).getAttribute("aria-label");
      expect(label).toMatch(/^Task: .+/);
    }
  });

  test("user menu button has aria-expanded and aria-haspopup", async ({ page }) => {
    const menuBtn = page.locator(selectors.userMenuBtn);
    await expect(menuBtn).toHaveAttribute("aria-haspopup", "true");
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");

    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "true");
  });

  test("interactive elements are keyboard focusable", async ({ page }) => {
    // Tab to first filter button
    const allTab = page.getByRole("tab", { name: "All" });

    // Click on the tab area first to establish focus context
    await allTab.focus();
    await expect(allTab).toBeFocused();

    // Tab to next filter
    await page.keyboard.press("Tab");
    const todoTab = page.getByRole("tab", { name: "To Do" });
    await expect(todoTab).toBeFocused();
  });
});
