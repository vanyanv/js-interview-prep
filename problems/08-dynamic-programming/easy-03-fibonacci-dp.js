/*
Problem: Fibonacci Number with Dynamic Programming
Difficulty: Easy
Category: Dynamic Programming
Pattern: 1D DP, Memoization

The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence,
such that each number is the sum of the two preceding ones, starting from 0 and 1.

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given n, calculate F(n) using dynamic programming techniques.

Example 1:
  Input: n = 2
  Output: 1
  Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

Example 2:
  Input: n = 3
  Output: 2
  Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

Example 3:
  Input: n = 4
  Output: 3
  Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

Example 4:
  Input: n = 0
  Output: 0
  Explanation: F(0) = 0 by definition.

Example 5:
  Input: n = 1
  Output: 1
  Explanation: F(1) = 1 by definition.

Constraints:
  - 0 <= n <= 30

Time Complexity: O(n) for both memoization and tabulation approaches
Space Complexity: O(n) for memoization (call stack + memo), O(1) for optimized tabulation

Dynamic Programming Pattern Notes:
  - State: dp[i] represents the i-th Fibonacci number
  - Recurrence: dp[i] = dp[i-1] + dp[i-2]
  - Base cases: dp[0] = 0, dp[1] = 1
  - This is the classic introduction to DP - demonstrates both top-down and bottom-up approaches
  - Can be space optimized to O(1) by only keeping track of last two values
  - Demonstrates the power of memoization vs naive recursion (O(2^n) -> O(n))

Hints:
  - Compare naive recursion vs memoized recursion vs iterative DP
  - Naive recursion has exponential time due to repeated subproblems
  - Memoization eliminates repeated calculations by storing results
  - Bottom-up DP builds solution iteratively from base cases
  - Space optimization: you only need the last two Fibonacci numbers to compute the next one
  - This problem showcases the fundamental concepts of overlapping subproblems and optimal substructure
*/

export const functionName = 'fib';

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
    input: [10],
    expected: 55
  },
  {
    input: [15],
    expected: 610
  }
];

/**
 * Calculate nth Fibonacci number using dynamic programming
 * @param {number} n - Position in Fibonacci sequence
 * @return {number} The nth Fibonacci number
 */
function fib(n) {
    if (n <= 1) return n;

    // Space optimized bottom-up approach
    let prev2 = 0; // F(0)
    let prev1 = 1; // F(1)

    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

export default fib;