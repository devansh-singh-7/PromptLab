import { expect, test } from "@playwright/test";

test("landing page is available", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Don't just use AI. Learn to master it." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Log in" }).first()).toHaveAttribute(
    "href",
    "/login",
  );
  await expect(page.getByRole("link", { name: /Start learning/i }).first()).toHaveAttribute(
    "href",
    "/login?next=%2Fdashboard",
  );
});
