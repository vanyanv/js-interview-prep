/*
Problem: Count Occurrences
Difficulty: Warmup
Category: Arrays - Fundamentals

Given an array and a target value, count how many times the target appears.

Example 1:
  Input: nums = [1, 2, 3, 2, 2], target = 2
  Output: 3

Example 2:
  Input: nums = [5, 5, 5, 5], target = 5
  Output: 4

Example 3:
  Input: nums = [1, 3, 5], target = 2
  Output: 0

Constraints:
  - 0 <= nums.length <= 1000
  - -100 <= nums[i] <= 100
  - -100 <= target <= 100

Time Complexity: O(n)
Space Complexity: O(1)

Hints:
  - Use a counter variable
  - Loop through array and increment when element equals target
  - Handle empty array case
*/

export const functionName = 'countOccurrences';

export const tests = [
  {
    input: [[1, 2, 3, 2, 2], 2],
    expected: 3
  },
  {
    input: [[5, 5, 5, 5], 5],
    expected: 4
  },
  {
    input: [[1, 3, 5], 2],
    expected: 0
  },
  {
    input: [[], 5],
    expected: 0
  },
  {
    input: [[1, 1, 1, 2, 2], 1],
    expected: 3
  },
  {
    input: [[7], 7],
    expected: 1
  },
  {
    input: [[7], 3],
    expected: 0
  },
  {
    input: [[-5, -5, 0, -5, 3, -5], -5],
    expected: 4
  },
  {
    input: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0],
    expected: 20
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 20],
    expected: 1
  }
];