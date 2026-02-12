/*
Problem: Partition Equal Subset Sum (LeetCode #416)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 2D DP, 0/1 Knapsack, Subset Sum

Given a non-empty array nums containing only positive integers, find if the array
can be partitioned into two subsets such that the sum of elements in both subsets is equal.

Example 1:
  Input: nums = [1,5,11,5]
  Output: true
  Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
  Input: nums = [1,2,3,5]
  Output: false
  Explanation: The array cannot be partitioned into equal sum subsets.

Example 3:
  Input: nums = [1,1]
  Output: true
  Explanation: The array can be partitioned as [1] and [1].

Example 4:
  Input: nums = [1,2,5]
  Output: false
  Explanation: Cannot partition into equal sum subsets.

Example 5:
  Input: nums = [2,2,1,1]
  Output: true
  Explanation: The array can be partitioned as [2, 1] and [2, 1].

Constraints:
  - 1 <= nums.length <= 200
  - 1 <= nums[i] <= 100

Time Complexity: O(n * sum) where n is length of nums and sum is total sum of elements
Space Complexity: O(sum) with space optimization, O(n * sum) for 2D DP

Dynamic Programming Pattern Notes:
  - Key insight: if we can partition into two equal subsets, each subset sum = total_sum / 2
  - Transform to subset sum problem: can we find a subset with sum = total_sum / 2?
  - State: dp[i][j] represents whether we can achieve sum j using first i elements
  - Recurrence: dp[i][j] = dp[i-1][j] OR (j >= nums[i-1] AND dp[i-1][j-nums[i-1]])
  - Base cases: dp[i][0] = true (sum 0 is always achievable), dp[0][j] = false for j > 0
  - This is a classic 0/1 knapsack variant where we want to check feasibility, not maximize value

Hints:
  - First check if total sum is odd - if so, cannot partition equally
  - Transform problem: find if subset with sum = total_sum/2 exists
  - Use 0/1 knapsack DP pattern: for each number, decide to include it or not
  - Space optimization: process target sum from right to left to avoid using updated values
  - Early termination: if we find target sum is achievable, return true immediately
  - This is a decision problem (yes/no) rather than an optimization problem
*/

export const functionName = 'canPartition';

export const tests = [
  {
    input: [[1,5,11,5]],
    expected: true
  },
  {
    input: [[1,2,3,5]],
    expected: false
  },
  {
    input: [[1,1]],
    expected: true
  },
  {
    input: [[1,2,5]],
    expected: false
  },
  {
    input: [[2,2,1,1]],
    expected: true
  },
  {
    input: [[1]],
    expected: false
  },
  {
    input: [[1,1,1,1]],
    expected: true
  },
  {
    input: [[100]],
    expected: false
  },
  {
    input: [[3,3,3,4,5]],
    expected: true
  },
  {
    input: [[1,2,3,4,5,6,7]],
    expected: true
  },
  {
    input: [[2,4]],
    expected: false
  },
  {
    input: [[10,10,10,10]],
    expected: true
  }
];

/**
 * Determine if array can be partitioned into two equal sum subsets
 * @param {number[]} nums - Array of positive integers
 * @return {boolean} True if equal partition is possible, false otherwise
 */
function canPartition(nums) {
    if (!nums || nums.length < 2) return false;

    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    // If total sum is odd, cannot partition into two equal subsets
    if (totalSum % 2 !== 0) return false;

    const target = totalSum / 2;

    // dp[i] represents whether sum i is achievable
    const dp = new Array(target + 1).fill(false);
    dp[0] = true; // Sum 0 is always achievable (empty subset)

    // For each number in nums
    for (const num of nums) {
        // Process from target down to num to avoid using updated values
        for (let j = target; j >= num; j--) {
            // Can achieve sum j if we can achieve j-num and include current number
            dp[j] = dp[j] || dp[j - num];
        }

        // Early termination if target is achievable
        if (dp[target]) return true;
    }

    return dp[target];
}

export default canPartition;