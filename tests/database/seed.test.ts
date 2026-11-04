import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const seed = readFileSync(resolve(process.cwd(), "prisma/seed.ts"), "utf8");

describe("Release 1 seed", () => {
  it("includes the complete five-level, six-lesson curriculum", () => {
    expect(seed).toContain("Prompt Engineering Foundations");
    expect(seed).toContain("Real-World AI Development Workflows");
    expect(seed.match(/\["[^"]+", "[^"]+", "[^"]+", \[/g)).toHaveLength(5);
    expect(seed).toContain("lessonDefinitions.entries()");
    expect(seed).toContain("Draft placeholder — Prompt 18 will replace this lesson content.");
  });

  it("validates challenge configuration and seeds the baseline rubric and XP", () => {
    expect(seed).toContain("challengeConfigSchema.parse");
    expect(seed).toContain("xpReward: 50");
    expect(seed).toContain("xpReward: 150");
    expect(seed).toContain("context_clarity");
    expect(seed).toContain("refinement_completeness");
  });
});
