# DESIGN — {project}

## Aesthetic thesis
{One line, chosen by the owner. This is the human-taste input — everything below serves it.}

## References
{3–5, each with WHAT to take from it — not just a link.}
1. {ref} — take: {the specific thing}
2. ...

## Direction
- Is: {3 adjectives}
- Is NOT: {3 anti-adjectives}

## Color rules
- Dominant ({hue}): surfaces, structure, large areas. Never for CTAs.
- Accent ({hue}): CTAs and key moments ONLY. If accent covers >5% of a screen, it's wrong.
- Neutrals are tinted toward the dominant hue — pure gray is banned.
- All colors come from `tokens.json`. No arbitrary values (`bg-[#...]`) anywhere.

## Type rules
- Display: {font} — headings, hero, numbers. Weight contrast is real: {400 vs 700+}.
- Body: {font} — everything else.
- Scale ratio {1.25}: sizes come from tokens, no ad-hoc `text-[17px]`.

## Spacing, radii, shape
- Spacing on a {4px} grid.
- Radii: {sharp | soft | round} — one character, applied consistently. Default Tailwind radii don't exist in this project.

## Motion
- {calm | snappy | expressive}: durations/easings from tokens. Nothing animates that doesn't communicate state.

## Banned (global anti-slop list + project additions)
- Purple/indigo gradients; any indigo/violet/fuchsia default palette use
- Inter (anywhere), Space Grotesk (as a reflex — allowed only if the thesis demands it)
- Default Tailwind radii/shadows used as-is
- Emoji as UI icons; hero blobs; glassmorphism-by-default
- Centered-everything layouts; three-feature-cards-with-icons as a reflex
- {project-specific bans from the references}
