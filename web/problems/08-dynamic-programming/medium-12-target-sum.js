/*
Problem: Target Sum (LeetCode #494)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 2D DP, Knapsack Variant, Subset Sum

You are given an integer array nums and an integer target.
You want to build an expression out of nums by adding one of the symbols '+' and '-'
before each integer in nums and then concatenate all the integers.

Return the number of different expressions that you can build, which evaluates to target.

Example 1:
  Input: nums = [1,1,1,1,1], target = 3
  Output: 5
  Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
  -1 + 1 + 1 + 1 + 1 = 3
  +1 - 1 + 1 + 1 + 1 = 3
  +1 + 1 - 1 + 1 + 1 = 3
  +1 + 1 + 1 - 1 + 1 = 3
  +1 + 1 + 1 + 1 - 1 = 3

Example 2:
  Input: nums = [1], target = 1
  Output: 1
  Explanation: +1 = 1

Example 3:
  Input: nums = [1], target = 2
  Output: 0
  Explanation: Cannot reach target 2 with just [1]

Example 4:
  Input: nums = [1,0], target = 1
  Output: 2
  Explanation: +1+0 = 1, +1-0 = 1

Example 5:
  Input: nums = [7,9,3,8,0,2,4,8,3,9], target = 0
  Output: 0

Constraints:
  - 1 <= nums.length <= 20
  - 0 <= nums[i] <= 1000
  - 0 <= sum(nums[i]) <= 1000
  - -1000 <= target <= 1000

Time Complexity: O(n * sum) where n is length of nums and sum is total sum
Space Complexity: O(sum) with space optimization

Dynamic Programming Pattern Notes:
  - Key insight: partition nums into two subsets P (positive) and N (negative)
  - sum(P) - sum(N) = target, sum(P) + sum(N) = sum(nums)
  - Solving: sum(P) = (target + sum(nums)) / 2
  - Transform to: count ways to select subset with sum = (target + sum(nums)) / 2
  - State: dp[i] represents number of ways to achieve sum i
  - Recurrence: dp[i] += dp[i - num] for each num
  - This is a counting variant of subset sum problem

Hints:
  - Think about partitioning the array into positive and negative numbers
  - If sum(positive) = P and sum(negative) = N, then P - N = target and P + N = total
  - Solve for P: P = (target + total) / 2
  - Count number of ways to select subset with sum P
  - Handle edge cases: target out of range, impossible to achieve
  - Use 1D DP where dp[i] = number of ways to achieve sum i
  - Process each number and update dp array from right to left
*/

export const functionName = 'findTargetSumWays';

export const tests = [
  {
    input: [[1,1,1,1,1], 3],
    expected: 5
  },
  {
    input: [[1], 1],
    expected: 1
  },
  {
    input: [[1], 2],
    expected: 0
  },
  {
    input: [[1,0], 1],
    expected: 2
  },
  {
    input: [[7,9,3,8,0,2,4,8,3,9], 0],
    expected: 0
  },
  {
    input: [[1,1,1], 1],
    expected: 3
  },
  {
    input: [[100], -200],
    expected: 0
  },
  {
    input: [[1,2,3], 0],
    expected: 2
  },
  {
    input: [[0,0,0,0,0], 0],
    expected: 32
  },
  {
    input: [[1,1], 0],
    expected: 2
  },
  {
    input: [[2,1], 1],
    expected: 1
  },
  {
    input: [[1,2,1], 2],
    expected: 2
  }
];

/**
 * Count number of ways to assign +/- to array elements to reach target sum
 * @param {number[]} nums - Array of non-negative integers
 * @param {number} target - Target sum to achieve
 * @return {number} Number of different expressions that evaluate to target
 */
function findTargetSumWays(nums, target) {
    if (!nums || nums.length === 0) return 0;

    const total = nums.reduce((sum, num) => sum + num, 0);

    // Check if target is achievable
    if (Math.abs(target) > total || (target + total) % 2 !== 0) {
        return 0;
    }

    // Transform problem: find number of ways to select subset with sum = (target + total) / 2
    const targetSum = (target + total) / 2;

    // dp[i] represents number of ways to achieve sum i
    const dp = new Array(targetSum + 1).fill(0);
    dp[0] = 1; // One way to achieve sum 0 (select empty subset)

    // For each number in nums
    for (const num of nums) {
        // Process from targetSum down to num to avoid using updated values
        for (let j = targetSum; j >= num; j--) {
            dp[j] += dp[j - num];
        }
    }

    return dp[targetSum];
}

export default findTargetSumWays;