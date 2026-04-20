import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import boundaries from 'eslint-plugin-boundaries'
import importPlugin from 'eslint-plugin-import'
import regexpPlugin from 'eslint-plugin-regexp'
import pluginSecurity from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  sonarjs.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  regexpPlugin.configs.recommended,
  pluginSecurity.configs.recommended,
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
      'unused-imports': unusedImports,
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
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
      '@typescript-eslint/no-unsafe-type-assertion': 'error',

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
      '@typescript-eslint/prefer-readonly': 'error',

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
      'no-restricted-syntax': [
        'error',
        {
          selector: String.raw`ImportDeclaration[source.value=/^\.\./], ExportNamedDeclaration[source.value=/^\.\./], ExportAllDeclaration[source.value=/^\.\./]`,
          message:
            'Relative parent imports (../) are not allowed. Use path aliases (@app/*, @src/*) instead.',
        },
        {
          selector: 'ExportNamedDeclaration[source]',
          message: 'Do not create pass-through re-export files.',
        },
        {
          selector: 'ExportAllDeclaration',
          message: 'Do not use export * barrel files.',
        },
        {
          selector:
            "TSTypeReference[typeName.name='ReturnType'] > TSTypeParameterInstantiation > TSTypeQuery > Identifier",
          message:
            'Do not use ReturnType<typeof fn> for local codebase functions. Define and export an explicit type instead.',
        },
      ],
      'sonarjs/cognitive-complexity': ['error', 12],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      complexity: ['error', 10],
      'max-lines-per-function': [
        'error',
        { max: 80, skipBlankLines: true, skipComments: true },
      ],
      'max-params': 'off',
      '@typescript-eslint/max-params': ['error', { max: 7 }],
    },
  },
  // Allow relative parent imports in test files (tests import the module they test)
  // Also allow longer test functions and empty function mocks
  {
    files: ['**/__tests__/**', '**/test-utils/**'],
    rules: {
      'no-restricted-syntax': 'off',
      'max-lines-per-function': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'unicorn/no-useless-undefined': 'off',
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
    '.opencode/**',
  ]),
])

export default eslintConfig
