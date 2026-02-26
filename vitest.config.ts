import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'problems',
          include: ['__tests__/problems/**/*.test.ts'],
          environment: 'node',
          globals: true,
          testTimeout: 5000,
        },
      },
      {
        test: {
          name: 'real-world',
          include: ['__tests__/real-world/**/*.test.ts'],
          environment: 'node',
          globals: true,
          testTimeout: 10000,
        },
      },
      './js-interview-practice',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['solutions/**/*.{ts,js}'],
    },
  },
});
