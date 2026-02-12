/*
Problem: Two Sum II - Input Array Is Sorted
Difficulty: Medium
Category: Arrays, Two Pointers
LeetCode: #167
Pattern: Two Pointers (Opposite Direction)

Given a 1-indexed array of integers numbers that is already sorted in
non-decreasing order, find two numbers such that they add up to a specific
target number.

Return the indices of the two numbers, index1 and index2, added by one.

You may not use the same element twice and there is exactly one solution.

Example 1:
  Input: numbers = [2,7,11,15], target = 9
  Output: [1,2]
  Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.

Example 2:
  Input: numbers = [2,3,4], target = 6
  Output: [1,3]

Example 3:
  Input: numbers = [-1,0], target = -1
  Output: [1,2]

Constraints:
  - 2 <= numbers.length <= 3 * 10^4
  - -1000 <= numbers[i] <= 1000
  - numbers is sorted in non-decreasing order.
  - -1000 <= target <= 1000
  - Exactly one solution exists.

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use sorted property: if sum > target, move right pointer left
  - If sum < target, move left pointer right
  - If sum == target, found the answer
  - Much more efficient than hash map for sorted arrays
*/

export const functionName = 'twoSum';

export const tests = [
  {
    input: [[2, 7, 11, 15], 9],
    expected: [1, 2]
  },
  {
    input: [[2, 3, 4], 6],
    expected: [1, 3]
  },
  {
    input: [[-1, 0], -1],
    expected: [1, 2]
  },
  {
    input: [[1, 2, 3, 4, 4, 9, 56, 90], 8],
    expected: [4, 5]
  },
  {
    input: [[5, 25, 75], 100],
    expected: [2, 3]
  },
  // Two elements — minimum length input
  {
    input: [[1, 3], 4],
    expected: [1, 2]
  },
  // Negative numbers in sorted order
  {
    input: [[-10, -5, -3, 0, 2, 7, 15], -8],
    expected: [2, 3]
  },
  // All same values — pair at adjacent positions
  {
    input: [[3, 3, 3, 3], 6],
    expected: [1, 2]
  },
  // Answer at the extreme ends of the array
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11],
    expected: [1, 10]
  },
  // Larger input — answer near the middle
  {
    input: [[1, 2, 4, 5, 6, 8, 9, 11, 14, 17, 20], 13],
    expected: [4, 7]
  }
];