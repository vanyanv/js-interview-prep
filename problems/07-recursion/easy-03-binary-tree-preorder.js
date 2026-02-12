/*
Problem: Binary Tree Preorder Traversal
Difficulty: Easy
Category: Recursion, Tree, Depth-First Search
LeetCode: #144
Pattern: Tree Traversal Recursion

Given the root of a binary tree, return the preorder traversal of its nodes' values.
Preorder traversal visits nodes in the order: Root → Left → Right

Example 1:
  Input: root = [1,null,2,3]
        1
         \
          2
         /
        3
  Output: [1,2,3]
  Explanation: Preorder: 1 → left(none) → 2 → left(3) → right(none)

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
  Output: [1,2,4,5,3]
  Explanation: Preorder: 1 → 2 → 4 → 5 → 3

Constraints:
  - The number of nodes in the tree is in the range [0, 100]
  - -100 <= Node.val <= 100

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree (recursion stack)

Recursion Pattern Notes:
  - Base case: null node, return (do nothing)
  - Recursive case: process current → traverse left → traverse right
  - This is a classic "tree traversal" recursion pattern
  - Preorder is useful for copying/serializing trees

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
  - For preorder: process current node first, then left subtree, then right subtree
  - Use an array to collect the values as you traverse
  - Think about visiting the root before exploring subtrees
*/

export const functionName = 'preorderTraversal';

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
    expected: [1, 2, 3]
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 4, left: null, right: null}, right: {val: 5, left: null, right: null}}, right: {val: 3, left: null, right: null}}],
    expected: [1, 2, 4, 5, 3]
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: [1, 2, 3]
  },
  {
    input: [{val: 5, left: {val: 3, left: {val: 1, left: null, right: null}, right: {val: 4, left: null, right: null}}, right: {val: 7, left: {val: 6, left: null, right: null}, right: {val: 9, left: null, right: null}}}],
    expected: [5, 3, 1, 4, 7, 6, 9]
  },
  {
    input: [{val: 2, left: {val: 1, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: [2, 1, 3]
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 3, left: null, right: null}, right: null}, right: null}],
    expected: [1, 2, 3]
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
 * Perform preorder traversal of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} Array of values in preorder sequence
 */
function preorderTraversal(root) {
    const result = [];

    function preorder(node) {
        // Base case: null node
        if (node === null) {
            return;
        }

        // Recursive case: Root → Left → Right
        result.push(node.val); // Process current node
        preorder(node.left);   // Traverse left subtree
        preorder(node.right);  // Traverse right subtree
    }

    preorder(root);
    return result;
}

export default preorderTraversal;