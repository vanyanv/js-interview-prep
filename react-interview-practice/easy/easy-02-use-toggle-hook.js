/*
Problem: Custom useToggle Hook
Difficulty: Easy
Category: React Hooks - Boolean State

Create a custom hook that manages a boolean toggle state.

Example 1:
  Input: initialValue = false
  Output: { value: false, toggle: function, setTrue: function, setFalse: function }

Example 2:
  Input: initialValue = true
  Output: { value: true, toggle: function, setTrue: function, setFalse: function }

Requirements:
  - Return current boolean value
  - Provide toggle function (flip true/false)
  - Provide setTrue function (force true)
  - Provide setFalse function (force false)
  - Default to false if no initial value

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use useState for boolean state
  - Toggle function should flip current value
  - Use useCallback for performance
  - Handle undefined initial value
*/

export const functionName = 'useToggle';

export const tests = [
  {
    input: [false],
    expected: {
      value: false,
      toggle: expect.any(Function),
      setTrue: expect.any(Function),
      setFalse: expect.any(Function)
    }
  },
  {
    input: [true],
    expected: {
      value: true,
      toggle: expect.any(Function),
      setTrue: expect.any(Function),
      setFalse: expect.any(Function)
    }
  },
  {
    input: [],
    expected: {
      value: false,
      toggle: expect.any(Function),
      setTrue: expect.any(Function),
      setFalse: expect.any(Function)
    }
  }
];