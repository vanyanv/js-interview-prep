/*
Problem: Longest Increasing Subsequence (LeetCode #300)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 1D DP, Subsequence DP

Given an integer array nums, return the length of the longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some or no elements
without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence
of the array [0,3,1,6,2,2,7].

Example 1:
  Input: nums = [10,9,1,5,3,7,101,18]
  Output: 4
  Explanation: The longest increasing subsequence is [1,3,7,18], therefore the length is 4.

Example 2:
  Input: nums = [0,1,0,3,2,3]
  Output: 4
  Explanation: The longest increasing subsequence is [0,1,2,3], therefore the length is 4.

Example 3:
  Input: nums = [7,7,7,7,7,7,7]
  Output: 1
  Explanation: The longest increasing subsequence is [7] (any single element), therefore the length is 1.

Example 4:
  Input: nums = [1,3,6,7,9,4,10,5,6]
  Output: 6
  Explanation: One longest increasing subsequence is [1,3,6,7,9,10], therefore the length is 6.

Example 5:
  Input: nums = [5,4,3,2,1]
  Output: 1
  Explanation: The longest increasing subsequence is any single element, therefore the length is 1.

Constraints:
  - 1 <= nums.length <= 2500
  - -10^4 <= nums[i] <= 10^4

Time Complexity: O(n^2) for DP solution, O(n log n) for binary search + patience sorting solution
Space Complexity: O(n) for both approaches

Dynamic Programming Pattern Notes:
  - State: dp[i] represents length of longest increasing subsequence ending at index i
  - Recurrence: dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
  - Base case: dp[i] = 1 for all i (each element forms a subsequence of length 1)
  - Final answer: max(dp[i]) for all i
  - This is a classic subsequence DP problem
  - Alternative O(n log n) solution uses binary search with patience sorting concept

Hints:
  - Think about what information you need to track for each position
  - For each element, consider all previous elements that are smaller
  - The length at current position is 1 + maximum length ending at any valid previous position
  - Start with each position having length 1 (single element subsequence)
  - Consider both the O(n^2) DP approach and the O(n log n) binary search approach
  - For binary search approach, maintain an array of smallest tail elements for each length
*/

export const functionName = 'lengthOfLIS';

export const tests = [
  {
    input: [[10,9,1,5,3,7,101,18]],
    expected: 4
  },
  {
    input: [[0,1,0,3,2,3]],
    expected: 4
  },
  {
    input: [[7,7,7,7,7,7,7]],
    expected: 1
  },
  {
    input: [[1,3,6,7,9,4,10,5,6]],
    expected: 6
  },
  {
    input: [[5,4,3,2,1]],
    expected: 1
  },
  {
    input: [[1,2,3,4,5]],
    expected: 5
  },
  {
    input: [[2,1,3]],
    expected: 2
  },
  {
    input: [[4,10,4,3,8,9]],
    expected: 3
  },
  {
    input: [[3]],
    expected: 1
  },
  {
    input: [[1,2,3,4,5,6,7,8]],
    expected: 8
  },
  {
    input: [[2,6,3,4,1,5]],
    expected: 4
  },
  {
    input: [[10,22,9,33,21,50,41,60]],
    expected: 5
  }
];

/**
 * Find the length of the longest strictly increasing subsequence
 * @param {number[]} nums - Input array of integers
 * @return {number} Length of the longest increasing subsequence
 */
function lengthOfLIS(nums) {
    if (!nums || nums.length === 0) return 0;

    const n = nums.length;
    // dp[i] represents the length of LIS ending at index i
    const dp = new Array(n).fill(1);

    // For each position i, check all previous positions j
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            // If nums[j] < nums[i], we can extend the LIS ending at j
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    // Return the maximum length among all positions
    return Math.max(...dp);
}

export default lengthOfLIS;