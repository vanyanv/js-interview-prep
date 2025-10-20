/*
Problem: Find Minimum in Rotated Sorted Array
Difficulty: Medium
Category: Binary Search, Array
LeetCode: #153
Pattern: Binary Search for Minimum in Rotated Array

Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
For example, the array nums = [0,1,2,4,5,6,7] might become:
- [4,5,6,7,0,1,2] if it was rotated 4 times
- [0,1,2,4,5,6,7] if it was rotated 7 times

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

Example 1:
  Input: nums = [3,4,5,1,2]
  Output: 1
  Explanation: The original array was [1,2,3,4,5] rotated 3 times

Example 2:
  Input: nums = [4,5,6,7,0,1,2]
  Output: 0
  Explanation: The original array was [0,1,2,4,5,6,7] rotated 4 times

Example 3:
  Input: nums = [11,13,15,17]
  Output: 11
  Explanation: The original array was [11,13,15,17] and it was rotated 4 times (no change)

Example 4:
  Input: nums = [2,1]
  Output: 1
  Explanation: Two element array rotated once

Example 5:
  Input: nums = [1]
  Output: 1
  Explanation: Single element array

Constraints:
  - n == nums.length
  - 1 <= n <= 5000
  - -5000 <= nums[i] <= 5000
  - All the integers of nums are unique
  - nums is sorted and rotated between 1 and n times

Time Complexity: O(log n) where n is the length of nums
Space Complexity: O(1)

Pattern Notes:
  - Compare nums[mid] with nums[right] to determine which half contains the minimum
  - If nums[mid] < nums[right], minimum is in left half (including mid)
  - If nums[mid] > nums[right], minimum is in right half (excluding mid)
  - Use while (left < right) to converge to the minimum
  - The minimum element is where the rotation happened
  - Final left pointer will point to the minimum element
*/

export const functionName = 'findMin';

export const tests = [
  {
    input: [[3,4,5,1,2]],
    expected: 1
  },
  {
    input: [[4,5,6,7,0,1,2]],
    expected: 0
  },
  {
    input: [[11,13,15,17]],
    expected: 11
  },
  {
    input: [[2,1]],
    expected: 1
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[1,2]],
    expected: 1
  },
  {
    input: [[5,1,2,3,4]],
    expected: 1
  },
  {
    input: [[2,3,4,5,1]],
    expected: 1
  }
];

/**
 * Find minimum element in rotated sorted array
 * @param {number[]} nums - Rotated sorted array with unique elements
 * @return {number} Minimum element in the array
 */
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] < nums[right]) {
            // Right half is sorted, minimum is in left half (including mid)
            right = mid;
        } else {
            // Left half is sorted, minimum is in right half (excluding mid)
            left = mid + 1;
        }
    }

    return nums[left];
}

export default findMin;