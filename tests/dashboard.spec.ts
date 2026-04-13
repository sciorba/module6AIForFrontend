import { test, expect } from "@playwright/test";
import { goToDashboard, ensureLightMode, selectors } from "./helpers/test-helpers";

test.describe("Dashboard — Statistics & Task Board", () => {
  test.beforeEach(async ({ page }) => {
    await goToDashboard(page);
    await ensureLightMode(page);
  });

  test("displays four KPI stat cards", async ({ page }) => {
    const stats = page.locator(selectors.statsSection);
    await expect(stats).toBeVisible();
    await expect(stats.getByText("Total Tasks")).toBeVisible();
    await expect(stats.getByText("24")).toBeVisible();
    await expect(stats.getByText("Completed")).toBeVisible();
    await expect(stats.getByText("12", { exact: true })).toBeVisible();
    await expect(stats.getByText("In Progress")).toBeVisible();
    await expect(stats.getByText("8", { exact: true })).toBeVisible();
    await expect(stats.getByText("Overdue")).toBeVisible();
    await expect(stats.getByText("4", { exact: true })).toBeVisible();
  });

  test("shows trend indicators on stat cards", async ({ page }) => {
    const stats = page.locator(selectors.statsSection);
    await expect(stats.getByText("+12% from last week")).toBeVisible();
    await expect(stats.getByText("2% from last week", { exact: true })).toBeVisible();
  });

  test("displays all task cards when 'All' filter is active", async ({ page }) => {
    const allTab = page.getByRole("tab", { name: "All" });
    await expect(allTab).toHaveAttribute("aria-selected", "true");
    const cards = page.locator(selectors.taskCards);
    await expect(cards).toHaveCount(10);
  });

  test("filters tasks by 'To Do' status", async ({ page }) => {
    await page.getByRole("tab", { name: "To Do" }).click();
    const cards = page.locator(selectors.taskCards);
    await expect(cards).toHaveCount(4);
    // Verify all shown tasks have "To Do" badge
    for (const card of await cards.all()) {
      await expect(card.getByText("To Do")).toBeVisible();
    }
  });

  test("filters tasks by 'In Progress' status", async ({ page }) => {
    await page.getByRole("tab", { name: "In Progress" }).click();
    const cards = page.locator(selectors.taskCards);
    await expect(cards).toHaveCount(3);
  });

  test("filters tasks by 'Done' status", async ({ page }) => {
    await page.getByRole("tab", { name: "Done" }).click();
    const cards = page.locator(selectors.taskCards);
    await expect(cards).toHaveCount(3);
  });

  test("task card displays priority, title, assignee, and due date", async ({ page }) => {
    const firstCard = page.locator('article[aria-label="Task: Redesign landing page hero section"]');
    await expect(firstCard).toBeVisible();
    await expect(firstCard.getByText("high")).toBeVisible();
    await expect(firstCard.getByText("In Progress")).toBeVisible();
    await expect(firstCard.getByText("Sarah Chen")).toBeVisible();
    await expect(firstCard.getByText("Apr 15")).toBeVisible();
  });

  test("task card displays tags", async ({ page }) => {
    const firstCard = page.locator('article[aria-label="Task: Redesign landing page hero section"]');
    await expect(firstCard.getByText("design", { exact: true })).toBeVisible();
    await expect(firstCard.getByText("frontend", { exact: true })).toBeVisible();
  });
});
