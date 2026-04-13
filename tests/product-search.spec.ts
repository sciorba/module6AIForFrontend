import { test, expect } from "@playwright/test";

const URL = "/module-3/exercise-5";

test.describe("Product Search — Search Input", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('[data-testid="results-count"]');
  });

  test("displays all 16 products by default (paginated)", async ({ page }) => {
    await expect(page.getByTestId("results-count")).toContainText("16 products found");
    // Page 1 shows 6 items
    const items = page.locator('article[aria-label^="Product:"]');
    await expect(items).toHaveCount(6);
  });

  test("search with valid query filters results", async ({ page }) => {
    await page.fill("#product-search", "headphones");
    await expect(page.getByTestId("results-count")).toContainText("1 product found");
    await expect(page.getByText("Wireless Headphones")).toBeVisible();
  });

  test("search is case-insensitive", async ({ page }) => {
    await page.fill("#product-search", "YOGA");
    await expect(page.getByTestId("results-count")).toContainText("1 product found");
    await expect(page.getByRole("heading", { name: "Yoga Mat" })).toBeVisible();
  });

  test("search matches description text", async ({ page }) => {
    await page.fill("#product-search", "noise-cancelling");
    await expect(page.getByTestId("results-count")).toContainText("1 product found");
    await expect(page.getByRole("heading", { name: "Wireless Headphones" })).toBeVisible();
  });

  test("search with no results shows empty state", async ({ page }) => {
    await page.fill("#product-search", "xyznonexistent");
    await expect(page.getByTestId("results-count")).toContainText("0 products found");
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await expect(page.getByText("No products found")).toBeVisible();
  });
});

test.describe("Product Search — Category Filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('[data-testid="results-count"]');
  });

  test("filter by Electronics category", async ({ page }) => {
    await page.selectOption("#category-filter", "electronics");
    await expect(page.getByTestId("results-count")).toContainText("5 products found");
  });

  test("filter by Books category", async ({ page }) => {
    await page.selectOption("#category-filter", "books");
    await expect(page.getByTestId("results-count")).toContainText("2 products found");
  });

  test("switching category resets to page 1", async ({ page }) => {
    // Go to page 2 first
    await page.getByLabel("Page 2").click();
    await expect(page.getByLabel("Page 2")).toHaveAttribute("aria-current", "page");
    // Switch category — electronics has 5 items, fits on 1 page
    await page.selectOption("#category-filter", "electronics");
    await expect(page.getByTestId("results-count")).toContainText("5 products found");
    // Pagination should be gone (5 items fit on 1 page)
    await expect(page.getByLabel("Page 2")).toBeHidden();
  });
});

test.describe("Product Search — Price Range Filter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('[data-testid="results-count"]');
  });

  test("filter under $25", async ({ page }) => {
    await page.selectOption("#price-filter", "under-25");
    await expect(page.getByTestId("results-count")).toContainText("3 products found");
  });

  test("filter over $100", async ({ page }) => {
    await page.selectOption("#price-filter", "over-100");
    await expect(page.getByTestId("results-count")).toContainText("4 products found");
  });

  test("combine category and price filter", async ({ page }) => {
    await page.selectOption("#category-filter", "electronics");
    await page.selectOption("#price-filter", "over-100");
    await expect(page.getByTestId("results-count")).toContainText("2 products found");
  });
});

test.describe("Product Search — Sort", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('[data-testid="results-count"]');
  });

  test("sort by price low to high", async ({ page }) => {
    await page.selectOption("#sort-select", "price-asc");
    const firstCard = page.locator('article[aria-label^="Product:"]').first();
    await expect(firstCard).toContainText("Science Fiction Novel");
  });

  test("sort by price high to low", async ({ page }) => {
    await page.selectOption("#sort-select", "price-desc");
    const firstCard = page.locator('article[aria-label^="Product:"]').first();
    await expect(firstCard).toContainText("Wireless Headphones");
  });

  test("sort by top rated", async ({ page }) => {
    await page.selectOption("#sort-select", "rating-desc");
    const firstCard = page.locator('article[aria-label^="Product:"]').first();
    await expect(firstCard).toContainText("Programming Guide");
  });

  test("sort by name Z-A", async ({ page }) => {
    await page.selectOption("#sort-select", "name-desc");
    const firstCard = page.locator('article[aria-label^="Product:"]').first();
    await expect(firstCard).toContainText("Yoga Mat");
  });
});

test.describe("Product Search — Pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('[data-testid="results-count"]');
  });

  test("shows pagination for 16 items (3 pages at 6 per page)", async ({ page }) => {
    await expect(page.getByLabel("Page 1")).toBeVisible();
    await expect(page.getByLabel("Page 2")).toBeVisible();
    await expect(page.getByLabel("Page 3")).toBeVisible();
  });

  test("navigate to page 2", async ({ page }) => {
    await page.getByLabel("Page 2").click();
    await expect(page.getByLabel("Page 2")).toHaveAttribute("aria-current", "page");
    const items = page.locator('article[aria-label^="Product:"]');
    await expect(items).toHaveCount(6);
  });

  test("navigate to last page shows remaining items", async ({ page }) => {
    await page.getByLabel("Page 3").click();
    const items = page.locator('article[aria-label^="Product:"]');
    await expect(items).toHaveCount(4); // 16 - 6 - 6 = 4
  });

  test("Previous button disabled on first page", async ({ page }) => {
    await expect(page.getByLabel("Previous page")).toBeDisabled();
  });

  test("Next button navigates forward", async ({ page }) => {
    await page.getByLabel("Next page").click();
    await expect(page.getByLabel("Page 2")).toHaveAttribute("aria-current", "page");
  });

  test("Next button disabled on last page", async ({ page }) => {
    await page.getByLabel("Page 3").click();
    await expect(page.getByLabel("Next page")).toBeDisabled();
  });
});

test.describe("Product Search — Clear Filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.waitForSelector('[data-testid="results-count"]');
  });

  test("Clear Filters button appears when filters are active", async ({ page }) => {
    await expect(page.getByText("Clear Filters")).toBeHidden();
    await page.selectOption("#category-filter", "electronics");
    await expect(page.getByText(/Clear Filters/)).toBeVisible();
  });

  test("Clear Filters resets all filters", async ({ page }) => {
    await page.fill("#product-search", "test");
    await page.selectOption("#category-filter", "books");
    await page.selectOption("#price-filter", "25-50");
    await page.getByText(/Clear Filters/).click();

    await expect(page.getByTestId("results-count")).toContainText("16 products found");
    await expect(page.locator("#product-search")).toHaveValue("");
    await expect(page.locator("#category-filter")).toHaveValue("all");
    await expect(page.locator("#price-filter")).toHaveValue("all");
  });

  test("Clear Filters button shows active filter count", async ({ page }) => {
    await page.selectOption("#category-filter", "sports");
    await expect(page.getByText("Clear Filters (1)")).toBeVisible();

    await page.fill("#product-search", "shoes");
    await expect(page.getByText("Clear Filters (2)")).toBeVisible();
  });
});

test.describe("Product Search — Responsive", () => {
  test("mobile: products display in single column", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(URL);
    await page.waitForSelector('[data-testid="results-count"]');

    const grid = page.locator('[role="list"][aria-label="Product results"]');
    const cols = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
    expect(cols.split(" ").length).toBe(1);
  });

  test("desktop: products display in 3 columns", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(URL);
    await page.waitForSelector('[data-testid="results-count"]');

    const grid = page.locator('[role="list"][aria-label="Product results"]');
    const cols = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns);
    expect(cols.split(" ").length).toBe(3);
  });
});
