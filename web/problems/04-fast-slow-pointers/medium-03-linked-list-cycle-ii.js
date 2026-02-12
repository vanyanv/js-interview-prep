/*
Problem: Linked List Cycle II
Difficulty: Medium
Category: Linked List, Fast & Slow Pointers
LeetCode: #142
Pattern: Fast & Slow Pointers (Cycle Detection + Finding Start)

Given the head of a linked list, return the node where the cycle begins.
If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be
reached again by continuously following the next pointer. Internally, pos is
used to denote the index of the node that tail's next pointer is connected to
(0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.

Do not modify the linked list.

Example 1:
  Input: head = [3,2,0,-4], pos = 1
  Output: node with value 2
  Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:
  Input: head = [1,2], pos = 0
  Output: node with value 1
  Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:
  Input: head = [1], pos = -1
  Output: null
  Explanation: There is no cycle in the linked list.

Constraints:
  - The number of the nodes in the list is in the range [0, 5000]
  - -10^5 <= Node.val <= 10^5
  - pos is -1 or a valid index in the linked-list

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Phase 1: Use Floyd's algorithm to detect cycle (same as problem #141)
  - Phase 2: Once cycle detected, reset one pointer to head
  - Move both pointers one step at a time until they meet
  - Meeting point is the start of the cycle
  - Mathematical proof: distance from head to cycle start = distance from meeting point to cycle start

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. First detect if cycle exists using fast/slow pointers
  2. If cycle found, reset slow pointer to head
  3. Move both pointers one step at a time until they meet
  4. The meeting point is the cycle start
  5. This works due to the mathematical relationship in Floyd's algorithm
*/

export const functionName = 'detectCycle';

export const tests = [
  {
    input: [[3, 2, 0, -4], 1], // [values, pos] - expect node with value 2
    expected: 2 // value of the node where cycle begins
  },
  {
    input: [[1, 2], 0],
    expected: 1 // value of the node where cycle begins
  },
  {
    input: [[1], -1], // pos = -1 means no cycle
    expected: null
  },
  {
    input: [[], -1], // empty list
    expected: null
  },
  {
    input: [[1, 2, 3, 4, 5], -1], // no cycle
    expected: null
  },
  {
    input: [[1, 2, 3, 4, 5], 2], // cycle at position 2
    expected: 3 // value of the node where cycle begins
  },
  {
    input: [[5], 0], // single node pointing to itself
    expected: 5 // value of the node where cycle begins
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 0], // cycle back to head
    expected: 1 // value of the node where cycle begins
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 3], // cycle begins at index 3 (value 4)
    expected: 4
  },
  {
    input: [[10, 20, 30, 40], 1], // cycle begins at index 1 (value 20)
    expected: 20
  },
  {
    input: [[1, 2, 3], -1], // no cycle in 3-element list
    expected: null
  },
  {
    input: [[7, 8, 9, 10], 0], // cycle back to head in 4-element list
    expected: 7
  }
];