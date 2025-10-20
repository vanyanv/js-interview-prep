/*
Problem: Invert Binary Tree
Difficulty: Easy
Category: Tree, DFS, BFS, Recursion
LeetCode: #226
Pattern: Tree Traversal + Recursive/Iterative Processing
Mixed Patterns: DFS/BFS + Tree Manipulation + Recursion/Iteration

Given the root of a binary tree, invert the tree, and return its root.

Inverting a binary tree means swapping the left and right children of every node.

Example 1:
  Input: root = [4,2,7,1,3,6,9]
  Output: [4,7,2,9,6,3,1]
  Explanation:
      4           4
     / \         / \
    2   7  =>   7   2
   / \ / \     / \ / \
  1  3 6  9   9  6 3  1

Example 2:
  Input: root = [2,1,3]
  Output: [2,3,1]
  Explanation:
    2       2
   / \  => / \
  1   3   3   1

Example 3:
  Input: root = []
  Output: []

Example 4:
  Input: root = [1]
  Output: [1]

Constraints:
  - The number of nodes in the tree is in the range [0, 100]
  - -100 <= Node.val <= 100

Time Complexity: O(n) where n is number of nodes
Space Complexity: O(h) where h is height of tree (recursion stack)

Pattern Notes:
  - Multiple approaches: Recursive DFS, Iterative DFS (stack), Iterative BFS (queue)
  - Recursive: Swap children, then recursively invert subtrees
  - Iterative DFS: Use stack to process nodes, swap children
  - Iterative BFS: Use queue to process level by level
  - All approaches modify tree structure in-place

Interview Notes:
  - Follow-up: Can you do it iteratively?
  - Follow-up: What if tree is very deep (stack overflow concern)?
  - Follow-up: Invert only nodes at specific level
  - Famous problem: Max Howell (Homebrew creator) was asked this at Google
*/

export const functionName = 'invertTree';

export const tests = [
  {
    input: [{"val": 4, "left": {"val": 2, "left": {"val": 1, "left": null, "right": null}, "right": {"val": 3, "left": null, "right": null}}, "right": {"val": 7, "left": {"val": 6, "left": null, "right": null}, "right": {"val": 9, "left": null, "right": null}}}],
    expected: {"val": 4, "left": {"val": 7, "left": {"val": 9, "left": null, "right": null}, "right": {"val": 6, "left": null, "right": null}}, "right": {"val": 2, "left": {"val": 3, "left": null, "right": null}, "right": {"val": 1, "left": null, "right": null}}}
  },
  {
    input: [{"val": 2, "left": {"val": 1, "left": null, "right": null}, "right": {"val": 3, "left": null, "right": null}}],
    expected: {"val": 2, "left": {"val": 3, "left": null, "right": null}, "right": {"val": 1, "left": null, "right": null}}
  },
  {
    input: [null],
    expected: null
  },
  {
    input: [{"val": 1, "left": null, "right": null}],
    expected: {"val": 1, "left": null, "right": null}
  },
  {
    input: [{"val": 1, "left": {"val": 2, "left": null, "right": null}, "right": null}],
    expected: {"val": 1, "left": null, "right": {"val": 2, "left": null, "right": null}}
  }
];

/**
 * Definition for a binary tree node
 */
class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

/**
 * Inverts binary tree using recursive DFS
 * @param {TreeNode} root - Root of binary tree
 * @return {TreeNode} Root of inverted tree
 */
function invertTree(root) {
    // Base case: null node
    if (!root) {
        return null;
    }

    // Swap left and right children
    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    // Recursively invert subtrees
    invertTree(root.left);
    invertTree(root.right);

    return root;
}

/**
 * Alternative: More concise recursive approach
 * @param {TreeNode} root - Root of binary tree
 * @return {TreeNode} Root of inverted tree
 */
function invertTreeConcise(root) {
    if (!root) {
        return null;
    }

    // Swap and recursively invert in one step
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];

    return root;
}

/**
 * Alternative: Iterative approach using stack (DFS)
 * @param {TreeNode} root - Root of binary tree
 * @return {TreeNode} Root of inverted tree
 */
function invertTreeIterativeDFS(root) {
    if (!root) {
        return null;
    }

    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();

        // Swap children
        const temp = node.left;
        node.left = node.right;
        node.right = temp;

        // Add children to stack for processing
        if (node.left) {
            stack.push(node.left);
        }
        if (node.right) {
            stack.push(node.right);
        }
    }

    return root;
}

/**
 * Alternative: Iterative approach using queue (BFS)
 * @param {TreeNode} root - Root of binary tree
 * @return {TreeNode} Root of inverted tree
 */
function invertTreeIterativeBFS(root) {
    if (!root) {
        return null;
    }

    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();

        // Swap children
        const temp = node.left;
        node.left = node.right;
        node.right = temp;

        // Add children to queue for processing
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }

    return root;
}

/**
 * Alternative: Post-order recursive approach
 * @param {TreeNode} root - Root of binary tree
 * @return {TreeNode} Root of inverted tree
 */
function invertTreePostOrder(root) {
    if (!root) {
        return null;
    }

    // First invert subtrees
    const leftInverted = invertTree(root.right);
    const rightInverted = invertTree(root.left);

    // Then assign inverted subtrees
    root.left = leftInverted;
    root.right = rightInverted;

    return root;
}

/**
 * Extended: Invert tree and return statistics
 * @param {TreeNode} root - Root of binary tree
 * @return {Object} Object with inverted tree and stats
 */
function invertTreeWithStats(root) {
    let nodesProcessed = 0;
    let swapsPerformed = 0;

    function invert(node) {
        if (!node) {
            return null;
        }

        nodesProcessed++;

        // Only swap if both children exist or at least one exists
        if (node.left || node.right) {
            const temp = node.left;
            node.left = node.right;
            node.right = temp;
            swapsPerformed++;
        }

        invert(node.left);
        invert(node.right);

        return node;
    }

    const invertedRoot = invert(root);

    return {
        root: invertedRoot,
        stats: {
            nodesProcessed,
            swapsPerformed,
            treeHeight: getTreeHeight(invertedRoot)
        }
    };
}

/**
 * Helper function to calculate tree height
 * @param {TreeNode} root - Root of tree
 * @return {number} Height of tree
 */
function getTreeHeight(root) {
    if (!root) {
        return 0;
    }

    return 1 + Math.max(getTreeHeight(root.left), getTreeHeight(root.right));
}

export default invertTree;