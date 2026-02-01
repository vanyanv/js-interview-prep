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

Hints:
  - Use two pointers: start and end
  - Swap elements and move pointers toward center
  - Alternative: nums.reverse() but practice the manual approach
*/

const reverseArray = (array) => {
  return array;
};
export default reverseArray;

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
