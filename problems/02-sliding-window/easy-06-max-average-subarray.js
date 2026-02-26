/*
Problem: Maximum Average Subarray I
Difficulty: Easy
Category: Array, Sliding Window
LeetCode: #643
Pattern: Fixed Window Sliding Window

You are given an integer array nums consisting of n elements, and an integer k.
Find a contiguous subarray whose length is equal to k that has the maximum average value
and return this value. Any answer with a calculation error less than 10^-5 will be accepted.

Example 1:
  Input: nums = [1, 12, -5, -6, 50, 3], k = 4
  Output: 12.75
  Explanation: Maximum average is (12 + (-5) + (-6) + 50) / 4 = 51 / 4 = 12.75

Example 2:
  Input: nums = [5], k = 1
  Output: 5.0
  Explanation: Only one subarray of size 1: [5], average = 5.0

Example 3:
  Input: nums = [0, 4, 0, 3, 2], k = 1
  Output: 4.0
  Explanation: When k=1, the maximum average is the maximum element = 4.

Constraints:
  - n == nums.length
  - 1 <= k <= n <= 10^5
  - -10^4 <= nums[i] <= 10^4

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Classic fixed-size sliding window
  - Compute sum of first k elements, then slide window
  - Track maximum sum, then divide by k at the end for maximum average
  - Dividing only at the end avoids repeated floating point divisions
*/

export const functionName = 'findMaxAverage';

export const tests = [
  {
    // Windows: [1,12,-5,-6]=2, [12,-5,-6,50]=51, [-5,-6,50,3]=42 -> max sum=51, avg=51/4=12.75
    input: [[1, 12, -5, -6, 50, 3], 4],
    expected: 12.75
  },
  {
    // Single element -> 5/1 = 5
    input: [[5], 1],
    expected: 5
  },
  {
    // k=1: max element = 4
    input: [[0, 4, 0, 3, 2], 1],
    expected: 4
  },
  {
    // [1,2,3]=6/3=2, [2,3,4]=9/3=3, [3,4,5]=12/3=4 -> max avg = 4
    input: [[1, 2, 3, 4, 5], 3],
    expected: 4
  },
  {
    // k = array length: (1+2+3+4+5)/5 = 15/5 = 3
    input: [[1, 2, 3, 4, 5], 5],
    expected: 3
  },
  {
    // All negative: [-1,-2]=-1.5, [-2,-3]=-2.5, [-3,-4]=-3.5 -> max avg = -1.5
    input: [[-1, -2, -3, -4], 2],
    expected: -1.5
  },
  {
    // All same values: avg always 7
    input: [[7, 7, 7, 7], 2],
    expected: 7
  },
  {
    // [0,0]=0, [0,0]=0 -> max avg = 0
    input: [[0, 0, 0], 2],
    expected: 0
  },
  {
    // [-1,10000]= 9999/2=4999.5, [10000,-1]=9999/2=4999.5 -> max avg = 4999.5
    input: [[-1, 10000, -1], 2],
    expected: 4999.5
  },
  {
    // [3,-1,4]=6/3=2, [-1,4,-1]=2/3=0.6667, [4,-1,5]=8/3=2.6667, [-1,5,9]=13/3=4.3333, [5,9,2]=16/3=5.3333 -> max = 16/3
    input: [[3, -1, 4, -1, 5, 9, 2], 3],
    expected: 16 / 3
  },
  {
    // Single large negative: k=1 -> max = -1
    input: [[-10, -1, -5, -3], 1],
    expected: -1
  },
  {
    // [4,2,1]=7/3, [2,1,7]=10/3, [1,7,8]=16/3, [7,8,1]=16/3 -> max = 16/3
    input: [[4, 2, 1, 7, 8, 1, 2, 8, 1, 0], 3],
    expected: 16 / 3
  },
];

/**
 * Finds the maximum average of any contiguous subarray of size k
 * @param {number[]} nums - Array of integers
 * @param {number} k - Size of the subarray
 * @return {number} Maximum average value
 */
function findMaxAverage(nums, k) {
    let windowSum = 0;

    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;

    // Slide the window
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum / k;
}

export default findMaxAverage;
