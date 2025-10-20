/*
Problem: Contains Duplicate
Difficulty: Easy
Category: Arrays, Hash Set
LeetCode: #217
Pattern: Hash Set Membership

Given an integer array nums, return true if any value appears at least
twice in the array, and return false if every element is distinct.

Example 1:
  Input: nums = [1,2,3,1]
  Output: true

Example 2:
  Input: nums = [1,2,3,4]
  Output: false

Example 3:
  Input: nums = [1,1,1,3,3,4,3,2,4,2]
  Output: true

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^9 <= nums[i] <= 10^9

Time Complexity: O(n)
Space Complexity: O(n)

Hash Set Pattern Notes:
  - Use Set to track seen elements
  - Check if element exists before adding
  - Return true immediately when duplicate found
  - Set.has() is O(1) average case
  - Alternative: new Set(nums).size !== nums.length
*/

export const functionName = 'containsDuplicate';

export const tests = [
  {
    input: [[1, 2, 3, 1]],
    expected: true
  },
  {
    input: [[1, 2, 3, 4]],
    expected: false
  },
  {
    input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]],
    expected: true
  },
  {
    input: [[1]],
    expected: false
  },
  {
    input: [[0, 0]],
    expected: true
  },
  {
    input: [[-1, -2, -3]],
    expected: false
  },
  {
    input: [[2147483647, -2147483648, 2147483647]],
    expected: true
  },
  {
    input: [[]],
    expected: false
  }
];