/*
Problem: Palindrome Linked List
Difficulty: Easy
Category: Linked List, Fast & Slow Pointers
LeetCode: #234
Pattern: Fast & Slow Pointers (Find Middle + Reverse)

Given the head of a singly linked list, return true if it is a palindrome
or false otherwise.

Example 1:
  Input: head = [1,2,2,1]
  Output: true

Example 2:
  Input: head = [1,2]
  Output: false

Example 3:
  Input: head = [1]
  Output: true

Example 4:
  Input: head = [1,2,3,2,1]
  Output: true

Constraints:
  - The number of nodes in the list is in the range [1, 10^5]
  - 0 <= Node.val <= 9

Follow up: Could you do it in O(n) time and O(1) space?

Time Complexity: O(n)
Space Complexity: O(1)

Pattern Notes:
  - Step 1: Use fast/slow pointers to find middle of list
  - Step 2: Reverse the second half of the list
  - Step 3: Compare first half with reversed second half
  - Step 4: Optionally restore the list (reverse back)
  - This combines middle-finding with list reversal
  - Alternative: use stack/array but that's O(n) space

ListNode Definition:
  class ListNode {
    constructor(val, next) {
      this.val = (val === undefined ? 0 : val);
      this.next = (next === undefined ? null : next);
    }
  }

Hints:
  1. Find middle using fast/slow pointers
  2. Reverse the second half starting from middle
  3. Compare values from start and reversed second half
  4. Remember to handle odd/even length lists differently
  5. For odd length, skip the middle node during comparison
*/

export const functionName = 'isPalindrome';

export const tests = [
  {
    input: [[1, 2, 2, 1]],
    expected: true
  },
  {
    input: [[1, 2]],
    expected: false
  },
  {
    input: [[1]],
    expected: true
  },
  {
    input: [[1, 2, 3, 2, 1]],
    expected: true
  },
  {
    input: [[1, 2, 3, 4, 5]],
    expected: false
  },
  {
    input: [[1, 0, 0]],
    expected: false
  },
  {
    input: [[9, 9, 9, 9]],
    expected: true
  },
  {
    input: [[1, 2, 3, 3, 2, 1]],
    expected: true
  }
];