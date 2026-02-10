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


*/

export const countOccurrences = (array, target) => {
  if (array.length === 0) return 0;
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      count++;
    }
  }

  return count;
};
export const functionName = 'countOccurrences';

export const tests = [
  {
    input: [[1, 2, 3, 2, 2], 2],
    expected: 3,
  },
  {
    input: [[5, 5, 5, 5], 5],
    expected: 4,
  },
  {
    input: [[1, 3, 5], 2],
    expected: 0,
  },
  {
    input: [[], 5],
    expected: 0,
  },
  {
    input: [[1, 1, 1, 2, 2], 1],
    expected: 3,
  },
];
