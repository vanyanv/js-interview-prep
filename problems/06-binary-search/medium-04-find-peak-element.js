/*
Problem: Find Peak Element
Difficulty: Medium
Category: Binary Search, Array
LeetCode: #162
Pattern: Binary Search for Peak

A peak element is an element that is strictly greater than its neighbors.
Given a 0-indexed integer array nums, find a peak element, and return its index.
If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always
considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in O(log n) time.

Example 1:
  Input: nums = [1,2,3,1]
  Output: 2
  Explanation: 3 is a peak element and your function should return the index number 2

Example 2:
  Input: nums = [1,2,1,3,5,6,4]
  Output: 5
  Explanation: Your function can return either index number 1 where the peak element is 2,
               or index number 5 where the peak element is 6

Example 3:
  Input: nums = [1]
  Output: 0
  Explanation: Single element is always a peak

Example 4:
  Input: nums = [1,2]
  Output: 1
  Explanation: 2 is greater than 1

Example 5:
  Input: nums = [2,1]
  Output: 0
  Explanation: 2 is greater than 1

Constraints:
  - 1 <= nums.length <= 1000
  - -2^31 <= nums[i] <= 2^31 - 1
  - nums[i] != nums[i + 1] for all valid i

Time Complexity: O(log n) where n is the length of nums
Space Complexity: O(1)

Pattern Notes:
  - Binary search based on the slope/direction of the array
  - If nums[mid] < nums[mid + 1], peak must be to the right (upward slope)
  - If nums[mid] > nums[mid + 1], peak must be to the left (downward slope)
  - Use while (left < right) to find any peak
  - Check mid vs mid+1 to determine search direction
  - Always guaranteed to find a peak due to boundary conditions
*/

export const functionName = 'findPeakElement';

export const tests = [
  {
    input: [[1,2,3,1]],
    expected: 2
  },
  {
    input: [[1,2,1,3,5,6,4]],
    expected: 5 // Could also be 1
  },
  {
    input: [[1]],
    expected: 0
  },
  {
    input: [[1,2]],
    expected: 1
  },
  {
    input: [[2,1]],
    expected: 0
  },
  {
    input: [[1,3,2,1]],
    expected: 1
  },
  {
    input: [[1,2,3,4,5]],
    expected: 4
  },
  {
    input: [[5,4,3,2,1]],
    expected: 0
  },
  {
    input: [[1,6,5,4,3,2,1]],
    expected: 1
  },
  {
    input: [[1,2,3,4,3]],
    expected: 3
  },
  {
    input: [[10,20]],
    expected: 1
  },
  {
    input: [[20,10]],
    expected: 0
  }
];

/**
 * Find a peak element in the array
 * @param {number[]} nums - Array of integers
 * @return {number} Index of any peak element
 */
function findPeakElement(nums) {
    if (nums.length === 1) return 0;

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] < nums[mid + 1]) {
            // We're on an upward slope, peak is to the right
            left = mid + 1;
        } else {
            // We're on a downward slope, peak is to the left (including mid)
            right = mid;
        }
    }

    return left;
}

export default findPeakElement;