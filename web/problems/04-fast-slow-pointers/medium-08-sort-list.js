/*
Problem: Sort List
Difficulty: Medium
Category: Linked List, Fast & Slow Pointers, Divide and Conquer
LeetCode: #148
Pattern: Fast & Slow Pointers (Find Middle for Merge Sort)

Given the head of a linked list, return the list after sorting it in ascending order.

Example 1:
  Input: head = [4,2,1,3]
  Output: [1,2,3,4]

Example 2:
  Input: head = [-1,5,3,4,0]
  Output: [-1,0,3,4,5]

Example 3:
  Input: head = []
  Output: []

Example 4:
  Input: head = [1]
  Output: [1]

Constraints:
  - The number of nodes in the list is in the range [0, 5 * 10^4]
  - -10^5 <= Node.val <= 10^5

Follow up: Can you sort the linked list in O(n log n) time and O(1) memory (i.e. constant space)?

Time Complexity: O(n log n)
Space Complexity: O(log n) for recursion stack, O(1) for iterative version

Pattern Notes:
  - Use merge sort algorithm on linked list
  - Fast/slow pointers to find middle for divide step
  - Recursively sort left and right halves
  - Merge two sorted linked lists
  - This demonstrates fast/slow pointers in divide-and-conquer context
  - Bottom-up approach can achieve O(1) space

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Use merge sort algorithm adapted for linked lists
  2. Find middle using fast/slow pointers for divide step
  3. Split list into two halves at the middle
  4. Recursively sort both halves
  5. Merge the two sorted halves back together
*/

export const functionName = 'sortList';

export const tests = [
  {
    input: [[4, 2, 1, 3]],
    expected: [1, 2, 3, 4]
  },
  {
    input: [[-1, 5, 3, 4, 0]],
    expected: [-1, 0, 3, 4, 5]
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
    input: [[2, 1]],
    expected: [1, 2]
  },
  {
    input: [[5, 4, 3, 2, 1]],
    expected: [1, 2, 3, 4, 5]
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expected: [1, 2, 3, 4, 5]
  },
  {
    input: [[3, 1, 4, 1, 5, 9, 2, 6]],
    expected: [1, 1, 2, 3, 4, 5, 6, 9]
  },
  {
    input: [[-5, 3, -1, 0, 10, -3]],
    expected: [-5, -3, -1, 0, 3, 10]
  },
  {
    input: [[7, 7, 7, 7]],
    expected: [7, 7, 7, 7]
  },
  {
    input: [[100, 50, 75, 25]],
    expected: [25, 50, 75, 100]
  },
  {
    input: [[3, 2, 1]],
    expected: [1, 2, 3]
  }
];