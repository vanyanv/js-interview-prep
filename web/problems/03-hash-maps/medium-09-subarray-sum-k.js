/*
Problem: Subarray Sum Equals K
Difficulty: Medium
Category: Arrays, Hash Map, Prefix Sum
LeetCode: #560
Pattern: Prefix Sum with Hash Map

Given an array of integers nums and an integer k, return the total number
of subarrays whose sum equals k.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
  Input: nums = [1,1,1], k = 2
  Output: 2

Example 2:
  Input: nums = [1,2,3], k = 3
  Output: 2

Example 3:
  Input: nums = [1,-1,0], k = 0
  Output: 3

Example 4:
  Input: nums = [-1,-1,1], k = 0
  Output: 1

Constraints:
  - 1 <= nums.length <= 2 * 10^4
  - -1000 <= nums[i] <= 1000
  - -10^7 <= k <= 10^7

Time Complexity: O(n)
Space Complexity: O(n)

Hash Map Pattern Notes:
  - Use Map to store frequency of prefix sums
  - For each position, check if (prefixSum - k) exists in map
  - If exists, add its frequency to result (multiple subarrays ending at current position)
  - Add current prefixSum to map
  - Initialize map with {0: 1} to handle subarrays starting from index 0
*/

export const functionName = 'subarraySum';

export const tests = [
  {
    input: [[1, 1, 1], 2],
    expected: 2
  },
  {
    input: [[1, 2, 3], 3],
    expected: 2
  },
  {
    input: [[1, -1, 0], 0],
    expected: 3
  },
  {
    input: [[-1, -1, 1], 0],
    expected: 1
  },
  {
    input: [[1], 1],
    expected: 1
  },
  {
    input: [[1, 2, 1, 2, 1], 3],
    expected: 4
  },
  {
    input: [[3, 4, 7, 2, -3, 1, 4, 2], 7],
    expected: 4
  },
  {
    input: [[1, 0, -1, 0, 1], 0],
    expected: 5
  }
];