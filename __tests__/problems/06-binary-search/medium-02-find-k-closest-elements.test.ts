// Auto-generated from problems/06-binary-search/medium-02-find-k-closest-elements.js
// Re-run: npm run generate:tests
import { describe, it, expect } from 'vitest';
import { functionName, tests } from './../../../problems/06-binary-search/medium-02-find-k-closest-elements.js';

const solutionFn = undefined;

describe('medium-02-find-k-closest-elements [problems/06-binary-search]', () => {
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
