/*
Problem: 3Sum
Difficulty: Medium
Category: Arrays, Two Pointers, Sorting
LeetCode: #15
Pattern: Two Pointers + Fixed Element

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:
  Input: nums = [-1,0,1,2,-1,-4]
  Output: [[-1,-1,2],[-1,0,1]]

Example 2:
  Input: nums = [0,1,1]
  Output: []

Example 3:
  Input: nums = [0,0,0]
  Output: [[0,0,0]]

Constraints:
  - 3 <= nums.length <= 3000
  - -10^5 <= nums[i] <= 10^5

Time Complexity: O(n²)
Space Complexity: O(1) excluding output array

Pattern Notes:
  - Sort array first
  - Fix first element, use two pointers for remaining two
  - Skip duplicates to avoid duplicate triplets
  - Move pointers based on sum comparison with target
*/

export const functionName = 'threeSum';

export const tests = [
  {
    input: [[-1, 0, 1, 2, -1, -4]],
    expected: [[-1, -1, 2], [-1, 0, 1]]
  },
  {
    input: [[0, 1, 1]],
    expected: []
  },
  {
    input: [[0, 0, 0]],
    expected: [[0, 0, 0]]
  },
  {
    input: [[-2, 0, 1, 1, 2]],
    expected: [[-2, 0, 2], [-2, 1, 1]]
  },
  {
    input: [[]],
    expected: []
  }
];