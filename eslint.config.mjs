import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import boundaries from 'eslint-plugin-boundaries'
import importPlugin from 'eslint-plugin-import'
import regexp from 'eslint-plugin-regexp'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      boundaries,
      import: importPlugin,
      regexp,
      security,
      sonarjs,
      unicorn,
      'unused-imports': unusedImports,
    },
    settings: {
      'boundaries/elements': [
        {
          type: 'tests',
          pattern: 'app/**/__tests__/**',
        },
        {
          type: 'shared',
          pattern: 'app/shared/**',
        },
        {
          type: 'components',
          pattern: 'app/components/**',
        },
        {
          type: 'feature',
          pattern: 'app/features/*/**',
          capture: ['feature'],
        },
        {
          type: 'app-root',
          pattern: 'app/*.{ts,tsx,mts,css}',
        },
        {
          type: 'app',
          pattern: 'app/**',
        },
      ],
    },
    rules: {
      // Prefer TS-aware variants
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
          enums: true,
          typedefs: true,
          ignoreTypeReferences: true,
        },
      ],

      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',

      // Tighten common escape hatches
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        { ignoreStringArrays: true },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: false,
          allowAny: false,
          allowNullish: false,
          allowRegExp: false,
        },
      ],

      // Good for app codebases
      'unused-imports/no-unused-imports': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              from: { type: 'app' },
              disallow: { to: { type: 'tests' } },
            },
            {
              from: { type: 'shared' },
              disallow: { to: { type: ['feature', 'tests'] } },
            },
            {
              from: { type: 'feature' },
              allow: {
                to: {
                  type: ['feature', 'shared', 'components'],
                },
              },
            },
          ],
        },
      ],
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/cognitive-complexity': ['error', 12],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      complexity: ['error', 10],
      'max-lines-per-function': [
        'error',
        { max: 80, skipBlankLines: true, skipComments: true },
      ],

      // unicorn
      'unicorn/catch-error-name': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-array-callback-reference': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-unreadable-array-destructuring': 'error',
      'unicorn/no-useless-undefined': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-includes': 'error',

      // regexp
      'regexp/no-dupe-characters-character-class': 'error',
      'regexp/no-empty-group': 'error',
      'regexp/no-obscure-range': 'error',
      'regexp/no-super-linear-backtracking': 'error',
      'regexp/optimal-quantifier-concatenation': 'error',
      'regexp/prefer-d': 'error',
      'regexp/prefer-regexp-exec': 'error',
      'regexp/strict': 'error',

      // security
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-new-buffer': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-object-injection': 'error',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',
      'security/detect-unsafe-regex': 'error',
    },
  },
  globalIgnores([
    '.dependency-cruiser.js',
    '*.config.mjs',
    'eslint.config.mjs',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
  ]),
])

export default eslintConfig
