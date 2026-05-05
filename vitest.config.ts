import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'
import { strictReporter } from './vitest.strict-reporter'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app/': fileURLToPath(new URL('src/app/', import.meta.url)),
      '@api/': fileURLToPath(new URL('src/app/api/', import.meta.url)),
      '@components/': fileURLToPath(
        new URL('src/components/', import.meta.url),
      ),
      '@config/': fileURLToPath(new URL('src/config/', import.meta.url)),
      '@lib/': fileURLToPath(new URL('src/lib/', import.meta.url)),
      '@shared/': fileURLToPath(new URL('src/shared/', import.meta.url)),
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
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/__tests__/**',
        '**/test-utils/**',
        '.opencode/**',
        '.next/**',
        'src/types/**',
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
