/*
Problem: Circular Array Loop
Difficulty: Medium
Category: Array, Fast & Slow Pointers
LeetCode: #457
Pattern: Fast & Slow Pointers (Cycle Detection with Direction)

You are playing a game involving a circular array of non-zero integers nums.
Each nums[i] denotes the number of indices forward/backward you must move if
you are located at index i:

- If nums[i] is positive, move nums[i] steps forward, and
- If nums[i] is negative, move nums[i] steps backward.

Since the array is circular, you may assume that moving forward from the last
element puts you on the first element, and moving backward from the first
element puts you on the last element.

A cycle in the array consists of a sequence of indices seq of length k where:
- Following the movement rules above results in the same sequence seq.
- Every nums[seq[j]] is either all positive or all negative.
- k > 1

Return true if there is a cycle in nums, or false otherwise.

Example 1:
  Input: nums = [2,-1,1,2,2]
  Output: true
  Explanation: The indices 0 -> 2 -> 3 -> 0 form a cycle.

Example 2:
  Input: nums = [-1,-2,-3,-4,-5,-6]
  Output: false
  Explanation: The indices 1 -> 0 -> 5 -> 4 -> 3 -> 2 -> 1, so there is a cycle.
  However, the cycle consists of indices with both positive and negative values.

Example 3:
  Input: nums = [1,-1,5,1,4]
  Output: true
  Explanation: The indices 0 -> 1 -> 0 form a cycle of length 2.

Constraints:
  - 1 <= nums.length <= 5000
  - -1000 <= nums[i] <= 1000
  - nums[i] != 0

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use fast/slow pointers for each starting position
  - Check direction consistency (all positive or all negative)
  - Avoid self-loops (length 1 cycles)
  - Mark visited nodes to avoid rechecking
  - Multiple cycle detection attempts from different starting points

Hints:
  1. For each unvisited index, start cycle detection
  2. Use fast/slow pointers moving according to array values
  3. Check that all moves maintain same direction (sign)
  4. Avoid single-element cycles
  5. Mark visited indices to optimize
*/

export const functionName = 'circularArrayLoop';

export const tests = [
  {
    input: [[2, -1, 1, 2, 2]],
    expected: true
  },
  {
    input: [[-1, -2, -3, -4, -5, -6]],
    expected: false
  },
  {
    input: [[1, -1, 5, 1, 4]],
    expected: true
  },
  {
    input: [[-2, 1, -1, -2, -2]],
    expected: false
  },
  {
    input: [[2, -1, 1, -2, -2]],
    expected: false
  },
  {
    input: [[1, 1, 1, 1, 1]],
    expected: true
  },
  {
    input: [[-1, -1, -1]],
    expected: true
  },
  {
    input: [[3, 1, 2]],
    expected: true
  },
  {
    input: [[2, 2, 2, 2]],
    expected: true
  },
  {
    input: [[1]],
    expected: false
  },
  {
    input: [[-1, -1, -1, -1, -1]],
    expected: true
  },
  {
    input: [[1, -1]],
    expected: false
  }
];