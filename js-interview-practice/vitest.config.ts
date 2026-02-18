import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['problems/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['problems/**/solution.ts', 'problems/**/starter.ts'],
    },
    // Give async tests reasonable time without being overly generous
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
