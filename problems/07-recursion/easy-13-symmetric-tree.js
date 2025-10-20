/*
Problem: Symmetric Tree
Difficulty: Easy
Category: Recursion, Tree, Depth-First Search
LeetCode: #101
Pattern: Tree Recursion

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Example 1:
  Input: root = [1,2,2,3,4,4,3]
        1
       / \
      2   2
     / \ / \
    3  4 4  3
  Output: true
  Explanation: Tree is mirror of itself

Example 2:
  Input: root = [1,2,2,null,3,null,3]
        1
       / \
      2   2
       \   \
        3   3
  Output: false
  Explanation: Not symmetric due to different structure

Example 3:
  Input: root = [1]
  Output: true
  Explanation: Single node is symmetric

Example 4:
  Input: root = []
  Output: true
  Explanation: Empty tree is symmetric

Constraints:
  - The number of nodes in the tree is in the range [1, 1000]
  - -100 <= Node.val <= 100

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree (recursion stack)

Recursion Pattern Notes:
  - Base cases: both null (true), one null (false), values different (false)
  - Recursive case: compare left's left with right's right AND left's right with right's left
  - This is a "mirror comparison" pattern
  - We need a helper function to compare two subtrees for symmetry

Tree Node Definition:
  class TreeNode {
    constructor(val, left, right) {
      this.val = (val === undefined ? 0 : val);
      this.left = (left === undefined ? null : left);
      this.right = (right === undefined ? null : right);
    }
  }

Hints:
  - A tree is symmetric if its left and right subtrees are mirrors of each other
  - How do you check if two trees are mirrors? (not the same!)
  - Mirror means: left.left should equal right.right, left.right should equal right.left
  - Use a helper function to compare two nodes for mirror symmetry
*/

export const functionName = 'isSymmetric';

export const tests = [
  {
    input: [null],
    expected: true
  },
  {
    input: [{val: 1, left: null, right: null}],
    expected: true
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 3, left: null, right: null}, right: {val: 4, left: null, right: null}}, right: {val: 2, left: {val: 4, left: null, right: null}, right: {val: 3, left: null, right: null}}}],
    expected: true
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: {val: 3, left: null, right: null}}, right: {val: 2, left: null, right: {val: 3, left: null, right: null}}}],
    expected: false
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 2, left: null, right: null}}],
    expected: true
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: false
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 3, left: null, right: null}, right: null}, right: {val: 2, left: null, right: {val: 3, left: null, right: null}}}],
    expected: true
  },
  {
    input: [{val: 5, left: {val: 3, left: {val: 1, left: null, right: null}, right: {val: 4, left: null, right: null}}, right: {val: 3, left: {val: 4, left: null, right: null}, right: {val: 1, left: null, right: null}}}],
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
 * Check if a binary tree is symmetric
 * @param {TreeNode} root - Root of the binary tree
 * @return {boolean} True if tree is symmetric, false otherwise
 */
function isSymmetric(root) {
    // An empty tree is symmetric
    if (root === null) {
        return true;
    }

    // Helper function to check if two subtrees are mirrors of each other
    function isMirror(left, right) {
        // Base case: both nodes are null
        if (left === null && right === null) {
            return true;
        }

        // Base case: one node is null, the other is not
        if (left === null || right === null) {
            return false;
        }

        // Base case: nodes have different values
        if (left.val !== right.val) {
            return false;
        }

        // Recursive case: check mirror symmetry
        // left.left should mirror right.right
        // left.right should mirror right.left
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
    }

    // Check if left and right subtrees are mirrors of each other
    return isMirror(root.left, root.right);
}

export default isSymmetric;