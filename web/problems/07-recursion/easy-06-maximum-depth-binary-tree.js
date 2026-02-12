/*
Problem: Maximum Depth of Binary Tree
Difficulty: Easy
Category: Recursion, Tree, Depth-First Search
LeetCode: #104
Pattern: Tree Recursion

Given the root of a binary tree, find its maximum depth.
The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Example 1:
  Input: root = [3,9,20,null,null,15,7]
        3
       / \
      9  20
        /  \
       15   7
  Output: 3
  Explanation: The longest path is 3 → 20 → 15 (or 3 → 20 → 7)

Example 2:
  Input: root = [1,null,2]
        1
         \
          2
  Output: 2
  Explanation: The longest path is 1 → 2

Example 3:
  Input: root = []
  Output: 0
  Explanation: Empty tree has depth 0

Example 4:
  Input: root = [0]
  Output: 1
  Explanation: Single node has depth 1

Constraints:
  - The number of nodes in the tree is in the range [0, 10^4]
  - -100 <= Node.val <= 100

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree (recursion stack)

Recursion Pattern Notes:
  - Base case: null node has depth 0
  - Recursive case: 1 + max(left depth, right depth)
  - This is a "divide and conquer" pattern where we compute depth of subtrees
  - Each node contributes 1 to the depth

Tree Node Definition:
  class TreeNode {
    constructor(val, left, right) {
      this.val = (val === undefined ? 0 : val);
      this.left = (left === undefined ? null : left);
      this.right = (right === undefined ? null : right);
    }
  }

Hints:
  - What's the depth of an empty tree? (base case)
  - How does the depth of a tree relate to the depth of its subtrees?
  - Think about the deepest path: it goes through either left or right subtree
  - Each level adds 1 to the total depth
*/

export const functionName = 'maxDepth';

export const tests = [
  {
    input: [null],
    expected: 0
  },
  {
    input: [{val: 0, left: null, right: null}],
    expected: 1
  },
  {
    input: [{val: 1, left: null, right: {val: 2, left: null, right: null}}],
    expected: 2
  },
  {
    input: [{val: 3, left: {val: 9, left: null, right: null}, right: {val: 20, left: {val: 15, left: null, right: null}, right: {val: 7, left: null, right: null}}}],
    expected: 3
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: 2
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 4, left: null, right: null}, right: null}, right: {val: 3, left: null, right: {val: 5, left: null, right: null}}}],
    expected: 3
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 3, left: {val: 4, left: null, right: null}, right: null}, right: null}, right: null}],
    expected: 4
  },
  {
    input: [{val: 5, left: {val: 3, left: {val: 1, left: null, right: null}, right: {val: 4, left: null, right: null}}, right: {val: 7, left: {val: 6, left: null, right: null}, right: {val: 9, left: null, right: null}}}],
    expected: 3
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
 * Find maximum depth of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @return {number} Maximum depth of the tree
 */
function maxDepth(root) {
    // Base case: null node has depth 0
    if (root === null) {
        return 0;
    }

    // Recursive case: 1 + max depth of left and right subtrees
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
}

export default maxDepth;