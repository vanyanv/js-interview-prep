/*
Problem: Find Maximum Element
Difficulty: Warmup
Category: Arrays - Fundamentals

Given an array of numbers, return the maximum element.
This is a fundamental operation to practice array traversal.

Example 1:
  Input: nums = [3, 7, 2, 9, 1]
  Output: 9

Example 2:
  Input: nums = [-5, -1, -10]
  Output: -1

Example 3:
  Input: nums = [42]
  Output: 42

Constraints:
  - 1 <= nums.length <= 1000
  - -10^4 <= nums[i] <= 10^4

Time Complexity: O(n)
Space Complexity: O(1)

Hints:
  - Initialize max with first element
  - Compare each element with current max
  - You can also use Math.max(...array) but practice the loop first
*/


export const functionName = 'findMaximum';

export const tests = [
  {
    input: [[3, 7, 2, 9, 1]],
    expected: 9,
  },
  {
    input: [[-5, -1, -10]],
    expected: -1,
  },
  {
    input: [[42]],
    expected: 42,
  },
  {
    input: [[0, 0, 0]],
    expected: 0,
  },
  {
    input: [[100, 200, 150, 200, 50]],
    expected: 200,
  },
  {
    input: [[-100, -99, -98, -97]],
    expected: -97,
  },
  {
    input: [[5, 5, 5, 5, 5]],
    expected: 5,
  },
  {
    input: [[10000, -10000]],
    expected: 10000,
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]],
    expected: 20,
  },
  {
    input: [[20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    expected: 20,
  },
];
