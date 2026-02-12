/*
Problem: Find All Duplicates in an Array
Difficulty: Medium
Category: Arrays, Hash Set
LeetCode: #442
Pattern: Set Tracking for Duplicates

Given an integer array nums of length n where all the integers of nums
are in the range [1, n] and each integer appears once or twice, return
an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

Example 1:
  Input: nums = [4,3,2,7,8,2,3,1]
  Output: [2,3]

Example 2:
  Input: nums = [1,1,2]
  Output: [1]

Example 3:
  Input: nums = [1]
  Output: []

Example 4:
  Input: nums = [1,2,3,4,5,6,7,8,2,3]
  Output: [2,3]

Constraints:
  - n == nums.length
  - 1 <= n <= 10^5
  - 1 <= nums[i] <= n
  - Each element in nums appears once or twice.

Time Complexity: O(n)
Space Complexity: O(n) for Set solution, O(1) for in-place solution

Hash Set Pattern Notes:
  - Use Set to track seen numbers
  - When number already in Set, add to duplicates
  - Alternative: use array indices as markers (negative marking)
  - Alternative: use nums[abs(num) - 1] *= -1 for in-place O(1) space
  - Set approach is more intuitive and readable
*/

export const functionName = 'findDuplicates';

export const tests = [
  {
    input: [[4, 3, 2, 7, 8, 2, 3, 1]],
    expected: [2, 3]
  },
  {
    input: [[1, 1, 2]],
    expected: [1]
  },
  {
    input: [[1]],
    expected: []
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 2, 3]],
    expected: [2, 3]
  },
  {
    input: [[2, 2]],
    expected: [2]
  },
  {
    input: [[1, 2, 3, 4]],
    expected: []
  },
  {
    input: [[5, 4, 6, 7, 9, 3, 10, 9, 5, 6]],
    expected: [5, 6, 9]
  },
  {
    input: [[10, 2, 5, 10, 9, 1, 1, 4, 3, 7]],
    expected: [1, 10]
  },
  // All elements are duplicates (every number appears twice)
  {
    input: [[1, 2, 3, 4, 1, 2, 3, 4]],
    expected: [1, 2, 3, 4]
  },
  // No duplicates at all
  {
    input: [[3, 1, 4, 2, 5]],
    expected: []
  },
  // Two elements, no duplicate
  {
    input: [[1, 2]],
    expected: []
  },
  // Larger input with duplicates scattered throughout
  {
    input: [[7, 3, 1, 5, 9, 2, 8, 6, 4, 10, 3, 7, 10, 9]],
    expected: [3, 7, 9, 10]
  }
];