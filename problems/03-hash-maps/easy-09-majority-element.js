/*
Problem: Majority Element
Difficulty: Easy
Category: Arrays, Hash Map, Divide and Conquer
LeetCode: #169
Pattern: Frequency Counting

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times.
You may assume that the majority element always exists in the array.

Example 1:
  Input: nums = [3,2,3]
  Output: 3

Example 2:
  Input: nums = [2,2,1,1,1,2,2]
  Output: 2

Example 3:
  Input: nums = [1]
  Output: 1

Example 4:
  Input: nums = [6,5,5]
  Output: 5

Constraints:
  - n == nums.length
  - 1 <= n <= 5 * 10^4
  - -10^9 <= nums[i] <= 10^9

Time Complexity: O(n)
Space Complexity: O(n) for Map solution, O(1) for Boyer-Moore

Hash Map Pattern Notes:
  - Count frequency of each element
  - Return element with count > n/2
  - Since majority always exists, first element with count > n/2 is answer
  - Alternative: Boyer-Moore voting algorithm (O(1) space)
  - Alternative: Sort array and return middle element
*/

export const functionName = 'majorityElement';

export const tests = [
  {
    input: [[3, 2, 3]],
    expected: 3
  },
  {
    input: [[2, 2, 1, 1, 1, 2, 2]],
    expected: 2
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[6, 5, 5]],
    expected: 5
  },
  {
    input: [[1, 1, 1, 2, 2]],
    expected: 1
  },
  {
    input: [[4, 4, 4, 4, 3, 3, 3]],
    expected: 4
  },
  {
    input: [[-1, -1, 2, 2, -1]],
    expected: -1
  },
  {
    input: [[8, 8, 7, 7, 7]],
    expected: 7
  },
  // All-same-values
  {
    input: [[5, 5, 5, 5, 5]],
    expected: 5
  },
  // Majority element interleaved with others
  {
    input: [[1, 2, 1, 2, 1, 2, 1]],
    expected: 1
  },
  // Larger array with clear majority
  {
    input: [[3, 3, 3, 3, 3, 1, 2, 4, 5]],
    expected: 3
  },
  // Two elements, majority at front
  {
    input: [[9, 9, 8]],
    expected: 9
  }
];