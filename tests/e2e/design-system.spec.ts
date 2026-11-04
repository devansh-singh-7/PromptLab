import { expect, test } from "@playwright/test";

test.describe("design system showcase", () => {
  test("switches theme and keeps tab navigation keyboard accessible", async ({
    page,
  }) => {
    const runtimeWarnings: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "warning" || message.type() === "error") {
        runtimeWarnings.push(message.text());
      }
    });
    page.on("pageerror", (error) => runtimeWarnings.push(error.message));

    await page.goto("/design-system");

    await expect(
      page.getByRole("heading", {
        name: "Friendly tools for focused progress.",
      }),
    ).toBeVisible();

    const themeToggle = page.getByRole("button", { name: /theme/i }).first();
    await themeToggle.click();
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    const overviewTab = page.getByRole("tab", { name: "Overview" });
    await overviewTab.focus();
    await overviewTab.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "Practice" })).toHaveAttribute(
      "data-state",
      "active",
    );
    expect(runtimeWarnings).toEqual([]);
  });
});
