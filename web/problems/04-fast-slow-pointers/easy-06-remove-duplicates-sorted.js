/*
Problem: Remove Duplicates from Sorted List
Difficulty: Easy
Category: Linked List, Fast & Slow Pointers
LeetCode: #83
Pattern: Fast & Slow Pointers (Skip Duplicates)

Given the head of a sorted linked list, delete all duplicates such that each
element appears only once. Return the linked list sorted as well.

Example 1:
  Input: head = [1,1,2]
  Output: [1,2]

Example 2:
  Input: head = [1,1,2,3,3]
  Output: [1,2,3]

Example 3:
  Input: head = [1,2,3]
  Output: [1,2,3]

Example 4:
  Input: head = []
  Output: []

Constraints:
  - The number of nodes in the list is in the range [0, 300]
  - -100 <= Node.val <= 100
  - The list is guaranteed to be sorted in ascending order

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use single pointer to traverse and skip duplicates
  - When current.val === current.next.val, skip current.next
  - Continue until no more duplicates found
  - This is simpler than true fast/slow but demonstrates the pattern
  - Can also be solved with fast/slow where slow tracks unique positions

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Traverse the list with a single pointer
  2. When current value equals next value, skip the next node
  3. Continue until current.next is null or different value found
  4. No need for dummy node as we never remove the head
  5. Handle edge cases: empty list, single node, all same values
*/

export const functionName = 'deleteDuplicates';

export const tests = [
  {
    input: [[1, 1, 2]],
    expected: [1, 2]
  },
  {
    input: [[1, 1, 2, 3, 3]],
    expected: [1, 2, 3]
  },
  {
    input: [[1, 2, 3]],
    expected: [1, 2, 3]
  },
  {
    input: [[]],
    expected: []
  },
  {
    input: [[1]],
    expected: [1]
  },
  {
    input: [[1, 1, 1]],
    expected: [1]
  },
  {
    input: [[1, 2, 2, 3, 3, 4]],
    expected: [1, 2, 3, 4]
  },
  {
    input: [[-3, -1, 0, 0, 0, 3, 3]],
    expected: [-3, -1, 0, 3]
  },
  {
    input: [[5, 5, 5, 5, 5]],
    expected: [5]
  },
  {
    input: [[1, 1, 2, 2, 3, 3, 4, 4, 5, 5]],
    expected: [1, 2, 3, 4, 5]
  },
  {
    input: [[-100, -100, 0, 100, 100]],
    expected: [-100, 0, 100]
  },
  {
    input: [[1, 2]],
    expected: [1, 2]
  }
];