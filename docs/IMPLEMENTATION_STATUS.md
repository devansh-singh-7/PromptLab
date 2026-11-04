# PromptLab Release 1 Implementation Status

Last reviewed: 2026-11-04

## Repository snapshot

PromptLab is a standalone Next.js App Router project. It is not empty, but it
is still at foundation stage:

- Framework: Next.js `16.4.5`, React `19.3.1`, TypeScript `5.9.3`.
- Styling: Tailwind CSS `4.3.4` with a small custom CSS token layer.
- Data/validation: Prisma Client `7.10.1` and Zod `4.6.7`.
- Testing: Vitest `5.1.0`, React Testing Library, and Playwright
  `1.64.1`.
- Routes: `/` and Next.js-generated `/_not-found`.
- Source modules: `src/app` and `src/lib` only.
- Database: a starting PostgreSQL Prisma schema exists; no migrations or
  database connection workflow has been created.
- Authentication: no Firebase client SDK, Firebase Admin SDK, session-cookie
  verification, middleware, or protected route exists yet.
- Environment handling: `.env` exists locally and is not committed; the
  server-only `getServerEnv()` helper validates required database, Firebase,
  and Gemini variables with Zod. The helper is not yet invoked at application
  startup or by a server boundary.
- Existing UI: a branded landing-page foundation in `src/app/page.tsx`, global
  layout metadata, responsive CSS tokens, and one landing-page smoke test.

## Release 1 checklist

Status values: **not started**, **in progress**, **done**, or **blocked**.

| Phase / deliverable | Status | Current evidence and gap |
|---|---|---|
| Foundation | done | Next.js App Router, strict TypeScript, package scripts, lint, unit-test, E2E-test, and build configuration exist. |
| Design system | in progress | Initial PromptLab palette, typography, responsive cards, focus styles, and reduced-motion handling exist; shadcn/ui, Radix primitives, reusable tokens, and full component system do not. |
| Schema | in progress | Prisma has User, profile/preferences, Domain, Course, Module, Lesson, Challenge, submissions, evaluations, and lesson progress; migrations, seed content, practicals, videos, achievements, daily activity, AI usage/quota, studio sessions, artifacts, and admin audit data are missing. |
| Auth | not started | Firebase Auth client sign-in, Firebase Admin session-cookie verification, custom-claim roles, route protection, and user synchronization are absent. |
| Landing | in progress | `/` communicates the product promise and Web Development release; marketing sections, authentication CTAs, accessible navigation, and real sign-in flow are absent. |
| App shell / dashboard | not started | No shared navigation, dashboard, profile/settings, loading states, or authenticated shell exists. |
| Progression engine | not started | No prerequisite unlocking, XP, streaks, levels, achievements, skill mastery, daily quests, or persisted activity rules exist. |
| Path map | not started | No learning-path/course map or lesson-node UI exists. |
| Onboarding | not started | No adaptive questionnaire, separate global/domain preferences, roadmap generation, learner editing, or approval flow exists. |
| Lesson engine | not started | No database-backed lesson route, video metadata/player, theory/examples view, completion tracking, bookmarks, or next-lesson unlock flow exists. |
| Exercise engine | not started | No quiz, MCQ, prompt repair, ordering, fill-gap, scenario, attempt, hint, or completion engine exists. |
| AI evaluation | not started | No `lib/ai/provider.ts`, Gemini `@google/genai` integration, deterministic checks, output Zod schemas, evaluation API, sanitized feedback rendering, or revision history exists. |
| Shared Gemini quota | not started | No Redis/PostgreSQL atomic limiter, RPM/TPM/RPD accounting, retry/backoff handling, usage records, or quota-exhausted UX exists. |
| Web Development Studio | not started | No Studio Engine, prompt editor, generated-file model, CodeMirror editor, Sandpack preview, console, feedback panel, or isolated backend execution exists. |
| Practicals / capstone | not started | No five practical assignments, capstone briefs, artifact evaluation, rubric report, certificate criteria, or project history exists. |
| Admin | not started | No admin authorization, content CRUD, publishing/versioning, reordering, rubric management, learner preview, or audit trail exists. |
| Content | not started | The five-level Web Development curriculum is specified in the documents but no lessons, videos, quizzes, challenges, practicals, or capstone records are seeded in the database. |
| QA | in progress | Baseline commands pass: `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`. End-to-end journeys, accessibility, responsive behavior, authorization, security, quota concurrency, and content calibration are not tested. |

## Gap analysis against the specifications

### Present

- Release 1 specifications and future-domain plan are stored in
  `docs/specs/`.
- The project uses the required Next.js/TypeScript foundation and PostgreSQL
  Prisma direction.
- A `Domain` entity and domain-scoped preferences establish the intended
  multi-domain boundary without implementing other domain UI/content.
- The initial landing page uses the requested PromptLab promise and highlights
  Web Development only.
- The repository excludes local environment files and has server-oriented
  environment validation fields for Firebase and Gemini.
- Baseline quality tooling is operational.

### Missing or incomplete

- The fixed stack is not yet complete: Firebase Auth, `@google/genai`,
  TanStack Query, Zustand, Framer Motion, lucide-react, React Hook Form,
  CodeMirror 6, Sandpack, dnd-kit, Recharts, next-intl, Sentry, and PostHog
  are not dependencies or implemented integrations.
- The older specification mentions Auth.js in its recommended stack, but the
  project requirement explicitly selects Firebase Auth. Firebase is therefore
  the implementation target.
- The schema is a foundation, not a complete Release 1 model. It lacks
  videos, practicals, capstones, rubrics/versioning, achievements, daily
  activity, AI usage/quota windows, studio sessions, generated artifacts,
  role/audit data, and robust content relationships.
- No database migrations, seed pipeline, admin content workflow, or realistic
  database-driven Web Development content exists.
- No authenticated or protected route exists.
- No learner learning loop exists beyond the static landing page:
  onboarding → approved roadmap → lesson → practice → evaluation → studio →
  practical → capstone.
- No AI provider abstraction or validated Gemini response pipeline exists.
- No secure generated-code execution boundary exists. The required Studio
  security model is therefore not yet represented in code.
- No localization infrastructure exists; explanation-language and technical
  stack separation is only a schema/design requirement at this point.
- No meaningful browser journey, accessibility, authorization, quota, or
  security coverage exists.

## Nonblocking assumptions

1. The repository folder remains `PromptLab`, while the npm package name stays
   lowercase as required by npm.
2. Firebase Auth is authoritative for authentication and custom-claim roles;
   PostgreSQL stores the application user keyed by `firebaseUid`.
3. PostgreSQL migrations and seed data will be added before building learner
   routes, with Web Development as the only active Release 1 domain.
4. Sandpack is the first preview target for frontend-only practicals; backend
   and full-stack practical execution will use a separately isolated service
   or container boundary rather than the Next.js app origin.
5. Gemini model identifiers and quota settings remain environment/configuration
   values and are never hardcoded.
6. External YouTube videos will be embedded only after availability and rights
   checks; PromptLab-owned video hosting is a later content-operations choice.
7. shadcn/ui components will be introduced as local reusable primitives when
   the design-system phase begins, rather than treating the landing-page CSS
   as the final component system.
8. English is the initial UI/content language, but all learner data models will
   preserve independent explanation-language and technical-stack settings.
9. No future-domain course or studio UI will be built before Web Development
   Release 1 is complete.

## Blocking questions

None at the current inspection stage. The remaining choices are design and
implementation decisions that can be handled with the assumptions above.
