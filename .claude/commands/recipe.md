---
description: Scaffold a new site from a recipe — Next.js + shadcn + chosen providers wired (env schema, glue, MCP config)
argument-hint: [landing | saas | storefront]
---

# /recipe — one-command project setup

Scaffold the current (empty) directory from a recipe. Recipes live in `/mnt/c/Users/Medhansh/projects/toolkit/recipes/` — read `providers.json` plus the chosen template's JSON before doing anything.

Template requested (may be empty): $ARGUMENTS

## Step 0 — preconditions

- Directory must be empty or near-empty (spec files are fine). Existing app code → stop, this command doesn't retrofit.
- If no `SPEC.md`: recommend running /spec first, but proceed if the owner says so.
- If the recipe has a `preflight` field, apply it before anything else.

## Step 1 — choose

Via AskUserQuestion (skip what $ARGUMENTS or SPEC.md already answers):
1. Template: landing / saas / storefront — describe each in one line from its JSON.
2. Features: present the template's `defaultFeatures` as the recommended set, `optionalFeatures` as add-ons. Each extra feature = a provider account + keys to manage; say so.

## Step 2 — scaffold base

```
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir
npx shadcn@latest init
```
Take the CLI's defaults unless SPEC.md says otherwise. Then create the recipe's `structure.pages` as minimal placeholder routes — real UI comes later via /build, after the design-system skill has run.

## Step 3 — wire providers

For each chosen feature, from `providers.json`:
1. Install `packages`.
2. Append every `env` entry to `.env.example` (placeholder values only) and to `lib/env.ts` — a zod schema that fails fast at startup on missing vars, server-only vars validated server-side only.
3. Create the `glue` files. Webhook routes MUST verify signatures — that item is not optional scaffolding.
4. Confirm `.env*` (except `.env.example`) is gitignored.

NEVER write a real key anywhere. The owner fills `.env.local` by hand; end by listing exactly which keys they need and which dashboard issues each.

## Step 4 — MCP bundling

Build `.mcp.json` from the `mcp` entries of chosen providers (skip nulls). Keep `REPLACE` placeholders — the owner substitutes real tokens. Before writing, sanity-check that each MCP package still exists (`npm view <pkg> version`); if one has moved, find the current official server rather than shipping a dead config.

## Step 5 — design tokens

- If `DESIGN.md` + `design/tokens.json` exist: apply them (v4 `@theme` replacement or v3 preset, per the design-system skill's Step 3).
- If not: say clearly — "No design system yet. Run the design-system skill before building any UI, or this will look like every other AI site." Don't generate UI beyond placeholder routes without it.

## Step 6 — verify + hand off

- `npm run build` must pass. Fix until it does.
- Print: what was scaffolded, which providers are wired, which env keys the owner must fill (and where to get them), and the next steps: design-system skill → /build → /deploy.
