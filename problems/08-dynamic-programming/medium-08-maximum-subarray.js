/*
Problem: Maximum Subarray (LeetCode #53)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 1D DP, Kadane's Algorithm

Given an integer array nums, find the contiguous subarray (containing at least one number)
which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

Example 1:
  Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
  Output: 6
  Explanation: [4,-1,2,1] has the largest sum = 6.

Example 2:
  Input: nums = [1]
  Output: 1
  Explanation: The single element [1] has the largest sum = 1.

Example 3:
  Input: nums = [5,4,-1,7,8]
  Output: 23
  Explanation: [5,4,-1,7,8] has the largest sum = 23.

Example 4:
  Input: nums = [-2,-1]
  Output: -1
  Explanation: The subarray [-1] has the largest sum = -1.

Example 5:
  Input: nums = [-1,-2,-3,-4]
  Output: -1
  Explanation: The subarray [-1] has the largest sum = -1.

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^4 <= nums[i] <= 10^4

Time Complexity: O(n) where n is the length of the array
Space Complexity: O(1) for optimized solution, O(n) for DP array solution

Dynamic Programming Pattern Notes:
  - State: dp[i] represents maximum sum of subarray ending at index i
  - Recurrence: dp[i] = max(nums[i], dp[i-1] + nums[i])
    - Either start a new subarray at current element, or extend previous subarray
  - Base case: dp[0] = nums[0]
  - Final answer: max(dp[i]) for all i
  - This is Kadane's Algorithm - a classic greedy/DP approach
  - Can be space optimized to O(1) by only tracking current and maximum sums

Hints:
  - At each position, decide whether to start a new subarray or extend the previous one
  - If the previous sum is negative, it's better to start fresh
  - Keep track of both current subarray sum and global maximum
  - This is a classic application of Kadane's algorithm
  - Think about when you would "reset" your running sum
  - The key insight: a negative prefix never helps maximize the sum
*/

export const functionName = 'maxSubArray';

export const tests = [
  {
    input: [[-2,1,-3,4,-1,2,1,-5,4]],
    expected: 6
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[5,4,-1,7,8]],
    expected: 23
  },
  {
    input: [[-2,-1]],
    expected: -1
  },
  {
    input: [[-1,-2,-3,-4]],
    expected: -1
  },
  {
    input: [[1,2,3,4,5]],
    expected: 15
  },
  {
    input: [[-5,-2,-8,-1]],
    expected: -1
  },
  {
    input: [[2,-3,4,-1,2,1,-5,4]],
    expected: 6
  },
  {
    input: [[0]],
    expected: 0
  },
  {
    input: [[-1]],
    expected: -1
  },
  {
    input: [[3,-2,5,-1]],
    expected: 6
  },
  {
    input: [[-2,1,3,-4,5]],
    expected: 5
  }
];

/**
 * Find the contiguous subarray with the largest sum (Kadane's Algorithm)
 * @param {number[]} nums - Input array of integers
 * @return {number} Maximum sum of any contiguous subarray
 */
function maxSubArray(nums) {
    if (!nums || nums.length === 0) return 0;

    // Kadane's Algorithm - optimized O(1) space solution
    let currentSum = nums[0];  // Maximum sum ending at current position
    let maxSum = nums[0];      // Global maximum sum seen so far

    for (let i = 1; i < nums.length; i++) {
        // Either extend previous subarray or start new subarray at current element
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        // Update global maximum
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

export default maxSubArray;