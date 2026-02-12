/*
Problem: Middle of the Linked List
Difficulty: Easy
Category: Linked List, Fast & Slow Pointers
LeetCode: #876
Pattern: Fast & Slow Pointers (Finding Middle)

Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the second middle node.

Example 1:
  Input: head = [1,2,3,4,5]
  Output: [3,4,5]
  Explanation: The middle node of the list is node 3.

Example 2:
  Input: head = [1,2,3,4,5,6]
  Output: [4,5,6]
  Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

Example 3:
  Input: head = [1]
  Output: [1]
  Explanation: Single node is the middle.

Constraints:
  - The number of nodes in the list is in the range [1, 100]
  - 1 <= Node.val <= 100

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use fast and slow pointers starting from head
  - Slow pointer moves 1 step, fast pointer moves 2 steps
  - When fast pointer reaches end, slow pointer is at middle
  - For even length: returns the second middle node
  - For odd length: returns the exact middle node
  - This avoids counting nodes first

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Initialize slow and fast pointers to head
  2. Move slow 1 step, fast 2 steps each iteration
  3. Continue until fast reaches null or fast.next is null
  4. Slow pointer will be at the middle when loop ends
  5. Handle edge cases: single node, two nodes
*/

export const functionName = 'middleNode';

export const tests = [
  {
    input: [[1, 2, 3, 4, 5]],
    expected: [3, 4, 5] // middle node and rest of list
  },
  {
    input: [[1, 2, 3, 4, 5, 6]],
    expected: [4, 5, 6] // second middle node for even length
  },
  {
    input: [[1]],
    expected: [1] // single node
  },
  {
    input: [[1, 2]],
    expected: [2] // second node for even length
  },
  {
    input: [[1, 2, 3]],
    expected: [2, 3] // middle of odd length
  },
  {
    input: [[5, 4, 3, 2, 1, 0]],
    expected: [2, 1, 0] // second middle for even length
  },
  {
    input: [[10, 20, 30, 40]],
    expected: [30, 40] // second middle for even length
  },
  {
    input: [[7, 14, 21, 28, 35, 42, 49]],
    expected: [28, 35, 42, 49] // middle of odd length
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8]],
    expected: [5, 6, 7, 8] // second middle of 8-element even list
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
    expected: [5, 6, 7, 8, 9] // middle of 9-element odd list
  },
  {
    input: [[100, 200, 300]],
    expected: [200, 300] // middle of 3-element list
  }
];