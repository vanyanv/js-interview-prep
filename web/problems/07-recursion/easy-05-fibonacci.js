/*
Problem: Fibonacci Number
Difficulty: Easy
Category: Recursion, Math, Dynamic Programming
LeetCode: #509
Pattern: Basic Recursion

Calculate the nth Fibonacci number using recursion.
The Fibonacci sequence is defined as:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) for n > 1

Example 1:
  Input: n = 2
  Output: 1
  Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1

Example 2:
  Input: n = 3
  Output: 2
  Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2

Example 3:
  Input: n = 4
  Output: 3
  Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3

Example 4:
  Input: n = 0
  Output: 0
  Explanation: F(0) = 0 by definition

Example 5:
  Input: n = 1
  Output: 1
  Explanation: F(1) = 1 by definition

Constraints:
  - 0 <= n <= 30
  - n is a non-negative integer

Time Complexity: O(2^n) - exponential due to repeated calculations
Space Complexity: O(n) due to recursion call stack depth

Recursion Pattern Notes:
  - Base cases: F(0) = 0, F(1) = 1
  - Recursive case: F(n) = F(n-1) + F(n-2)
  - This demonstrates the classic "tree recursion" pattern
  - Each call branches into two recursive calls
  - Note: This naive approach has exponential time complexity

Hints:
  - What are the two smallest cases you can solve directly? (base cases)
  - How does the nth Fibonacci number relate to previous numbers?
  - Draw the recursion tree for small values to understand the pattern
  - Consider how this could be optimized with memoization
*/

export const functionName = 'fibonacci';

export const tests = [
  {
    input: [2],
    expected: 1
  },
  {
    input: [3],
    expected: 2
  },
  {
    input: [4],
    expected: 3
  },
  {
    input: [0],
    expected: 0
  },
  {
    input: [1],
    expected: 1
  },
  {
    input: [5],
    expected: 5
  },
  {
    input: [6],
    expected: 8
  },
  {
    input: [10],
    expected: 55
  }
];

/**
 * Calculate nth Fibonacci number using recursion
 * @param {number} n - Non-negative integer
 * @return {number} The nth Fibonacci number
 */
function fibonacci(n) {
    // Base cases
    if (n === 0) return 0;
    if (n === 1) return 1;

    // Recursive case: F(n) = F(n-1) + F(n-2)
    return fibonacci(n - 1) + fibonacci(n - 2);
}

export default fibonacci;