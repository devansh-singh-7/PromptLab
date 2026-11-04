import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const schema = readFileSync(resolve(process.cwd(), "prisma/schema.prisma"), "utf8");

describe("Prisma schema integrity", () => {
  it("contains the multi-domain content and activity boundaries", () => {
    for (const model of [
      "User",
      "UserProfile",
      "UserDomainPreferences",
      "Domain",
      "LearningPath",
      "Course",
      "Level",
      "Lesson",
      "Challenge",
      "EvaluationRubricVersion",
      "Practical",
      "CapstoneBrief",
      "UserProgress",
      "PromptEvaluation",
      "StudioSession",
      "XPEvent",
      "Achievement",
      "DailyQuest",
      "AIUsage",
      "AIQuotaConfig",
      "AuditLog",
    ]) {
      expect(schema).toContain(`model ${model}`);
    }
  });

  it("models data-driven prerequisites and idempotent XP events", () => {
    expect(schema).toContain("model LevelPrerequisite");
    expect(schema).toContain("model LessonPrerequisite");
    expect(schema).toContain("@@unique([userId, sourceType, sourceId])");
  });
});
