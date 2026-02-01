/*
Problem: Function Memoization
Difficulty: Easy
Category: Performance - Caching

Create a memoization wrapper that caches function results to avoid expensive recalculations.

Example 1:
  Input: memoize((x) => x * x), call with 5 twice
  Output: First call: 25 (calculated), Second call: 25 (from cache)

Example 2:
  Input: memoize(fibonacci), call fib(10) multiple times
  Output: Subsequent calls return cached result

Requirements:
  - Cache results based on arguments
  - Support functions with multiple arguments
  - Return cached value for same inputs
  - Handle different argument types

Time Complexity: O(1) for cached results, O(f) for uncached
Space Complexity: O(n) where n is number of unique argument sets

Hints:
  - Use Map or Object for cache storage
  - Create unique keys from arguments
  - Handle serialization of complex arguments
  - Consider cache size limits
*/

export const functionName = 'memoize';

export const tests = [
  {
    input: [(x) => x * x],
    expected: expect.any(Function)
  },
  {
    input: [(a, b) => a + b],
    expected: expect.any(Function)
  },
  {
    input: [(str) => str.toUpperCase()],
    expected: expect.any(Function)
  }
];