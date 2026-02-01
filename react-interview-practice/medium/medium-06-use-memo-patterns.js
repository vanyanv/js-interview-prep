/*
Problem: useMemo Performance Optimization
Difficulty: Medium
Category: React Hooks - Performance

Create examples of useMemo for expensive calculations and object references.

Example 1:
  Input: items = [1,2,3,4,5], filter = 'even'
  Output: memoizedFilteredItems = [2, 4]

Example 2:
  Input: data = {...largeDataset}, sortBy = 'name'
  Output: memoizedSortedData = [...sortedData]

Requirements:
  - Memoize expensive calculations
  - Prevent object recreation on re-renders
  - Handle complex dependency arrays
  - Compare performance with and without memoization
  - Show appropriate use cases

Time Complexity: O(1) for memoized values
Space Complexity: O(n) for cached results

Hints:
  - Use useMemo for expensive computations
  - Memoize object and array creations
  - Include all dependencies in dependency array
  - Consider when memoization adds value
  - Avoid premature optimization
*/

export const functionName = 'useOptimizedValues';

export const tests = [
  {
    input: [[1, 2, 3, 4, 5], 'even'],
    expected: {
      filteredItems: [2, 4],
      expensiveCalculation: expect.any(Number),
      memoizedObject: expect.any(Object),
      computedStats: expect.any(Object)
    }
  },
  {
    input: [['apple', 'banana', 'cherry'], 'length'],
    expected: {
      filteredItems: expect.any(Array),
      expensiveCalculation: expect.any(Number),
      memoizedObject: expect.any(Object),
      computedStats: expect.any(Object)
    }
  }
];