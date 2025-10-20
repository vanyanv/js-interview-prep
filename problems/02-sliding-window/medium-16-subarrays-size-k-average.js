/*
Problem: Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
Difficulty: Medium
Category: Array, Sliding Window
LeetCode: #1343
Pattern: Fixed Window Sliding Window

Given an array of integers arr and two integers k and threshold, return the number of sub-arrays of size k and average greater than or equal to threshold.

Example 1:
  Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
  Output: 3
  Explanation: Sub-arrays [2,5,5], [5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. All other sub-arrays of size 3 have averages less than 4.

Example 2:
  Input: arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
  Output: 6
  Explanation: The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.

Example 3:
  Input: arr = [7,7,7,7,7,7,7], k = 1, threshold = 7
  Output: 7
  Explanation: All sub-arrays of size 1 have average 7 which is greater than or equal to threshold 7.

Example 4:
  Input: arr = [4,4,4,4], k = 4, threshold = 1
  Output: 1
  Explanation: The sub-array [4,4,4,4] has average 4 >= 1.

Constraints:
  - 1 <= arr.length <= 10^5
  - 1 <= arr[i] <= 10^4
  - 1 <= k <= arr.length
  - 0 <= threshold <= 10^4

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Fixed window sliding window of size k
  - Instead of calculating average each time, compare sum with threshold * k
  - This avoids floating point arithmetic: sum/k >= threshold ⟺ sum >= threshold * k
  - Calculate sum of first window, then slide by removing first and adding next element
  - Count windows where sum >= threshold * k
*/

export const functionName = 'numOfSubarrays';

export const tests = [
  {
    input: [[2,2,2,2,5,5,5,8], 3, 4],
    expected: 3
  },
  {
    input: [[11,13,17,23,29,31,7,5,2,3], 3, 5],
    expected: 6
  },
  {
    input: [[7,7,7,7,7,7,7], 1, 7],
    expected: 7
  },
  {
    input: [[4,4,4,4], 4, 1],
    expected: 1
  },
  {
    input: [[1,1,1], 1, 0],
    expected: 3
  },
  {
    input: [[1,2,3,4,5], 2, 3],
    expected: 3
  },
  {
    input: [[10,20,30,40], 2, 25],
    expected: 2
  },
  {
    input: [[1,1,1,1,1], 3, 2],
    expected: 0
  }
];

/**
 * Counts subarrays of size k with average >= threshold
 * @param {number[]} arr - Array of integers
 * @param {number} k - Size of subarray
 * @param {number} threshold - Minimum average threshold
 * @return {number} Count of valid subarrays
 */
function numOfSubarrays(arr, k, threshold) {
    let count = 0;
    const targetSum = threshold * k; // Avoid floating point by comparing sum with threshold * k

    // Calculate sum of first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    // Check first window
    if (windowSum >= targetSum) {
        count++;
    }

    // Slide the window
    for (let i = k; i < arr.length; i++) {
        // Update window sum: remove leftmost, add rightmost
        windowSum = windowSum - arr[i - k] + arr[i];

        // Check if current window meets threshold
        if (windowSum >= targetSum) {
            count++;
        }
    }

    return count;
}

export default numOfSubarrays;