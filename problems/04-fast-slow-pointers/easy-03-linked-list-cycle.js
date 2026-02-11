/*
Problem: Linked List Cycle
Difficulty: Easy
Category: Linked List, Fast & Slow Pointers
LeetCode: #141
Pattern: Fast & Slow Pointers (Cycle Detection - Floyd's Algorithm)

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be
reached again by continuously following the next pointer. Internally, pos is
used to denote the index of the node that tail's next pointer is connected to.
Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:
  Input: head = [3,2,0,-4], pos = 1
  Output: true
  Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:
  Input: head = [1,2], pos = 0
  Output: true
  Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3:
  Input: head = [1], pos = -1
  Output: false
  Explanation: There is no cycle in the linked list.

Constraints:
  - The number of the nodes in the list is in the range [0, 10^4]
  - -10^5 <= Node.val <= 10^5
  - pos is -1 or a valid index in the linked-list

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use Floyd's cycle detection algorithm (tortoise and hare)
  - Slow pointer moves 1 step, fast pointer moves 2 steps
  - If there's a cycle, fast and slow will eventually meet
  - If fast reaches null, there's no cycle
  - This is the fundamental cycle detection pattern

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Initialize two pointers: slow (1 step) and fast (2 steps)
  2. If fast or fast.next becomes null, no cycle exists
  3. If slow === fast at any point, cycle detected
  4. The key insight: in a cycle, fast pointer will lap slow pointer
*/

export const functionName = 'hasCycle';

export const tests = [
  {
    input: [[3, 2, 0, -4], 1], // [values, pos] - pos indicates cycle position
    expected: true
  },
  {
    input: [[1, 2], 0],
    expected: true
  },
  {
    input: [[1], -1], // pos = -1 means no cycle
    expected: false
  },
  {
    input: [[], -1], // empty list
    expected: false
  },
  {
    input: [[1, 2, 3, 4, 5], -1], // no cycle
    expected: false
  },
  {
    input: [[1, 2, 3, 4, 5], 2], // cycle at position 2
    expected: true
  },
  {
    input: [[5], 0], // single node pointing to itself
    expected: true
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 0], // cycle back to head
    expected: true
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 5], // tail points to itself
    expected: true
  },
  {
    input: [[10, 20, 30], -1], // short list no cycle
    expected: false
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8], 3], // cycle in the middle of a longer list
    expected: true
  },
  {
    input: [[1, 2], -1], // two-node list no cycle
    expected: false
  }
];