import { expect, test } from "@playwright/test";

test("landing page is available", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Don't just use AI. Learn to master it." }),
  ).toBeVisible();
});
