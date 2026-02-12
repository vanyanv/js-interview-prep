/*
Problem: Max Consecutive Ones II
Difficulty: Medium
Category: Array, Dynamic Programming, Sliding Window
LeetCode: #487
Pattern: Variable Window Sliding Window

Given a binary array nums, return the maximum number of consecutive 1's in the array if you can flip at most one 0.

Example 1:
  Input: nums = [1,0,1,1,0]
  Output: 4
  Explanation: Flip the first zero will get the maximum number of consecutive 1s. After flipping, the maximum number of consecutive 1s is 4.

Example 2:
  Input: nums = [1,0,1,1,0,1]
  Output: 4
  Explanation: Flip either the first or second zero to get 4 consecutive ones.

Example 3:
  Input: nums = [1,1,1,1]
  Output: 4
  Explanation: All elements are already 1, so maximum consecutive ones is 4.

Example 4:
  Input: nums = [0,0,0]
  Output: 1
  Explanation: We can flip at most one 0 to get one consecutive 1.

Example 5:
  Input: nums = [1,0,0,1]
  Output: 2
  Explanation: Flip either zero to get 2 consecutive ones.

Constraints:
  - 1 <= nums.length <= 10^5
  - nums[i] is either 0 or 1

Follow up: What if the input numbers come in one by one as an infinite stream? In other words, you can't store all numbers coming from the stream as it's too large to hold in memory. Could you solve it efficiently?

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - This is a specific case of "Max Consecutive Ones III" with k = 1
  - Use variable window sliding window approach
  - Track count of zeros in current window
  - Expand window by moving right pointer
  - When zeros count > 1, shrink window from left
  - Keep track of maximum window size
*/

export const functionName = 'findMaxConsecutiveOnes';

export const tests = [
  {
    input: [[1,0,1,1,0]],
    expected: 4
  },
  {
    input: [[1,0,1,1,0,1]],
    expected: 4
  },
  {
    input: [[1,1,1,1]],
    expected: 4
  },
  {
    input: [[0,0,0]],
    expected: 1
  },
  {
    input: [[1,0,0,1]],
    expected: 2
  },
  {
    input: [[0]],
    expected: 1
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[1,1,0,1,1,1,0,1,1]],
    expected: 6
  },
  // --- NEW TEST CASES ---
  {
    input: [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
    expected: 15
  },
  {
    input: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    expected: 1
  },
  {
    input: [[1,0]],
    expected: 2
  },
  {
    input: [[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]],
    expected: 3
  }
];

/**
 * Finds maximum consecutive ones with at most one flip
 * @param {number[]} nums - Binary array
 * @return {number} Maximum consecutive ones possible
 */
function findMaxConsecutiveOnes(nums) {
    let left = 0;
    let maxLength = 0;
    let zeroCount = 0;

    for (let right = 0; right < nums.length; right++) {
        // If current element is 0, increment zero count
        if (nums[right] === 0) {
            zeroCount++;
        }

        // If we have more than 1 zero, shrink window from left
        while (zeroCount > 1) {
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

export default findMaxConsecutiveOnes;