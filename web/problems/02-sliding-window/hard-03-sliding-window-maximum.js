/*
Problem: Sliding Window Maximum
Difficulty: Hard
Category: Array, Queue, Sliding Window, Heap (Priority Queue), Monotonic Queue
LeetCode: #239
Pattern: Fixed Window Sliding Window with Deque

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

Example 1:
  Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
  Output: [3,3,5,5,6,7]
  Explanation:
  Window position                Max
  ---------------               -----
  [1  3  -1] -3  5  3  6  7       3
   1 [3  -1  -3] 5  3  6  7       3
   1  3 [-1  -3  5] 3  6  7       5
   1  3  -1 [-3  5  3] 6  7       5
   1  3  -1  -3 [5  3  6] 7       6
   1  3  -1  -3  5 [3  6  7]      7

Example 2:
  Input: nums = [1], k = 1
  Output: [1]

Example 3:
  Input: nums = [1,-1], k = 1
  Output: [1,-1]

Example 4:
  Input: nums = [9,11], k = 2
  Output: [11]

Example 5:
  Input: nums = [4,-2], k = 2
  Output: [4]

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^4 <= nums[i] <= 10^4
  - 1 <= k <= nums.length

Time Complexity: O(n)
Space Complexity: O(k)

Pattern Notes:
  - Use monotonic deque (decreasing order) to efficiently track window maximum
  - Deque stores indices, not values, to easily check if elements are within current window
  - Maintain deque such that front always contains index of maximum element in current window
  - Remove indices from front if they're outside current window
  - Remove indices from back while their values are smaller than current element
  - Alternative approaches: segment tree, sparse table, but deque is most efficient
*/

export const functionName = 'maxSlidingWindow';

export const tests = [
  {
    input: [[1,3,-1,-3,5,3,6,7], 3],
    expected: [3,3,5,5,6,7]
  },
  {
    input: [[1], 1],
    expected: [1]
  },
  {
    input: [[1,-1], 1],
    expected: [1,-1]
  },
  {
    input: [[9,11], 2],
    expected: [11]
  },
  {
    input: [[4,-2], 2],
    expected: [4]
  },
  {
    input: [[1,3,1,2,0,5], 3],
    expected: [3,3,2,5]
  },
  {
    input: [[7,2,4], 2],
    expected: [7,4]
  },
  {
    input: [[1,2,3,4,5], 1],
    expected: [1,2,3,4,5]
  },
  // --- NEW TEST CASES ---
  {
    input: [[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5], 3],
    expected: [5,5,5,5,5,5,5,5,5,5,5,5,5]
  },
  {
    input: [[-7,-8,7,5,7,1,6,0], 4],
    expected: [7,7,7,7,7]
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15],
    expected: [15]
  },
  {
    input: [[5,4,3,2,1], 3],
    expected: [5,4,3]
  }
];

/**
 * Finds maximum value in each sliding window of size k
 * @param {number[]} nums - Array of integers
 * @param {number} k - Window size
 * @return {number[]} Array of maximum values in each window
 */
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices in decreasing order of their values

    for (let i = 0; i < nums.length; i++) {
        // Remove indices that are out of current window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove indices whose corresponding values are smaller than current element
        // This maintains decreasing order in deque
        while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }

        // Add current index to deque
        deque.push(i);

        // If we have processed at least k elements, add maximum to result
        if (i >= k - 1) {
            result.push(nums[deque[0]]); // Front of deque has maximum element index
        }
    }

    return result;
}

export default maxSlidingWindow;