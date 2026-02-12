/*
Problem: Rotate List
Difficulty: Medium
Category: Linked List, Fast & Slow Pointers
LeetCode: #61
Pattern: Fast & Slow Pointers (Find Length and Break Point)

Given the head of a linked list, rotate the list to the right by k places.

Example 1:
  Input: head = [1,2,3,4,5], k = 2
  Output: [4,5,1,2,3]

Example 2:
  Input: head = [0,1,2], k = 4
  Output: [2,0,1]

Example 3:
  Input: head = [1], k = 1
  Output: [1]

Example 4:
  Input: head = [1,2], k = 1
  Output: [2,1]

Constraints:
  - The number of nodes in the list is in the range [0, 500]
  - -100 <= Node.val <= 100
  - 0 <= k <= 2 * 10^9

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - First pass: find length and make list circular
  - Calculate effective rotation: k % length
  - Find the new tail (length - k steps from head)
  - Break the circular list at the right position
  - Can also use fast/slow pointers with k gap to find break point
  - Handle edge cases: k = 0, k > length, single node

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Handle edge cases: empty list, single node, k = 0
  2. Find the length of the list and make it circular
  3. Calculate effective rotation steps: k % length
  4. Find the new tail position: length - k steps from head
  5. Break the circular connection to form the rotated list
*/

export const functionName = 'rotateRight';

export const tests = [
  {
    input: [[1, 2, 3, 4, 5], 2],
    expected: [4, 5, 1, 2, 3]
  },
  {
    input: [[0, 1, 2], 4],
    expected: [2, 0, 1]
  },
  {
    input: [[1], 1],
    expected: [1]
  },
  {
    input: [[1, 2], 1],
    expected: [2, 1]
  },
  {
    input: [[], 1],
    expected: []
  },
  {
    input: [[1, 2, 3], 3],
    expected: [1, 2, 3]
  },
  {
    input: [[1, 2, 3, 4, 5], 0],
    expected: [1, 2, 3, 4, 5]
  },
  {
    input: [[1, 2, 3, 4, 5], 7],
    expected: [4, 5, 1, 2, 3]
  },
  {
    input: [[1, 2, 3, 4], 1],
    expected: [4, 1, 2, 3]
  },
  {
    input: [[1, 2, 3, 4], 4],
    expected: [1, 2, 3, 4]
  },
  {
    input: [[1, 2], 3],
    expected: [2, 1]
  },
  {
    input: [[10, 20, 30, 40, 50], 12],
    expected: [40, 50, 10, 20, 30]
  }
];