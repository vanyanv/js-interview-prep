/*
Problem: Custom useAsync Hook
Difficulty: Hard
Category: React Hooks - Async State Management

Create a custom hook that manages async operations with loading, error, and data states.

Example 1:
  Input: asyncFunction = () => fetch('/api/users').then(r => r.json())
  Output: { data: null, loading: true, error: null, execute: function }

Example 2:
  Input: asyncFunction that resolves with data
  Output: { data: [users...], loading: false, error: null, execute: function }

Example 3:
  Input: asyncFunction that rejects
  Output: { data: null, loading: false, error: Error, execute: function }

Requirements:
  - Manage loading, error, and data states
  - Execute function manually or on mount
  - Handle promise resolution and rejection
  - Prevent state updates after unmount
  - Reset states on new execution

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use useState for data, loading, error states
  - Use useCallback for execute function
  - Use useRef to track component mount status
  - Handle promise chains properly
  - Reset states before new execution
*/

export const functionName = 'useAsync';

export const tests = [
  {
    input: [() => Promise.resolve("test data")],
    expected: {
      data: null,
      loading: false,
      error: null,
      execute: expect.any(Function)
    }
  },
  {
    input: [() => Promise.reject(new Error("API Error"))],
    expected: {
      data: null,
      loading: false,
      error: null,
      execute: expect.any(Function)
    }
  },
  {
    input: [() => new Promise(resolve => setTimeout(() => resolve("delayed"), 100))],
    expected: {
      data: null,
      loading: false,
      error: null,
      execute: expect.any(Function)
    }
  }
];