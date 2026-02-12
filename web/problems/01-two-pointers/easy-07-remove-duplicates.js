/*
Problem: Remove Duplicates from Sorted Array
Difficulty: Easy
Category: Arrays, Two Pointers
LeetCode: #26
Pattern: Two Pointers (Same Direction - Fast/Slow)

Given an integer array nums sorted in non-decreasing order, remove the
duplicates in-place such that each unique element appears only once.
The relative order of the elements should be kept the same.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by
modifying the input array in-place with O(1) extra memory.

Example 1:
  Input: nums = [1,1,2]
  Output: 2, nums = [1,2,_]
  Explanation: Your function should return k = 2, with the first two elements
  of nums being 1 and 2 respectively.

Example 2:
  Input: nums = [0,0,1,1,1,2,2,3,3,4]
  Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]

Constraints:
  - 1 <= nums.length <= 3 * 10^4
  - -100 <= nums[i] <= 100
  - nums is sorted in non-decreasing order.

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use slow pointer for next unique position
  - Use fast pointer to scan through array
  - When fast finds new unique element, place at slow position
  - Return slow pointer + 1 (count of unique elements)
*/

export const functionName = 'removeDuplicates';

export const tests = [
  {
    input: [[1, 1, 2]],
    expected: 2
  },
  {
    input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]],
    expected: 5
  },
  {
    input: [[1]],
    expected: 1
  },
  {
    input: [[1, 1]],
    expected: 1
  },
  {
    input: [[1, 2, 3]],
    expected: 3
  },
  {
    input: [[-3, -1, 0, 0, 0, 3, 3]],
    expected: 4
  },
  {
    input: [[5, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
    expected: 1
  },
  {
    input: [[-100, -50, 0, 50, 100]],
    expected: 5
  },
  {
    input: [[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]],
    expected: 10
  },
  {
    input: [[0, 0]],
    expected: 1
  }
];