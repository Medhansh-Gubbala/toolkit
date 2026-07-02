---
name: design-system
description: Generate a per-project design system — DESIGN.md + tokens.json + enforcement (Tailwind default replacement, anti-slop lint). Use when starting any new site's design, before building UI in a project without a DESIGN.md, or when the user says "design system", "set up the design", or "don't make it look AI-generated". Requires 3–5 references + a one-line aesthetic thesis from the owner — refuse to generate without them.
---

# design-system — per-project taste enforcement

Turn the owner's taste (references + thesis) into enforceable tokens. The tool executes taste; it never invents it. Templates live in `/mnt/c/Users/Medhansh/projects/toolkit/design/`.

## Step 0 — reference intake (REQUIRED, no exceptions)

Ask the owner for:
1. **3–5 references** — URLs, screenshots, or named aesthetics ("Teenage Engineering manuals", "Aesop product pages"). For each, ask WHAT to take from it (its color mood? its type? its density?).
2. **One-line aesthetic thesis** — e.g. "clinical warmth: lab precision, but it smiles."

If the owner has neither, do NOT invent a direction and proceed. Help them find references (show contrasting directions, ask what repels/attracts), but the choice is theirs. No thesis → no design system.

## Step 1 — derive the direction

From the references, decide and state (get a nod before writing files):
- **Dominant hue** — one hue family for surfaces/structure. Derive the OKLCH angle from the references' actual colors.
- **Accent** — one sharp accent, typically 90–160° away in hue, higher chroma. CTAs and key moments only.
- **Neutrals** — tinted toward the dominant hue (2–8% chroma of dominant). Pure gray is slop.
- **Type pairing** — distinctive display + readable body, real weight contrast. NEVER Inter. Space Grotesk only if the thesis demands it — rotate: consider serif displays (editorial), monos (technical), grotesques other than the famous two, or a characterful geometric. The pairing should be *arguable from the references*.
- **Shape + motion character** — sharp/soft/round radii; calm/snappy/expressive motion. One character, not a menu.

## Step 2 — write the files (into the project)

1. `DESIGN.md` — fill `design/DESIGN.template.md`. Every `{placeholder}` replaced; the banned list keeps all global items and adds project-specific bans learned from the references.
2. `design/tokens.json` — fill `design/tokens.template.json`. All OKLCH values real (chroma peaks in the 400–600 range of the dominant scale, tails desaturate). Type sizes computed from the chosen scale ratio. No `REPLACE` strings survive.

## Step 3 — wire enforcement

Detect the project's Tailwind major version, then:
- **v4** (CSS-first): generate an `@theme` block in the global CSS from tokens.json, REPLACING the default palette (`--color-*: initial;` first, then token vars) so `bg-indigo-600` fails the build. Map radii, fonts, and easing vars the same way.
- **v3**: copy `design/tailwind.preset.js` next to the project's tokens.json, wire `presets: [...]` into `tailwind.config.js`. Replacement semantics are built into the preset.
- **Both**: copy `design/eslint-anti-slop.js` into the project and add it to the ESLint flat config. Load fonts via `next/font` with the chosen families.

Verify: run the build; confirm a file containing `bg-indigo-600` fails (v4) or renders unstyled + lints red (v3). Delete the probe file after.

## Step 4 — hand off to building

When UI gets built afterwards, the frontend-design / aesthetics skills may load — their output OBEYS this project's DESIGN.md where they conflict (fonts, palette, radii). DESIGN.md wins; generic aesthetic defaults lose.

## Rules

- Accent >5% of any screen = wrong. Say so during review.
- Every color/size/radius/duration in code comes from tokens. An arbitrary value is a bug, not a shortcut.
- DESIGN.md is part of the living spec: /build checks UI work against it the same way it checks SPEC.md.
