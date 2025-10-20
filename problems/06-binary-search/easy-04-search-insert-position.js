/*
Problem: Search Insert Position
Difficulty: Easy
Category: Binary Search, Array
LeetCode: #35
Pattern: Binary Search for Insert Position

Given a sorted array of distinct integers and a target value, return the index if the
target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
  Input: nums = [1,3,5,6], target = 5
  Output: 2
  Explanation: 5 is found at index 2

Example 2:
  Input: nums = [1,3,5,6], target = 2
  Output: 1
  Explanation: 2 should be inserted at index 1

Example 3:
  Input: nums = [1,3,5,6], target = 7
  Output: 4
  Explanation: 7 should be inserted at index 4 (end of array)

Example 4:
  Input: nums = [1,3,5,6], target = 0
  Output: 0
  Explanation: 0 should be inserted at index 0 (beginning of array)

Example 5:
  Input: nums = [1], target = 1
  Output: 0
  Explanation: Single element array, target found at index 0

Constraints:
  - 1 <= nums.length <= 10^4
  - -10^4 <= nums[i] <= 10^4
  - nums contains distinct values sorted in ascending order
  - -10^4 <= target <= 10^4

Time Complexity: O(log n) where n is the length of nums
Space Complexity: O(1)

Pattern Notes:
  - Modified binary search that finds insertion position
  - Use while (left < right) instead of (left <= right)
  - When nums[mid] < target, left = mid + 1
  - When nums[mid] >= target, right = mid (not mid - 1)
  - The final left pointer gives the insertion position
  - This works for both found and not found cases
*/

export const functionName = 'searchInsert';

export const tests = [
  {
    input: [[1,3,5,6], 5],
    expected: 2
  },
  {
    input: [[1,3,5,6], 2],
    expected: 1
  },
  {
    input: [[1,3,5,6], 7],
    expected: 4
  },
  {
    input: [[1,3,5,6], 0],
    expected: 0
  },
  {
    input: [[1], 1],
    expected: 0
  },
  {
    input: [[1], 0],
    expected: 0
  },
  {
    input: [[1], 2],
    expected: 1
  },
  {
    input: [[1,2,3,4,5], 3],
    expected: 2
  }
];

/**
 * Find the index where target should be inserted in sorted array
 * @param {number[]} nums - Sorted array of distinct integers
 * @param {number} target - Target value to search/insert
 * @return {number} Index where target is found or should be inserted
 */
function searchInsert(nums, target) {
    let left = 0;
    let right = nums.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}

export default searchInsert;