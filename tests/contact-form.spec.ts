import { test, expect } from "@playwright/test";

const URL = "/module-3/exercise-6";

test.describe("Contact Form — Rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test("displays all form fields", async ({ page }) => {
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#subject")).toBeVisible();
    await expect(page.locator("#category")).toBeVisible();
    await expect(page.locator("#message")).toBeVisible();
    await expect(page.locator("#subscribe")).toBeVisible();
  });

  test("submit and reset buttons are visible", async ({ page }) => {
    await expect(page.getByTestId("submit-btn")).toBeVisible();
    await expect(page.getByTestId("submit-btn")).toContainText("Send Message");
    await expect(page.getByTestId("reset-btn")).toBeVisible();
  });

  test("category dropdown has all options", async ({ page }) => {
    const options = page.locator("#category option");
    await expect(options).toHaveCount(4);
    await expect(options.nth(0)).toHaveText("General Inquiry");
    await expect(options.nth(1)).toHaveText("Technical Support");
    await expect(options.nth(2)).toHaveText("Billing Question");
    await expect(options.nth(3)).toHaveText("Feedback");
  });
});

test.describe("Contact Form — Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test("shows all errors when submitting empty form", async ({ page }) => {
    await page.getByTestId("submit-btn").click();

    await expect(page.getByTestId("error-summary")).toBeVisible();
    await expect(page.getByTestId("error-summary")).toContainText("4 errors");

    await expect(page.locator("#name-error")).toContainText("Name is required");
    await expect(page.locator("#email-error")).toContainText("Email is required");
    await expect(page.locator("#subject-error")).toContainText("Subject is required");
    await expect(page.locator("#message-error")).toContainText("Message is required");
  });

  test("shows invalid email error", async ({ page }) => {
    await page.fill("#name", "Test User");
    await page.fill("#email", "not-an-email");
    await page.fill("#subject", "Test Subject");
    await page.fill("#message", "This is a test message.");
    await page.getByTestId("submit-btn").click();

    await expect(page.locator("#email-error")).toContainText("valid email");
    await expect(page.getByTestId("error-summary")).toContainText("1 error");
  });

  test("shows message too short error", async ({ page }) => {
    await page.fill("#name", "Test User");
    await page.fill("#email", "test@example.com");
    await page.fill("#subject", "Test");
    await page.fill("#message", "Short");
    await page.getByTestId("submit-btn").click();

    await expect(page.locator("#message-error")).toContainText("at least 10 characters");
  });

  test("inline errors have aria-invalid and role=alert", async ({ page }) => {
    await page.getByTestId("submit-btn").click();

    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#name-error")).toHaveAttribute("role", "alert");
  });

  test("error clears when user types in field", async ({ page }) => {
    await page.getByTestId("submit-btn").click();
    await expect(page.locator("#name-error")).toBeVisible();

    await page.fill("#name", "Jane");
    await expect(page.locator("#name-error")).toBeHidden();
  });
});

test.describe("Contact Form — Successful Submission", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test("submits valid form and shows success message", async ({ page }) => {
    await page.fill("#name", "Jane Cooper");
    await page.fill("#email", "jane@example.com");
    await page.fill("#subject", "Hello World");
    await page.fill("#message", "This is a test message for the contact form.");
    await page.getByTestId("submit-btn").click();

    // Button shows loading state
    await expect(page.getByTestId("submit-btn")).toContainText("Sending...");

    // Success message appears
    await expect(page.getByTestId("success-message")).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId("success-message")).toContainText("Message Sent");
    await expect(page.getByTestId("success-message")).toContainText("Jane Cooper");
    await expect(page.getByTestId("success-message")).toContainText("jane@example.com");
  });

  test("can send another message after success", async ({ page }) => {
    await page.fill("#name", "Test");
    await page.fill("#email", "test@test.com");
    await page.fill("#subject", "Test Subject");
    await page.fill("#message", "Long enough message here.");
    await page.getByTestId("submit-btn").click();

    await expect(page.getByTestId("success-message")).toBeVisible({ timeout: 5000 });
    await page.getByTestId("send-another").click();

    // Form should be reset and visible again
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#name")).toHaveValue("");
    await expect(page.locator("#email")).toHaveValue("");
  });

  test("submit with category selection and subscribe checked", async ({ page }) => {
    await page.fill("#name", "Jane");
    await page.fill("#email", "jane@test.com");
    await page.fill("#subject", "Billing Issue");
    await page.selectOption("#category", "billing");
    await page.fill("#message", "I have a billing question about my account.");
    await page.check("#subscribe");
    await page.getByTestId("submit-btn").click();

    await expect(page.getByTestId("success-message")).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Contact Form — Reset", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test("reset button clears all fields", async ({ page }) => {
    await page.fill("#name", "Jane Cooper");
    await page.fill("#email", "jane@example.com");
    await page.fill("#subject", "Test");
    await page.fill("#message", "Some message text");
    await page.check("#subscribe");

    await page.getByTestId("reset-btn").click();

    await expect(page.locator("#name")).toHaveValue("");
    await expect(page.locator("#email")).toHaveValue("");
    await expect(page.locator("#subject")).toHaveValue("");
    await expect(page.locator("#message")).toHaveValue("");
    await expect(page.locator("#subscribe")).not.toBeChecked();
    await expect(page.locator("#category")).toHaveValue("general");
  });

  test("reset clears validation errors", async ({ page }) => {
    await page.getByTestId("submit-btn").click();
    await expect(page.getByTestId("error-summary")).toBeVisible();

    await page.getByTestId("reset-btn").click();
    await expect(page.getByTestId("error-summary")).toBeHidden();
  });
});

test.describe("Contact Form — Character Counter", () => {
  test("message shows character count", async ({ page }) => {
    await page.goto(URL);
    await expect(page.getByText("0/500 characters")).toBeVisible();

    await page.fill("#message", "Hello World");
    await expect(page.getByText("11/500 characters")).toBeVisible();
  });
});

test.describe("Contact Form — Responsive", () => {
  test("form renders correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(URL);

    await expect(page.locator("#name")).toBeVisible();
    await expect(page.getByTestId("submit-btn")).toBeVisible();

    // Form should still be fully functional
    await page.getByTestId("submit-btn").click();
    await expect(page.getByTestId("error-summary")).toBeVisible();
  });
});
