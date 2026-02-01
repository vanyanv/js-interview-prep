/*
Problem: Testing Assertion Patterns
Difficulty: Easy
Category: Testing - Assertions

Create different types of assertions for comprehensive test coverage.

Example 1:
  Input: value = 42, expected = 42
  Output: { passed: true, type: 'equality' }

Example 2:
  Input: value = [1, 2, 3], expected = [1, 2, 3]
  Output: { passed: true, type: 'deep-equality' }

Requirements:
  - Implement equality assertions
  - Handle deep object/array comparison
  - Support type checking assertions
  - Provide truthiness/falsiness checks
  - Include custom error messages

Time Complexity: O(n) for deep comparisons
Space Complexity: O(1)

Hints:
  - Use strict equality for primitives
  - Implement deep comparison for objects/arrays
  - Check typeof for type assertions
  - Handle null/undefined edge cases
  - Provide descriptive failure messages
*/

export const functionName = 'createAssertions';

export const tests = [
  {
    input: [],
    expected: {
      assertEqual: expect.any(Function),
      assertDeepEqual: expect.any(Function),
      assertType: expect.any(Function),
      assertTrue: expect.any(Function),
      assertFalse: expect.any(Function)
    }
  }
];