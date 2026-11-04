# PROMPTLAB — MASTER PRODUCT & IMPLEMENTATION SPECIFICATION

**Document purpose:** This is the source-of-truth product brief for an AI coding agent building PromptLab. Follow it as a product and engineering specification. Do not treat it as a request to generate the entire application in one pass. Implement incrementally, verify each phase, and preserve the requirements below.

---

## 1. PRODUCT VISION

Build **PromptLab**, an interactive, personalized platform that teaches people how to communicate effectively with AI and apply prompt engineering to practical professional tasks.

**Product promise:** Learn. Practice. Experiment. Build.

**Core positioning:** “Don't just use AI. Learn to master it.”

PromptLab must teach users to think like prompt engineers, not merely copy prewritten prompts. It is not a conventional video-course website. It combines:
- Gamified learning inspired by Duolingo's progression and approachability, but with an original PromptLab visual identity.
- Practical challenges inspired by coding challenge platforms.
- Short video lessons and written explanations.
- AI-assisted prompt evaluation, hints and feedback.
- Domain-specific interactive studios.
- Real-world assignments and capstone projects that produce tangible outputs.
- Personalized learning paths and adaptive onboarding.

The first release must deliver **one complete Web Development learning path**. Other domains are future extensions and must not be built as incomplete placeholders in the first release. However, architecture must make later domains possible without rewriting the platform.

## 2. NON-NEGOTIABLE PRODUCT PRINCIPLES

1. **Web Development first:** Complete and validate this domain before building other domain studios.
2. **Personalization:** Users choose their skill level, goals, explanation language, technologies, pace and learning preferences.
3. **Separate human language from technical stack:** Explanation language is independent of programming language/framework. Example: Hindi explanations with React and TypeScript.
4. **Technology freedom:** Do not force React, Next.js, Python or any single stack. Support a configurable set of web technologies and allow “not sure yet”.
5. **Learn, Practice, Build:** Every lesson and course level should combine instruction, active practice and practical application.
6. **Evaluate thinking and outcomes:** Score prompt quality and, where applicable, the generated result. Long prompts must not automatically receive higher scores.
7. **Guided improvement:** Give hints and explanations, not only a score or the complete ideal answer.
8. **Content-driven architecture:** Lessons, modules, quizzes, practicals, rubrics and videos must be database-managed, not hardcoded into React components.
9. **Secure execution:** Never run untrusted AI-generated code inside the main application server or browser origin without isolation.
10. **Accessible and responsive:** Desktop-first studio experience, but all learning and course experiences must work on mobile and tablet.
11. **Original identity:** Use Duolingo as a design reference for friendliness and progression, not as a template to copy.
12. **Incremental delivery:** Do not build all features simultaneously. Complete and test each milestone before proceeding.

## 3. TARGET USERS

Support:
- Complete beginners who have never built a website.
- Learners with basic HTML/CSS/JavaScript knowledge.
- Intermediate developers who want to use AI more effectively.
- Developers preparing portfolios, freelance projects or job applications.

The course teaches AI-assisted web development and prompt engineering. It is not intended to replace a full traditional computer science or web development curriculum. It must still teach enough technical understanding for learners to inspect, test and verify generated code.

## 4. VISUAL IDENTITY AND UX DIRECTION

### 4.1 Overall style

Create a friendly, colourful, modern educational SaaS product with:
- Rounded cards and controls.
- Clear hierarchy and generous spacing.
- Playful but restrained motion and micro-interactions.
- Progress paths and achievement moments.
- Friendly illustrations and an original PromptLab mascot/AI companion.
- Professional, readable typography.
- Consistent design tokens and reusable components.

### 4.2 Proposed palette

Use these as initial design tokens; refine contrast and accessibility during implementation:
- Primary purple: `#7655E8`
- Mint green: `#29C5A4`
- Achievement gold: `#FFCA55`
- Coral: `#FF806B`
- Soft lavender: `#F5F3FF`
- Dark navy: `#24243A`

Purple is the main brand colour. Mint indicates completion/success. Gold is for XP and achievements. Coral is for attention and selected warnings. Do not make PromptLab predominantly Duolingo green.

### 4.3 Duolingo-inspired, but original

Borrow interaction patterns, not protected brand assets or exact layouts:
- A vertical, connected learning path with lesson nodes and milestone checkpoints.
- XP, streaks, daily quests and achievements.
- Friendly feedback and small celebrations.
- Unlockable lessons and progress indicators.
- A recognizable original mascot or AI companion.

PromptLab's distinctive identity comes from its AI prompt editor, evaluations, domain studios and real projects.

### 4.4 Different areas should feel different

Maintain one design system, but adapt the experience by task:
- Marketing/landing page: expressive, polished and conversion-focused.
- Dashboard: colourful and motivating.
- Learning path: playful, map-like and gamified.
- Lesson page: calm, focused and distraction-free.
- Challenge Arena: interactive and game-like.
- Web Development Studio: professional IDE/workbench aesthetic with PromptLab branding.

### 4.5 Main navigation

Include:
- Dashboard
- Learning Paths / Courses
- Web Development Studio
- Challenge Arena
- Practical Projects
- Prompt Library
- Achievements
- Profile / Settings
- Admin area (authorized administrators only)

Do not show unavailable future domains as if they are complete. They may appear as clearly marked “Coming later” roadmap items if useful.

## 5. FIRST RELEASE SCOPE

The first release is the complete Web Development learning path and its supporting platform.

### Required in first release
- Landing page and authentication.
- Dashboard.
- Web Development onboarding questionnaire.
- Personalized roadmap generation and learner approval.
- Five-level Web Development course structure.
- Lesson engine with videos, theory, examples and activities.
- Quiz and interactive exercise engine.
- Prompt challenge submissions.
- AI evaluation with scores, explanations and hints.
- Gamification: XP, streaks, levels, achievements and progress.
- Web Development Studio with prompt editor, code display/editor and live preview.
- Five practical assignments and capstone project.
- Basic admin content management.
- User progress and evaluation history.
- Shared Gemini API quota/rate limiter and usage/error monitoring.

### Explicitly out of first-release scope
- Full Data Analytics, Machine Learning, Image Generation, Video Generation, Marketing or Research courses/studios.
- Social network/community features.
- User-created course marketplace.
- Multi-provider AI routing.
- Advanced seasonal competitions.
- Full collaborative real-time coding.

Do not overbuild these before the Web Development path is complete and tested.

## 6. WEB DEVELOPMENT COURSE SPECIFICATION

**Course title:** Prompt Engineering for Web Development

**Objective:** Teach learners to plan, generate, understand, debug, improve and build web applications using structured prompts and AI tools, while verifying the correctness, quality, security and functionality of the resulting code.

### Course outcomes
By completion, a learner should be able to:
- Structure clear prompts using role/context/task/constraints/output requirements where appropriate.
- Supply useful project context and relevant codebase information.
- Break large development tasks into smaller steps.
- Prompt AI to create frontend components and responsive layouts.
- Work with a selected framework and stack.
- Prompt for APIs, databases and authentication.
- Debug using error messages, stack traces and relevant code context.
- Request code reviews, tests, refactoring and performance improvements.
- Recognize hallucinations, insecure patterns and unverified assumptions.
- Build and evaluate a complete working web application through iterative prompting.

### Course progression
Five levels followed by a capstone:

#### Level 1 — Prompt Engineering Foundations
Goal: learn to communicate with AI effectively before asking it to write code.

Lessons:
1. Introduction to Prompt Engineering: what it is and basic understanding of how LLMs respond.
2. Anatomy of a Good Prompt: role, context, task, constraints and output format.
3. Context Engineering: requirements, project details, relevant files and background.
4. Prompting Techniques: zero-shot, few-shot, role prompting, examples and asking for explanations/reasoning summaries. Do not require hidden chain-of-thought disclosure.
5. Iterative Prompting: evaluate output, refine instructions and resubmit.
6. Common Prompting Mistakes: vague instructions, missing requirements and contradictions.

Activities: identify the better prompt; repair a weak prompt; arrange prompt components; fill missing prompt sections; write a prompt for a simple webpage.

Practical 1: Generate a basic personal portfolio webpage with navigation, hero, about and contact sections. Learner writes a structured prompt and receives feedback.

#### Level 2 — AI-Assisted Frontend Development
Goal: generate frontend interfaces and understand the resulting code.

Lessons:
1. Understanding Frontend Requirements: translate a brief into UI sections and components.
2. Prompting with HTML and CSS: structure, styling and layouts.
3. JavaScript Prompting: events, interactions and functionality.
4. Responsive Design: mobile-first design, breakpoints and accessibility.
5. Component-Based Development: reusable components, props and state.
6. Framework-Aware Prompting: React, Next.js, Vue, Angular and other supported options.

Activities: convert a design brief into a UI prompt; fix a poorly structured component; improve a mobile layout; request reusable components; identify missing requirements.

Practical 2: Build a responsive landing page using the learner's selected stack. Assess prompt structure, visual requirements, responsiveness, code quality and functionality.

#### Level 3 — Advanced Frontend and Backend Development
Goal: use AI for full-stack development, not just attractive interfaces.

Lessons:
1. Planning Application Architecture: requirements, modules and folder structure.
2. API Development: REST concepts, endpoints, requests and responses.
3. Database Prompting: schema design, relationships, SQL and NoSQL.
4. Authentication: registration, login and authorization concepts.
5. Full-Stack Integration: connect frontend, backend and database.
6. Environment and Configuration: environment variables, dependencies and project setup.

Activities: generate an API specification; design a database schema; identify missing authentication requirements; improve a backend prompt; map frontend requirements to APIs.

Practical 3: Build a task management application with registration/login, task CRUD, database integration, responsive dashboard, validation and error handling.

#### Level 4 — Debugging, Optimization and Development Workflows
Goal: make learners capable of reviewing and improving AI-generated code rather than blindly accepting it.

Lessons:
1. Debugging with AI: error messages, stack traces and context.
2. Code Review Prompting: readability, maintainability and best practices.
3. Performance Optimization: rendering, loading and database queries.
4. Testing with AI: unit, integration and test-case generation.
5. Security Awareness: input validation, secrets and common vulnerabilities.
6. Refactoring and Documentation: improve existing code without breaking features.

Activities: debug a broken component; identify an API error; request a code review; find security issues in sample code; write a test-generation prompt.

Practical 4: Debug and improve a deliberately flawed application. Learner must identify problems, prompt for fixes, verify them and explain changes.

#### Level 5 — Real-World AI Development Workflows
Goal: manage an entire development process using AI.

Lessons:
1. Project Planning with AI: requirements and specifications.
2. Breaking Down Large Tasks: milestones and implementation steps.
3. Multi-Step Prompting: planning, generation, testing and refinement.
4. Working with Existing Projects: codebase context and project documentation.
5. AI-Assisted Deployment: builds, configuration and deployment troubleshooting.
6. Managing AI Limitations: hallucinations, verification and responsible use.

Activities: convert an idea into requirements; generate a development roadmap; create a sequence of connected prompts; diagnose a multi-file issue; improve an existing architecture.

Practical 5: Learner independently plans, prompts, generates, debugs and improves a complete website using a supplied brief or their own approved project idea.

### Capstone project
Offer project briefs such as:
- E-commerce website.
- SaaS dashboard.
- College management portal.
- Personal portfolio.
- Project management application.
- Blogging platform.

Allow a learner to submit a custom project idea. The capstone must produce a working project preview where technically supported, a prompt improvement report, a project score, skill breakdown and completion certificate if requirements are met.

### Capstone assessment rubric
- Prompt quality: 20%
- Requirements fulfilled: 25%
- Functionality: 20%
- Code quality: 15%
- Responsive design and usability: 10%
- Testing and verification: 10%

Practical assessment must assess both the prompt and the resulting output. Do not award full credit solely for producing a long prompt or attractive screenshot.

## 7. PERSONALIZED ONBOARDING

Before starting Web Development, show a short adaptive questionnaire. Use approximately 3–5 questions per screen, a progress indicator, optional skips for nonessential questions and conditional follow-ups. Do not overwhelm users with one giant form.

Collect:
- Current experience: beginner, basic, intermediate or advanced.
- Previous web development projects/experience.
- Goal: portfolio, job preparation, freelance work, personal projects, AI-assisted development or curiosity.
- Preferred frontend technologies: HTML, CSS, JavaScript, TypeScript, React, Next.js, Vue, Angular, Svelte and others as configured.
- Preferred backend technologies: Node.js, Express, Python, Django, Flask, FastAPI, Java, PHP or not sure.
- Database preferences where relevant: PostgreSQL, MySQL, MongoDB, SQLite, Firebase, etc.
- Explanation language: English, Hindi, Marathi and additional supported languages.
- Learning preference: theory, hands-on, video or mixed.
- Pace: relaxed, normal or intensive.
- Available time: e.g. 15–30 minutes, 1 hour, 2 hours, 3+ hours.
- AI tool preference: ChatGPT, Gemini, Claude, Copilot, etc. This is optional and should not imply the course is tied to one provider.
- Desired project type: portfolio, e-commerce, dashboard, blog, SaaS, landing page or custom.
- Prompt engineering experience and familiarity with context, roles, constraints and output formats.

Generate a proposed roadmap based on answers. The learner must review, edit and approve it before starting. Preferences can be changed later without restarting the course.

Store global profile preferences separately from per-learning-path preferences. A user's Web Development stack must not constrain their future Data Analytics or Image Generation preferences.

## 8. LESSON EXPERIENCE

Each lesson follows a consistent structure:
1. Watch and Learn: embedded YouTube tutorial or PromptLab-created video.
2. Understand: concise written theory, examples, weak vs improved prompts and key takeaways.
3. Practice: MCQs, prompt repair, arrange-the-components, fill-the-gap or scenario questions.
4. AI Prompt Challenge: learner writes a prompt and receives score, hints and improvement suggestions.
5. Complete: completion criteria, XP reward, skill mastery update and next lesson unlock.

Video requirements:
- Support external YouTube embeds. Do not download or re-upload third-party videos without permission.
- Support PromptLab-owned uploaded videos through a service such as Cloudflare Stream or Mux.
- Store video metadata and references in the database.
- Track completion/progress, bookmarks and associated quiz/challenge results where appropriate.
- Each video lesson has title, duration, objectives, player, written explanation, examples and practice activity.

## 9. AI PROMPT EVALUATION ENGINE

This is a core product feature. Evaluation must teach, not merely grade.

### Evaluation response
For each submission, return structured data:
- Overall score (0–100).
- Dimension scores and concise rationale.
- Strengths.
- Missing or weak elements.
- Actionable hints.
- Suggested improvements.
- Optional revised example only when pedagogically appropriate or requested.

Do not reveal the full ideal answer immediately when hints would better support learning. Allow revisions and resubmissions. Save attempt history so the learner can see improvement over time.

### Baseline rubric
Use task-specific weights, not one rigid rubric for every challenge. A general starting rubric:
- Context and clarity: 20%.
- Task definition: 20%.
- Constraints and requirements: 20%.
- Output specification: 15%.
- Technical accuracy: 15%.
- Refinement and completeness: 10%.

For debugging tasks, increase technical accuracy and verification. For UI generation, assess visual/functional requirements. Prompt length itself is not a quality metric.

### Evaluation pipeline
1. Validate deterministic requirements with rule-based checks where possible.
2. Send relevant prompt text and task rubric to Gemini for contextual evaluation.
3. Validate and parse structured response server-side.
4. Return score, explanation, hints and next steps.
5. Let learner revise and resubmit.
6. Store attempts, rubric version, model and usage metadata.

Use Gemini API initially. Do not train an LLM from scratch or fine-tune a model for the first release. PromptLab's defensible value is its curriculum, rubrics, challenge design, workflow and domain-specific evaluation.

## 10. GEMINI API QUOTA AND COST MANAGEMENT

- Keep Gemini API keys server-side in environment variables. Never expose them via `NEXT_PUBLIC_` variables or client bundles.
- Use a shared global limiter aligned with the actual Google AI Studio project/model quotas, not arbitrary per-user daily limits when the requirement is to mirror provider quotas.
- Track model-specific RPM, TPM and RPD.
- Use Redis or atomic PostgreSQL operations to prevent concurrent requests exceeding available capacity.
- Record actual token usage when available and distinguish successful calls, failed calls and retries.
- Handle 429 `RESOURCE_EXHAUSTED`, provider retry details and transient failures. Do not blindly retry in a loop.
- RPD reset is midnight Pacific Time. Convert using a timezone-aware library; do not hardcode one India reset time because PST/PDT changes seasonally.
- RPM and TPM windows need their own appropriate accounting and retry logic.
- Google quotas can vary by model, account tier and project. Keep configured quota values editable and documented. Do not promise automatic quota synchronization unless a supported provider API is verified.
- Provider quotas are authoritative. The application limiter is a protective mirror, not a replacement for provider enforcement.
- When shared capacity is exhausted, show a clear AI-evaluation-unavailable state and allow users to continue non-AI lessons, quizzes and progress activities.
- Optional usage warnings may communicate approaching provider quota thresholds, but do not invent extra caps and describe them as Google quotas.
- Avoid unnecessary LLM calls: deterministic checks first; call Gemini only where contextual evaluation adds value.

## 11. WEB DEVELOPMENT STUDIO

Build a dedicated browser-based workspace. It should look like a polished developer workbench, not a generic chat page.

Core regions:
- Left sidebar: task instructions, lesson objectives, challenge details and requirements.
- Prompt editor: learner writes and revises the prompt.
- AI response panel: generated code and explanation.
- Code editor/viewer: inspect and edit generated files.
- Live preview: view the working application.
- Console: execution output and errors.
- Feedback panel: prompt score, hints, missing requirements and evaluation.

### Workflow
1. Show practical task and acceptance criteria.
2. Learner writes a prompt.
3. PromptLab evaluates it and returns feedback.
4. Learner can revise and resubmit.
5. On learner action, send accepted prompt to the configured generation workflow.
6. Receive generated code and validate its structure.
7. Run code in an isolated environment.
8. Show live preview, console and errors.
9. Allow iterative follow-up prompts.
10. Evaluate both prompt quality and final result.

### Security and execution
- Never execute arbitrary generated code in the main Next.js server or privileged application origin.
- Use Sandpack or WebContainers for supported frontend projects, subject to their capabilities and licensing/hosting constraints.
- Backend/full-stack practicals may require isolated containers or a managed sandbox service.
- Apply resource limits, timeouts, restricted network access, ephemeral filesystems and cleanup.
- Validate dependencies and generated file structure. Do not expose secrets to the generated environment.
- Clearly distinguish code preview from production deployment.

## 12. GAMIFICATION

Include:
- XP for meaningful learning actions.
- Daily streaks.
- Daily quests/missions.
- Levels and unlockable lesson nodes.
- Achievements/badges.
- Skill mastery scorecard.
- Optional leaderboard.
- Original mascot/AI companion.
- Small celebratory animations and feedback.

Illustrative initial XP values (tune after testing):
- Complete lesson: 50 XP.
- Pass quiz: 30 XP.
- Complete prompt challenge: 50 XP.
- Complete practical: 150 XP.
- Finish a level: 250 XP.

Avoid rewarding meaningless clicks. Include skill mastery dimensions such as context building, task clarity, constraints, output structuring, technical accuracy and refinement. XP is motivation, not proof of competence. Avoid punitive mechanics that discourage learners; hearts/attempt limits are optional and should not block essential learning.

## 13. ADMIN AND COURSE CONTENT MANAGEMENT

Create an admin area restricted to authorized administrators. It must support:
- Create/edit/publish/unpublish courses.
- Create and reorder levels/modules/lessons.
- Add written explanations, examples and learning objectives.
- Add YouTube URLs and PromptLab-owned video references.
- Create quizzes, MCQs and interactive exercises.
- Create prompt challenges and practical briefs.
- Configure evaluation rubrics and expected requirements.
- Add hints and completion criteria.
- Manage capstone project options and grading rubrics.
- View learner progress, completion and evaluation analytics.

Course content must be database-driven. Admin content edits should not require code changes or redeployment.

## 14. FUTURE DOMAIN EXTENSIBILITY

Do not implement these as full courses in the first release, but architect shared foundations to support them later.

Future learning paths:
1. Data Analytics: Python, R, SQL, Excel, Power BI, Tableau; EDA, data cleaning, statistics, SQL and visualization. Studio with dataset explorer, prompt editor, code/SQL output, charts and feedback.
2. Machine Learning & AI Model Development: problem definition, data understanding, preprocessing, feature engineering, model selection, training, evaluation, tuning, deployment and debugging. Studio with notebook/code editor, dataset explorer and model metrics. Teach leakage prevention, train/test separation and methodological verification.
3. Image Generation: subject, environment, composition, lighting, camera perspective, style, aspect ratio, negative prompts and editing instructions. Creative image-prompt studio. Text prompt evaluation can be taught without a generation API.
4. Video Generation: scene/action, camera movement, duration, character consistency, transitions, style and storytelling. Storyboard studio. Prompt education can begin without video-generation API integration.
5. Content Creation & Digital Marketing: audience, brand voice, social content, SEO, campaigns, email and content strategy. Content studio.
6. Research and Productivity: research questions, literature review, methodology, summarization, document extraction and structured synthesis. Research workspace.

Support custom learning domains. A user may enter a field such as architecture or interior design and request a proposed learning path. The system can generate a domain-specific questionnaire and roadmap. Use a configurable studio engine with reusable components; do not promise a bespoke IDE for every imaginable domain. Provide a general workspace fallback when specialized components are unavailable.

### Reusable Studio Engine
Shared capabilities:
- Prompt editor.
- AI feedback and evaluation.
- Hint system.
- Task instructions.
- Progress tracking.
- Submission and assessment.

Specialized components later:
- Code editor and preview.
- Dataset explorer and chart builder.
- ML notebook and metrics panel.
- Image composition controls/gallery.
- Video storyboard.
- Research document viewer.
- Content editor.

Each domain should have a genuinely task-appropriate workspace, not merely a different accent colour.

## 15. RECOMMENDED TECH STACK

Use this as the default implementation stack unless a concrete compatibility or deployment reason requires a documented alternative:
- Next.js with React and TypeScript.
- Tailwind CSS and shadcn/ui.
- Framer Motion for restrained animations.
- Next.js server routes/actions for backend operations.
- PostgreSQL with Prisma.
- Auth.js for authentication.
- Gemini API for contextual prompt evaluation.
- Redis for shared rate limiting and short-lived counters.
- Recharts for analytics where useful.
- Vercel for application deployment, subject to sandbox/backend execution needs.
- Cloudflare Stream or Mux for PromptLab-owned video hosting.
- YouTube embed for external tutorials.
- Sandpack/WebContainers or isolated containers for code execution.

Do not assume every service must be purchased before the MVP. Choose the simplest viable implementation and document tradeoffs.

## 16. SUGGESTED APPLICATION STRUCTURE

```text
promptlab/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── learning-paths/
│   ├── onboarding/
│   ├── learn/[courseId]/[lessonId]/
│   ├── studio/web-development/
│   ├── challenges/
│   ├── practicals/
│   ├── achievements/
│   ├── profile/
│   ├── admin/
│   └── api/
├── components/
│   ├── dashboard/
│   ├── learning-path/
│   ├── lessons/
│   ├── gamification/
│   └── studios/
├── modules/
│   └── web-development/
│       ├── curriculum/
│       ├── challenges/
│       ├── practicals/
│       └── studio/
├── lib/
│   ├── gemini/
│   ├── database/
│   ├── rate-limiter/
│   └── evaluation/
└── prisma/
    └── schema.prisma
```

Adapt structure as needed; preserve modular boundaries and avoid premature overengineering.

## 17. CORE DATA MODEL

Design a relational schema that supports at least:
- User
- UserProfile
- LearningPreferences
- LearningPath
- Course
- Module
- Lesson
- Video
- Challenge
- Practical
- PromptSubmission
- PromptEvaluation
- UserProgress
- Achievement
- UserAchievement
- DailyActivity
- AIUsage

Keep global profile preferences separate from per-learning-path preferences. Store explanation language, technical stack, selected domain, difficulty and pace as structured fields. Consider JSON for flexible domain-specific settings, but use relational entities for content and progress where querying and integrity matter.

A starting preference shape:

```ts
interface LearningPreferences {
  explanationLanguage: string;
  technicalStack: string[];
  selectedDomain: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  learningPace: "relaxed" | "normal" | "intensive";
}
```

Add goal, available time, learning style, AI tool preference and project preference as appropriate.

## 18. DEVELOPMENT PHASES AND ACCEPTANCE CRITERIA

Estimated solo/small-team timeline: approximately 9–10 weeks. This is a planning estimate, not a guarantee. Content production and engineering can overlap.

### Phase 1 — Product foundation (about 1 week)
- Finalize design tokens and component system.
- Build landing page and authentication.
- Set up database and application architecture.
- Define content schemas.

Acceptance: app runs, auth works, database migrations work, design system is consistent, and protected routes are enforced.

### Phase 2 — Dashboard and gamification (about 1 week)
- Dashboard, learning path map, XP, streaks, achievements and progress tracking.

Acceptance: progress is persisted; completing an activity updates XP and course progress correctly; locked/unlocked nodes reflect prerequisites.

### Phase 3 — Personalized onboarding (about 1 week)
- Adaptive questionnaire, technology/language preferences, learning profile, roadmap generation and approval.

Acceptance: answers persist; roadmap reflects selected stack and experience; learner can edit preferences; technical syntax remains unchanged when explanation language changes.

### Phase 4 — Course and lesson engine (about 1–2 weeks)
- Modules, lessons, videos, theory, examples, quiz and exercise engine; admin content management foundations.

Acceptance: admin can create and publish content without code edits; learner progress and video/lesson completion are tracked; lesson activities work on desktop and mobile.

### Phase 5 — AI evaluation engine (about 1 week)
- Gemini integration, deterministic checks, structured scores, hints, retries, usage and shared quota handling.

Acceptance: server-side key only; structured validated response; rubric-specific evaluation; concurrent calls cannot exceed configured shared limits; graceful 429/quota-exhausted state; non-AI activities remain usable.

### Phase 6 — Web Development Studio (about 2 weeks)
- Prompt editor, code response, editor/viewer, isolated execution, live preview, console and feedback panel.

Acceptance: supported frontend project runs in isolation; generated code cannot access app secrets; errors are visible; user can refine prompt and preview; no arbitrary code executes in the main app environment.

### Phase 7 — Practicals and capstone (about 1 week)
- Five practicals, project submission, automated checks, rubric-based assessment, project report and certificate.

Acceptance: practicals have clear requirements and rubrics; final evaluation covers prompt and artifact; learner can inspect feedback and attempt history.

### Phase 8 — QA and beta launch (about 1 week)
- Test onboarding, progression, responsive layout, AI feedback, quota handling, security and content quality with a small group of learners.

Acceptance: no critical security issues; core flows work end-to-end; course can be completed; feedback and analytics are captured; known limitations are documented.

## 19. BUILD ORDER / PRIORITIES

Build in this order:
1. Finalize Web Development curriculum, objectives and assessment rubrics.
2. Write Level 1 content, examples, exercises and video scripts.
3. Define prompt evaluation rubric and challenge formats.
4. Design onboarding and sample personalized roadmap.
5. Build design system, landing page and dashboard.
6. Build learning path and lesson engine.
7. Integrate videos and interactive exercises.
8. Integrate Gemini evaluation and global quota handling.
9. Build secure Web Development Studio and preview.
10. Create all five practical assignments and capstone.
11. Complete admin management.
12. Beta test and refine.

Do not polish animations or build complex social features before the learning experience works.

## 20. QUALITY, SECURITY AND TESTING REQUIREMENTS

- Validate all AI outputs against schemas; treat model output as untrusted input.
- Use server-side authorization for admin and user-owned resources.
- Protect API routes against abuse and validate request sizes.
- Store API keys and secrets only server-side.
- Apply rate limits and usage accounting.
- Sanitize user-provided content before rendering; avoid unsafe HTML execution.
- Isolate generated code execution with resource and network restrictions.
- Add tests for course progression, prerequisite unlocking, scoring, progress persistence, quota concurrency and authorization.
- Test responsive behaviour and keyboard accessibility.
- Make empty, loading, error, retry and quota-exhausted states intentional.
- Do not claim a generated website is functional until it has actually run and passed relevant checks.
- Provide transparent evaluation rationales; AI scores are estimates and should be calibrated against human-reviewed examples.

## 21. LANDING PAGE DIRECTION

Hero headline: **“Don't just use AI. Learn to master it.”**

Suggested supporting copy: “Explore prompt engineering through interactive courses, real-world challenges and specialized AI workspaces.”

Include:
- Primary CTA: Start Learning.
- Secondary CTA: Explore Courses.
- Preview of the learning path.
- Domain/path cards, with Web Development highlighted as the first available path.
- Learn-by-doing explanation.
- Studio preview.
- Challenge and practical project preview.
- Video learning section.
- Progress/achievement preview.
- Final CTA.

The landing page must communicate that PromptLab teaches transferable prompt engineering skills and practical AI-assisted workflows, not just prompt templates.

## 22. FINAL INSTRUCTIONS TO THE AI CODING AGENT

Before coding:
1. Inspect the existing repository and report its current structure, framework, existing features and constraints.
2. Identify what already exists. Do not overwrite working code or recreate existing components without reason.
3. Convert this specification into a phased implementation checklist.
4. Identify any genuinely blocking unknowns. Make sensible defaults for nonblocking details and document them rather than repeatedly asking the user.

During implementation:
1. Work phase by phase, not all at once.
2. At the start of each phase, state the intended changes and files/modules affected.
3. Implement the smallest complete vertical slice.
4. Run type checks, linting and relevant tests after meaningful changes.
5. Fix regressions before proceeding.
6. Keep UI components reusable and content data-driven.
7. Use realistic sample course content, not lorem ipsum or empty placeholder cards.
8. Do not silently remove requirements. If a requirement is technically infeasible, explain why and propose the closest safe alternative.
9. Do not add other domain courses before the Web Development release is complete unless explicitly requested.
10. Keep a concise implementation status: completed, in progress, blocked and next step.

At the end of each phase, report:
- What was implemented.
- Important files/modules changed.
- Tests/checks run and their results.
- Any limitations or decisions.
- The next recommended phase.

**Definition of done:** A learner can register, personalize a Web Development learning path, follow video/theory lessons, complete interactive exercises, submit prompts for meaningful AI evaluation, earn progress rewards, use the Web Development Studio safely, complete practical assignments and finish a capstone with a transparent assessment. Admins can manage course content without changing application code.

Do not mistake a visually impressive dashboard for a finished product. The learning loop must work end to end.
