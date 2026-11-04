import { describe, expect, it } from "vitest";
import { getSafeRedirect } from "./redirect";

describe("getSafeRedirect", () => {
  it("allows same-origin relative paths", () => {
    expect(getSafeRedirect("/dashboard?tab=progress#today")).toBe("/dashboard?tab=progress#today");
  });

  it("rejects absolute, protocol-relative, and javascript URLs", () => {
    expect(getSafeRedirect("https://evil.example/login")).toBe("/dashboard");
    expect(getSafeRedirect("//evil.example/login")).toBe("/dashboard");
    expect(getSafeRedirect("javascript:alert(1)")).toBe("/dashboard");
  });
});
