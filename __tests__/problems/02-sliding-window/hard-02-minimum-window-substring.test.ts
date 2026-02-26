// Auto-generated from problems/02-sliding-window/hard-02-minimum-window-substring.js
// Re-run: npm run generate:tests
import { describe, it, expect } from 'vitest';
import { functionName, tests } from './../../../problems/02-sliding-window/hard-02-minimum-window-substring.js';

const solutionFn = undefined;

describe('hard-02-minimum-window-substring [problems/02-sliding-window]', () => {
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
