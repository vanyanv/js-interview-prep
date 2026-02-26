// Auto-generated from problems/04-fast-slow-pointers/easy-05-palindrome-linked-list.js
// Re-run: npm run generate:tests
import { describe, it, expect } from 'vitest';
import { functionName, tests } from './../../../problems/04-fast-slow-pointers/easy-05-palindrome-linked-list.js';

const solutionFn = undefined;

describe('easy-05-palindrome-linked-list [problems/04-fast-slow-pointers]', () => {
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
