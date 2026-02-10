/*
Problem: Reverse Array In Place
Difficulty: Warmup
Category: Arrays - Two Pointers Fundamentals

Given an array, reverse it in place (modify the original array).
Return the reversed array.

Example 1:
  Input: nums = [1, 2, 3, 4, 5]
  Output: [5, 4, 3, 2, 1]

Example 2:
  Input: nums = [10, 20]
  Output: [20, 10]

Example 3:
  Input: nums = [42]
  Output: [42]

Constraints:
  - 0 <= nums.length <= 1000
  - -100 <= nums[i] <= 100
  - Must modify the original array

Time Complexity: O(n)
Space Complexity: O(1)

*/

export const functionName = 'reverseArray';

export const reverseArray = (array) => {
  // two-pointer, both of which will begin on opposite ends begin and end
  // consider even and odd lengths

  // stopping mid point
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    // const leftVal = array[left];
    // array[left] = array[right];
    // array[right] = leftVal;
    [array[left], array[right]] = [array[right], array[left]];
    left += 1;
    right -= 1;
  }

  return array;
};

export const tests = [
  {
    input: [[1, 2, 3, 4, 5]],
    expected: [5, 4, 3, 2, 1],
  },
  {
    input: [[10, 20]],
    expected: [20, 10],
  },
  {
    input: [[42]],
    expected: [42],
  },
  {
    input: [[]],
    expected: [],
  },
  {
    input: [[1, 2, 3, 4]],
    expected: [4, 3, 2, 1],
  },
];
