/*
Problem: Validate Binary Search Tree
Difficulty: Medium
Category: Recursion, Tree, Depth-First Search, Binary Search Tree
LeetCode: #98
Pattern: Tree Recursion with Bounds

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key
- The right subtree of a node contains only nodes with keys greater than the node's key
- Both the left and right subtrees must also be binary search trees

Example 1:
  Input: root = [2,1,3]
        2
       / \
      1   3
  Output: true
  Explanation: Valid BST

Example 2:
  Input: root = [5,1,4,null,null,3,6]
        5
       / \
      1   4
         / \
        3   6
  Output: false
  Explanation: 3 < 5 but it's in right subtree

Example 3:
  Input: root = [1]
  Output: true
  Explanation: Single node is valid BST

Example 4:
  Input: root = [10,5,15,null,null,6,20]
        10
       /  \
      5   15
         /  \
        6   20
  Output: false
  Explanation: 6 < 10 but it's in right subtree

Constraints:
  - The number of nodes in the tree is in the range [1, 10^4]
  - -2^31 <= Node.val <= 2^31 - 1

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree (recursion stack)

Recursion Pattern Notes:
  - Base case: null node is valid BST
  - Recursive case: node value within bounds AND both subtrees valid with updated bounds
  - This is a "bounded validation" pattern
  - Key insight: each node must be within a range, not just compared to parent

Tree Node Definition:
  class TreeNode {
    constructor(val, left, right) {
      this.val = (val === undefined ? 0 : val);
      this.left = (left === undefined ? null : left);
      this.right = (right === undefined ? null : right);
    }
  }

Hints:
  - Don't just compare with parent - consider the entire path from root
  - Each node has a valid range: (min, max)
  - For left child: max becomes parent value
  - For right child: min becomes parent value
  - Use -Infinity and +Infinity as initial bounds
*/

export const functionName = 'isValidBST';

export const tests = [
  {
    input: [{val: 1, left: null, right: null}],
    expected: true
  },
  {
    input: [{val: 2, left: {val: 1, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: true
  },
  {
    input: [{val: 5, left: {val: 1, left: null, right: null}, right: {val: 4, left: {val: 3, left: null, right: null}, right: {val: 6, left: null, right: null}}}],
    expected: false
  },
  {
    input: [{val: 10, left: {val: 5, left: null, right: null}, right: {val: 15, left: {val: 6, left: null, right: null}, right: {val: 20, left: null, right: null}}}],
    expected: false
  },
  {
    input: [{val: 5, left: {val: 3, left: {val: 1, left: null, right: null}, right: {val: 4, left: null, right: null}}, right: {val: 7, left: {val: 6, left: null, right: null}, right: {val: 9, left: null, right: null}}}],
    expected: true
  },
  {
    input: [{val: 3, left: {val: 1, left: null, right: {val: 2, left: null, right: null}}, right: {val: 5, left: {val: 4, left: null, right: null}, right: {val: 6, left: null, right: null}}}],
    expected: true
  },
  {
    input: [{val: 1, left: {val: 1, left: null, right: null}, right: null}],
    expected: false
  },
  {
    input: [{val: 0, left: {val: -1, left: null, right: null}, right: null}],
    expected: true
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
 * Validate if binary tree is a valid BST
 * @param {TreeNode} root - Root of the binary tree
 * @return {boolean} True if valid BST, false otherwise
 */
function isValidBST(root) {
    function validate(node, min, max) {
        // Base case: null node is valid
        if (node === null) {
            return true;
        }

        // Check if current node violates BST property
        if (node.val <= min || node.val >= max) {
            return false;
        }

        // Recursive case: validate subtrees with updated bounds
        // Left subtree: all values must be < node.val
        // Right subtree: all values must be > node.val
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }

    // Start with unbounded range
    return validate(root, -Infinity, Infinity);
}

export default isValidBST;