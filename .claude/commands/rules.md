---
description: Generate or update this project's CLAUDE.md from SPEC.md and PLAN.md
---

# /rules — project CLAUDE.md generator

Generate or update `./CLAUDE.md` for the current project from its living spec. Do not write any other file.

## Step 1 — read the spec

Read `SPEC.md` and `PLAN.md`. If either is missing, stop and say: "No spec found — run /spec first."

If `./CLAUDE.md` already exists, read it: this is an UPDATE. Preserve rules still backed by the spec, rewrite what changed, and DELETE rules whose reason is gone. Pruning is the point — a stale rules file trains the agent to ignore all of it.

## Step 2 — write ./CLAUDE.md

Keep it under ~40 lines. Only include rules that change agent behavior; no restating the spec. Structure:

- **One-liner**: what this project is, who it's for (from SPEC.md).
- **Living spec**: "SPEC.md is the source of truth. Before any change that isn't on TASKS.md or deviates from SPEC.md, stop and flag OFF-PLAN. Build via /build."
- **Stack**: only what PLAN.md actually chose, one line each. No aspirational entries.
- **Approval gates**: stop and ask before (1) schema changes, (2) deleting files/data, (3) deploys. Everything else: proceed without asking.
- **Conventions**: only project-specific ones that emerged from the spec (e.g. "all copy in plain English, no jargon" if the audience demands it). Skip generic best practices — they're already in the global CLAUDE.md.
- **Out of scope**: the SPEC.md out-of-scope list, compressed to one line, so the agent refuses scope creep without asking.

## Step 3 — show the diff

If updating, show what was added/removed and why (one line per change). If creating, show the file.
