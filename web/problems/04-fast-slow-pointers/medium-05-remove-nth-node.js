/*
Problem: Remove Nth Node From End of List
Difficulty: Medium
Category: Linked List, Fast & Slow Pointers
LeetCode: #19
Pattern: Fast & Slow Pointers (Two-Pass with Gap)

Given the head of a linked list, remove the nth node from the end of the list
and return its head.

Example 1:
  Input: head = [1,2,3,4,5], n = 2
  Output: [1,2,3,5]
  Explanation: Remove the 2nd node from end (node with value 4).

Example 2:
  Input: head = [1], n = 1
  Output: []
  Explanation: Remove the only node.

Example 3:
  Input: head = [1,2], n = 1
  Output: [1]
  Explanation: Remove the last node.

Example 4:
  Input: head = [1,2], n = 2
  Output: [2]
  Explanation: Remove the first node.

Constraints:
  - The number of nodes in the list is sz
  - 1 <= sz <= 30
  - 0 <= Node.val <= 100
  - 1 <= n <= sz

Follow up: Could you do this in one pass?

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use two pointers with a gap of n+1 nodes
  - Move fast pointer n+1 steps ahead first
  - Then move both pointers until fast reaches end
  - Slow pointer will be at the node before the one to remove
  - Use dummy node to handle edge case of removing head
  - This solves it in one pass instead of two

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Create a dummy node pointing to head to handle edge cases
  2. Use two pointers: fast and slow, both starting at dummy
  3. Move fast pointer n+1 steps ahead
  4. Move both pointers until fast reaches null
  5. Remove the node after slow pointer
*/

export const functionName = 'removeNthFromEnd';

export const tests = [
  {
    input: [[1, 2, 3, 4, 5], 2],
    expected: [1, 2, 3, 5]
  },
  {
    input: [[1], 1],
    expected: []
  },
  {
    input: [[1, 2], 1],
    expected: [1]
  },
  {
    input: [[1, 2], 2],
    expected: [2]
  },
  {
    input: [[1, 2, 3, 4, 5], 1],
    expected: [1, 2, 3, 4]
  },
  {
    input: [[1, 2, 3, 4, 5], 5],
    expected: [2, 3, 4, 5]
  },
  {
    input: [[1, 2, 3], 2],
    expected: [1, 3]
  },
  {
    input: [[10, 20, 30, 40], 3],
    expected: [10, 30, 40]
  },
  {
    input: [[1, 2, 3, 4, 5], 3],
    expected: [1, 2, 4, 5]
  },
  {
    input: [[1, 2, 3], 1],
    expected: [1, 2]
  },
  {
    input: [[1, 2, 3], 3],
    expected: [2, 3]
  },
  {
    input: [[5, 10, 15, 20, 25], 4],
    expected: [5, 15, 20, 25]
  }
];