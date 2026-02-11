/*
Problem: Move Zeroes
Difficulty: Easy
Category: Arrays, Two Pointers
LeetCode: #283
Pattern: Two Pointers (Same Direction - Fast/Slow)

Given an integer array nums, move all 0's to the end of it while maintaining
the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:
  Input: nums = [0,1,0,3,12]
  Output: [1,3,12,0,0]

Example 2:
  Input: nums = [0]
  Output: [0]

Example 3:
  Input: nums = [1,2,3]
  Output: [1,2,3]

Constraints:
  - 1 <= nums.length <= 10^4
  - -2^31 <= nums[i] <= 2^31 - 1

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use slow pointer to track position for next non-zero element
  - Use fast pointer to find non-zero elements
  - Swap non-zero elements to slow position
  - All zeros naturally move to the end
*/

export const functionName = 'moveZeroes';

export const tests = [
  {
    input: [[0, 1, 0, 3, 12]],
    expected: [1, 3, 12, 0, 0]
  },
  {
    input: [[0]],
    expected: [0]
  },
  {
    input: [[1, 2, 3]],
    expected: [1, 2, 3]
  },
  {
    input: [[0, 0, 1]],
    expected: [1, 0, 0]
  },
  {
    input: [[1, 0, 2, 0, 3, 0, 4]],
    expected: [1, 2, 3, 4, 0, 0, 0]
  },
  {
    input: [[0, 0, 0, 0, 0]],
    expected: [0, 0, 0, 0, 0]
  },
  {
    input: [[1]],
    expected: [1]
  },
  {
    input: [[-1, 0, -2, 0, -3]],
    expected: [-1, -2, -3, 0, 0]
  },
  {
    input: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]],
    expected: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
];