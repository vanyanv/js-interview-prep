/*
Problem: Path Sum
Difficulty: Easy
Category: Recursion, Tree, Depth-First Search
LeetCode: #112
Pattern: Tree Recursion

Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.

Example 1:
  Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
        5
       / \
      4   8
     /   / \
    11  13  4
   / \      \
  7   2      1
  Output: true
  Explanation: Path 5→4→11→2 = 22

Example 2:
  Input: root = [1,2,3], targetSum = 5
        1
       / \
      2   3
  Output: false
  Explanation: No path sums to 5

Example 3:
  Input: root = [], targetSum = 0
  Output: false
  Explanation: Empty tree has no paths

Example 4:
  Input: root = [1], targetSum = 1
  Output: true
  Explanation: Single node path equals target

Constraints:
  - The number of nodes in the tree is in the range [0, 5000]
  - -1000 <= Node.val <= 1000
  - -1000 <= targetSum <= 1000

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree (recursion stack)

Recursion Pattern Notes:
  - Base case: null node (false), leaf node (check if remaining sum equals node value)
  - Recursive case: subtract current value and check if either subtree has path
  - This is a "path exploration" pattern with sum tracking
  - We reduce the target sum as we traverse down

Tree Node Definition:
  class TreeNode {
    constructor(val, left, right) {
      this.val = (val === undefined ? 0 : val);
      this.left = (left === undefined ? null : left);
      this.right = (right === undefined ? null : right);
    }
  }

Hints:
  - What happens when you reach a null node?
  - When do you know you've found a valid path? (leaf node with correct sum)
  - How can you track the remaining sum as you traverse?
  - Think about subtracting current node value from target sum
  - A leaf node is one with no left and no right children
*/

export const functionName = 'hasPathSum';

export const tests = [
  {
    input: [null, 0],
    expected: false
  },
  {
    input: [{val: 1, left: null, right: null}, 1],
    expected: true
  },
  {
    input: [{val: 1, left: null, right: null}, 2],
    expected: false
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}, 3],
    expected: true
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}, 5],
    expected: false
  },
  {
    input: [{val: 5, left: {val: 4, left: {val: 11, left: {val: 7, left: null, right: null}, right: {val: 2, left: null, right: null}}, right: null}, right: {val: 8, left: {val: 13, left: null, right: null}, right: {val: 4, left: null, right: {val: 1, left: null, right: null}}}}, 22],
    expected: true
  },
  {
    input: [{val: 1, left: {val: 2, left: null, right: null}, right: null}, 1],
    expected: false
  },
  {
    input: [{val: -3, left: null, right: null}, -3],
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
 * Check if tree has a root-to-leaf path with given sum
 * @param {TreeNode} root - Root of the binary tree
 * @param {number} targetSum - Target sum to find
 * @return {boolean} True if such path exists, false otherwise
 */
function hasPathSum(root, targetSum) {
    // Base case: null node
    if (root === null) {
        return false;
    }

    // Base case: leaf node - check if remaining sum equals node value
    if (root.left === null && root.right === null) {
        return targetSum === root.val;
    }

    // Recursive case: subtract current value and check subtrees
    const remainingSum = targetSum - root.val;
    return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
}

export default hasPathSum;