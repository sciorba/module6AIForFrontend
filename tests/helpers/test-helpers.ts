import type { Page } from "@playwright/test";

export const DASHBOARD_URL = "/module-2/instructor-demo";

/** Navigate to the task management dashboard and wait for it to load. */
export async function goToDashboard(page: Page) {
  await page.goto(DASHBOARD_URL);
  await page.waitForSelector("section[aria-label='Dashboard statistics']");
}

/** Ensure the page is in light mode. */
export async function ensureLightMode(page: Page) {
  await page.evaluate(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  });
}

/** Ensure the page is in dark mode. */
export async function ensureDarkMode(page: Page) {
  await page.evaluate(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  });
}

/** Selectors used across multiple test files. */
export const selectors = {
  // Header
  darkModeToggle: 'button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]',
  sidebarToggle: 'button[aria-label="Toggle sidebar"]',
  notificationsBtn: 'button[aria-label="Notifications (3 unread)"]',
  userMenuBtn: 'button[aria-label="User menu"]',
  userMenuDropdown: 'div[role="menu"]',

  // Sidebar
  sidebarNav: 'nav[aria-label="Sidebar navigation"]',
  collapseBtn: 'button[aria-label="Collapse sidebar"], button[aria-label="Expand sidebar"]',

  // Stats
  statsSection: 'section[aria-label="Dashboard statistics"]',

  // Task board
  taskBoard: 'section[aria-label="Task board"]',
  filterTablist: 'div[role="tablist"]',
  taskCards: 'article[aria-label^="Task:"]',
} as const;
