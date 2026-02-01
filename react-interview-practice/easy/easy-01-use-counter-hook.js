/*
Problem: Custom useCounter Hook
Difficulty: Easy
Category: React Hooks - Custom Hooks

Create a custom hook that manages a counter with increment, decrement, and reset functionality.

Example 1:
  Input: initialValue = 0
  Output: { count: 0, increment: function, decrement: function, reset: function }

Example 2:
  Input: initialValue = 5
  Output: { count: 5, increment: function, decrement: function, reset: function }

Requirements:
  - Return current count value
  - Provide increment function (+1)
  - Provide decrement function (-1)
  - Provide reset function (back to initial value)
  - Handle optional step parameter for increment/decrement

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use useState to manage counter state
  - Use useCallback for memoized functions
  - Return object with count and functions
  - Consider optional step parameter
*/

export const functionName = 'useCounter';

// Mock React hooks for testing
const mockUseState = (initial) => {
  let value = initial;
  const setValue = (newValue) => {
    value = typeof newValue === 'function' ? newValue(value) : newValue;
  };
  return [() => value, setValue];
};

const mockUseCallback = (fn) => fn;

// Test implementation
export const tests = [
  {
    input: [0],
    expected: {
      count: 0,
      increment: expect.any(Function),
      decrement: expect.any(Function),
      reset: expect.any(Function)
    }
  },
  {
    input: [5],
    expected: {
      count: 5,
      increment: expect.any(Function),
      decrement: expect.any(Function),
      reset: expect.any(Function)
    }
  },
  {
    input: [-3],
    expected: {
      count: -3,
      increment: expect.any(Function),
      decrement: expect.any(Function),
      reset: expect.any(Function)
    }
  }
];