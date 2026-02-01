/*
Problem: useCallback Optimization Patterns
Difficulty: Medium
Category: React Hooks - Performance

Create examples of proper useCallback usage for preventing unnecessary re-renders.

Example 1:
  Input: dependencies = [userId], callback = (id) => fetchUser(id)
  Output: memoizedCallback that only changes when userId changes

Example 2:
  Input: dependencies = [], callback = () => resetForm()
  Output: stableCallback that never changes

Requirements:
  - Demonstrate proper useCallback usage
  - Show dependency array best practices
  - Handle event handlers optimization
  - Compare with and without useCallback
  - Measure performance impact

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use useCallback for expensive operations
  - Include all dependencies in array
  - Use empty array for stable references
  - Compare with useMemo for values vs functions
  - Consider when optimization is actually needed
*/

export const functionName = 'useOptimizedCallbacks';

export const tests = [
  {
    input: [{ userId: 123, data: [1, 2, 3] }],
    expected: {
      handleClick: expect.any(Function),
      handleSubmit: expect.any(Function),
      handleReset: expect.any(Function),
      memoizedFilter: expect.any(Function),
      stableCallback: expect.any(Function)
    }
  },
  {
    input: [{ filter: 'active', items: [] }],
    expected: {
      handleClick: expect.any(Function),
      handleSubmit: expect.any(Function),
      handleReset: expect.any(Function),
      memoizedFilter: expect.any(Function),
      stableCallback: expect.any(Function)
    }
  }
];