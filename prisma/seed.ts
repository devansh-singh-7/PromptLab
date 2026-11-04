import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type ChallengeType, type Prisma } from "@prisma/client";
import { z } from "zod";

const adapter = new PrismaPg({
  connectionString:
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@localhost:5432/promptlab",
});
const prisma = new PrismaClient({ adapter });

const challengeConfigSchema = z.object({
  promptGoal: z.string().min(1),
  requiredElements: z.array(z.string()).min(1),
  examples: z.array(z.object({ label: z.string(), prompt: z.string() })).optional(),
});

const rubricDimensions = [
  { key: "context_clarity", label: "Context and clarity", weight: 20 },
  { key: "task_definition", label: "Task definition", weight: 20 },
  { key: "constraints_requirements", label: "Constraints and requirements", weight: 20 },
  { key: "output_specification", label: "Output specification", weight: 15 },
  { key: "technical_accuracy", label: "Technical accuracy", weight: 15 },
  { key: "refinement_completeness", label: "Refinement and completeness", weight: 10 },
];

const levels = [
  ["prompt-engineering-foundations", "Prompt Engineering Foundations", "Learn to communicate with AI effectively before asking it to write code.", [
    ["introduction-to-prompt-engineering", "Introduction to Prompt Engineering", "Understand what prompt engineering is and how language models respond to instructions."],
    ["anatomy-of-a-good-prompt", "Anatomy of a Good Prompt", "Identify role, context, task, constraints, and output format in a useful prompt."],
    ["context-engineering", "Context Engineering", "Select requirements, project details, relevant files, and background that an AI needs."],
    ["prompting-techniques", "Prompting Techniques", "Use zero-shot, few-shot, role prompting, examples, and requests for concise reasoning summaries."],
    ["iterative-prompting", "Iterative Prompting", "Evaluate an AI response, refine instructions, and resubmit with a clear improvement goal."],
    ["common-prompting-mistakes", "Common Prompting Mistakes", "Spot vague instructions, missing requirements, contradictions, and unverified assumptions."],
  ]],
  ["ai-assisted-frontend-development", "AI-Assisted Frontend Development", "Generate frontend interfaces while understanding and verifying the resulting code.", [
    ["understanding-frontend-requirements", "Understanding Frontend Requirements", "Translate a brief into UI sections, components, states, and acceptance criteria."],
    ["prompting-with-html-and-css", "Prompting with HTML and CSS", "Prompt for semantic structure, visual hierarchy, layout, and maintainable CSS."],
    ["javascript-prompting", "JavaScript Prompting", "Ask for events, interactions, state changes, and behavior with testable requirements."],
    ["responsive-design", "Responsive Design", "Prompt for mobile-first layouts, breakpoints, keyboard access, and readable content."],
    ["component-based-development", "Component-Based Development", "Request reusable components with clear props, state, and composition boundaries."],
    ["framework-aware-prompting", "Framework-Aware Prompting", "Adapt prompts for React, Next.js, Vue, Angular, and other supported stacks."],
  ]],
  ["advanced-frontend-and-backend-development", "Advanced Frontend and Backend Development", "Use AI for full-stack development, not only attractive interfaces.", [
    ["planning-application-architecture", "Planning Application Architecture", "Turn requirements into modules, boundaries, folders, and a delivery sequence."],
    ["api-development", "API Development", "Describe REST endpoints, requests, responses, validation, and error behavior."],
    ["database-prompting", "Database Prompting", "Design schemas, relationships, indexes, and safe data access prompts."],
    ["authentication", "Authentication", "Specify registration, login, sessions, authorization, and ownership checks."],
    ["full-stack-integration", "Full-Stack Integration", "Connect frontend, backend, and database requirements into verifiable slices."],
    ["environment-and-configuration", "Environment and Configuration", "Request dependencies, environment variables, scripts, and setup checks safely."],
  ]],
  ["debugging-optimization-and-development-workflows", "Debugging, Optimization and Development Workflows", "Review and improve AI-generated code instead of accepting it blindly.", [
    ["debugging-with-ai", "Debugging with AI", "Provide error messages, stack traces, reproduction steps, and relevant context."],
    ["code-review-prompting", "Code Review Prompting", "Ask for readable, maintainable code review feedback with prioritized fixes."],
    ["performance-optimization", "Performance Optimization", "Prompt for rendering, loading, caching, and database query improvements."],
    ["testing-with-ai", "Testing with AI", "Generate useful unit, integration, and edge-case test cases from behavior."],
    ["security-awareness", "Security Awareness", "Identify input validation gaps, secret exposure, and common vulnerabilities."],
    ["refactoring-and-documentation", "Refactoring and Documentation", "Improve existing code and explain changes without breaking behavior."],
  ]],
  ["real-world-ai-development-workflows", "Real-World AI Development Workflows", "Manage an entire development process with AI and verification.", [
    ["project-planning-with-ai", "Project Planning with AI", "Convert an idea into requirements, scope, risks, and a concise specification."],
    ["breaking-down-large-tasks", "Breaking Down Large Tasks", "Break a large build into milestones with independently verifiable outcomes."],
    ["multi-step-prompting", "Multi-Step Prompting", "Sequence planning, generation, testing, and refinement prompts."],
    ["working-with-existing-projects", "Working with Existing Projects", "Give an AI useful codebase context without overwhelming it with irrelevant files."],
    ["ai-assisted-deployment", "AI-Assisted Deployment", "Prompt for builds, configuration, deployment checks, and troubleshooting."],
    ["managing-ai-limitations", "Managing AI Limitations", "Recognize hallucinations, verify claims, and use AI responsibly."],
  ]],
] as const;

const lessonOneTheory = {
  sections: [
    {
      heading: "What prompt engineering means",
      body: "Prompt engineering is the practice of giving an AI system enough useful direction to produce a reliable result. It is less about finding a magic sentence and more about making the task, context, and success criteria visible.",
    },
    {
      heading: "Why context changes the result",
      body: "A short request such as “make a website” leaves important decisions unstated. A stronger request names the audience, purpose, constraints, and output so the model can spend its effort solving the right problem.",
    },
  ],
  weakExample: "Make me a portfolio website.",
  improvedExample: "You are a frontend mentor. Plan a one-page portfolio for a junior web developer. Include a short hero, three project cards, an about section, and a contact form. Use semantic HTML, responsive CSS, and return a brief component outline before code.",
};

const lessonTwoTheory = {
  sections: [
    {
      heading: "The five useful building blocks",
      body: "Role sets a useful perspective, context supplies the situation, task says what to do, constraints define boundaries, and output format makes the response easy to inspect.",
    },
    {
      heading: "A prompt is a collaboration contract",
      body: "Good prompts reduce guesswork without pretending every detail is known. Ask the AI to state assumptions, identify missing information, and produce a small verifiable step when the task is large.",
    },
  ],
  weakExample: "Build a dashboard in React with a nice design.",
  improvedExample: "Act as a product-minded frontend engineer. Build the first pass of a React dashboard for a learner tracking lessons. Use a lavender surface, purple primary actions, responsive cards, keyboard-accessible controls, and mock data only. Return files one at a time with a short verification checklist.",
};

function draftTheory(title: string, objective: string) {
  return {
    draft: true,
    placeholder: "Draft placeholder — Prompt 18 will replace this lesson content.",
    sections: [{ heading: title, body: objective }],
  };
}

function lessonContent(levelNumber: number, lessonNumber: number, title: string, objective: string) {
  if (levelNumber === 1 && lessonNumber === 1) return lessonOneTheory;
  if (levelNumber === 1 && lessonNumber === 2) return lessonTwoTheory;
  return draftTheory(title, objective);
}

function validateChallengeConfig(config: Prisma.InputJsonValue) {
  challengeConfigSchema.parse(config);
  return config;
}

async function seed() {
  await prisma.$transaction(async (tx) => {
    const domain = await tx.domain.upsert({
      where: { slug: "web-development" },
      update: { status: "PUBLISHED" },
      create: {
        slug: "web-development",
        name: "Web Development",
        description: "Learn to plan, prompt, verify, debug, and build web applications with AI.",
        status: "PUBLISHED",
      },
    });

    const learningPath = await tx.learningPath.findFirst({
      where: { domainId: domain.id, slug: "web-development-release-1", userId: null },
    });
    if (learningPath) {
      await tx.learningPath.update({
        where: { id: learningPath.id },
        data: { status: "PUBLISHED", roadmap: { kind: "course", courseSlug: "prompt-engineering-for-web-development" } },
      });
    } else {
      await tx.learningPath.create({
        data: {
          domainId: domain.id,
          slug: "web-development-release-1",
          title: "Web Development",
          description: "Five levels of practical prompt engineering and AI-assisted building.",
          isTemplate: true,
          status: "PUBLISHED",
          roadmap: { kind: "course", courseSlug: "prompt-engineering-for-web-development" },
        },
      });
    }

    const course = await tx.course.upsert({
      where: { domainId_slug: { domainId: domain.id, slug: "prompt-engineering-for-web-development" } },
      update: { status: "PUBLISHED", version: 1 },
      create: {
        domainId: domain.id,
        slug: "prompt-engineering-for-web-development",
        title: "Prompt Engineering for Web Development",
        description: "A practical course for planning, generating, understanding, debugging, and improving web applications with AI.",
        objective: "Structure clear prompts, verify generated code, and build a complete web application through iterative prompting.",
        status: "PUBLISHED",
        version: 1,
      },
    });

    const levelRecords = [];
    for (const [levelIndex, [slug, title, goal, lessonDefinitions]] of levels.entries()) {
      const level = await tx.level.upsert({
        where: { courseId_slug: { courseId: course.id, slug } },
        update: { title, goal, status: "PUBLISHED", version: 1 },
        create: {
          courseId: course.id,
          slug,
          number: levelIndex + 1,
          title,
          goal,
          description: goal,
          status: "PUBLISHED",
          version: 1,
        },
      });
      levelRecords.push(level);

      for (const [lessonIndex, [lessonSlug, lessonTitle, objective]] of lessonDefinitions.entries()) {
        await tx.lesson.upsert({
          where: { levelId_slug: { levelId: level.id, slug: lessonSlug } },
          update: {
            title: lessonTitle,
            objective,
            theory: lessonContent(levelIndex + 1, lessonIndex + 1, lessonTitle, objective),
            status: levelIndex === 0 ? "PUBLISHED" : "DRAFT",
            version: 1,
          },
          create: {
            levelId: level.id,
            slug: lessonSlug,
            number: lessonIndex + 1,
            title: lessonTitle,
            objective,
            theory: lessonContent(levelIndex + 1, lessonIndex + 1, lessonTitle, objective),
            status: levelIndex === 0 ? "PUBLISHED" : "DRAFT",
            version: 1,
          },
        });
      }
    }

    for (let index = 1; index < levelRecords.length; index += 1) {
      await tx.levelPrerequisite.upsert({
        where: { levelId_prerequisiteId: { levelId: levelRecords[index].id, prerequisiteId: levelRecords[index - 1].id } },
        update: {},
        create: { levelId: levelRecords[index].id, prerequisiteId: levelRecords[index - 1].id },
      });
    }

    const lessonOne = await tx.lesson.findUniqueOrThrow({
      where: { levelId_slug: { levelId: levelRecords[0].id, slug: "introduction-to-prompt-engineering" } },
    });
    const lessonTwo = await tx.lesson.findUniqueOrThrow({
      where: { levelId_slug: { levelId: levelRecords[0].id, slug: "anatomy-of-a-good-prompt" } },
    });
    await tx.lessonPrerequisite.upsert({
      where: { lessonId_prerequisiteId: { lessonId: lessonTwo.id, prerequisiteId: lessonOne.id } },
      update: {},
      create: { lessonId: lessonTwo.id, prerequisiteId: lessonOne.id },
    });

    await tx.lessonTranslation.upsert({
      where: { lessonId_locale: { lessonId: lessonOne.id, locale: "en" } },
      update: { localizedBlocks: lessonOneTheory, technicalBlocks: { codeBlocks: [] } },
      create: { lessonId: lessonOne.id, locale: "en", localizedBlocks: lessonOneTheory, technicalBlocks: { codeBlocks: [] } },
    });
    await tx.lessonTranslation.upsert({
      where: { lessonId_locale: { lessonId: lessonTwo.id, locale: "en" } },
      update: { localizedBlocks: lessonTwoTheory, technicalBlocks: { codeBlocks: [] } },
      create: { lessonId: lessonTwo.id, locale: "en", localizedBlocks: lessonTwoTheory, technicalBlocks: { codeBlocks: [] } },
    });

    const challenge = await tx.challenge.upsert({
      where: { lessonId_slug: { lessonId: lessonTwo.id, slug: "repair-the-portfolio-prompt" } },
      update: {},
      create: {
        lessonId: lessonTwo.id,
        slug: "repair-the-portfolio-prompt",
        title: "Repair the portfolio prompt",
        type: "PROMPT_REPAIR" satisfies ChallengeType,
        instructions: "Rewrite the weak prompt so an AI can produce a responsive, accessible portfolio outline without guessing the key requirements.",
        config: validateChallengeConfig({
          promptGoal: "Write a structured prompt for a one-page portfolio outline.",
          requiredElements: ["role", "context", "task", "constraints", "output format"],
          examples: [
            { label: "weak", prompt: "Make a nice portfolio page." },
            { label: "improved", prompt: lessonTwoTheory.improvedExample },
          ],
        }),
        hints: {
          tiers: [
            "Start by naming who the AI should act as and who the page is for.",
            "Add the sections, responsive and accessibility constraints, and the stack.",
            "Ask for a component outline plus a verification checklist before code.",
          ],
        },
        xpReward: 50,
        maxAttempts: null,
        difficulty: "BEGINNER",
        status: "PUBLISHED",
        version: 1,
      },
    });
    const rubric = await tx.evaluationRubric.upsert({
      where: { challengeId: challenge.id },
      update: {},
      create: { challengeId: challenge.id, name: "Baseline prompt quality rubric" },
    });
    await tx.evaluationRubricVersion.upsert({
      where: { rubricId_version: { rubricId: rubric.id, version: 1 } },
      update: { dimensions: rubricDimensions, isImmutable: true },
      create: { rubricId: rubric.id, version: 1, dimensions: rubricDimensions, isImmutable: true },
    });

    const practicalTitles = [
      ["portfolio-webpage", "Practical 1: Build a personal portfolio", "Generate a basic portfolio with navigation, hero, about, projects, and contact sections."],
      ["responsive-landing-page", "Practical 2: Build a responsive landing page", "Build a responsive landing page in the learner's selected stack."],
      ["task-management-application", "Practical 3: Build a task management application", "Build task CRUD with authentication, persistence, validation, and a responsive dashboard."],
      ["debug-a-flawed-application", "Practical 4: Debug a flawed application", "Identify, prompt for, verify, and explain fixes in a deliberately flawed application."],
      ["complete-ai-assisted-website", "Practical 5: Ship a complete website", "Plan, prompt, generate, debug, and improve a complete website from a supplied brief."],
    ];
    for (const [index, [slug, title, brief]] of practicalTitles.entries()) {
      await tx.practical.upsert({
        where: { domainId_slug: { domainId: domain.id, slug } },
        update: {},
        create: {
          domainId: domain.id,
          courseId: course.id,
          levelId: levelRecords[index].id,
          slug,
          title,
          brief,
          requirements: { draft: index > 0, items: index === 0 ? ["Structured prompt", "Semantic HTML", "Responsive layout", "Accessible contact form"] : ["Requirements and verification checklist"] },
          rubric: { dimensions: rubricDimensions },
          xpReward: 150,
          status: "PUBLISHED",
          version: 1,
        },
      });
    }

    await tx.capstoneBrief.upsert({
      where: { domainId_slug: { domainId: domain.id, slug: "saas-dashboard-capstone" } },
      update: {},
      create: {
        domainId: domain.id,
        slug: "saas-dashboard-capstone",
        title: "Capstone: Build a learner SaaS dashboard",
        brief: "Plan and build a polished dashboard that helps a learner understand progress, choose a next step, and review recent activity.",
        requirements: { options: ["E-commerce website", "SaaS dashboard", "College management portal", "Personal portfolio"], verification: ["Responsive", "Accessible", "Tested", "Documented"] },
        status: "PUBLISHED",
        version: 1,
      },
    });

    const achievements: Array<{ slug: string; name: string; description: string; xpReward: number; criteria: Prisma.InputJsonValue }> = [
      { slug: "first-lesson", name: "First step", description: "Complete your first lesson.", xpReward: 25, criteria: { type: "lesson_count", value: 1 } },
      { slug: "prompt-craft", name: "Prompt craft", description: "Complete five prompt challenges.", xpReward: 100, criteria: { type: "challenge_count", value: 5 } },
      { slug: "level-one-complete", name: "Foundation builder", description: "Finish Prompt Engineering Foundations.", xpReward: 250, criteria: { type: "level_complete", value: 1 } },
      { slug: "steady-practice", name: "Steady practice", description: "Complete activity on seven different days.", xpReward: 150, criteria: { type: "activity_days", value: 7 } },
    ];
    for (const { slug, name, description, xpReward, criteria } of achievements) {
      await tx.achievement.upsert({
        where: { slug },
        update: { name, description, xpReward, criteria },
        create: { domainId: domain.id, slug, name, description, xpReward, criteria },
      });
    }

    const quests: Array<{ slug: string; title: string; description: string; target: Prisma.InputJsonValue; xpReward: number }> = [
      { slug: "one-lesson", title: "One lesson forward", description: "Complete one lesson today.", target: { type: "lesson_count", value: 1 }, xpReward: 50 },
      { slug: "practice-prompt", title: "Practice a prompt", description: "Submit one prompt challenge today.", target: { type: "challenge_count", value: 1 }, xpReward: 50 },
      { slug: "earn-xp", title: "Make progress", description: "Earn 100 XP today.", target: { type: "xp", value: 100 }, xpReward: 30 },
    ];
    for (const { slug, title, description, target, xpReward } of quests) {
      await tx.dailyQuest.upsert({
        where: { slug },
        update: { title, description, target, xpReward },
        create: { slug, title, description, target, xpReward, period: "DAILY", status: "PUBLISHED" },
      });
    }

    const quotaConfigs: Array<{ model: string; rpm: number; tpm: number; rpd: number }> = [
      { model: "gemini-2.5-flash", rpm: 15, tpm: 1_000_000, rpd: 1_500 },
      { model: "gemini-2.5-pro", rpm: 5, tpm: 500_000, rpd: 100 },
    ];
    for (const { model, rpm, tpm, rpd } of quotaConfigs) {
      await tx.aIQuotaConfig.upsert({
        where: { model },
        update: { rpm, tpm, rpd, editable: true },
        create: { model, rpm, tpm, rpd, editable: true },
      });
    }
  });

  const [domainCount, courseCount, levelCount, lessonCount, challengeCount] = await Promise.all([
    prisma.domain.count({ where: { slug: "web-development" } }),
    prisma.course.count({ where: { slug: "prompt-engineering-for-web-development" } }),
    prisma.level.count({ where: { course: { slug: "prompt-engineering-for-web-development" } } }),
    prisma.lesson.count({ where: { level: { course: { slug: "prompt-engineering-for-web-development" } } } }),
    prisma.challenge.count({ where: { lesson: { level: { course: { slug: "prompt-engineering-for-web-development" } } } } }),
  ]);
  console.log(`Seeded Web Development: ${domainCount} domain, ${courseCount} course, ${levelCount} levels, ${lessonCount} lessons, ${challengeCount} challenge.`);
}

seed()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
