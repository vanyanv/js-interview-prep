/*
Problem: Maximum Sum Subarray of Size K
Difficulty: Easy
Category: Array, Sliding Window
Pattern: Fixed Window Sliding Window

Given an array of integers and a positive integer k, find the maximum sum of any contiguous subarray of size k.

Example 1:
  Input: arr = [2, 1, 5, 1, 3, 2], k = 3
  Output: 9
  Explanation: Subarray with maximum sum is [5, 1, 3].

Example 2:
  Input: arr = [2, 3, 4, 1, 5], k = 2
  Output: 7
  Explanation: Subarray with maximum sum is [3, 4].

Example 3:
  Input: arr = [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4
  Output: 39
  Explanation: Subarray with maximum sum is [4, 2, 10, 23].

Example 4:
  Input: arr = [-1, -2, -3, -4], k = 2
  Output: -3
  Explanation: Subarray with maximum sum is [-1, -2].

Constraints:
  - 1 <= arr.length <= 10^5
  - -10^4 <= arr[i] <= 10^4
  - 1 <= k <= arr.length

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - This is a classic fixed window sliding window problem
  - Window size is always k
  - Calculate sum of first window, then slide by removing first element and adding next element
  - Keep track of maximum sum encountered
  - Use the sliding window technique to avoid recalculating the entire sum for each window
*/

export const functionName = 'maxSumSubarrayK';

export const tests = [
  {
    input: [[2, 1, 5, 1, 3, 2], 3],
    expected: 9
  },
  {
    input: [[2, 3, 4, 1, 5], 2],
    expected: 7
  },
  {
    input: [[1, 4, 2, 10, 23, 3, 1, 0, 20], 4],
    expected: 39
  },
  {
    input: [[-1, -2, -3, -4], 2],
    expected: -3
  },
  {
    input: [[5], 1],
    expected: 5
  },
  {
    input: [[1, 2, 3, 4, 5], 5],
    expected: 15
  },
  {
    input: [[100, -50, 200, -100, 150], 3],
    expected: 250
  },
  {
    input: [[0, 0, 0, 0, 0], 3],
    expected: 0
  },
  {
    input: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 5],
    expected: 5
  },
  {
    input: [[-5, -3, -1, -2, -4], 2],
    expected: -3
  },
  {
    input: [[10000, -10000, 10000, -10000, 10000], 3],
    expected: 10000
  },
  {
    input: [[1, 2], 2],
    expected: 3
  }
];

/**
 * Finds the maximum sum of any contiguous subarray of size k
 * @param {number[]} arr - Array of integers
 * @param {number} k - Size of the subarray
 * @return {number} Maximum sum of subarray of size k
 */
function maxSumSubarrayK(arr, k) {
    if (arr.length < k) return 0;

    // Calculate sum of first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    let maxSum = windowSum;

    // Slide the window: remove first element, add next element
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

export default maxSumSubarrayK;