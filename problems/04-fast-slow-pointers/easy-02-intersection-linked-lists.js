/*
Problem: Intersection of Two Linked Lists
Difficulty: Easy
Category: Linked List, Fast & Slow Pointers
LeetCode: #160
Pattern: Fast & Slow Pointers (Two-Pointer Synchronization)

Given the heads of two singly linked-lists headA and headB, return the node at
which the two lists intersect. If the two linked lists have no intersection
at all, return null.

For example, the following two linked lists begin to intersect at node c1:

A:          a1 → a2
                   ↘
                     c1 → c2 → c3
                   ↗
B:     b1 → b2 → b3

The test cases are generated such that there are no cycles anywhere in the
entire linked structure.

Note that the linked lists must retain their original structure after the
function returns.

Example 1:
  Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
  Output: Intersected at '8'

Example 2:
  Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
  Output: Intersected at '2'

Example 3:
  Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
  Output: No intersection

Constraints:
  - The number of nodes of listA is in the m
  - The number of nodes of listB is in the n
  - 1 <= m, n <= 3 * 10^4
  - 1 <= Node.val <= 10^5
  - 0 <= skipA < m
  - 0 <= skipB < n
  - intersectVal is 0 if the two lists do not intersect
  - intersectVal == listA[skipA] == listB[skipB] if the two lists intersect

Time Complexity: O(m + n)
Space Complexity: O(1)

Pattern Notes:
  - Two-pointer technique: when one reaches end, restart from other head
  - Both pointers will meet at intersection after traversing same distance
  - Distance covered: lenA + lenB for both pointers
  - Alternative: calculate lengths first, then align the longer list
  - This elegant solution avoids length calculation

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Use two pointers starting at headA and headB
  2. When pointer reaches end, redirect to the other list's head
  3. Both pointers will travel the same total distance
  4. They meet at intersection or both become null
  5. This eliminates the need to calculate list lengths
*/

export const functionName = 'getIntersectionNode';

export const tests = [
  {
    input: [8, [4, 1, 8, 4, 5], [5, 6, 1, 8, 4, 5], 2, 3], // [intersectVal, listA, listB, skipA, skipB]
    expected: 8 // value of intersection node
  },
  {
    input: [2, [1, 9, 1, 2, 4], [3, 2, 4], 3, 1],
    expected: 2
  },
  {
    input: [0, [2, 6, 4], [1, 5], 3, 2], // no intersection
    expected: null
  },
  {
    input: [1, [1], [1], 0, 0], // single node intersection
    expected: 1
  },
  {
    input: [0, [1, 2, 3], [4, 5, 6], 3, 3], // no intersection, same length
    expected: null
  },
  {
    input: [3, [1, 2, 3], [4, 3], 2, 1], // intersection at last node
    expected: 3
  },
  {
    input: [5, [1, 2, 5, 6, 7], [3, 4, 5, 6, 7], 2, 2], // intersection in middle
    expected: 5
  },
  {
    input: [0, [1], [2, 3, 4], 1, 3], // no intersection, different lengths
    expected: null
  },
  {
    input: [7, [1, 2, 7, 8, 9], [3, 4, 5, 6, 7, 8, 9], 2, 4], // intersection at node 7 with long shared tail
    expected: 7
  },
  {
    input: [10, [10, 20, 30], [5, 10, 20, 30], 0, 1], // intersection at the head of listA
    expected: 10
  },
  {
    input: [0, [1, 2, 3, 4, 5], [6, 7, 8, 9, 10], 5, 5], // no intersection, same length
    expected: null
  }
];