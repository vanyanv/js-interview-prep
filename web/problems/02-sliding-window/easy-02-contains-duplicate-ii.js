/*
Problem: Contains Duplicate II
Difficulty: Easy
Category: Array, Hash Table, Sliding Window
LeetCode: #219
Pattern: Fixed Window Sliding Window

Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

Example 1:
  Input: nums = [1,2,3,1], k = 3
  Output: true
  Explanation: nums[0] and nums[3] are equal and 3-0 = 3 <= 3.

Example 2:
  Input: nums = [1,0,1,1], k = 1
  Output: true
  Explanation: nums[2] and nums[3] are equal and 3-2 = 1 <= 1.

Example 3:
  Input: nums = [1,2,3,1,2,3], k = 2
  Output: false
  Explanation: No two equal elements are within distance 2.

Example 4:
  Input: nums = [1,2,1], k = 0
  Output: false
  Explanation: Distance must be > 0, but k = 0.

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^9 <= nums[i] <= 10^9
  - 0 <= k <= 10^5

Time Complexity: O(n)
Space Complexity: O(min(n, k))

Pattern Notes:
  - Use a sliding window of size k+1 (to allow distance <= k)
  - Maintain a Set of elements in the current window
  - If we see a duplicate in the current window, return true
  - Slide the window by removing the leftmost element and adding the next element
  - Alternative approach: Use a hash map to store element -> last seen index
*/

export const functionName = 'containsNearbyDuplicate';

export const tests = [
  {
    input: [[1,2,3,1], 3],
    expected: true
  },
  {
    input: [[1,0,1,1], 1],
    expected: true
  },
  {
    input: [[1,2,3,1,2,3], 2],
    expected: false
  },
  {
    input: [[1,2,1], 0],
    expected: false
  },
  {
    input: [[1], 1],
    expected: false
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,9], 3],
    expected: true
  },
  {
    input: [[1,2,3,4,5,1], 5],
    expected: true
  },
  {
    input: [[1,2,3,4,5,1], 4],
    expected: false
  },
  {
    input: [[5,5,5,5,5,5,5,5,5,5], 1],
    expected: true
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1], 20],
    expected: true
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1], 19],
    expected: false
  },
  {
    input: [[0,0], 1],
    expected: true
  }
];

/**
 * Checks if array contains duplicate within k distance
 * @param {number[]} nums - Array of integers
 * @param {number} k - Maximum allowed distance
 * @return {boolean} True if duplicate exists within distance k
 */
function containsNearbyDuplicate(nums, k) {
    if (k === 0) return false;

    const window = new Set();

    for (let i = 0; i < nums.length; i++) {
        // If current element is already in window, we found a duplicate within distance k
        if (window.has(nums[i])) {
            return true;
        }

        // Add current element to window
        window.add(nums[i]);

        // If window size exceeds k, remove the leftmost element
        if (window.size > k) {
            window.delete(nums[i - k]);
        }
    }

    return false;
}

export default containsNearbyDuplicate;