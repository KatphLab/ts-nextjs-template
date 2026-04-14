<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Mandatory communication mode (required)

- Always load and use `caveman` skill before any response or code action.
- Stay in caveman mode for all replies unless user explicitly says `stop caveman` or `normal mode`.
- If multiple skills apply, still keep caveman style while following those skills.

## Project structure quick map

- App Router pages/routes live in `app/`.
- Shared/domain code lives in `src/`.
- Static assets live in `public/`.
- Database schema/migrations live in `prisma/`.
- Repo automation/docs/config live in `.github/`, `.husky/`, `docs/`, and root config files.

## Package manager and runtime policy (required)

- Package manager is Yarn 4 (`packageManager: yarn@4.13.0`). Use `yarn` commands, not `npm` or `pnpm`. Do not update `package.json` manually.
- Lockfile of record is `yarn.lock`; do not add or update `package-lock.json`/`pnpm-lock.yaml`.
- Respect engine constraint in `package.json` (`node >=24 <25`).
- Use repo scripts via Yarn (`yarn dev`, `yarn test`, `yarn check`, etc.).

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

## Branch workflow policy

- When working on feature, first check if in feature branch (not `main`/`master`).
- If not in feature branch, create new branch with descriptive name before starting work.
- Do NOT use git worktrees for this repo.
