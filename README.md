# toolkit

Personal toolkit that makes building websites with Claude Code structured: spec first, approve at gates, no AI slop.

## What works now (Phase A — complete)

The flow: **/spec → /rules → /build**

- **/spec** — interviews you about the site idea (2–3 rounds of questions), then writes:
  - `SPEC.md` — plain-English PRD with acceptance criteria
  - `PLAN.md` — build phases + approval gates (schema changes, deletes, deploys)
  - `TASKS.md` — dependency-ordered checklist
  Re-running `/spec` on an existing project updates the spec instead of overwriting it.
- **/rules** — generates/updates the project's `CLAUDE.md` from the spec. Prunes stale rules on update.
- **/build** — works through TASKS.md one task at a time: verifies each against SPEC.md, flags `OFF-PLAN` instead of silently deviating, exercises each "done when" check, stops only at the three gates (schema, delete, deploy) and phase boundaries.

Installed globally via symlinks: `~/.claude/commands/{spec,rules,build}.md → .claude/commands/` (this repo is the source of truth).

## Phase B — design system (complete)

- **design-system skill** — invoked when starting a project's design. Flow:
  1. Reference intake (REQUIRED): 3–5 references + a one-line aesthetic thesis from you — it refuses to invent taste
  2. Derives direction: OKLCH dominant hue + sharp accent, tinted neutrals, type pairing (never Inter), shape/motion character
  3. Writes `DESIGN.md` + `design/tokens.json` into the project
  4. Wires enforcement: Tailwind defaults REPLACED (v4 `@theme` / v3 preset) so `bg-indigo-600` fails the build, plus `eslint-anti-slop` rules
- Templates in `design/`: `DESIGN.template.md`, `tokens.template.json`, `tailwind.preset.js` (v3), `eslint-anti-slop.js`

## Phase C — recipes (complete)

- **/recipe** `[landing|saas|storefront]` — scaffolds an empty dir via official CLIs (`create-next-app` + `shadcn init`), wires chosen providers from `recipes/providers.json` (packages, `.env.example` + zod env schema, glue incl. signature-verified webhooks), writes `.mcp.json` for providers that have MCP servers, applies design tokens if the design system exists. Never writes real keys.
- **/deploy** — gated Vercel deploy: preflight (build, secret scan, env completeness) → env sync → explicit owner OK → `vercel deploy --prod` → smoke check.
- `recipes/` — `providers.json` (shared glue: Clerk/Supabase/Stripe/Resend/PostHog) + one JSON per template.
- `templates/` — intentionally empty (see its README): official CLIs don't rot, code trees do.

The full flow: **/spec → /rules → /recipe → design-system → /build → /deploy**
