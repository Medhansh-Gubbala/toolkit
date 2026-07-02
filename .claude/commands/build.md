---
description: Work through TASKS.md one task at a time — verify each against SPEC.md, stop only at approval gates
argument-hint: [optional: specific task or phase to work on]
---

# /build — plan-approve-build-verify loop

Execute the project's living spec, one task at a time. Focus (may be empty): $ARGUMENTS

## Step 0 — load the spec

Read `SPEC.md`, `PLAN.md`, `TASKS.md`. If any is missing, stop: "No spec found — run /spec first." If `./CLAUDE.md` is missing, suggest /rules but continue.

## The loop

Repeat until the current PLAN.md phase is complete or a gate is hit:

1. **Pick** — the first unchecked task in TASKS.md (or the one matching $ARGUMENTS). Restate it and its "done when" in one line.
2. **Spec check (before)** — does this task still match SPEC.md? If implementing it would contradict the spec, or the right implementation isn't what the task says: STOP, print `OFF-PLAN: <what deviates and why>`, and ask whether to (a) update the spec via /spec, or (b) do it as written. Never silently deviate.
3. **Build** — smallest change that satisfies "done when". No unrequested extras.
4. **Verify** — actually exercise the "done when" check (run it, load it, test it — not just "code looks right"). If it fails, fix before moving on; if it can't pass as written, that's OFF-PLAN — flag it.
5. **Record** — check the box in TASKS.md. If the work surfaced a new necessary task, add it in dependency order marked `(added during build)`. One-line progress report.
6. **Next** — continue to the next task without asking.

## Approval gates — the ONLY stops

Stop and ask before:
1. **Schema changes** — any database migration, table/column change
2. **Deletes** — removing files, data, or deployed resources
3. **Deploys** — pushing to production/Vercel

Everything else proceeds without asking. Do not invent extra gates; do not skip these three.

## Phase boundary

When the last task of a PLAN.md phase is checked: stop, show the acceptance criteria from SPEC.md that this phase satisfies (with how each was verified), and something viewable if the phase produced UI. Wait for approval before starting the next phase.

## If things go sideways

Stuck task, contradiction between files, or verification that keeps failing: stop and re-plan — say what's wrong and propose the spec change. Don't keep pushing.
