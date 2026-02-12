/*
Problem: Split Array Largest Sum
Difficulty: Hard
Category: Binary Search, Array, Dynamic Programming
LeetCode: #410
Pattern: Binary Search on Answer Space

Given an integer array nums and an integer k, split nums into k non-empty subarrays
such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.

Example 1:
  Input: nums = [7,2,5,10,8], k = 2
  Output: 18
  Explanation: There are four ways to split nums into two subarrays:
    [7],[2,5,10,8] -> largest sum = 25
    [7,2],[5,10,8] -> largest sum = 23
    [7,2,5],[10,8] -> largest sum = 18
    [7,2,5,10],[8] -> largest sum = 24
  The best way is to split it into [7,2,5] and [10,8], where the largest sum is 18

Example 2:
  Input: nums = [1,2,3,4,5], k = 2
  Output: 9
  Explanation: Split into [1,2,3] and [4,5], largest sum is 9

Example 3:
  Input: nums = [1,4,4], k = 3
  Output: 4
  Explanation: Split into [1], [4], [4], largest sum is 4

Example 4:
  Input: nums = [1], k = 1
  Output: 1
  Explanation: Only one subarray possible

Example 5:
  Input: nums = [10,5,13,4,8,4,5,11,14,9,16,10,20,8], k = 8
  Output: 25
  Explanation: Complex case with multiple splits

Constraints:
  - 1 <= nums.length <= 1000
  - 0 <= nums[i] <= 10^6
  - 1 <= k <= min(50, nums.length)

Time Complexity: O(n * log(sum(nums))) where n is the length of nums
Space Complexity: O(1)

Pattern Notes:
  - Binary search on the answer (maximum sum of any subarray)
  - Minimum possible answer is max(nums) (largest single element)
  - Maximum possible answer is sum(nums) (all elements in one subarray)
  - For each potential answer, check if we can split into k subarrays
  - Use greedy approach: add elements to current subarray until sum exceeds limit
  - If we can split with fewer than k subarrays, answer is too large
  - If we need more than k subarrays, answer is too small
*/

export const functionName = 'splitArray';

export const tests = [
  {
    input: [[7,2,5,10,8], 2],
    expected: 18
  },
  {
    input: [[1,2,3,4,5], 2],
    expected: 9
  },
  {
    input: [[1,4,4], 3],
    expected: 4
  },
  {
    input: [[1], 1],
    expected: 1
  },
  {
    input: [[10,5,13,4,8,4,5,11,14,9,16,10,20,8], 8],
    expected: 25
  },
  {
    input: [[1,2,3,4,5], 1],
    expected: 15
  },
  {
    input: [[1,2,3,4,5], 5],
    expected: 5
  },
  {
    input: [[2,3,1,2,4,3], 5],
    expected: 4
  },
  {
    input: [[1,1,1,1,1], 3],
    expected: 2
  },
  {
    input: [[10,5,13,4,8,4,5,11,14,9,16,10,20,8], 3],
    expected: 46
  },
  {
    input: [[7,2,5,10,8], 1],
    expected: 32
  },
  {
    input: [[7,2,5,10,8], 5],
    expected: 10
  }
];

/**
 * Check if we can split array into at most k subarrays with max sum <= maxSum
 * @param {number[]} nums - Array of integers
 * @param {number} k - Maximum number of subarrays allowed
 * @param {number} maxSum - Maximum sum allowed for any subarray
 * @return {boolean} True if split is possible, false otherwise
 */
function canSplit(nums, k, maxSum) {
    let subarrays = 1;
    let currentSum = 0;

    for (const num of nums) {
        if (currentSum + num > maxSum) {
            // Start a new subarray
            subarrays++;
            currentSum = num;

            // If we need more than k subarrays, it's impossible
            if (subarrays > k) {
                return false;
            }
        } else {
            currentSum += num;
        }
    }

    return true;
}

/**
 * Split array into k subarrays to minimize the largest sum
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of subarrays to split into
 * @return {number} Minimized largest sum of the split
 */
function splitArray(nums, k) {
    let left = Math.max(...nums);  // Minimum possible answer (largest element)
    let right = nums.reduce((sum, num) => sum + num, 0);  // Maximum possible answer (sum of all)

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (canSplit(nums, k, mid)) {
            // We can split with this max sum, try smaller
            right = mid;
        } else {
            // We cannot split with this max sum, need larger
            left = mid + 1;
        }
    }

    return left;
}

export default splitArray;