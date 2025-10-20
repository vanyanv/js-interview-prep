/*
Problem: Max Consecutive Ones III
Difficulty: Medium
Category: Array, Binary Search, Sliding Window, Prefix Sum
LeetCode: #1004
Pattern: Fixed Window Sliding Window (Variable Window with Constraint)

Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

Example 1:
  Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
  Output: 6
  Explanation: [1,1,1,0,0,1,1,1,1,1,1]
  Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

Example 2:
  Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
  Output: 10
  Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
  Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

Example 3:
  Input: nums = [1,1,1,1], k = 0
  Output: 4
  Explanation: No flips needed, all are already 1's.

Example 4:
  Input: nums = [0,0,0,0], k = 2
  Output: 2
  Explanation: Can flip at most 2 zeros to get "1100" or "0011" or "1001".

Constraints:
  - 1 <= nums.length <= 10^5
  - nums[i] is either 0 or 1
  - 0 <= k <= nums.length

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use sliding window approach with variable window size
  - Maintain count of zeros in current window
  - Expand window by moving right pointer
  - If zeros count exceeds k, shrink window from left
  - Track maximum window size encountered
  - This is essentially "longest subarray with at most k zeros"
*/

export const functionName = 'longestOnes';

export const tests = [
  {
    input: [[1,1,1,0,0,0,1,1,1,1,0], 2],
    expected: 6
  },
  {
    input: [[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3],
    expected: 10
  },
  {
    input: [[1,1,1,1], 0],
    expected: 4
  },
  {
    input: [[0,0,0,0], 2],
    expected: 2
  },
  {
    input: [[1], 0],
    expected: 1
  },
  {
    input: [[0], 1],
    expected: 1
  },
  {
    input: [[1,0,1,0,1], 1],
    expected: 3
  },
  {
    input: [[0,0,0,1], 4],
    expected: 4
  }
];

/**
 * Finds maximum consecutive ones with at most k flips
 * @param {number[]} nums - Binary array
 * @param {number} k - Maximum number of zeros that can be flipped
 * @return {number} Maximum length of consecutive ones
 */
function longestOnes(nums, k) {
    let left = 0;
    let maxLength = 0;
    let zeroCount = 0;

    for (let right = 0; right < nums.length; right++) {
        // If current element is 0, increment zero count
        if (nums[right] === 0) {
            zeroCount++;
        }

        // If we have more than k zeros, shrink window from left
        while (zeroCount > k) {
            if (nums[left] === 0) {
                zeroCount--;
            }
            left++;
        }

        // Update maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

export default longestOnes;