/*
Problem: Average of All Subarrays of Size K
Difficulty: Easy
Category: Array, Sliding Window
Pattern: Fixed Window Sliding Window

Given an array of integers and a positive integer k, find the average of all contiguous subarrays of size k.

Example 1:
  Input: arr = [1, 3, 2, 6, -1, 4, 1, 8, 2], k = 5
  Output: [2.2, 2.8, 2.4, 3.6, 2.8]
  Explanation:
    1st subarray: [1, 3, 2, 6, -1] -> sum=11, avg=2.2
    2nd subarray: [3, 2, 6, -1, 4] -> sum=14, avg=2.8
    3rd subarray: [2, 6, -1, 4, 1] -> sum=12, avg=2.4
    4th subarray: [6, -1, 4, 1, 8] -> sum=18, avg=3.6
    5th subarray: [-1, 4, 1, 8, 2] -> sum=14, avg=2.8

Example 2:
  Input: arr = [5, 10, 15], k = 2
  Output: [7.5, 12.5]
  Explanation:
    1st subarray: [5, 10] -> sum=15, avg=7.5
    2nd subarray: [10, 15] -> sum=25, avg=12.5

Example 3:
  Input: arr = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0], k = 3
  Output: [2.33, 3.33, 5.33, 5.33, 3.67, 3.67, 3.67, 3.0]

Constraints:
  - 1 <= arr.length <= 10^5
  - -10^4 <= arr[i] <= 10^4
  - 1 <= k <= arr.length

Time Complexity: O(n)
Space Complexity: O(n-k+1) for the result array

Pattern Notes:
  - Fixed window sliding window with size k
  - Calculate sum of first window, then slide by removing first element and adding next element
  - Divide each sum by k to get the average
  - Store all averages in result array
  - More efficient than recalculating sum for each window from scratch
*/

export const functionName = 'averageSubarraysK';

export const tests = [
  {
    input: [[1, 3, 2, 6, -1, 4, 1, 8, 2], 5],
    expected: [2.2, 2.8, 2.4, 3.6, 2.8]
  },
  {
    input: [[5, 10, 15], 2],
    expected: [7.5, 12.5]
  },
  {
    input: [[4, 2, 1, 7, 8, 1, 2, 8, 1, 0], 3],
    expected: [2.33, 3.33, 5.33, 5.33, 3.67, 3.67, 3.67, 3.0]
  },
  {
    input: [[1], 1],
    expected: [1]
  },
  {
    input: [[1, 2, 3, 4, 5], 1],
    expected: [1, 2, 3, 4, 5]
  },
  {
    input: [[10, 20, 30, 40], 4],
    expected: [25]
  },
  {
    input: [[-1, -2, -3, -4, -5], 2],
    expected: [-1.5, -2.5, -3.5, -4.5]
  },
  {
    input: [[0, 0, 0, 0], 2],
    expected: [0, 0, 0]
  },
  {
    input: [[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 4],
    expected: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
  },
  {
    input: [[10, -10, 10, -10, 10, -10], 2],
    expected: [0, 0, 0, 0, 0]
  },
  {
    input: [[1, 2], 2],
    expected: [1.5]
  },
  {
    input: [[1000, -1000, 1000, -1000, 1000, -1000, 1000, -1000, 1000, -1000, 1000, -1000, 1000, -1000, 1000, -1000], 3],
    expected: [333.33, -333.33, 333.33, -333.33, 333.33, -333.33, 333.33, -333.33, 333.33, -333.33, 333.33, -333.33, 333.33, -333.33]
  }
];

/**
 * Finds the average of all contiguous subarrays of size k
 * @param {number[]} arr - Array of integers
 * @param {number} k - Size of each subarray
 * @return {number[]} Array of averages
 */
function averageSubarraysK(arr, k) {
    if (arr.length < k) return [];

    const result = [];

    // Calculate sum of first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    // Add first average
    result.push(parseFloat((windowSum / k).toFixed(2)));

    // Slide the window: remove first element, add next element
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result.push(parseFloat((windowSum / k).toFixed(2)));
    }

    return result;
}

export default averageSubarraysK;