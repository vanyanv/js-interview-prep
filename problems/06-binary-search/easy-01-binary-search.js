/*
Problem: Binary Search
Difficulty: Easy
Category: Binary Search, Array
LeetCode: #704
Pattern: Basic Binary Search

Given an array of integers nums which is sorted in ascending order, and an integer target,
write a function to search target in nums. If target exists, then return its index.
Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
  Input: nums = [-1,0,3,5,9,12], target = 9
  Output: 4
  Explanation: 9 exists in nums and its index is 4

Example 2:
  Input: nums = [-1,0,3,5,9,12], target = 2
  Output: -1
  Explanation: 2 does not exist in nums so return -1

Example 3:
  Input: nums = [5], target = 5
  Output: 0
  Explanation: Single element array, target found at index 0

Example 4:
  Input: nums = [1], target = 2
  Output: -1
  Explanation: Single element array, target not found

Constraints:
  - 1 <= nums.length <= 10^4
  - -10^4 < nums[i], target < 10^4
  - All the integers in nums are unique
  - nums is sorted in ascending order

Time Complexity: O(log n) where n is the length of nums
Space Complexity: O(1)

Pattern Notes:
  - Classic binary search template: left = 0, right = nums.length - 1
  - Use while (left <= right) condition
  - Calculate mid = Math.floor((left + right) / 2) to avoid integer overflow
  - Update left = mid + 1 when nums[mid] < target
  - Update right = mid - 1 when nums[mid] > target
  - Return mid when nums[mid] === target
  - Return -1 if target not found
*/

export const functionName = 'search';

export const tests = [
  {
    input: [[-1,0,3,5,9,12], 9],
    expected: 4
  },
  {
    input: [[-1,0,3,5,9,12], 2],
    expected: -1
  },
  {
    input: [[5], 5],
    expected: 0
  },
  {
    input: [[1], 2],
    expected: -1
  },
  {
    input: [[-1,0,3,5,9,12], -1],
    expected: 0
  },
  {
    input: [[-1,0,3,5,9,12], 12],
    expected: 5
  },
  {
    input: [[1,2,3,4,5,6,7,8,9,10], 5],
    expected: 4
  },
  {
    input: [[1,3,5,7,9], 4],
    expected: -1
  }
];

/**
 * Binary search to find target in sorted array
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Target value to search for
 * @return {number} Index of target if found, -1 otherwise
 */
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        // Use Math.floor to avoid potential integer overflow
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

export default search;