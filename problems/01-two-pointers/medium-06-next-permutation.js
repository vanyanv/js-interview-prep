/*
Problem: Next Permutation
Difficulty: Medium
Category: Array, Two Pointers
LeetCode: #31
Pattern: Two Pointers (Reverse and Swap)

A permutation of an array of integers is an arrangement of its members into a
sequence or linear order.

The next permutation of an array of integers is the next lexicographically greater
permutation of its integer. More formally, if all the permutations of the array
are sorted in one container according to their lexicographical order, then the next
permutation of that array is the permutation that follows it in the sorted container.

If such arrangement is not possible, the array must be rearranged as the lowest
possible order (i.e., sorted in ascending order).

Example 1:
  Input: nums = [1,2,3]
  Output: [1,3,2]

Example 2:
  Input: nums = [3,2,1]
  Output: [1,2,3]

Example 3:
  Input: nums = [1,1,5]
  Output: [1,5,1]

Example 4:
  Input: nums = [1,3,2]
  Output: [2,1,3]

Constraints:
  - 1 <= nums.length <= 100
  - 0 <= nums[i] <= 100

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Find rightmost character that is smaller than the character next to it
  - Find smallest character to the right that is larger than this character
  - Swap these two characters
  - Reverse the suffix to get the next lexicographically greater permutation
  - If no such character exists, reverse entire array (wrap around to smallest)
*/

export const functionName = 'nextPermutation';

export const tests = [
  {
    input: [[1,2,3]],
    expected: [1,3,2]
  },
  {
    input: [[3,2,1]],
    expected: [1,2,3]
  },
  {
    input: [[1,1,5]],
    expected: [1,5,1]
  },
  {
    input: [[1,3,2]],
    expected: [2,1,3]
  },
  {
    input: [[1]],
    expected: [1]
  },
  {
    input: [[1,2]],
    expected: [2,1]
  },
  {
    input: [[2,1]],
    expected: [1,2]
  },
  {
    input: [[1,5,1]],
    expected: [5,1,1]
  }
];

/**
 * Helper function to reverse array from start to end (inclusive)
 * @param {number[]} nums - Array to reverse
 * @param {number} start - Start index
 * @param {number} end - End index
 */
function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}

/**
 * Finds the next lexicographically greater permutation
 * @param {number[]} nums - Array to permute
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
    const n = nums.length;

    // Step 1: Find the rightmost character that is smaller than its next character
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) {
        // Step 2: Find the smallest character to the right that is larger than nums[i]
        let j = n - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }

        // Step 3: Swap nums[i] and nums[j]
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // Step 4: Reverse the suffix starting at i+1
    reverse(nums, i + 1, n - 1);
}

export default nextPermutation;