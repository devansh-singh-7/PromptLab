import { expect, test } from "@playwright/test";

test("login is keyboard accessible and validates an empty submission", async ({ page }) => {
  await page.goto("/login?next=%2Fdashboard");
  await page.getByRole("textbox", { name: "Email address" }).focus();
  await page.getByRole("button", { name: "Log in" }).press("Enter");

  await expect(page.getByText("That email doesn't look quite right")).toBeVisible();
  await expect(page.getByText("Enter your password to continue")).toBeVisible();
  await expect(page).toHaveURL(/\/login\?next=%2Fdashboard/);
});
