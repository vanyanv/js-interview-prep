/*
Problem: Longest Turbulent Subarray
Difficulty: Medium
Category: Array, Dynamic Programming, Sliding Window
LeetCode: #978
Pattern: Variable Window Sliding Window

Given an integer array arr, return the length of a maximum size turbulent subarray of arr.

A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.

More formally, a subarray [arr[i], arr[i + 1], ..., arr[j]] is said to be turbulent if and only if:
- For i <= k < j: arr[k] > arr[k + 1] when k - i is even, and arr[k] < arr[k + 1] when k - i is odd.
OR
- For i <= k < j: arr[k] > arr[k + 1] when k - i is odd, and arr[k] < arr[k + 1] when k - i is even.

Example 1:
  Input: arr = [9,4,2,10,7,8,8,1,9]
  Output: 5
  Explanation: arr[1..5] is "4,2,10,7,8" which is turbulent (4>2<10>7<8).

Example 2:
  Input: arr = [4,8,12,16]
  Output: 2
  Explanation: Any subarray of length 2 is turbulent.

Example 3:
  Input: arr = [100]
  Output: 1

Example 4:
  Input: arr = [9,9]
  Output: 1
  Explanation: No turbulent subarray longer than 1.

Example 5:
  Input: arr = [1,2,1,0,1]
  Output: 4
  Explanation: arr[0..3] is "1,2,1,0" which is turbulent (1<2>1>0).

Constraints:
  - 1 <= arr.length <= 4 * 10^4
  - 0 <= arr[i] <= 10^9

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - A turbulent subarray alternates between increasing and decreasing
  - Use sliding window approach
  - Track the current trend (increasing/decreasing) and expected next trend
  - Extend window while pattern continues, reset when pattern breaks
  - Handle equal adjacent elements by resetting the window
  - Alternative: Use DP with two states (ending with increase/decrease)
*/

export const functionName = 'maxTurbulenceSize';

export const tests = [
  {
    input: [[9,4,2,10,7,8,8,1,9]],
    expected: 5
  },
  {
    input: [[4,8,12,16]],
    expected: 2
  },
  {
    input: [[100]],
    expected: 1
  },
  {
    input: [[9,9]],
    expected: 1
  },
  {
    input: [[1,2,1,0,1]],
    expected: 4
  },
  {
    input: [[1,1,1,1]],
    expected: 1
  },
  {
    input: [[2,1,2,1,2]],
    expected: 5
  },
  {
    input: [[1,2,3,4,5]],
    expected: 2
  }
];

/**
 * Finds length of longest turbulent subarray
 * @param {number[]} arr - Array of integers
 * @return {number} Length of longest turbulent subarray
 */
function maxTurbulenceSize(arr) {
    if (arr.length <= 1) return arr.length;

    let maxLength = 1;
    let currentLength = 1;
    let prevComparison = 0; // -1: decreasing, 0: equal, 1: increasing

    for (let i = 1; i < arr.length; i++) {
        let currentComparison;

        if (arr[i] > arr[i - 1]) {
            currentComparison = 1; // increasing
        } else if (arr[i] < arr[i - 1]) {
            currentComparison = -1; // decreasing
        } else {
            currentComparison = 0; // equal
        }

        if (currentComparison === 0) {
            // Equal elements break turbulent pattern
            currentLength = 1;
        } else if (prevComparison === 0 || prevComparison !== currentComparison) {
            // Start of turbulent subarray or pattern continues (alternating)
            currentLength++;
        } else {
            // Pattern breaks (same comparison twice)
            currentLength = 2; // Start new subarray with last two elements
        }

        maxLength = Math.max(maxLength, currentLength);
        prevComparison = currentComparison;
    }

    return maxLength;
}

export default maxTurbulenceSize;