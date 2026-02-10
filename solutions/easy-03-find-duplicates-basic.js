/*
Problem: Find if Array Has Duplicates
Difficulty: Warmup
Category: Arrays - Hash Map Fundamentals

Given an array of integers, return true if any value appears more than once.

Example 1:
  Input: nums = [1, 2, 3, 1]
  Output: true

Example 2:
  Input: nums = [1, 2, 3, 4]
  Output: false

Example 3:
  Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
  Output: true

Constraints:
  - 1 <= nums.length <= 1000
  - -10^9 <= nums[i] <= 10^9

Time Complexity: O(n)
Space Complexity: O(n)


*/

export const functionName = 'containsDuplicate';

export const containsDuplicate = (numsArray) => {

  const visitedNums = {};

  for (let i = 0; i < numsArray.length; i++) {
    const current = numsArray[i];

    if (visitedNums[current]) {
      return true;
    } else {
      visitedNums[current] = true;
    }
  }

  return false;
};

export const tests = [
  {
    input: [[1, 2, 3, 1]],
    expected: true
  },
  {
    input: [[1, 2, 3, 4]],
    expected: false
  },
  {
    input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]],
    expected: true
  },
  {
    input: [[1]],
    expected: false
  },
  {
    input: [[1, 2]],
    expected: false
  }
];