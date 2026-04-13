import { test, expect } from "@playwright/test";
import { goToDashboard, ensureLightMode, selectors } from "./helpers/test-helpers";

test.describe("Navigation — Sidebar", () => {
  test.beforeEach(async ({ page }) => {
    await goToDashboard(page);
    await ensureLightMode(page);
  });

  test("sidebar displays all navigation items", async ({ page }) => {
    const nav = page.locator(selectors.sidebarNav);
    await expect(nav.getByText("Dashboard")).toBeVisible();
    await expect(nav.getByText("Tasks")).toBeVisible();
    await expect(nav.getByText("Calendar")).toBeVisible();
    await expect(nav.getByText("Team")).toBeVisible();
    await expect(nav.getByText("Reports")).toBeVisible();
    await expect(nav.getByText("Settings")).toBeVisible();
  });

  test("Dashboard link is highlighted as active", async ({ page }) => {
    const dashboardLink = page.locator(selectors.sidebarNav).getByText("Dashboard");
    const parentLink = dashboardLink.locator("..");
    await expect(parentLink).toHaveClass(/bg-blue-50/);
  });

  test("sidebar collapses and expands on desktop", async ({ page }) => {
    // Desktop viewport — sidebar is visible
    const collapseBtn = page.getByLabel("Collapse sidebar");
    await expect(collapseBtn).toBeVisible();
    await collapseBtn.click();

    // After collapse, labels should be hidden
    const expandBtn = page.getByLabel("Expand sidebar");
    await expect(expandBtn).toBeVisible();

    // Expand again
    await expandBtn.click();
    await expect(page.getByLabel("Collapse sidebar")).toBeVisible();
  });

  test("notification bell shows badge count", async ({ page }) => {
    const btn = page.locator(selectors.notificationsBtn);
    await expect(btn).toBeVisible();
    await expect(btn.locator("span")).toContainText("3");
  });

  test("user menu opens and closes", async ({ page }) => {
    const menuBtn = page.locator(selectors.userMenuBtn);
    await menuBtn.click();

    const dropdown = page.locator(selectors.userMenuDropdown);
    await expect(dropdown).toBeVisible();
    await expect(dropdown.getByText("Jane Cooper")).toBeVisible();
    await expect(dropdown.getByText("jane@gridstore.com")).toBeVisible();
    await expect(dropdown.getByRole("menuitem", { name: "Your Profile" })).toBeVisible();
    await expect(dropdown.getByRole("menuitem", { name: "Sign out" })).toBeVisible();

    // Close by pressing Escape
    await page.keyboard.press("Escape");
    await expect(dropdown).toBeHidden();
  });
});
