/*
Problem: First Missing Positive
Difficulty: Hard
Category: Arrays, Hash Map, Cyclic Sort
LeetCode: #41
Pattern: Hash Map / Index as Hash Key

Given an unsorted integer array nums, return the smallest missing positive integer.

You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.
(The hash map approach uses O(n) space but is the key insight for understanding
the optimal in-place approach which uses the array indices as a hash map.)

Example 1:
  Input: nums = [1, 2, 0]
  Output: 3
  Explanation: The numbers in the range [1, 2] are all in the array.

Example 2:
  Input: nums = [3, 4, -1, 1]
  Output: 2
  Explanation: 1 is in the array but 2 is not.

Example 3:
  Input: nums = [7, 8, 9, 11, 12]
  Output: 1
  Explanation: The smallest positive integer 1 is missing.

Constraints:
  - 1 <= nums.length <= 10^5
  - -2^31 <= nums[i] <= 2^31 - 1

Time Complexity: O(n)
Space Complexity: O(n) for hash map approach, O(1) for in-place approach

Hash Map Pattern Notes:
  - Key insight: answer must be in range [1, n+1] where n = nums.length
  - Hash map approach: store all positives in a set, then scan 1..n+1
  - Optimal approach: use array itself as hash map (index i stores value i+1)
  - Place each number in its "correct" position via cyclic swaps
  - After placement, first index where nums[i] != i+1 gives the answer
*/

export const functionName = 'firstMissingPositive';

export const tests = [
  // Standard case: 1 and 2 present, 0 is not positive, answer is 3
  {
    input: [[1, 2, 0]],
    expected: 3
  },
  // Gap in the middle: 1 present but 2 missing
  {
    input: [[3, 4, -1, 1]],
    expected: 2
  },
  // No small positives at all: answer is 1
  {
    input: [[7, 8, 9, 11, 12]],
    expected: 1
  },
  // Single element that is 1: next positive is 2
  {
    input: [[1]],
    expected: 2
  },
  // Single element that is not 1: answer is 1
  {
    input: [[2]],
    expected: 1
  },
  // All negatives: answer is 1
  {
    input: [[-1, -2, -3]],
    expected: 1
  },
  // Consecutive from 1: answer is n+1
  {
    input: [[1, 2, 3, 4, 5]],
    expected: 6
  },
  // Duplicates: 1 is present, 2 is missing
  {
    input: [[1, 1, 1, 1]],
    expected: 2
  }
];

/**
 * Finds the smallest missing positive integer in an unsorted array.
 * Uses the array itself as a hash map by placing each value i at index i-1.
 *
 * @param {number[]} nums - Array of integers (may include negatives, zeros, duplicates)
 * @returns {number} The smallest missing positive integer
 */
function firstMissingPositive(nums) {
  const n = nums.length;

  // Place each number in its correct position:
  // nums[i] should hold value i+1
  for (let i = 0; i < n; i++) {
    // Keep swapping until nums[i] is in the right place or invalid
    while (
      nums[i] > 0 &&
      nums[i] <= n &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      // Swap nums[i] with nums[nums[i] - 1]
      const correctIndex = nums[i] - 1;
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    }
  }

  // Find the first position where nums[i] != i + 1
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // All positions are correct, so the answer is n + 1
  return n + 1;
}

export default firstMissingPositive;
