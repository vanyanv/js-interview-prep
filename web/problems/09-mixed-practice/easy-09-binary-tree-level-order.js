/*
Problem: Binary Tree Level Order Traversal
Difficulty: Easy
Category: Tree, BFS, Queue
LeetCode: #102
Pattern: BFS + Queue + Tree Traversal
Mixed Patterns: BFS (Queue) + Tree Navigation + Level Processing

Given the root of a binary tree, return the level order traversal of its nodes'
values. (i.e., from left to right, level by level).

Example 1:
  Input: root = [3,9,20,null,null,15,7]
  Output: [[3],[9,20],[15,7]]
  Explanation:
      3
     / \
    9  20
      /  \
     15   7

Example 2:
  Input: root = [1]
  Output: [[1]]

Example 3:
  Input: root = []
  Output: []

Example 4:
  Input: root = [1,2,3,4,null,null,5]
  Output: [[1],[2,3],[4,5]]
  Explanation:
      1
     / \
    2   3
   /     \
  4       5

Constraints:
  - The number of nodes in the tree is in the range [0, 2000]
  - -1000 <= Node.val <= 1000

Time Complexity: O(n) where n is number of nodes
Space Complexity: O(w) where w is maximum width of tree

Pattern Notes:
  - Use BFS with queue to process nodes level by level
  - Track current level size to group nodes by level
  - Multiple approaches: Queue with level tracking, DFS with level parameter
  - Queue ensures left-to-right order within each level
  - Handle null nodes and empty tree edge cases

Interview Notes:
  - Follow-up: Reverse level order traversal (bottom-up)
  - Follow-up: Zigzag level order traversal (alternating directions)
  - Follow-up: Print each level on separate line
  - Follow-up: Find level with maximum sum
*/

export const functionName = 'levelOrder';

export const tests = [
  {
    input: [{"val": 3, "left": {"val": 9, "left": null, "right": null}, "right": {"val": 20, "left": {"val": 15, "left": null, "right": null}, "right": {"val": 7, "left": null, "right": null}}}],
    expected: [[3],[9,20],[15,7]]
  },
  {
    input: [{"val": 1, "left": null, "right": null}],
    expected: [[1]]
  },
  {
    input: [null],
    expected: []
  },
  {
    input: [{"val": 1, "left": {"val": 2, "left": {"val": 4, "left": null, "right": null}, "right": null}, "right": {"val": 3, "left": null, "right": {"val": 5, "left": null, "right": null}}}],
    expected: [[1],[2,3],[4,5]]
  },
  {
    input: [{"val": 0, "left": {"val": 2, "left": {"val": 1, "left": {"val": 5, "left": null, "right": null}, "right": {"val": 1, "left": null, "right": null}}, "right": null}, "right": {"val": 4, "left": {"val": 3, "left": null, "right": {"val": 6, "left": null, "right": null}}, "right": {"val": -1, "left": null, "right": {"val": 8, "left": null, "right": null}}}}],
    expected: [[0],[2,4],[1,3,-1],[5,1,6,8]]
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
 * Binary tree level order traversal using BFS
 * @param {TreeNode} root - Root of binary tree
 * @return {number[][]} Level order traversal as 2D array
 */
function levelOrder(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            // Add children to queue for next level
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        result.push(currentLevel);
    }

    return result;
}

/**
 * Alternative: DFS approach with level tracking
 * @param {TreeNode} root - Root of binary tree
 * @return {number[][]} Level order traversal as 2D array
 */
function levelOrderDFS(root) {
    const result = [];

    function dfs(node, level) {
        if (!node) {
            return;
        }

        // Initialize level array if needed
        if (result.length === level) {
            result.push([]);
        }

        // Add current node to its level
        result[level].push(node.val);

        // Recursively process children
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return result;
}

/**
 * Alternative: Using two queues for level separation
 * @param {TreeNode} root - Root of binary tree
 * @return {number[][]} Level order traversal as 2D array
 */
function levelOrderTwoQueues(root) {
    if (!root) {
        return [];
    }

    const result = [];
    let currentLevel = [root];

    while (currentLevel.length > 0) {
        const nextLevel = [];
        const currentValues = [];

        for (const node of currentLevel) {
            currentValues.push(node.val);

            if (node.left) {
                nextLevel.push(node.left);
            }
            if (node.right) {
                nextLevel.push(node.right);
            }
        }

        result.push(currentValues);
        currentLevel = nextLevel;
    }

    return result;
}

/**
 * Alternative: Using queue with null delimiter
 * @param {TreeNode} root - Root of binary tree
 * @return {number[][]} Level order traversal as 2D array
 */
function levelOrderNullDelimiter(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root, null]; // null marks end of level
    let currentLevel = [];

    while (queue.length > 0) {
        const node = queue.shift();

        if (node === null) {
            // End of current level
            result.push([...currentLevel]);
            currentLevel = [];

            // Add level delimiter if more nodes exist
            if (queue.length > 0) {
                queue.push(null);
            }
        } else {
            currentLevel.push(node.val);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    return result;
}

/**
 * Extended: Level order with additional information
 * @param {TreeNode} root - Root of binary tree
 * @return {Object[]} Array of level objects with metadata
 */
function levelOrderExtended(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];
    let levelNum = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        let levelSum = 0;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            levelSum += node.val;

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        result.push({
            level: levelNum,
            nodes: currentLevel,
            sum: levelSum,
            count: currentLevel.length
        });

        levelNum++;
    }

    return result;
}

export default levelOrder;