# PromptLab Release 1 Risks

Last reviewed: 2026-11-04

These are delivery and product risks identified from the Release 1
specification and the current foundation. They should be converted into
design constraints and verification work before the affected phase is marked
done.

## 1. Secure code execution

**Risk:** Generated code must never execute in the main Next.js process or
privileged application origin. Sandpack is useful for supported frontend
previews, but it is not a general isolation solution for backend/full-stack
practicals and its dependency, browser, network, and runtime capabilities need
to be verified for the intended projects.

**Impact:** A faulty execution boundary could expose application secrets,
internal services, user data, or denial-of-service paths.

**Mitigation:** Start with a clearly scoped frontend-only Sandpack preview.
Treat generated files, dependencies, and user follow-up prompts as untrusted.
For backend/full-stack practicals, use a separately isolated execution
service/container with time, memory, filesystem, process, and network limits,
ephemeral storage, dependency allowlisting, cleanup, and no production
credentials. Add adversarial tests before Studio is considered complete.

**Owner / gate:** Studio architecture. No Studio acceptance without a
documented trust boundary and an execution-security test plan.

## 2. Shared Gemini quota

**Risk:** Gemini quotas vary by model, project, account tier, and provider
policy. Concurrent evaluation requests can exceed RPM, TPM, or RPD capacity;
blind retries can amplify the problem and increase cost.

**Impact:** Evaluation failures, unpredictable latency, quota exhaustion, and
misleading learner feedback.

**Mitigation:** Keep the provider behind `lib/ai/provider.ts`. Configure model
and quota values outside source code. Track request/token usage, distinguish
successes from failures, handle `429 RESOURCE_EXHAUSTED` and provider retry
guidance, and use atomic Redis or PostgreSQL window accounting. Use
timezone-aware Pacific reset handling for RPD. Provide a clear unavailable
state while keeping non-AI lessons and quizzes usable. Load-test concurrent
requests before launch.

**Owner / gate:** AI evaluation and platform operations. Do not describe an
application mirror as the provider's authoritative quota.

## 3. Firebase-to-Postgres identity sync

**Risk:** Firebase Auth identity and the application `User` row can diverge
because of first-login races, changed email/display name, deleted accounts,
replayed cookies, or custom-claim changes.

**Impact:** Incorrect ownership checks, orphaned rows, failed sign-in
provisioning, or privilege escalation if authorization trusts client data.

**Mitigation:** Verify the Firebase session cookie server-side on every
protected operation. Upsert by immutable `firebaseUid`, never by email.
Centralize user provisioning and claim-to-role mapping, define behavior for
deleted/disabled Firebase users, and use transactions/idempotency for
first-login creation. Test stale cookies, missing users, changed claims, and
admin authorization.

**Owner / gate:** Auth phase. No protected route should rely on client-side
Firebase state alone.

## 4. Third-party YouTube availability and rights

**Risk:** External tutorials can be removed, region-restricted, age-gated,
copyright-claimed, or changed without notice. Embedding a video is not
permission to download or re-upload it.

**Impact:** Broken lessons, inaccessible learning content, rights exposure,
and inconsistent completion tracking.

**Mitigation:** Store provider, URL, title, duration, captions/transcript
permissions, and availability metadata in the database. Use official embeds
only, run link/availability checks, provide written fallback content, and
support PromptLab-owned videos through a rights-cleared service such as
Cloudflare Stream or Mux. Do not make a lesson impossible to complete because
an external video is unavailable.

**Owner / gate:** Content and lesson-engine phases. Content publishing should
include a rights and link verification step.

## 5. AI score calibration

**Risk:** LLM evaluations can be inconsistent, over-reward long prompts,
misread language differences, reveal ideal answers too early, or score
generated artifacts without enough deterministic verification.

**Impact:** Learners may optimize for the grader rather than the skill, lose
trust, or receive incorrect guidance.

**Mitigation:** Run deterministic requirement checks first. Version every rubric
and store the model/usage metadata with each evaluation. Validate all model
output with Zod, constrain score ranges and dimensions, and make hints
actionable without immediately exposing the ideal answer. Build a human-reviewed
calibration set containing weak, acceptable, and strong submissions across
languages and stacks. Measure Space Mono-rater agreement, revision improvement, and
false positives before changing weights.

**Owner / gate:** Evaluation and content phases. AI scores must be presented as
feedback estimates, not unquestionable facts.

## 6. Content production workload

**Risk:** Release 1 requires five levels, 30 lessons, practical assignments,
capstone briefs, videos, exercises, hints, rubrics, seed records, and admin
editing. Producing technically accurate, accessible, localized-ready content
can outpace engineering.

**Impact:** A polished shell could ship without a completable learning loop,
or inconsistent content could undermine evaluation quality.

**Mitigation:** Treat content as a first-class delivery stream. Define lesson
templates and acceptance criteria, produce and test Level 1 before scaling,
use database-driven fixtures/seed data, review examples against current
framework behavior, and test every challenge with weak/acceptable/strong
submissions. Prioritize a complete vertical slice over empty pages across all
five levels.

**Owner / gate:** Curriculum and content phases. Do not mark the course engine
complete until a learner can complete a real seeded lesson end to end.

## 7. Specification and stack drift

**Risk:** The master specification's recommended stack includes Auth.js, while
the current product instruction fixes Firebase Auth. Future implementation may
accidentally follow the older recommendation or add dependencies without a
documented reason.

**Impact:** Conflicting auth/session behavior, unnecessary rewrites, and
security gaps.

**Mitigation:** Treat the fixed-stack instruction as authoritative for
technology choices. Record exceptions and dependency reasons in implementation
documentation. Keep authentication interfaces isolated so provider-specific
code does not leak through learner features.

**Owner / gate:** Foundation and auth phases.

## 8. Environment and secret handling

**Risk:** A local `.env` exists and contains sensitive configuration. The
current validation helper is server-oriented but is not yet invoked at startup
or enforced by route boundaries.

**Impact:** Accidental secret exposure or late runtime failures.

**Mitigation:** Keep `.env` ignored, never print its values, validate required
variables at server startup/request boundaries, prohibit `NEXT_PUBLIC_` AI or
Firebase Admin secrets, and add a safe configuration test that checks schema
behavior without logging secret contents.

**Owner / gate:** Foundation, auth, and AI phases.

## 9. Database schema completeness and migration safety

**Risk:** The current Prisma schema is only a starting model and has no
migration history or production seed process. Content and progress behavior
will depend on relationships that are not yet represented.

**Impact:** Rework, inconsistent local environments, lost progress semantics,
or unsafe schema changes after content is authored.

**Mitigation:** Finalize relational boundaries before importing substantial
content, use versioned migrations, create deterministic seed data, test
prerequisite and ownership constraints, and preserve rubric versions for
historical evaluations.

**Owner / gate:** Schema and content phases.
