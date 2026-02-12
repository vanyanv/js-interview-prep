/*
Problem: Binary Tree Postorder Traversal
Difficulty: Easy
Category: Recursion, Tree, Depth-First Search
LeetCode: #145
Pattern: Tree Traversal Recursion

Given the root of a binary tree, return the postorder traversal of its nodes' values.
Postorder traversal visits nodes in the order: Left → Right → Root

Example 1:
  Input: root = [1,null,2,3]
        1
         \
          2
         /
        3
  Output: [3,2,1]
  Explanation: Postorder: left(none) → left(3) → right(none) → 2 → 1

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
  Output: [4,5,2,3,1]
  Explanation: Postorder: 4 → 5 → 2 → 3 → 1

Constraints:
  - The number of nodes in the tree is in the range [0, 100]
  - -100 <= Node.val <= 100

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree (recursion stack)

Recursion Pattern Notes:
  - Base case: null node, return (do nothing)
  - Recursive case: traverse left → traverse right → process current
  - This is a classic "tree traversal" recursion pattern
  - Postorder is useful for deleting trees or calculating sizes

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
  - For postorder: process left subtree, then right subtree, then current node
  - Use an array to collect the values as you traverse
  - Think about processing children before parent
  - Postorder ensures children are visited before their parent
*/

export const functionName = 'postorderTraversal';

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
    expected: [3, 2, 1]
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 4, left: null, right: null}, right: {val: 5, left: null, right: null}}, right: {val: 3, left: null, right: null}}],
    expected: [4, 5, 2, 3, 1]
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: [2, 3, 1]
  },
  {
    input: [{val: 5, left: {val: 3, left: {val: 1, left: null, right: null}, right: {val: 4, left: null, right: null}}, right: {val: 7, left: {val: 6, left: null, right: null}, right: {val: 9, left: null, right: null}}}],
    expected: [1, 4, 3, 6, 9, 7, 5]
  },
  {
    input: [{val: 2, left: {val: 1, left: null, right: null}, right: {val: 3, left: null, right: null}}],
    expected: [1, 3, 2]
  },
  {
    input: [{val: 1, left: {val: 2, left: {val: 3, left: null, right: null}, right: null}, right: null}],
    expected: [3, 2, 1]
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
 * Perform postorder traversal of binary tree
 * @param {TreeNode} root - Root of the binary tree
 * @return {number[]} Array of values in postorder sequence
 */
function postorderTraversal(root) {
    const result = [];

    function postorder(node) {
        // Base case: null node
        if (node === null) {
            return;
        }

        // Recursive case: Left → Right → Root
        postorder(node.left);  // Traverse left subtree
        postorder(node.right); // Traverse right subtree
        result.push(node.val); // Process current node
    }

    postorder(root);
    return result;
}

export default postorderTraversal;