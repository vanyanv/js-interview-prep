/*
Problem: Find the Duplicate Number
Difficulty: Medium
Category: Array, Fast & Slow Pointers
LeetCode: #287
Pattern: Fast & Slow Pointers (Floyd's Algorithm on Array)

Given an array of integers nums containing n + 1 integers where each integer
is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only
constant extra space.

Example 1:
  Input: nums = [1,3,4,2,2]
  Output: 2

Example 2:
  Input: nums = [3,1,3,4,2]
  Output: 3

Example 3:
  Input: nums = [3,3,3,3,3]
  Output: 3

Constraints:
  - 1 <= n <= 10^5
  - nums.length == n + 1
  - 1 <= nums[i] <= n
  - All the integers in nums appear only once except for precisely one integer which appears two or more times.

Follow up:
  - How can we prove that at least one duplicate number must exist in nums?
  - Can you solve the problem in linear runtime complexity?

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Treat array as a linked list where nums[i] points to nums[nums[i]]
  - Use Floyd's cycle detection algorithm
  - Phase 1: Find intersection point in the cycle
  - Phase 2: Find the start of the cycle (the duplicate number)
  - The duplicate creates a cycle because multiple indices point to it
  - This is a brilliant application of cycle detection to arrays

Hints:
  1. Think of array indices as linked list nodes
  2. nums[i] represents the "next" pointer from index i
  3. The duplicate number creates a cycle in this virtual linked list
  4. Use slow/fast pointers to detect the cycle
  5. Use the same technique as "Linked List Cycle II" to find cycle start
*/

export const functionName = 'findDuplicate';

export const tests = [
  {
    input: [[1, 3, 4, 2, 2]],
    expected: 2
  },
  {
    input: [[3, 1, 3, 4, 2]],
    expected: 3
  },
  {
    input: [[3, 3, 3, 3, 3]],
    expected: 3
  },
  {
    input: [[1, 1]],
    expected: 1
  },
  {
    input: [[2, 2, 2, 2, 2]],
    expected: 2
  },
  {
    input: [[1, 4, 4, 2, 4]],
    expected: 4
  },
  {
    input: [[2, 5, 9, 6, 9, 3, 8, 9, 7, 1]],
    expected: 9
  },
  {
    input: [[1, 3, 4, 2, 1]],
    expected: 1
  }
];