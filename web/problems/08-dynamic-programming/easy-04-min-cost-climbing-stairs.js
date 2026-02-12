/*
Problem: Min Cost Climbing Stairs (LeetCode #746)
Difficulty: Easy
Category: Dynamic Programming
Pattern: 1D DP, Path Cost Minimization

You are given an integer array cost where cost[i] is the cost of ith step on a staircase.
Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.
Return the minimum cost to reach the top of the floor.

Example 1:
  Input: cost = [10,15,20]
  Output: 15
  Explanation: You will start at index 1.
  - Pay 15 and climb two steps to reach the top.
  The total cost is 15.

Example 2:
  Input: cost = [1,100,1,1,1,100,1,1,100,1]
  Output: 6
  Explanation: You will start at index 0.
  - Pay 1 and climb two steps to reach index 2.
  - Pay 1 and climb two steps to reach index 4.
  - Pay 1 and climb two steps to reach index 6.
  - Pay 1 and climb one step to reach index 7.
  - Pay 1 and climb two steps to reach index 9.
  - Pay 1 and climb one step to reach the top.
  The total cost is 6.

Example 3:
  Input: cost = [0,0,0,1]
  Output: 0
  Explanation: Start at index 1, climb two steps to reach index 3, then one step to reach top.

Example 4:
  Input: cost = [0,1,2,2]
  Output: 2
  Explanation: Start at index 0, climb two steps to reach index 2, then two steps to reach top.

Constraints:
  - 2 <= cost.length <= 1000
  - 0 <= cost[i] <= 999

Time Complexity: O(n) where n is the length of cost array
Space Complexity: O(1) with space optimization, O(n) with DP array

Dynamic Programming Pattern Notes:
  - State: dp[i] represents minimum cost to reach step i
  - Recurrence: dp[i] = cost[i] + min(dp[i-1], dp[i-2])
  - Base cases: dp[0] = cost[0], dp[1] = cost[1] (can start from either)
  - Final answer: min(dp[n-1], dp[n-2]) (can reach top from either of last two steps)
  - Key insight: to reach step i, take minimum cost path to i-1 or i-2, then pay cost[i]
  - Can be space optimized since we only need last two values

Hints:
  - Think about the minimum cost to reach each step
  - You can reach step i from step i-1 or step i-2
  - Once at step i, you must pay cost[i] to proceed
  - You can start from step 0 or step 1 (both have their respective costs)
  - The "top" is beyond the last step, so you can reach it from either of the last two steps
  - Use space optimization since you only need the last two minimum costs
*/

export const functionName = 'minCostClimbingStairs';

export const tests = [
  {
    input: [[10,15,20]],
    expected: 15
  },
  {
    input: [[1,100,1,1,1,100,1,1,100,1]],
    expected: 6
  },
  {
    input: [[0,0,0,1]],
    expected: 0
  },
  {
    input: [[0,1,2,2]],
    expected: 2
  },
  {
    input: [[1,0,0,0]],
    expected: 0
  },
  {
    input: [[2,3]],
    expected: 2
  },
  {
    input: [[5,10,15,20]],
    expected: 15
  },
  {
    input: [[1,2,3,4,5]],
    expected: 6
  },
  {
    input: [[0,0]],
    expected: 0
  },
  {
    input: [[999,999]],
    expected: 999
  },
  {
    input: [[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]],
    expected: 50
  },
  {
    input: [[1,0,1,0,1,0,1,0,1,0]],
    expected: 0
  }
];

/**
 * Find minimum cost to climb stairs where you can start from step 0 or 1
 * @param {number[]} cost - Array representing cost of each step
 * @return {number} Minimum cost to reach the top
 */
function minCostClimbingStairs(cost) {
    if (!cost || cost.length < 2) return 0;

    const n = cost.length;

    // Space optimized approach
    let prev2 = cost[0]; // Minimum cost to reach step 0
    let prev1 = cost[1]; // Minimum cost to reach step 1

    // Calculate minimum cost for each step from 2 to n-1
    for (let i = 2; i < n; i++) {
        const current = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = current;
    }

    // Can reach the top from either of the last two steps
    return Math.min(prev1, prev2);
}

export default minCostClimbingStairs;