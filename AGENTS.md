<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## PromptLab presentation theme

The active visual system is the design-tool theme documented in
`docs/design-system.md`. It supersedes earlier purple/mint/gold/coral tokens,
rounded surfaces, shadows, gradients, blur, and the previous rounded sans
typography.
Use the CSS variables in `src/app/globals.css`: paper, panel, ink, muted ink,
hot orange accent, and electric-blue selection. Keep presentation changes
behavior- and accessibility-preserving; do not alter business logic, data
models, routes, authentication, evaluation, quotas, or test intent.

Use square geometry, 2px primary borders, 1px secondary borders, Space Mono
for UI/display text, Space Grotesk for reading text, visible focus, and
`prefers-reduced-motion` fallbacks. Validate theme work with `pnpm check:theme`.
