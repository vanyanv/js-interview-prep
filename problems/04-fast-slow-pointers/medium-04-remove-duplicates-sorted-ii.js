/*
Problem: Remove Duplicates from Sorted List II
Difficulty: Medium
Category: Linked List, Fast & Slow Pointers
LeetCode: #82
Pattern: Fast & Slow Pointers (Skip All Duplicates)

Given the head of a sorted linked list, delete all nodes that have duplicate
numbers, leaving only distinct numbers from the original list. Return the
linked list sorted as well.

Example 1:
  Input: head = [1,2,3,3,4,4,5]
  Output: [1,2,5]

Example 2:
  Input: head = [1,1,1,2,3]
  Output: [2,3]

Example 3:
  Input: head = [1,1,2,2]
  Output: []

Example 4:
  Input: head = [1,2,3]
  Output: [1,2,3]

Constraints:
  - The number of nodes in the list is in the range [0, 300]
  - -100 <= Node.val <= 100
  - The list is guaranteed to be sorted in ascending order

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Use dummy node to handle head removal cases
  - Use slow pointer to track last confirmed unique node
  - Use fast pointer to skip over duplicate sequences
  - When duplicates found, skip ALL nodes with that value
  - Different from #83 where we keep one copy of duplicates

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Use dummy node to simplify edge cases
  2. Use prev pointer to track last confirmed unique node
  3. Use curr pointer to scan for duplicates
  4. When curr.val === curr.next.val, skip entire duplicate sequence
  5. Connect prev to the next unique node
*/

export const functionName = 'deleteDuplicates';

export const tests = [
  {
    input: [[1, 2, 3, 3, 4, 4, 5]],
    expected: [1, 2, 5]
  },
  {
    input: [[1, 1, 1, 2, 3]],
    expected: [2, 3]
  },
  {
    input: [[1, 1, 2, 2]],
    expected: []
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
    input: [[1, 1]],
    expected: []
  },
  {
    input: [[1, 2, 2]],
    expected: [1]
  },
  {
    input: [[1, 1, 1, 1, 1]],
    expected: []
  }
];