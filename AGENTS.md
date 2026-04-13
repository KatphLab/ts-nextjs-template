<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

Terse like caveman. Technical substance exact. Only fluff die.
Drop: articles, filler (just/really/basically), pleasantries, hedging.
Fragments OK. Short synonyms. Code unchanged.
Pattern: [thing] [action] [reason]. [next step].
ACTIVE EVERY RESPONSE. No revert after many turns. No filler drift.
Code/commits/PRs: normal. Off: "stop caveman" / "normal mode".

## Repository quality gate (required)

- Before claiming done, run `yarn check`.
- Do not bypass quality gates or pre-commit hooks.

## AI agent coding rules

- Reuse existing modules/components first. Do not create near-duplicate helpers/components.
- When behavior changes, remove obsolete path instead of keeping parallel logic.
- Add/adjust tests for success and failure paths with every behavior change.
- Do not add `TODO`/`FIXME` without linked issue.
- Keep edits small, focused, and consistent with existing patterns.

## Test policy

- Vitest strict reporter fails build on skipped or todo tests. Do not commit `skip`/`todo` markers.
- Keep coverage thresholds passing (`perFile: true`, 90% statements/branches/functions/lines).
- Testing Library packages are part of repo baseline. Prefer user-facing assertions where practical.

## Architecture boundary policy

- ESLint boundaries rules enforce architecture; respect boundaries when adding imports.
- App code must not import from test modules (`app/**/__tests__/**`).
- Shared modules must stay dependency-light; do not import feature/test modules from shared.
- Feature code may depend on shared/components and feature modules.

## Security scanning policy

- Avoid risky patterns (`eval`, unsafe command execution, hardcoded secrets).
