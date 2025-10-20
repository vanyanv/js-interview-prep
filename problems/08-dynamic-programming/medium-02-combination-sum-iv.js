/*
Problem: Combination Sum IV (LeetCode #377)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 1D DP, Unbounded Knapsack, Permutation Counting

Given an array of distinct integers nums and a target integer target, return the number
of possible combinations that add up to target.

The test cases are generated so that the answer can fit in a 32-bit integer.

Note: Different sequences are counted as different combinations.

Example 1:
  Input: nums = [1,2,3], target = 4
  Output: 7
  Explanation: The possible combinations are:
  (1, 1, 1, 1), (1, 1, 2), (1, 2, 1), (1, 3), (2, 1, 1), (2, 2), (3, 1)

Example 2:
  Input: nums = [9], target = 3
  Output: 0
  Explanation: No combinations possible

Example 3:
  Input: nums = [1,2], target = 3
  Output: 3
  Explanation: The possible combinations are: (1, 1, 1), (1, 2), (2, 1)

Example 4:
  Input: nums = [4,2,1], target = 32
  Output: 39882198
  Explanation: Large number of combinations possible

Example 5:
  Input: nums = [3,1,2], target = 4
  Output: 7
  Explanation: Same as Example 1 with different order

Constraints:
  - 1 <= nums.length <= 200
  - 1 <= nums[i] <= 1000
  - All elements of nums are unique
  - 1 <= target <= 1000

Time Complexity: O(target * nums.length) - for each target value, we check all numbers
Space Complexity: O(target) for the DP array

Dynamic Programming Pattern Notes:
  - State: dp[i] represents number of combinations that sum to i
  - Recurrence: dp[i] = sum(dp[i - num]) for all num in nums where num <= i
  - Base case: dp[0] = 1 (one way to make sum 0 - use no numbers)
  - Key difference from coin change: order matters here (permutations vs combinations)
  - This is an unbounded knapsack where each number can be used multiple times
  - Similar to climbing stairs but with variable step sizes from nums array

Hints:
  - Think about building up combinations for each target value from 1 to target
  - For each target value, consider using each number in nums as the "last" number
  - If we use number x as the last number for target i, then we need dp[i-x] ways to make i-x
  - Order matters: (1,2) and (2,1) are different combinations
  - This is different from Coin Change II where order doesn't matter
  - Use bottom-up DP: build solutions for smaller targets first
  - Consider memoization for top-down approach to avoid recomputation
*/

export const functionName = 'combinationSum4';

export const tests = [
  {
    input: [[1,2,3], 4],
    expected: 7
  },
  {
    input: [[9], 3],
    expected: 0
  },
  {
    input: [[1,2], 3],
    expected: 3
  },
  {
    input: [[4,2,1], 32],
    expected: 39882198
  },
  {
    input: [[3,1,2], 4],
    expected: 7
  },
  {
    input: [[1], 1],
    expected: 1
  },
  {
    input: [[1], 2],
    expected: 1
  },
  {
    input: [[2,3], 1],
    expected: 0
  }
];

/**
 * Count number of combinations (order matters) that sum to target
 * @param {number[]} nums - Array of distinct positive integers
 * @param {number} target - Target sum to achieve
 * @return {number} Number of possible combinations that add up to target
 */
function combinationSum4(nums, target) {
    if (!nums || nums.length === 0 || target <= 0) return 0;

    // dp[i] represents number of combinations that sum to i
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1; // Base case: one way to make sum 0 (use no numbers)

    // Build up combinations for each target value from 1 to target
    for (let i = 1; i <= target; i++) {
        // For each number in nums, consider using it as the "last" number
        for (const num of nums) {
            if (num <= i) {
                // If we use 'num' as the last number, we need dp[i-num] ways to make i-num
                dp[i] += dp[i - num];
            }
        }
    }

    return dp[target];
}

export default combinationSum4;