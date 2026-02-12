/*
Problem: Binary Tree Inorder Traversal
Difficulty: Easy
Category: Recursion, Tree, Depth-First Search
LeetCode: #94
Pattern: Tree Traversal Recursion

Given the root of a binary tree, return the inorder traversal of its nodes' values.
Inorder traversal visits nodes in the order: Left → Root → Right

Example 1:
  Input: root = [1,null,2,3]
        1
         \
          2
         /
        3
  Output: [1,3,2]
  Explanation: Inorder: left(none) → 1 → left(3) → 2 → right(none)

Example 2:
  Input: root = []
  Output: []
  Explanation: Empty tree

Example 3:
  Input: root = [1]
  Output: [1]
  Explanation: Single node tree

Example 4:
  Input: root = [1,2,3,4,5]
        1
       / \
      2   3
     / \
    4   5
  Output: [4,2,5,1,3]
  Explanation: Inorder: 4 → 2 → 5 → 1 → 3

Constraints:
  - The number of nodes in the tree is in the range [0, 100]
  - -100 <= Node.val <= 100

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree (recursion stack)

Recursion Pattern Notes:
  - Base case: null node, return (do nothing)
  - Recursive case: traverse left → process current → traverse right
  - This is a classic "tree traversal" recursion pattern
  - The order of operations defines the traversal type (inorder, preorder, postorder)

Tree Node Definition:
  class TreeNode {
    constructor(val, left, right) {
      this.val = (val === undefined ? 0 : val);
      this.left = (left === undefined ? null : left);
      this.right = (right === undefined ? null : right);
    }
  }

Hints:
  - What do you do when you reach a null node? (base case)
  - For inorder: process left subtree, then current node, then right subtree
  - Use an array to collect the values as you traverse
  - Think about the recursive structure: each subtree is also a binary tree
*/

export const functionName = 'inorderTraversal';

export const tests = [
  {
    input: [null],
    expected: []
  },
  {
    input: [{val: 1, left: null, right: null}],
    expected: [1]
  },
  {
    input: [{val: 1, left: null, right: {val: 2, left: {val: 3, left: null, right: null}, right: null}}],
    expected: [1, 3, 2]
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 4, left: null, right: null}, right: {val: 5, left: null, right: null}}, right: {val: 3, left: null, right: null}}],
    expected: [4, 2, 5, 1, 3]
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: [2, 1, 3]
  },
  {
    input: [{val: 5, left: {val: 3, left: {val: 1, left: null, right: null}, right: {val: 4, left: null, right: null}}, right: {val: 7, left: {val: 6, left: null, right: null}, right: {val: 9, left: null, right: null}}}],
    expected: [1, 3, 4, 5, 6, 7, 9]
  },
  {
    input: [{val: 2, left: {val: 1, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: [1, 2, 3]
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 3, left: null, right: null}, right: null}, right: null}],
    expected: [3, 2, 1]
  },
  // Right-skewed chain: 1 -> 2 -> 3 -> 4 (worst-case right-only tree)
  {
    input: [{val: 1, left: null, right: {val: 2, left: null, right: {val: 3, left: null, right: {val: 4, left: null, right: null}}}}],
    expected: [1, 2, 3, 4]
  },
  // All-same-values tree
  {
    input: [{val: 5, left: {val: 5, left: {val: 5, left: null, right: null}, right: {val: 5, left: null, right: null}}, right: {val: 5, left: {val: 5, left: null, right: null}, right: {val: 5, left: null, right: null}}}],
    expected: [5, 5, 5, 5, 5, 5, 5]
  },
  // Negative values tree
  {
    input: [{val: 0, left: {val: -2, left: {val: -3, left: null, right: null}, right: {val: -1, left: null, right: null}}, right: {val: 2, left: {val: 1, left: null, right: null}, right: {val: 3, left: null, right: null}}}],
    expected: [-3, -2, -1, 0, 1, 2, 3]
  },
  // Larger tree (4 levels, 15 nodes - perfect binary tree)
  {
    input: [{val: 8, left: {val: 4, left: {val: 2, left: {val: 1, left: null, right: null}, right: {val: 3, left: null, right: null}}, right: {val: 6, left: {val: 5, left: null, right: null}, right: {val: 7, left: null, right: null}}}, right: {val: 12, left: {val: 10, left: {val: 9, left: null, right: null}, right: {val: 11, left: null, right: null}}, right: {val: 14, left: {val: 13, left: null, right: null}, right: {val: 15, left: null, right: null}}}}],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
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
 * Perform inorder traversal of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} Array of values in inorder sequence
 */
function inorderTraversal(root) {
    const result = [];

    function inorder(node) {
        // Base case: null node
        if (node === null) {
            return;
        }

        // Recursive case: Left → Root → Right
        inorder(node.left);    // Traverse left subtree
        result.push(node.val); // Process current node
        inorder(node.right);   // Traverse right subtree
    }

    inorder(root);
    return result;
}

export default inorderTraversal;