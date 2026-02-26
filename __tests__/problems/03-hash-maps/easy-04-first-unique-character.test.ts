// Auto-generated from problems/03-hash-maps/easy-04-first-unique-character.js
// Re-run: npm run generate:tests
import { describe, it, expect } from 'vitest';
import { functionName, tests } from './../../../problems/03-hash-maps/easy-04-first-unique-character.js';

let solutionFn: ((...args: any[]) => any) | undefined;
try {
  const mod = await import('./../../../solutions/easy-04-first-unique-character.ts');
  solutionFn = mod[functionName] ?? mod.default;
} catch {
  // Solution not found — tests will be skipped
}

describe('easy-04-first-unique-character [problems/03-hash-maps]', () => {
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
