/*
Problem: Climbing Stairs (LeetCode #70)
Difficulty: Easy
Category: Dynamic Programming
Pattern: 1D DP, Fibonacci Sequence

You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

This is a classic dynamic programming problem that follows the Fibonacci sequence pattern.
At each step, you can reach it from either the previous step (n-1) or two steps back (n-2).

Example 1:
  Input: n = 2
  Output: 2
  Explanation: There are two ways to climb to the top.
  1. 1 step + 1 step
  2. 2 steps

Example 2:
  Input: n = 3
  Output: 3
  Explanation: There are three ways to climb to the top.
  1. 1 step + 1 step + 1 step
  2. 1 step + 2 steps
  3. 2 steps + 1 step

Example 3:
  Input: n = 4
  Output: 5
  Explanation: There are five ways to climb to the top.
  1. 1+1+1+1
  2. 1+1+2
  3. 1+2+1
  4. 2+1+1
  5. 2+2

Example 4:
  Input: n = 1
  Output: 1
  Explanation: Only one way: 1 step

Constraints:
  - 1 <= n <= 45
  - The answer is guaranteed to fit in a 32-bit integer

Time Complexity: O(n) for both memoization and tabulation
Space Complexity: O(n) for memoization (call stack + memo), O(1) for optimized tabulation

Dynamic Programming Pattern Notes:
  - State: dp[i] represents number of ways to reach step i
  - Recurrence: dp[i] = dp[i-1] + dp[i-2]
  - Base cases: dp[0] = 1, dp[1] = 1
  - This follows the Fibonacci sequence pattern
  - Can be optimized to O(1) space by only keeping track of last two values

Hints:
  - Think about how many ways you can reach step n
  - You can reach step n from step n-1 (by taking 1 step) or from step n-2 (by taking 2 steps)
  - This creates a recurrence relation: ways(n) = ways(n-1) + ways(n-2)
  - Start with base cases: ways(1) = 1, ways(2) = 2
  - Consider both top-down (memoization) and bottom-up (tabulation) approaches
  - For space optimization, notice you only need the last two values
*/

export const functionName = 'climbStairs';

export const tests = [
  {
    input: [2],
    expected: 2
  },
  {
    input: [3],
    expected: 3
  },
  {
    input: [4],
    expected: 5
  },
  {
    input: [1],
    expected: 1
  },
  {
    input: [5],
    expected: 8
  },
  {
    input: [6],
    expected: 13
  },
  {
    input: [10],
    expected: 89
  },
  {
    input: [15],
    expected: 987
  },
  {
    input: [20],
    expected: 10946
  },
  {
    input: [30],
    expected: 1346269
  },
  {
    input: [45],
    expected: 1836311903
  }
];

/**
 * Calculate number of distinct ways to climb n stairs
 * Each time you can climb 1 or 2 steps
 * @param {number} n - Number of stairs
 * @return {number} Number of distinct ways to climb to the top
 */
function climbStairs(n) {
    // Base cases
    if (n <= 1) return 1;
    if (n === 2) return 2;

    // Bottom-up approach with space optimization
    // Only need to keep track of last two values
    let prev2 = 1; // ways to reach step 0
    let prev1 = 1; // ways to reach step 1

    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

export default climbStairs;