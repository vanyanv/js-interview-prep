// Auto-generated from problems/03-hash-maps/easy-15-two-sum.js
// Re-run: npm run generate:tests
import { describe, it, expect } from 'vitest';
import { functionName, tests } from './../../../problems/03-hash-maps/easy-15-two-sum.js';

let solutionFn: ((...args: any[]) => any) | undefined;
try {
  const mod = await import('./../../../solutions/easy-15-two-sum.ts');
  solutionFn = mod[functionName] ?? mod.default;
} catch {
  // Solution not found — tests will be skipped
}

describe('easy-15-two-sum [problems/03-hash-maps]', () => {
  if (!solutionFn) {
    it.todo('solution not yet implemented');
    return;
  }

  const fn = solutionFn!;

  tests.forEach((testCase: { input: any[]; expected: any }, index: number) => {
    it(`case ${index + 1}: (${testCase.input.map((a: any) => JSON.stringify(a)).join(', ')}) => ${JSON.stringify(testCase.expected)}`, () => {
      const result = fn(...testCase.input);
      expect(result).toEqual(testCase.expected);
    });
  });
});
