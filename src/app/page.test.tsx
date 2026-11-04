import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("PromptLab landing page", () => {
  it("communicates the product promise and first release path", () => {
    const { getByRole } = render(<Home />);

    expect(
      getByRole("heading", {
        name: "Don't just use AI. Learn to master it.",
      }),
    ).toBeTruthy();
    expect(getByRole("heading", { name: "Web Development" })).toBeTruthy();
  });
});
