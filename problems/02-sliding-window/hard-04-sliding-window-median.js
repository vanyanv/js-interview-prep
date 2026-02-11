/*
Problem: Sliding Window Median
Difficulty: Hard
Category: Array, Hash Table, Sliding Window, Heap (Priority Queue)
LeetCode: #480
Pattern: Fixed Window Sliding Window with Two Heaps

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.

Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the median array for each window in the original array.

Example 1:
  Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
  Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
  Explanation:
  Window position                Median
  ---------------               -------
  [1  3  -1] -3  5  3  6  7        1
   1 [3  -1  -3] 5  3  6  7       -1
   1  3 [-1  -3  5] 3  6  7       -1
   1  3  -1 [-3  5  3] 6  7        3
   1  3  -1  -3 [5  3  6] 7        5
   1  3  -1  -3  5 [3  6  7]       6

Example 2:
  Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
  Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]

Example 3:
  Input: nums = [1,4,2,3], k = 4
  Output: [2.50000]

Constraints:
  - 1 <= k <= nums.length <= 10^5
  - -2^31 <= nums[i] <= 2^31 - 1

Time Complexity: O(n * log k)
Space Complexity: O(k)

Pattern Notes:
  - For each window, we need to find median efficiently
  - Simple approach: sort each window (O(n * k log k))
  - Better approach: use two heaps to maintain median
  - Use maxHeap for smaller half, minHeap for larger half
  - Balance heaps so their sizes differ by at most 1
  - For JavaScript, we'll use a simpler approach with sorted array for each window
*/

export const functionName = 'medianSlidingWindow';

export const tests = [
  {
    input: [[1,3,-1,-3,5,3,6,7], 3],
    expected: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
  },
  {
    input: [[1,2,3,4,2,3,1,4,2], 3],
    expected: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]
  },
  {
    input: [[1,4,2,3], 4],
    expected: [2.50000]
  },
  {
    input: [[1,2], 1],
    expected: [1.00000,2.00000]
  },
  {
    input: [[1,2,3], 2],
    expected: [1.50000,2.50000]
  },
  {
    input: [[2147483647,2147483647], 2],
    expected: [2147483647.00000]
  },
  {
    input: [[1,1,1,1], 2],
    expected: [1.00000,1.00000,1.00000]
  },
  {
    input: [[5,2,2,7,3,7,9,0,2,3], 4],
    expected: [3.50000,2.00000,4.50000,7.00000,6.00000,3.00000,2.50000]
  },
  // --- NEW TEST CASES ---
  {
    input: [[5,5,5,5,5,5,5,5,5,5], 3],
    expected: [5.00000,5.00000,5.00000,5.00000,5.00000,5.00000,5.00000,5.00000]
  },
  {
    input: [[1], 1],
    expected: [1.00000]
  },
  {
    input: [[-1,-2,-3,-4,-5], 2],
    expected: [-1.50000,-2.50000,-3.50000,-4.50000]
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 5],
    expected: [3.00000,4.00000,5.00000,6.00000,7.00000,8.00000,9.00000,10.00000,11.00000,12.00000,13.00000]
  }
];

/**
 * Finds median for each sliding window of size k
 * @param {number[]} nums - Array of integers
 * @param {number} k - Window size
 * @return {number[]} Array of medians for each window
 */
function medianSlidingWindow(nums, k) {
    const result = [];

    for (let i = 0; i <= nums.length - k; i++) {
        // Extract current window and sort it
        const window = nums.slice(i, i + k).sort((a, b) => a - b);

        // Calculate median
        let median;
        if (k % 2 === 1) {
            // Odd size: middle element
            median = window[Math.floor(k / 2)];
        } else {
            // Even size: average of two middle elements
            const mid1 = window[k / 2 - 1];
            const mid2 = window[k / 2];
            median = (mid1 + mid2) / 2;
        }

        result.push(parseFloat(median.toFixed(5)));
    }

    return result;
}

export default medianSlidingWindow;