/*
Problem: Remove Nth Node From End of List
Difficulty: Easy
Category: Linked List, Two Pointers
LeetCode: #19
Pattern: Two Pointers + Linked List Traversal
Mixed Patterns: Fast/Slow Pointers + Linked List Manipulation + Edge Cases

Given the head of a linked list, remove the nth node from the end of the list
and return its head.

Example 1:
  Input: head = [1,2,3,4,5], n = 2
  Output: [1,2,3,5]
  Explanation: Remove the 2nd node from end (node with value 4).

Example 2:
  Input: head = [1], n = 1
  Output: []
  Explanation: Remove the only node.

Example 3:
  Input: head = [1,2], n = 1
  Output: [1]
  Explanation: Remove the last node.

Example 4:
  Input: head = [1,2], n = 2
  Output: [2]
  Explanation: Remove the first node.

Constraints:
  - The number of nodes in the list is sz
  - 1 <= sz <= 30
  - 0 <= Node.val <= 100
  - 1 <= n <= sz

Time Complexity: O(L) where L is length of linked list
Space Complexity: O(1)

Pattern Notes:
  - Two-pointer technique: Fast pointer moves n steps ahead
  - Then both pointers move until fast reaches end
  - Slow pointer will be at (length - n)th position
  - Use dummy node to handle edge case of removing head
  - Handle edge cases: single node, removing head, invalid n

Interview Notes:
  - Follow-up: What if n is larger than list length?
  - Follow-up: Remove nth node from beginning instead
  - Follow-up: Remove all nodes at specific positions
  - Common mistake: Off-by-one errors, not handling head removal
*/

export const functionName = 'removeNthFromEnd';

export const tests = [
  {
    input: [{"val": 1, "next": {"val": 2, "next": {"val": 3, "next": {"val": 4, "next": {"val": 5, "next": null}}}}}, 2],
    expected: {"val": 1, "next": {"val": 2, "next": {"val": 3, "next": {"val": 5, "next": null}}}}
  },
  {
    input: [{"val": 1, "next": null}, 1],
    expected: null
  },
  {
    input: [{"val": 1, "next": {"val": 2, "next": null}}, 1],
    expected: {"val": 1, "next": null}
  },
  {
    input: [{"val": 1, "next": {"val": 2, "next": null}}, 2],
    expected: {"val": 2, "next": null}
  },
  {
    input: [{"val": 1, "next": {"val": 2, "next": {"val": 3, "next": null}}}, 3],
    expected: {"val": 2, "next": {"val": 3, "next": null}}
  },
  {
    input: [{"val": 1, "next": {"val": 2, "next": {"val": 3, "next": null}}}, 1],
    expected: {"val": 1, "next": {"val": 2, "next": null}}
  }
];

/**
 * Definition for singly-linked list node
 */
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

/**
 * Removes nth node from end using two pointers
 * @param {ListNode} head - Head of linked list
 * @param {number} n - Position from end to remove (1-indexed)
 * @return {ListNode} Head of modified list
 */
function removeNthFromEnd(head, n) {
    // Create dummy node to handle edge case of removing head
    const dummy = new ListNode(0);
    dummy.next = head;

    let fast = dummy;
    let slow = dummy;

    // Move fast pointer n+1 steps ahead
    // This ensures slow will be at the node before the target
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches end
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // Remove the nth node from end
    slow.next = slow.next.next;

    return dummy.next;
}

/**
 * Alternative: Two-pass solution (calculate length first)
 * @param {ListNode} head - Head of linked list
 * @param {number} n - Position from end to remove
 * @return {ListNode} Head of modified list
 */
function removeNthFromEndTwoPass(head, n) {
    // First pass: calculate length
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }

    // Edge case: removing head
    if (n === length) {
        return head.next;
    }

    // Second pass: find and remove node
    current = head;
    for (let i = 0; i < length - n - 1; i++) {
        current = current.next;
    }

    current.next = current.next.next;
    return head;
}

/**
 * Alternative: Recursive approach
 * @param {ListNode} head - Head of linked list
 * @param {number} n - Position from end to remove
 * @return {ListNode} Head of modified list
 */
function removeNthFromEndRecursive(head, n) {
    function removeHelper(node) {
        if (!node) {
            return 0; // Position counter
        }

        const position = removeHelper(node.next) + 1;

        if (position === n + 1) {
            // This node's next should be removed
            node.next = node.next.next;
        }

        return position;
    }

    const dummy = new ListNode(0);
    dummy.next = head;
    removeHelper(dummy);
    return dummy.next;
}

/**
 * Alternative: Using array to store nodes
 * @param {ListNode} head - Head of linked list
 * @param {number} n - Position from end to remove
 * @return {ListNode} Head of modified list
 */
function removeNthFromEndArray(head, n) {
    const nodes = [];
    const dummy = new ListNode(0);
    dummy.next = head;

    let current = dummy;
    while (current) {
        nodes.push(current);
        current = current.next;
    }

    // Remove nth from end
    const targetIndex = nodes.length - n - 1;
    nodes[targetIndex].next = nodes[targetIndex].next.next;

    return dummy.next;
}

/**
 * Extended: Remove multiple nodes from specific positions
 * @param {ListNode} head - Head of linked list
 * @param {number[]} positions - Array of positions from end to remove
 * @return {ListNode} Head of modified list
 */
function removeMultipleFromEnd(head, positions) {
    if (!head || !positions.length) {
        return head;
    }

    // Sort positions in descending order to avoid index shifting
    const sortedPositions = [...positions].sort((a, b) => b - a);

    for (const n of sortedPositions) {
        head = removeNthFromEnd(head, n);
        if (!head) break; // List became empty
    }

    return head;
}

/**
 * Helper function to create linked list from array (for testing)
 * @param {number[]} arr - Array of values
 * @return {ListNode} Head of created linked list
 */
function createLinkedList(arr) {
    if (!arr.length) return null;

    const head = new ListNode(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }

    return head;
}

/**
 * Helper function to convert linked list to array (for testing)
 * @param {ListNode} head - Head of linked list
 * @return {number[]} Array of values
 */
function linkedListToArray(head) {
    const result = [];
    let current = head;

    while (current) {
        result.push(current.val);
        current = current.next;
    }

    return result;
}

export default removeNthFromEnd;