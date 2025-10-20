/*
Problem: Subarrays with K Different Integers
Difficulty: Hard
Category: Array, Hash Table, Sliding Window, Counting
LeetCode: #992
Pattern: Variable Window Sliding Window with Helper Function

Given an integer array nums and an integer k, return the number of good subarrays of nums.

A good subarray is an array where the number of different integers in it is exactly equal to k.

A subarray is a contiguous part of an array.

Example 1:
  Input: nums = [1,2,1,2,3], k = 2
  Output: 7
  Explanation: Subarrays formed with exactly 2 different integers:
  [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]

Example 2:
  Input: nums = [1,2,1,3,4], k = 3
  Output: 3
  Explanation: Subarrays formed with exactly 3 different integers:
  [1,2,1,3], [2,1,3], [1,3,4]

Example 3:
  Input: nums = [1,1], k = 1
  Output: 2
  Explanation: Subarrays: [1], [1]

Example 4:
  Input: nums = [1,2,3], k = 1
  Output: 3
  Explanation: Subarrays: [1], [2], [3]

Example 5:
  Input: nums = [1,2,3,4], k = 2
  Output: 6
  Explanation: [1,2], [2,3], [3,4], [1,2,3], [2,3,4], [1,2,3,4] but only 6 have exactly 2 distinct

Constraints:
  - 1 <= nums.length <= 2 * 10^4
  - 1 <= nums[i], k <= nums.length

Time Complexity: O(n)
Space Complexity: O(k)

Pattern Notes:
  - Direct counting of "exactly k" is complex
  - Use helper function: exactly k = (at most k) - (at most k-1)
  - "At most k" can be solved with sliding window
  - For each right position, count how many left positions form valid subarrays
  - The key insight: if subarray [i,j] has at most k distinct, then all subarrays [i,j], [i+1,j], ..., [j,j] are valid
*/

export const functionName = 'subarraysWithKDistinct';

export const tests = [
  {
    input: [[1,2,1,2,3], 2],
    expected: 7
  },
  {
    input: [[1,2,1,3,4], 3],
    expected: 3
  },
  {
    input: [[1,1], 1],
    expected: 2
  },
  {
    input: [[1,2,3], 1],
    expected: 3
  },
  {
    input: [[1,2,3,4], 2],
    expected: 6
  },
  {
    input: [[1], 1],
    expected: 1
  },
  {
    input: [[1,2,1,2,1], 2],
    expected: 10
  },
  {
    input: [[1,2,3,2,1], 3],
    expected: 3
  }
];

/**
 * Counts subarrays with exactly k distinct integers
 * @param {number[]} nums - Array of integers
 * @param {number} k - Target number of distinct integers
 * @return {number} Count of valid subarrays
 */
function subarraysWithKDistinct(nums, k) {
    return atMostK(nums, k) - atMostK(nums, k - 1);
}

/**
 * Helper function to count subarrays with at most k distinct integers
 * @param {number[]} nums - Array of integers
 * @param {number} k - Maximum number of distinct integers
 * @return {number} Count of valid subarrays
 */
function atMostK(nums, k) {
    if (k === 0) return 0;

    const count = new Map();
    let left = 0;
    let result = 0;

    for (let right = 0; right < nums.length; right++) {
        // Add current number to window
        const rightNum = nums[right];
        count.set(rightNum, (count.get(rightNum) || 0) + 1);

        // Shrink window if we have more than k distinct numbers
        while (count.size > k) {
            const leftNum = nums[left];
            count.set(leftNum, count.get(leftNum) - 1);
            if (count.get(leftNum) === 0) {
                count.delete(leftNum);
            }
            left++;
        }

        // All subarrays ending at 'right' and starting from any position between 'left' and 'right'
        // have at most k distinct numbers
        result += right - left + 1;
    }

    return result;
}

export default subarraysWithKDistinct;