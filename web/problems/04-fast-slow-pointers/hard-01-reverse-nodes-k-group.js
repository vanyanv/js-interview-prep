/*
Problem: Reverse Nodes in k-Group
Difficulty: Hard
Category: Linked List, Fast & Slow Pointers
LeetCode: #25
Pattern: Fast & Slow Pointers (Group Processing with Reversal)

Given the head of a linked list, reverse the nodes of the list k at a time,
and return the modified list.

k is a positive integer and is less than or equal to the length of the linked
list. If the number of nodes is not a multiple of k then left-out nodes, in
the end, should remain as is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:
  Input: head = [1,2,3,4,5], k = 2
  Output: [2,1,4,3,5]

Example 2:
  Input: head = [1,2,3,4,5], k = 3
  Output: [3,2,1,4,5]

Example 3:
  Input: head = [1], k = 1
  Output: [1]

Example 4:
  Input: head = [1,2,3,4,5], k = 1
  Output: [1,2,3,4,5]

Constraints:
  - The number of nodes in the list is n
  - 1 <= k <= n <= 5000
  - 0 <= Node.val <= 1000

Follow up: Can you solve the problem in O(1) extra memory (i.e., without recursion)?

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use fast pointer to check if k nodes are available
  - Use iterative reversal within each group
  - Connect reversed groups properly
  - Handle incomplete groups (less than k nodes)
  - Track previous group's tail for connection
  - This combines group processing with reversal pattern

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Use dummy node to simplify edge cases
  2. Check if k nodes are available before processing each group
  3. Reverse k nodes iteratively within each group
  4. Keep track of group boundaries for proper connection
  5. Handle the last incomplete group (don't reverse if < k nodes)
*/

export const functionName = 'reverseKGroup';

export const tests = [
  {
    input: [[1, 2, 3, 4, 5], 2],
    expected: [2, 1, 4, 3, 5]
  },
  {
    input: [[1, 2, 3, 4, 5], 3],
    expected: [3, 2, 1, 4, 5]
  },
  {
    input: [[1], 1],
    expected: [1]
  },
  {
    input: [[1, 2, 3, 4, 5], 1],
    expected: [1, 2, 3, 4, 5]
  },
  {
    input: [[1, 2, 3, 4, 5], 5],
    expected: [5, 4, 3, 2, 1]
  },
  {
    input: [[1, 2], 2],
    expected: [2, 1]
  },
  {
    input: [[1, 2, 3], 2],
    expected: [2, 1, 3]
  },
  {
    input: [[1, 2, 3, 4, 5, 6, 7, 8], 3],
    expected: [3, 2, 1, 6, 5, 4, 7, 8]
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 2],
    expected: [2, 1, 4, 3, 6, 5]
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 3],
    expected: [3, 2, 1, 6, 5, 4]
  },
  {
    input: [[1, 2, 3, 4, 5, 6], 6],
    expected: [6, 5, 4, 3, 2, 1]
  },
  {
    input: [[1, 2, 3, 4], 3],
    expected: [3, 2, 1, 4]
  }
];