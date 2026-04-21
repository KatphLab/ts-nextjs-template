import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'
import { strictReporter } from './vitest.strict-reporter'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app/': fileURLToPath(new URL('app/', import.meta.url)),
      '@config/': fileURLToPath(new URL('src/config/', import.meta.url)),
      '@lib/': fileURLToPath(new URL('src/lib/', import.meta.url)),
      '@types/': fileURLToPath(new URL('src/types/', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    allowOnly: false,
    passWithNoTests: false,
    reporters: ['default', strictReporter],
    exclude: [...configDefaults.exclude, '**/.opencode/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
      exclude: [
        'app/**/__tests__/**',
        '**/test-utils/**',
        '.opencode/**',
        '.next/**',
        'src/types/**',
        'src/components/primitives/**',
        'src/components/features/**',
        'app/**',
      ],
      thresholds: {
        perFile: true,
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
})
