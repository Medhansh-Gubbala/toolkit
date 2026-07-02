---
description: Push the current project to Vercel with env vars synced — gated, runs preflight first
---

# /deploy — gated Vercel deploy

Deploying is approval gate 3. Never run the production deploy without the owner's explicit OK in this session.

## Step 1 — preflight (all must pass before asking for the OK)

1. `npm run build` and lint pass locally.
2. Git: work committed, nothing sensitive staged — scan tracked files for key patterns (sk_live, sk_test, ghp_, AKIA, BEGIN PRIVATE KEY, RESEND_, whsec_). A hit = stop, fix, and rotate the key if it was ever committed.
3. `.env.example` lists every var `lib/env.ts` requires; `.env.local` has real values for all of them.
4. If SPEC.md exists: acceptance criteria that can be checked locally are checked. Off-plan deploys don't happen.

## Step 2 — link + env sync

- First deploy: `vercel link` (owner picks scope/project interactively — suggest `! vercel link` if it needs a browser login).
- Sync env vars: for each var in `.env.local`, `vercel env add <NAME> production` (value piped from `.env.local`, never echoed to the transcript). Skip vars already set unless the owner says overwrite.
- Payments live keys: if Stripe is wired and still on test keys, ask which mode production should run — don't silently ship test mode.

## Step 3 — the gate

Show: project name, Vercel scope, domain(s), env vars set (names only), and anything unusual. Ask: "Deploy to production?" Wait for the OK.

## Step 4 — deploy + verify

- `vercel deploy --prod`, capture the URL.
- Smoke check: `curl -sI <url>` returns 200; if the project has a webhook route, confirm the provider dashboard points at the production URL (Stripe webhook endpoint + `STRIPE_WEBHOOK_SECRET` for prod is a NEW secret — remind the owner).
- Print the live URL and what was verified. If SPEC.md has a success metric, remind the owner to watch it in PostHog.

## Failure = stop

A failed build/deploy is reported as failed, with the log. No retry-until-green without understanding why.
