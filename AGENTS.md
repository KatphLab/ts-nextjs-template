Operating mode

- Before any response or code action, load `caveman`.
- Stay in caveman mode unless user says `stop caveman` or `normal mode`.
- If another skill applies, use it too, but keep caveman style.

Repo-specific rules

- This is a pure SSR (Server-Side Rendering) application. Avoid creating backend endpoints (API routes) unless absolutely required.
- This repo uses nonstandard Next.js behavior. Before writing code that touches Next.js APIs, conventions, or file structure, read relevant docs in `node_modules/next/dist/docs/` and follow deprecation notices.
- Use Yarn 4 only. Run repo scripts with `yarn`. Do not use `npm` or `pnpm`.
- Respect engine constraint: `node >=24 <25`.
- Treat `yarn.lock` as source of truth. Do not create or update `package-lock.json` or `pnpm-lock.yaml`.
- Do not edit `package.json` manually.

Work rules

- Reuse existing modules/components when possible.
- Prefer smallest correct change.
- When replacing behavior, remove obsolete path instead of keeping parallel logic.
- Keep edits focused and consistent with local patterns.
- Do not add `TODO` or `FIXME` without linked issue.

Testing and quality

- For any behavior change, add or update tests for both success and failure paths.
- Do not leave skipped or todo tests.
- Keep per-file coverage at or above 90% for statements, branches, functions, and lines.
- Prefer user-facing assertions with Testing Library when practical.
- Before claiming work complete, run `yarn check`.
- Do not bypass quality gates or pre-commit hooks.

Architecture constraints

- Respect ESLint boundaries rules.
- Code in `app/` must not import from `app/**/__tests__/**`.
- Shared modules must stay dependency-light and must not import feature or test modules.
- Feature modules may depend on shared/components and other feature modules.

Security

- Do not introduce `eval`, unsafe command execution, or hardcoded secrets.

Tooling configuration (NEVER EDIT)

- Never modify tooling configuration files. If checks fail, fix the root cause in the code instead of bypassing the tool.
- Forbidden files:
  - `.dependency-cruiser.js`
  - `eslint.config.mjs`
  - `jscpd.json`
  - `knip.json`
  - `.prettierrc.json`
  - `tsconfig.json`

Git workflow

- Before feature work, verify current branch is not `main` or `master`.
- If it is, create descriptive feature branch before making changes.
- Do not use git worktrees in this repo.
- Keep PRs focused and small. Optimize implementation to reduce unnecessary line churn and avoid broad refactors when smaller edits solve problem.
- While working, keep checking branch diff against `main` and compare it to PR limits before changes grow too large.
- Highlight to user when branch appears to be trending too large, and suggest narrowing scope or splitting work before limit is exceeded.
- PR limits from `dangerfile.ts`:
  - Max files changed: `20`
  - Max total lines changed: `1200`
  - Max additions: `1000`
  - Large deletions warning threshold: `400`
