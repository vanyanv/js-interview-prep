/*
Problem: Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
Difficulty: Easy
Category: Array, Sliding Window
LeetCode: #1343
Pattern: Fixed Window Sliding Window

Given an array of integers arr and two integers k and threshold, return the number of sub-arrays
of size k and average greater than or equal to threshold.

Example 1:
  Input: arr = [2, 2, 2, 2, 5, 5, 5, 8], k = 3, threshold = 4
  Output: 3
  Explanation: Sub-arrays [2, 5, 5], [5, 5, 5], and [5, 5, 8] have averages 4, 5, and 6
  respectively. All other sub-arrays of size 3 have averages less than 4 (the threshold).

Example 2:
  Input: arr = [11, 13, 17, 23, 29, 31, 7, 5, 2, 3], k = 3, threshold = 5
  Output: 6
  Explanation: The first 6 sub-arrays of size 3 have averages greater than 5.
  Note that averages are not integers.

Constraints:
  - 1 <= arr.length <= 10^5
  - 1 <= arr[i] <= 10^4
  - 1 <= k <= arr.length
  - 0 <= threshold <= 10^4

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Fixed window of size k
  - Instead of computing average (sum/k >= threshold), compare sum >= threshold * k to avoid floating point issues
  - Slide the window: subtract the element leaving, add the element entering
  - Count windows that meet the threshold condition
*/

export const functionName = 'numOfSubarrays';

export const tests = [
  {
    // [2,2,2]=2, [2,2,5]=3, [2,5,5]=4, [5,5,5]=5, [5,5,8]=6 -> averages >=4: 3 subarrays
    input: [[2, 2, 2, 2, 5, 5, 5, 8], 3, 4],
    expected: 3
  },
  {
    // All subarrays of size 3: [11,13,17]=13.67, [13,17,23]=17.67, [17,23,29]=23, [23,29,31]=27.67, [29,31,7]=22.33, [31,7,5]=14.33, [7,5,2]=4.67, [5,2,3]=3.33
    // All >= 5: first 6 subarrays
    input: [[11, 13, 17, 23, 29, 31, 7, 5, 2, 3], 3, 5],
    expected: 6
  },
  {
    // [1,1,1]=1, avg=1 >=1 -> count 1
    input: [[1, 1, 1, 1], 3, 1],
    expected: 2
  },
  {
    // Single element windows, threshold=5: elements >=5 are [5,6,7,8,9,10] -> 6
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, 5],
    expected: 6
  },
  {
    // k equals array length: avg = (1+2+3+4+5)/5 = 3, threshold=3 -> 1
    input: [[1, 2, 3, 4, 5], 5, 3],
    expected: 1
  },
  {
    // k equals array length: avg = (1+2+3+4+5)/5 = 3, threshold=4 -> 0
    input: [[1, 2, 3, 4, 5], 5, 4],
    expected: 0
  },
  {
    // All elements are the same = 5, k=2, threshold=5 -> all subarrays qualify -> 4
    input: [[5, 5, 5, 5, 5], 2, 5],
    expected: 4
  },
  {
    // threshold = 0, all positive elements -> all subarrays qualify
    // array length 6, k=3 -> 4 subarrays, all avg > 0
    input: [[1, 2, 3, 4, 5, 6], 3, 0],
    expected: 4
  },
  {
    // Single element array, k=1, threshold=10000: 10000 >= 10000 -> 1
    input: [[10000], 1, 10000],
    expected: 1
  },
  {
    // [1,1]=1, [1,1]=1, [1,1]=1, [1,1]=1 -> avg=1, threshold=2 -> 0
    input: [[1, 1, 1, 1, 1], 2, 2],
    expected: 0
  },
  {
    // [7,7,7]=7, [7,7,3]=5.67, [7,3,3]=4.33, [3,3,3]=3 -> threshold=5: first 2 qualify -> 2
    input: [[7, 7, 7, 3, 3, 3], 3, 5],
    expected: 2
  },
  {
    // [4,4]=4, [4,4]=4 -> avg=4, threshold=4 -> 2
    input: [[4, 4, 4], 2, 4],
    expected: 2
  },
];

/**
 * Returns the number of sub-arrays of size k with average >= threshold
 * @param {number[]} arr - Array of integers
 * @param {number} k - Size of the sub-array
 * @param {number} threshold - Minimum average threshold
 * @return {number} Count of qualifying sub-arrays
 */
function numOfSubarrays(arr, k, threshold) {
    let count = 0;
    let windowSum = 0;
    const target = threshold * k;

    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    if (windowSum >= target) count++;

    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        if (windowSum >= target) count++;
    }

    return count;
}

export default numOfSubarrays;
