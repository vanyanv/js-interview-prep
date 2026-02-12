/*
Problem: Minimum Size Subarray Sum
Difficulty: Medium
Category: Array, Binary Search, Sliding Window, Prefix Sum
LeetCode: #209
Pattern: Variable Window Sliding Window

Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is greater than or equal to target. If there is no such subarray, return 0 instead.

Example 1:
  Input: target = 7, nums = [2,3,1,2,4,3]
  Output: 2
  Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Example 2:
  Input: target = 4, nums = [1,4,4]
  Output: 1

Example 3:
  Input: target = 11, nums = [1,1,1,1,1,1,1,1]
  Output: 0

Example 4:
  Input: target = 15, nums = [1,2,3,4,5]
  Output: 5
  Explanation: The entire array sums to 15, so minimum length is 5.

Example 5:
  Input: target = 213, nums = [12,28,83,4,25,26,25,2,25,25,25,12]
  Output: 8

Constraints:
  - 1 <= target <= 10^9
  - 1 <= nums.length <= 10^5
  - 1 <= nums[i] <= 10^4

Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Variable window sliding window approach
  - Expand window by moving right pointer and adding to sum
  - When sum >= target, try to shrink window from left while maintaining sum >= target
  - Keep track of minimum window size that satisfies the condition
  - This finds the shortest subarray with sum >= target
*/

export const functionName = 'minSubArrayLen';

export const tests = [
  {
    input: [7, [2,3,1,2,4,3]],
    expected: 2
  },
  {
    input: [4, [1,4,4]],
    expected: 1
  },
  {
    input: [11, [1,1,1,1,1,1,1,1]],
    expected: 0
  },
  {
    input: [15, [1,2,3,4,5]],
    expected: 5
  },
  {
    input: [213, [12,28,83,4,25,26,25,2,25,25,25,12]],
    expected: 8
  },
  {
    input: [3, [1,1,1,1]],
    expected: 3
  },
  {
    input: [5, [2,1,2,1,1,1]],
    expected: 3
  },
  {
    input: [1, [1,2,3,4]],
    expected: 1
  },
  // --- NEW TEST CASES ---
  {
    input: [100, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]],
    expected: 13
  },
  {
    input: [6, [3,3,3,3,3,3,3,3,3,3]],
    expected: 2
  },
  {
    input: [10, [10]],
    expected: 1
  },
  {
    input: [11, [10]],
    expected: 0
  }
];

/**
 * Finds minimum length subarray with sum >= target
 * @param {number} target - Target sum
 * @param {number[]} nums - Array of positive integers
 * @return {number} Minimum length of valid subarray, 0 if none exists
 */
function minSubArrayLen(target, nums) {
    let left = 0;
    let minLength = Infinity;
    let windowSum = 0;

    for (let right = 0; right < nums.length; right++) {
        // Add current element to window
        windowSum += nums[right];

        // Try to shrink window while sum >= target
        while (windowSum >= target) {
            // Update minimum length
            minLength = Math.min(minLength, right - left + 1);

            // Remove leftmost element and move left pointer
            windowSum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

export default minSubArrayLen;