/*
Problem: Sum Array Elements
Difficulty: Warmup
Category: Arrays - Fundamentals

Given an array of numbers, return the sum of all elements.

Example 1:
  Input: nums = [1, 2, 3, 4, 5]
  Output: 15

Example 2:
  Input: nums = [-1, 1, 0]
  Output: 0

Example 3:
  Input: nums = [10]
  Output: 10

Constraints:
  - 0 <= nums.length <= 1000
  - -100 <= nums[i] <= 100

Time Complexity: O(n)
Space Complexity: O(1)

Hints:
  - Initialize sum to 0
  - Loop through array and add each element
  - Can use reduce() but practice the loop first
  - Handle empty array (should return 0)
*/

export const functionName = 'sumArray';

export const tests = [
  {
    input: [[1, 2, 3, 4, 5]],
    expected: 15
  },
  {
    input: [[-1, 1, 0]],
    expected: 0
  },
  {
    input: [[10]],
    expected: 10
  },
  {
    input: [[]],
    expected: 0
  },
  {
    input: [[5, 5, 5, 5]],
    expected: 20
  }
];