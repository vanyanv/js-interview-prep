/*
Problem: Same Tree
Difficulty: Easy
Category: Recursion, Tree, Depth-First Search
LeetCode: #100
Pattern: Tree Recursion

Given the roots of two binary trees p and q, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example 1:
  Input: p = [1,2,3], q = [1,2,3]
    p:  1       q:  1
       / \         / \
      2   3       2   3
  Output: true
  Explanation: Both trees have same structure and values

Example 2:
  Input: p = [1,2], q = [1,null,2]
    p:  1       q:  1
       /             \
      2               2
  Output: false
  Explanation: Different structure

Example 3:
  Input: p = [1,2,1], q = [1,1,2]
    p:  1       q:  1
       / \         / \
      2   1       1   2
  Output: false
  Explanation: Same structure but different values

Example 4:
  Input: p = [], q = []
  Output: true
  Explanation: Both empty trees are same

Constraints:
  - The number of nodes in both trees is in the range [0, 100]
  - -10^4 <= Node.val <= 10^4

Time Complexity: O(min(m,n)) where m,n are number of nodes in trees
Space Complexity: O(min(m,n)) due to recursion stack

Recursion Pattern Notes:
  - Base cases: both null (true), one null (false), values different (false)
  - Recursive case: current nodes same AND left subtrees same AND right subtrees same
  - This is a "simultaneous traversal" pattern
  - We compare nodes at each level and recurse on subtrees

Tree Node Definition:
  class TreeNode {
    constructor(val, left, right) {
      this.val = (val === undefined ? 0 : val);
      this.left = (left === undefined ? null : left);
      this.right = (right === undefined ? null : right);
    }
  }

Hints:
  - What if both nodes are null? What if only one is null?
  - If both nodes exist, what do you need to check?
  - Think about checking current nodes AND their subtrees
  - Use logical AND to ensure all conditions are met
*/

export const functionName = 'isSameTree';

export const tests = [
  {
    input: [null, null],
    expected: true
  },
  {
    input: [{val: 1, left: null, right: null}, null],
    expected: false
  },
  {
    input: [null, {val: 1, left: null, right: null}],
    expected: false
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}, {val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: true
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: null}, {val: 1, left: null, right: {val: 2, left: null, right: null}}],
    expected: false
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 1, left: null, right: null}}, {val: 1, left: {val: 1, left: null, right: null}, right: {val: 2, left: null, right: null}}],
    expected: false
  },
  {
    input: [{val: 1, left: null, right: null}, {val: 1, left: null, right: null}],
    expected: true
  },
  {
    input: [{val: 1, left: null, right: null}, {val: 2, left: null, right: null}],
    expected: false
  }
];

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val, left, right) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.left = (left === undefined ? null : left);
 *         this.right = (right === undefined ? null : right);
 *     }
 * }
 */

/**
 * Check if two binary trees are the same
 * @param {TreeNode} p - Root of first tree
 * @param {TreeNode} q - Root of second tree
 * @return {boolean} True if trees are identical, false otherwise
 */
function isSameTree(p, q) {
    // Base case: both nodes are null
    if (p === null && q === null) {
        return true;
    }

    // Base case: one node is null, the other is not
    if (p === null || q === null) {
        return false;
    }

    // Base case: nodes have different values
    if (p.val !== q.val) {
        return false;
    }

    // Recursive case: current nodes are same, check subtrees
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

export default isSameTree;