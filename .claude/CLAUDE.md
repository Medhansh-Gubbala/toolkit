# Toolkit rules

Personal toolkit for structured website building with Claude Code. Not a SaaS — no auth, no multi-tenancy, no billing. See BUILD_PLAN in the OneDrive project folder for the full plan.

- All phases complete: A = `/spec`, `/rules`, `/build`; B = `design-system` skill + `design/` templates; C = `/recipe`, `/deploy` + `recipes/`.
- Everything here must stay portable: plain Claude Code commands/skills, no external services.
- `~/.claude/commands/{spec,rules,build,recipe,deploy}.md` and `~/.claude/skills/design-system` are symlinks into this repo — edit the repo copies.
- `templates/` is intentionally empty (official CLIs scaffold; JSON recipes carry structure) — don't fill it until the same custom code is copied into a 3rd project.
