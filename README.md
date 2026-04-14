# ts-nextjs-template

A production-ready Next.js template with comprehensive tooling for code quality, testing, security, and CI/CD.

## Features

- **[Next.js 16](https://nextjs.org)** with App Router and React 19
- **[Tailwind CSS 4](https://tailwindcss.com)** for styling
- **[TypeScript](https://www.typescriptlang.org)** with strict configuration
- **[Vitest](https://vitest.dev)** for testing with coverage (90% threshold)
- **Code Quality**: ESLint, Prettier, Husky, lint-staged
- **Architecture Enforcement**: ESLint boundaries, dependency-cruiser, knip
- **Security**: Semgrep, ESLint security plugins, duplicate code detection
- **CI/CD**: GitHub Actions with Danger JS PR reviews

## Getting Started

### Prerequisites

- Node.js >=24.0.0 <25 (managed via `packageManager: yarn@4.13.0`)
- Yarn 4.13.0+ (Corepack enabled)

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
yarn build
```

## Scripts

| Script              | Description                                                                      |
| ------------------- | -------------------------------------------------------------------------------- |
| `yarn dev`          | Start development server                                                         |
| `yarn build`        | Build for production                                                             |
| `yarn start`        | Start production server                                                          |
| `yarn lint`         | Run ESLint                                                                       |
| `yarn lint:fix`     | Fix ESLint issues                                                                |
| `yarn typecheck`    | Run TypeScript compiler                                                          |
| `yarn format`       | Format code with Prettier                                                        |
| `yarn format:check` | Check formatting                                                                 |
| `yarn test`         | Run tests with Vitest                                                            |
| `yarn test:ci`      | Run tests with coverage                                                          |
| `yarn test:watch`   | Run tests in watch mode                                                          |
| `yarn check`        | **Full quality gate**: format, lint, typecheck, tests, depcruise, knip, dupcheck |
| `yarn fix`          | Auto-fix issues: format, lint, knip                                              |
| `yarn depcruise`    | Check architecture boundaries                                                    |
| `yarn knip`         | Find unused dependencies/exports                                                 |
| `yarn dupcheck`     | Check for code duplication                                                       |

## Quality Gates

This repository enforces high standards:

- **Coverage**: 90% per file for statements, branches, functions, and lines
- **No skipped/todo tests**: Vitest strict reporter fails builds
- **Architecture boundaries**: Enforced via ESLint and dependency-cruiser
- **No code duplication**: jscpd detects copy-pasted code
- **Security**: Semgrep scans for OWASP Top 10, Node.js, TypeScript, and secrets

## GitHub Security Settings

> **Note**: To enable the full security scanning pipeline (Semgrep), you may need to enable **Advanced Security** in your GitHub repository settings.
>
> **Settings** → **Security** → **Code security and analysis** → **GitHub Advanced Security**
>
> This enables:
>
> - Secret scanning
> - Dependency review
> - Code scanning with Semgrep

## CI/CD

Pull requests automatically run:

1. Lint, typecheck, format checks
2. Vitest with coverage (strict mode)
3. Architecture validation (dependency-cruiser)
4. Unused code detection (knip)
5. Duplicate code detection (jscpd)
6. Security scanning (Semgrep)
7. PR review automation (Danger JS)

All checks must pass before merging.

## AI Agent Guidelines

See [AGENTS.md](./AGENTS.md) for coding rules and conventions when using AI assistants.

## License

MIT
