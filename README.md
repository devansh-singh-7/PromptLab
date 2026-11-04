# PromptLab

PromptLab helps learners practice AI-assisted web development through lessons,
challenges, feedback, and an isolated studio.

## Setup

1. Install Node.js 24 and pnpm 10.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env.local` and fill in the required values.
4. Ensure PostgreSQL is available at `DATABASE_URL`.
5. Generate the Prisma client with `pnpm db:generate`.
6. For an empty PostgreSQL database, apply the initial migration and Release 1
   content with `pnpm db:setup`.
7. Install the Playwright browser once with `pnpm exec playwright install chromium`.
8. Start development with `pnpm dev`.

## Scripts

- `pnpm dev` - start the Next.js development server.
- `pnpm build` - create a production build.
- `pnpm start` - serve the production build.
- `pnpm typecheck` - run strict TypeScript checks.
- `pnpm lint` - run ESLint.
- `pnpm test` - run Vitest and React Testing Library tests.
- `pnpm test:e2e` - run the Playwright smoke suite.
- `pnpm db:generate` - generate the Prisma client.
- `pnpm db:seed` - upsert the Web Development Release 1 seed data.
- `pnpm db:setup` - apply migrations and seed an empty database.

## Architecture

- `src/app` contains App Router routes and API handlers.
- `src/components` contains reusable UI organized by product surface.
- `src/domains` contains web-development curriculum and challenge rules.
- `src/lib` contains infrastructure integrations and cross-cutting services.
- `prisma` contains the PostgreSQL schema, migrations, and Release 1 seed.

The initial route boundaries are reserved for marketing, authentication,
authenticated product areas, and administration. Generated code is expected to
run only in a constrained frontend preview; backend execution requires a
separate isolated service.
