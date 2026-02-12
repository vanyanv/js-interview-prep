/*
Problem: Merge Two Sorted Lists
Difficulty: Easy
Category: Recursion, Linked List, Two Pointers
LeetCode: #21
Pattern: Linked List Recursion

You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists in a sorted manner and return the head of the merged linked list.
The list should be made by splicing together the nodes of the first two lists.

Example 1:
  Input: list1 = [1,2,4], list2 = [1,3,4]
  Output: [1,1,2,3,4,4]
  Explanation: Merge both sorted lists

Example 2:
  Input: list1 = [], list2 = []
  Output: []
  Explanation: Both lists are empty

Example 3:
  Input: list1 = [], list2 = [0]
  Output: [0]
  Explanation: One empty list, one with single element

Example 4:
  Input: list1 = [1], list2 = [2]
  Output: [1,2]
  Explanation: Two single-element lists

Example 5:
  Input: list1 = [5], list2 = [1,2,3,4]
  Output: [1,2,3,4,5]
  Explanation: Merge lists of different lengths

Constraints:
  - The number of nodes in both lists is in the range [0, 50]
  - -100 <= Node.val <= 100
  - Both list1 and list2 are sorted in non-decreasing order

Time Complexity: O(m + n) where m,n are lengths of the lists
Space Complexity: O(m + n) due to recursion stack

Recursion Pattern Notes:
  - Base cases: one list is null, return the other list
  - Recursive case: choose smaller head, attach result of merging remaining nodes
  - This is a "divide and conquer" pattern for merging
  - Each recursive call processes one node and merges the rest

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  - What happens when one list is empty? (base case)
  - How do you choose which node should come first?
  - After choosing a node, what's the subproblem?
  - Think about connecting the chosen node to the merged remainder
  - The recursive structure naturally handles the merging
*/

export const functionName = 'mergeTwoLists';

export const tests = [
  {
    input: [null, null],
    expected: null
  },
  {
    input: [null, {val: 0, next: null}],
    expected: {val: 0, next: null}
  },
  {
    input: [{val: 1, next: null}, {val: 2, next: null}],
    expected: {val: 1, next: {val: 2, next: null}}
  },
  {
    input: [{val: 1, next: {val: 2, next: {val: 4, next: null}}}, {val: 1, next: {val: 3, next: {val: 4, next: null}}}],
    expected: {val: 1, next: {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 4, next: null}}}}}}
  },
  {
    input: [{val: 5, next: null}, {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: null}}}}],
    expected: {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 5, next: null}}}}}
  },
  {
    input: [{val: 1, next: {val: 3, next: {val: 5, next: null}}}, {val: 2, next: {val: 4, next: {val: 6, next: null}}}],
    expected: {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 5, next: {val: 6, next: null}}}}}}
  },
  {
    input: [{val: 1, next: {val: 1, next: null}}, {val: 1, next: null}],
    expected: {val: 1, next: {val: 1, next: {val: 1, next: null}}}
  },
  {
    input: [{val: 2, next: null}, {val: 1, next: null}],
    expected: {val: 1, next: {val: 2, next: null}}
  }
];

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val, next) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.next = (next === undefined ? null : next);
 *     }
 * }
 */

/**
 * Merge two sorted linked lists recursively
 * @param {ListNode} list1 - Head of first sorted list
 * @param {ListNode} list2 - Head of second sorted list
 * @return {ListNode} Head of merged sorted list
 */
function mergeTwoLists(list1, list2) {
    // Base case: if one list is empty, return the other
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    // Recursive case: choose the smaller head and merge the rest
    if (list1.val <= list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}

export default mergeTwoLists;