// Auto-generated from problems/00-warmup/easy-03-find-duplicates-basic.js
// Re-run: npm run generate:tests
import { describe, it, expect } from 'vitest';
import { functionName, tests } from './../../../problems/00-warmup/easy-03-find-duplicates-basic.js';

let solutionFn: ((...args: any[]) => any) | undefined;
try {
  const mod = await import('./../../../solutions/easy-03-find-duplicates-basic.js');
  solutionFn = mod[functionName] ?? mod.default;
} catch {
  // Solution not found — tests will be skipped
}

describe('easy-03-find-duplicates-basic [problems/00-warmup]', () => {
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
