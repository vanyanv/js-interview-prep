/*
Problem: Search in Rotated Sorted Array
Difficulty: Medium
Category: Binary Search, Array
LeetCode: #33
Pattern: Binary Search in Rotated Array

There is an integer array nums sorted in ascending order (with distinct values).
Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k
(1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).

For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
  Input: nums = [4,5,6,7,0,1,2], target = 0
  Output: 4
  Explanation: 0 is found at index 4

Example 2:
  Input: nums = [4,5,6,7,0,1,2], target = 3
  Output: -1
  Explanation: 3 is not in the array

Example 3:
  Input: nums = [1], target = 0
  Output: -1
  Explanation: Single element array, target not found

Example 4:
  Input: nums = [1], target = 1
  Output: 0
  Explanation: Single element array, target found

Example 5:
  Input: nums = [4,5,6,7,8,1,2,3], target = 8
  Output: 4
  Explanation: 8 is found at index 4

Constraints:
  - 1 <= nums.length <= 5000
  - -10^4 <= nums[i] <= 10^4
  - All values of nums are unique
  - nums is an ascending array that is possibly rotated
  - -10^4 <= target <= 10^4

Time Complexity: O(log n) where n is the length of nums
Space Complexity: O(1)

Pattern Notes:
  - One half of the array is always sorted in a rotated sorted array
  - Use nums[left] <= nums[mid] to determine if left half is sorted
  - If left half is sorted, check if target is in left half range
  - If target is in sorted half range, search that half; otherwise search other half
  - Handle edge cases: single element, no rotation, target at boundaries
  - Key insight: at least one half will always be properly sorted
*/

export const functionName = 'search';

export const tests = [
  {
    input: [[4,5,6,7,0,1,2], 0],
    expected: 4
  },
  {
    input: [[4,5,6,7,0,1,2], 3],
    expected: -1
  },
  {
    input: [[1], 0],
    expected: -1
  },
  {
    input: [[1], 1],
    expected: 0
  },
  {
    input: [[4,5,6,7,8,1,2,3], 8],
    expected: 4
  },
  {
    input: [[1,2,3,4,5,6], 4],
    expected: 3
  },
  {
    input: [[3,1], 1],
    expected: 1
  },
  {
    input: [[5,1,3], 3],
    expected: 2
  }
];

/**
 * Search for target in rotated sorted array
 * @param {number[]} nums - Rotated sorted array with distinct values
 * @param {number} target - Target value to search for
 * @return {number} Index of target if found, -1 otherwise
 */
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (nums[left] <= target && target < nums[mid]) {
                // Target is in the sorted left half
                right = mid - 1;
            } else {
                // Target is in the right half
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                // Target is in the sorted right half
                left = mid + 1;
            } else {
                // Target is in the left half
                right = mid - 1;
            }
        }
    }

    return -1;
}

export default search;