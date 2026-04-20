# Coding Guidelines

## Core Principles

- Reuse existing modules/components when possible.
- Prefer smallest correct change.
- When replacing behavior, remove obsolete path instead of keeping parallel logic.
- Keep edits focused and consistent with local patterns.
- Do not add `TODO` or `FIXME` without linked issue.

## Testing and Quality

- Treat these as behavior changes and test them: UI copy shown to users, state transitions, side effects (storage/network), loading/error states, and data contract/output shape changes.
- For every behavior change, add or update tests for both success and failure paths.
- Minimum test contract for changed behavior: at least one happy path assertion and one failure/error path assertion.
- Do not leave skipped or todo tests.
- Keep per-file coverage at or above 90% for statements, branches, functions, and lines.
- Prefer user-facing assertions with Testing Library when practical.
- Before claiming work complete, run verification checklist:
  - `yarn check`
  - targeted tests for changed files/features
  - manual smoke test for touched UI flows
- Do not bypass quality gates or pre-commit hooks.

## Error Handling

- Normalize unknown thrown values to `Error` at boundaries.
- Show safe, actionable messages to users; do not leak internals.
- Preserve useful diagnostics for developers (context, failed operation, identifiers when safe).

## Dependency Changes

- Add or update dependencies only when existing repo modules cannot solve problem cleanly.
- Include short rationale in PR/commit message for each dependency change.
- Review security and license impact before merging dependency changes.
- Keep `yarn.lock` consistent with dependency changes; do not create `package-lock.json` or `pnpm-lock.yaml`.

## Accessibility and UX Baseline

- For UI edits, keep keyboard navigation functional.
- Ensure interactive controls have accessible names/labels.
- Preserve readable contrast and avoid regressions in loading/error feedback.

## Security

- Do not introduce `eval`, unsafe command execution, or hardcoded secrets.
