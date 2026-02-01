/*
Problem: Basic Jest Test Function
Difficulty: Easy
Category: Testing - Jest Fundamentals

Create a function that tests a simple mathematical operation using Jest-style assertions.

Example 1:
  Input: testFn = (a, b) => a + b, args = [2, 3], expected = 5
  Output: { passed: true, message: "Test passed" }

Example 2:
  Input: testFn = (a, b) => a * b, args = [4, 5], expected = 19
  Output: { passed: false, message: "Expected 19 but got 20" }

Requirements:
  - Execute the test function with given arguments
  - Compare result with expected value
  - Return test result object with passed boolean and message
  - Handle different data types (numbers, strings, objects)

Time Complexity: O(1)
Space Complexity: O(1)

Hints:
  - Use strict equality for comparison
  - Create descriptive error messages
  - Handle edge cases like null/undefined
  - Return consistent result format
*/

export const functionName = 'runBasicTest';

export const tests = [
  {
    input: [(a, b) => a + b, [2, 3], 5],
    expected: { passed: true, message: "Test passed" }
  },
  {
    input: [(a, b) => a * b, [4, 5], 19],
    expected: { passed: false, message: "Expected 19 but got 20" }
  },
  {
    input: [(str) => str.toUpperCase(), ["hello"], "HELLO"],
    expected: { passed: true, message: "Test passed" }
  },
  {
    input: [(arr) => arr.length, [[1, 2, 3]], 2],
    expected: { passed: false, message: "Expected 2 but got 3" }
  }
];