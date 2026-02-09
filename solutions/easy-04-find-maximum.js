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

const findMaximum = (array) => {
  const max = Math.max(...array);

  return max;
};

export default findMaximum;

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
];
