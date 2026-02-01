/*
Problem: Custom useDebounce Hook
Difficulty: Medium
Category: React Hooks - Performance

Create a custom hook that debounces a value, delaying updates until after a specified delay.

Example 1:
  Input: value = "hello", delay = 500
  Output: "hello" (after 500ms delay)

Example 2:
  Input: value changes rapidly: "h", "he", "hel", "hell", "hello"
  Output: Only "hello" after delay finishes

Requirements:
  - Return debounced value
  - Reset timer on each value change
  - Use setTimeout for delay
  - Clean up timers properly

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use useState for debounced value
  - Use useEffect to manage setTimeout
  - Clean up previous timeout on each change
  - Return cleanup function from useEffect
*/

export const functionName = 'useDebounce';

export const tests = [
  {
    input: ["hello", 100],
    expected: "hello"
  },
  {
    input: ["test", 500],
    expected: "test"
  },
  {
    input: ["", 200],
    expected: ""
  },
  {
    input: ["rapid-changes", 0],
    expected: "rapid-changes"
  }
];