/*
Problem: Reorder List
Difficulty: Medium
Category: Linked List, Fast & Slow Pointers
LeetCode: #143
Pattern: Fast & Slow Pointers (Find Middle + Reverse + Merge)

You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → … → Ln - 1 → Ln

Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

Example 1:
  Input: head = [1,2,3,4]
  Output: [1,4,2,3]

Example 2:
  Input: head = [1,2,3,4,5]
  Output: [1,5,2,4,3]

Example 3:
  Input: head = [1]
  Output: [1]

Example 4:
  Input: head = [1,2]
  Output: [1,2]

Constraints:
  - The number of nodes in the list is in the range [1, 5 * 10^4]
  - 1 <= Node.val <= 1000

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Step 1: Find middle using fast/slow pointers
  - Step 2: Split list into two halves
  - Step 3: Reverse the second half
  - Step 4: Merge alternating nodes from both halves
  - Combines multiple patterns: middle finding, reversal, merging
  - Must be done in-place without extra space

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Use fast/slow pointers to find the middle of the list
  2. Split the list into two parts at the middle
  3. Reverse the second half of the list
  4. Merge the two lists by alternating nodes
  5. Handle odd/even length lists carefully
*/

export const functionName = 'reorderList';

export const tests = [
  {
    input: [[1, 2, 3, 4]],
    expected: [1, 4, 2, 3]
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expected: [1, 5, 2, 4, 3]
  },
  {
    input: [[1]],
    expected: [1]
  },
  {
    input: [[1, 2]],
    expected: [1, 2]
  },
  {
    input: [[1, 2, 3]],
    expected: [1, 3, 2]
  },
  {
    input: [[1, 2, 3, 4, 5, 6]],
    expected: [1, 6, 2, 5, 3, 4]
  },
  {
    input: [[5, 4, 3, 2, 1]],
    expected: [5, 1, 4, 2, 3]
  },
  {
    input: [[10, 20, 30, 40, 50, 60, 70]],
    expected: [10, 70, 20, 60, 30, 50, 40]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8]],
    expected: [1, 8, 2, 7, 3, 6, 4, 5]
  },
  {
    input: [[1, 2, 3]],
    expected: [1, 3, 2]
  },
  {
    input: [[100, 200, 300, 400]],
    expected: [100, 400, 200, 300]
  }
];