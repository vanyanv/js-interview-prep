/*
Problem: Sort Colors
Difficulty: Medium
Category: Array, Two Pointers, Sorting
LeetCode: #75
Pattern: Two Pointers (Dutch National Flag Algorithm)

Given an array nums with n objects colored red, white, or blue, sort them in-place
so that objects of the same color are adjacent, with the colors in the order red,
white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue,
respectively.

You must solve this problem without using the library's sort function.

Example 1:
  Input: nums = [2,0,2,1,1,0]
  Output: [0,0,1,1,2,2]

Example 2:
  Input: nums = [2,0,1]
  Output: [0,1,2]

Example 3:
  Input: nums = [0]
  Output: [0]

Example 4:
  Input: nums = [1]
  Output: [1]

Constraints:
  - n == nums.length
  - 1 <= n <= 300
  - nums[i] is either 0, 1, or 2.

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use three pointers: left (for 0s), current, right (for 2s)
  - When current finds 0, swap with left and advance both
  - When current finds 2, swap with right and advance right only
  - When current finds 1, just advance current
  - Continue until current > right
*/

export const functionName = 'sortColors';

export const tests = [
  {
    input: [[2,0,2,1,1,0]],
    expected: [0,0,1,1,2,2]
  },
  {
    input: [[2,0,1]],
    expected: [0,1,2]
  },
  {
    input: [[0]],
    expected: [0]
  },
  {
    input: [[1]],
    expected: [1]
  },
  {
    input: [[2]],
    expected: [2]
  },
  {
    input: [[1,2,0]],
    expected: [0,1,2]
  },
  {
    input: [[2,2,2,1,1,0,0]],
    expected: [0,0,1,1,2,2,2]
  },
  {
    input: [[0,1,2,0,1,2]],
    expected: [0,0,1,1,2,2]
  }
];

/**
 * Sorts colors (0, 1, 2) in-place using Dutch National Flag algorithm
 * @param {number[]} nums - Array of 0s, 1s, and 2s
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function sortColors(nums) {
    let left = 0;           // Pointer for placing 0s
    let current = 0;        // Current element being examined
    let right = nums.length - 1;  // Pointer for placing 2s

    while (current <= right) {
        if (nums[current] === 0) {
            // Swap 0 to the left section
            [nums[left], nums[current]] = [nums[current], nums[left]];
            left++;
            current++;
        } else if (nums[current] === 2) {
            // Swap 2 to the right section
            [nums[current], nums[right]] = [nums[right], nums[current]];
            right--;
            // Don't advance current - need to check swapped element
        } else {
            // nums[current] === 1, just move forward
            current++;
        }
    }
}

export default sortColors;