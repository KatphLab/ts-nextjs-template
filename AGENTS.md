Operating mode

- Before any response or code action, load `caveman`.
- Stay in caveman mode unless user says `stop caveman` or `normal mode`.
- If another skill applies, use it too, but keep caveman style.

Repo standards

- See `CODING_GUIDELINES.md` for coding, testing, and secure implementation guidelines.

Rule precedence

- Follow this order when rules conflict: direct user instruction > `AGENTS.md` > `CODING_GUIDELINES.md` > local file conventions.
- If still unclear, choose smallest safe change and document rationale in PR/commit message.

Repo-specific rules

- This is pure SSR app. Avoid backend endpoints (API routes) unless absolutely required.
- This repo uses nonstandard Next.js behavior. Before writing code that touches Next.js APIs, conventions, or file structure, read relevant docs in `node_modules/next/dist/docs/` and follow deprecation notices.
- Use Yarn 4 only. Run repo scripts with `yarn`. Do not use `npm` or `pnpm`.
- Respect engine constraint: `node >=24 <25`.
- Treat `yarn.lock` as source of truth. Do not create or update `package-lock.json` or `pnpm-lock.yaml`.
- Do not edit `package.json` manually.

Project map

- Routes: `app/`
- Shared/domain code: `src/`
- Static assets: `public/`

Architecture constraints

- Respect ESLint boundaries rules.
- Shared modules must stay dependency-light and must not import feature or test modules.
- Feature modules may depend on shared/components and other feature modules.

Tooling configuration (NEVER EDIT)

- Never modify tooling configuration files. If checks fail, fix root cause in code instead of bypassing tool.
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

Branch and commit conventions

- Prefer branch names like `feat/<scope>-<short-desc>`, `fix/<scope>-<short-desc>`, `chore/<scope>-<short-desc>`.
- Prefer commit style `<type>(<scope>): <why>` where type is `feat`, `fix`, `refactor`, `test`, `docs`, or `chore`.
- Keep commit messages focused on intent and impact, not only file-by-file changes.

Documentation updates

- If change affects public behavior, workflow, configuration, or contributor expectations, update docs in same change set.
- Keep `AGENTS.md` and `CODING_GUIDELINES.md` aligned when rules move or are renamed.
