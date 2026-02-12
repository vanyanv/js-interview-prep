/*
Problem: Two Sum
Difficulty: Easy
Category: Arrays, Hash Map
LeetCode: #1
Pattern: Hash Map Lookup

Given an array of integers nums and an integer target, return indices of
the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you
may not use the same element twice.

You can return the answer in any order.

Example 1:
  Input: nums = [2,7,11,15], target = 9
  Output: [0,1]
  Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
  Input: nums = [3,2,4], target = 6
  Output: [1,2]

Example 3:
  Input: nums = [3,3], target = 6
  Output: [0,1]

Constraints:
  - 2 <= nums.length <= 10^4
  - -10^9 <= nums[i] <= 10^9
  - -10^9 <= target <= 10^9
  - Only one valid answer exists.

Time Complexity: O(n)
Space Complexity: O(n)

Hash Map Pattern Notes:
  - Use Map to store value -> index mapping
  - For each element, check if (target - current) exists in map
  - Store current element after checking to avoid using same element twice
  - This is a classic "complement lookup" pattern
*/

export const functionName = 'twoSum';

export const tests = [
  {
    input: [[2, 7, 11, 15], 9],
    expected: [0, 1]
  },
  {
    input: [[3, 2, 4], 6],
    expected: [1, 2]
  },
  {
    input: [[3, 3], 6],
    expected: [0, 1]
  },
  {
    input: [[-1, -2, -3, -4, -5], -8],
    expected: [2, 4]
  },
  {
    input: [[0, 4, 3, 0], 0],
    expected: [0, 3]
  },
  {
    input: [[-3, 4, 3, 90], 0],
    expected: [0, 2]
  },
  {
    input: [[1, 2], 3],
    expected: [0, 1]
  }
];