import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['*.ts', 'tests/**/*.ts'],
      exclude: ['node_modules', 'dist', 'coverage'],
    },
  },
});
