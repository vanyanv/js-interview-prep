/*
Problem: Custom usePrevious Hook
Difficulty: Easy
Category: React Hooks - State Tracking

Create a custom hook that tracks the previous value of a state or prop.

Example 1:
  Input: currentValue = 5
  Output: previousValue = undefined (first render)

Example 2:
  Input: currentValue = 10 (after update)
  Output: previousValue = 5

Example 3:
  Input: currentValue = { name: 'John', age: 30 }
  Output: previousValue = { name: 'John', age: 25 } (previous object)

Requirements:
  - Return previous value from last render
  - Handle any data type (primitives, objects, arrays)
  - Return undefined on first render
  - Update previous value on each render
  - Use useRef for persistent storage across renders

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use useRef to store previous value across renders
  - Use useEffect to update ref after each render
  - Return ref.current before updating it
  - Handle undefined/null values properly
*/

export const functionName = 'usePrevious';

export const tests = [
  {
    input: [42],
    expected: undefined // First render returns undefined
  },
  {
    input: ['hello'],
    expected: undefined
  },
  {
    input: [{ id: 1, name: 'test' }],
    expected: undefined
  },
  {
    input: [[1, 2, 3]],
    expected: undefined
  }
];