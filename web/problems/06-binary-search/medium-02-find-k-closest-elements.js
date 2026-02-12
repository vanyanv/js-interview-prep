/*
Problem: Find K Closest Elements
Difficulty: Medium
Category: Binary Search, Array, Two Pointers, Sorting
LeetCode: #658
Pattern: Binary Search for Range

Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array.
The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:
- |a - x| < |b - x|, or
- |a - x| == |b - x| and a < b

Example 1:
  Input: arr = [1,2,3,4,5], k = 4, x = 3
  Output: [1,2,3,4]
  Explanation: The 4 closest elements to 3 are [1,2,3,4]

Example 2:
  Input: arr = [1,2,3,4,5], k = 4, x = -1
  Output: [1,2,3,4]
  Explanation: The 4 closest elements to -1 are [1,2,3,4]

Example 3:
  Input: arr = [1,1,1,10,10,10], k = 1, x = 9
  Output: [10]
  Explanation: 10 is closer to 9 than 1

Example 4:
  Input: arr = [0,0,1,2,3,3,4,7,7,8], k = 3, x = 5
  Output: [3,3,4]
  Explanation: The 3 closest elements to 5 are [3,3,4]

Example 5:
  Input: arr = [1,2,3,4,5], k = 1, x = 6
  Output: [5]
  Explanation: 5 is the closest element to 6

Constraints:
  - 1 <= k <= arr.length
  - 1 <= arr.length <= 10^4
  - arr is sorted in ascending order
  - -10^4 <= arr[i], x <= 10^4

Time Complexity: O(log(n-k) + k) where n is the length of arr
Space Complexity: O(1) excluding output space

Pattern Notes:
  - Binary search to find the start of the k-element window
  - The result is a contiguous subarray of length k
  - Use binary search to find the optimal left boundary of this window
  - Compare distances: if arr[mid] is closer to x than arr[mid+k], move right
  - If arr[mid+k] is closer to x than arr[mid], move left
  - Final left pointer gives the start of the k closest elements
*/

export const functionName = 'findClosestElements';

export const tests = [
  {
    input: [[1,2,3,4,5], 4, 3],
    expected: [1,2,3,4]
  },
  {
    input: [[1,2,3,4,5], 4, -1],
    expected: [1,2,3,4]
  },
  {
    input: [[1,1,1,10,10,10], 1, 9],
    expected: [10]
  },
  {
    input: [[0,0,1,2,3,3,4,7,7,8], 3, 5],
    expected: [3,3,4]
  },
  {
    input: [[1,2,3,4,5], 1, 6],
    expected: [5]
  },
  {
    input: [[1,3], 1, 2],
    expected: [1]
  },
  {
    input: [[1,2,4,5,6,7], 4, 3],
    expected: [1,2,4,5]
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,10], 5, 5],
    expected: [3,4,5,6,7]
  },
  // --- Additional rigorous test cases ---
  {
    // All same values
    input: [[3,3,3,3,3], 2, 3],
    expected: [3,3]
  },
  {
    // k equals array length (return entire array)
    input: [[1,2,3,4,5], 5, 100],
    expected: [1,2,3,4,5]
  },
  {
    // Single element, k=1
    input: [[7], 1, 7],
    expected: [7]
  },
  {
    // x is exactly between two elements, prefer smaller
    input: [[1,3,5,7,9], 2, 4],
    expected: [3,5]
  },
  {
    // Larger array, x far to the left
    input: [[10,20,30,40,50,60,70,80,90,100], 3, -100],
    expected: [10,20,30]
  }
];

/**
 * Find k closest elements to x in sorted array
 * @param {number[]} arr - Sorted array of integers
 * @param {number} k - Number of closest elements to find
 * @param {number} x - Target value
 * @return {number[]} Array of k closest elements sorted in ascending order
 */
function findClosestElements(arr, k, x) {
    let left = 0;
    let right = arr.length - k;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        // Compare distances from x
        // If arr[mid] is farther from x than arr[mid + k], move right
        if (x - arr[mid] > arr[mid + k] - x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return arr.slice(left, left + k);
}

export default findClosestElements;