---
description: Interview me about a website idea, then write SPEC.md, PLAN.md, and TASKS.md (the living spec)
argument-hint: [one-line description of the site idea]
---

# /spec — living spec generator

You are running a spec interview for a website project. The goal: turn a fuzzy idea into three files the agent can be held to — `SPEC.md` (what), `PLAN.md` (how), `TASKS.md` (order). Do not write any code during this command.

Idea provided (may be empty): $ARGUMENTS

## Step 0 — existing spec check

If `SPEC.md` already exists in this project, this is an UPDATE, not a fresh start: read all three files first, ask only about what's changing, and preserve everything still true. Never silently overwrite decisions already recorded.

## Step 1 — interview

Use AskUserQuestion, 2–3 rounds, max 4 questions per round. Skip any question the idea line or existing spec already answers. Prefer concrete options over open-ended questions.

**Round 1 — the idea:**
- What is this site, in one sentence?
- Who is it for (specific person/group, not "everyone")?
- What does success look like (the one action a visitor should take)?

**Round 2 — scope:**
- Pages/sections: which are must-have for v1?
- Features: auth? payments? forms/contact? CMS/blog? (each yes pulls in a provider later — flag the cost)
- Content: what exists already vs. what must be created?

**Round 3 — edges (only what's still unknown):**
- What is explicitly OUT of v1?
- Acceptance criteria: "done means ___" — get 3–5 testable statements.
- Known edge cases or constraints (deadline, brand assets, existing domain).

## Step 2 — confirm

Present a compact summary (10 lines max) of what you heard: idea, audience, must-haves, out-of-scope, acceptance criteria. Ask for approval. Do not write files until approved.

## Step 3 — write the three files

**SPEC.md** — plain English, no jargon. Sections:
- Problem & audience (2–3 sentences)
- Success metric (the one visitor action)
- Features — Must have (v1) / Later (explicitly deferred)
- Out of scope (things we agreed NOT to build)
- Acceptance criteria (the testable "done means" list)
- Edge cases & constraints

**PLAN.md** — how it gets built:
- Stack (default: Next.js + TypeScript + Tailwind + shadcn/ui, Vercel deploy; only add Clerk/Supabase/Stripe/Resend/PostHog if a feature in SPEC.md needs it)
- Build phases in dependency order, each phase ending in something viewable
- Approval gates: agent MUST stop and ask before (1) schema changes, (2) deleting files/data, (3) deploys. Everything else proceeds without asking.
- Risks / open questions

**TASKS.md** — checkbox list:
- One task per line: `- [ ] task — done when: <check>`
- Dependency order: no task may depend on an unchecked one below it
- Small enough that each is verifiable in one sitting
- Group under phase headings matching PLAN.md

## Step 4 — next steps

After writing the files, tell the user: "Run /rules to generate the project CLAUDE.md, then /build to start working through TASKS.md."

## Rules

- These files are the living spec: future sessions check work against SPEC.md and flag "off-plan" before deviating.
- Keep total length honest — a spec nobody reads enforces nothing. SPEC.md under ~80 lines, PLAN.md under ~60, TASKS.md as long as it needs.
- Plain language throughout. The owner is non-technical; if a term needs a glossary, rewrite the sentence.
