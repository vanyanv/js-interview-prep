/*
Problem: Serialize and Deserialize Binary Tree
Difficulty: Hard
Category: Tree, DFS, BFS, String, Design
LeetCode: #297
Pattern: Tree Traversal + String Encoding/Decoding + Data Structure Design
Mixed Patterns: DFS/BFS + String Processing + Tree Reconstruction + Delimiter Handling

Serialization is the process of converting a data structure or object into a
sequence of bits so that it can be stored or transmitted and reconstructed later.

Design an algorithm to serialize and deserialize a binary tree. There is no
restriction on how your serialization/deserialization algorithm should work.

Example 1:
  Input: root = [1,2,3,null,null,4,5]
  Output: [1,2,3,null,null,4,5]

Example 2:
  Input: root = []
  Output: []

Example 3:
  Input: root = [1]
  Output: [1]

Example 4:
  Input: root = [1,2]
  Output: [1,2]

Constraints:
  - The number of nodes in the tree is in the range [0, 10^4]
  - -1000 <= Node.val <= 1000

Time Complexity: O(n) for both serialize and deserialize
Space Complexity: O(n) for string storage and recursion

Pattern Notes:
  - Multiple approaches: DFS preorder, BFS level-order, postorder
  - Handle null nodes with special marker (e.g., "null", "#", "X")
  - Use delimiters to separate values in serialized string
  - Maintain tree structure information during serialization
  - Reconstruct tree using same traversal order as serialization

Interview Notes:
  - Follow-up: Optimize for space (avoid storing null markers)
  - Follow-up: Handle very large trees (streaming approach)
  - Follow-up: Support for different data types in nodes
  - Follow-up: Serialization format compatibility across languages
*/

export const functionName = 'Codec';

export const tests = [
  {
    input: [{"val": 1, "left": {"val": 2, "left": null, "right": null}, "right": {"val": 3, "left": {"val": 4, "left": null, "right": null}, "right": {"val": 5, "left": null, "right": null}}}],
    expected: {"val": 1, "left": {"val": 2, "left": null, "right": null}, "right": {"val": 3, "left": {"val": 4, "left": null, "right": null}, "right": {"val": 5, "left": null, "right": null}}}
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
    expected: {"val": 1, "left": {"val": 2, "left": null, "right": null}, "right": null}
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
 * Codec class for serializing and deserializing binary trees
 */
class Codec {
    /**
     * Encodes a tree to a single string using DFS preorder traversal
     * @param {TreeNode} root - Root of binary tree
     * @return {string} Encoded string representation
     */
    serialize(root) {
        const result = [];

        function dfs(node) {
            if (!node) {
                result.push('null');
                return;
            }

            result.push(node.val.toString());
            dfs(node.left);
            dfs(node.right);
        }

        dfs(root);
        return result.join(',');
    }

    /**
     * Decodes your encoded data to tree using DFS preorder traversal
     * @param {string} data - Encoded string
     * @return {TreeNode} Reconstructed binary tree
     */
    deserialize(data) {
        const values = data.split(',');
        let index = 0;

        function buildTree() {
            if (index >= values.length || values[index] === 'null') {
                index++;
                return null;
            }

            const node = new TreeNode(parseInt(values[index]));
            index++;

            node.left = buildTree();
            node.right = buildTree();

            return node;
        }

        return buildTree();
    }
}

/**
 * Alternative: BFS level-order approach
 */
class CodecBFS {
    /**
     * Serializes tree using BFS level-order traversal
     * @param {TreeNode} root - Root of binary tree
     * @return {string} Encoded string
     */
    serialize(root) {
        if (!root) return '';

        const result = [];
        const queue = [root];

        while (queue.length > 0) {
            const node = queue.shift();

            if (node) {
                result.push(node.val.toString());
                queue.push(node.left);
                queue.push(node.right);
            } else {
                result.push('null');
            }
        }

        // Remove trailing nulls for optimization
        while (result.length > 0 && result[result.length - 1] === 'null') {
            result.pop();
        }

        return result.join(',');
    }

    /**
     * Deserializes string to tree using BFS level-order
     * @param {string} data - Encoded string
     * @return {TreeNode} Reconstructed tree
     */
    deserialize(data) {
        if (!data) return null;

        const values = data.split(',');
        const root = new TreeNode(parseInt(values[0]));
        const queue = [root];
        let index = 1;

        while (queue.length > 0 && index < values.length) {
            const node = queue.shift();

            // Process left child
            if (index < values.length && values[index] !== 'null') {
                node.left = new TreeNode(parseInt(values[index]));
                queue.push(node.left);
            }
            index++;

            // Process right child
            if (index < values.length && values[index] !== 'null') {
                node.right = new TreeNode(parseInt(values[index]));
                queue.push(node.right);
            }
            index++;
        }

        return root;
    }
}

/**
 * Alternative: Compact serialization (no null markers for leaves)
 */
class CodecCompact {
    /**
     * Compact serialization avoiding unnecessary null markers
     * @param {TreeNode} root - Root of binary tree
     * @return {string} Compact encoded string
     */
    serialize(root) {
        const result = [];

        function dfs(node) {
            if (!node) return;

            result.push(node.val.toString());

            // Only add markers if we have children
            if (node.left || node.right) {
                result.push('(');
                dfs(node.left);
                result.push(',');
                dfs(node.right);
                result.push(')');
            }
        }

        dfs(root);
        return result.join('');
    }

    /**
     * Deserializes compact format
     * @param {string} data - Compact encoded string
     * @return {TreeNode} Reconstructed tree
     */
    deserialize(data) {
        if (!data) return null;

        let index = 0;

        function parseNumber() {
            let start = index;
            if (data[index] === '-') index++;
            while (index < data.length && /\d/.test(data[index])) {
                index++;
            }
            return parseInt(data.slice(start, index));
        }

        function buildTree() {
            if (index >= data.length) return null;

            const val = parseNumber();
            const node = new TreeNode(val);

            if (index < data.length && data[index] === '(') {
                index++; // skip '('
                node.left = buildTree();
                index++; // skip ','
                node.right = buildTree();
                index++; // skip ')'
            }

            return node;
        }

        return buildTree();
    }
}

/**
 * Alternative: JSON-based serialization
 */
class CodecJSON {
    /**
     * Serializes tree to JSON format
     * @param {TreeNode} root - Root of binary tree
     * @return {string} JSON string
     */
    serialize(root) {
        function treeToObject(node) {
            if (!node) return null;

            return {
                val: node.val,
                left: treeToObject(node.left),
                right: treeToObject(node.right)
            };
        }

        return JSON.stringify(treeToObject(root));
    }

    /**
     * Deserializes JSON string to tree
     * @param {string} data - JSON string
     * @return {TreeNode} Reconstructed tree
     */
    deserialize(data) {
        const obj = JSON.parse(data);

        function objectToTree(obj) {
            if (!obj) return null;

            const node = new TreeNode(obj.val);
            node.left = objectToTree(obj.left);
            node.right = objectToTree(obj.right);

            return node;
        }

        return objectToTree(obj);
    }
}

/**
 * Extended: Codec with compression
 */
class CodecCompressed {
    /**
     * Serializes with basic compression (run-length encoding for nulls)
     * @param {TreeNode} root - Root of binary tree
     * @return {string} Compressed encoded string
     */
    serialize(root) {
        const result = [];

        function dfs(node) {
            if (!node) {
                result.push('null');
                return;
            }

            result.push(node.val.toString());
            dfs(node.left);
            dfs(node.right);
        }

        dfs(root);

        // Apply run-length encoding for null values
        const compressed = [];
        let i = 0;

        while (i < result.length) {
            if (result[i] === 'null') {
                let count = 0;
                while (i < result.length && result[i] === 'null') {
                    count++;
                    i++;
                }
                compressed.push(`null:${count}`);
            } else {
                compressed.push(result[i]);
                i++;
            }
        }

        return compressed.join(',');
    }

    /**
     * Deserializes compressed format
     * @param {string} data - Compressed encoded string
     * @return {TreeNode} Reconstructed tree
     */
    deserialize(data) {
        const tokens = data.split(',');
        const expanded = [];

        for (const token of tokens) {
            if (token.startsWith('null:')) {
                const count = parseInt(token.split(':')[1]);
                for (let i = 0; i < count; i++) {
                    expanded.push('null');
                }
            } else {
                expanded.push(token);
            }
        }

        let index = 0;

        function buildTree() {
            if (index >= expanded.length || expanded[index] === 'null') {
                index++;
                return null;
            }

            const node = new TreeNode(parseInt(expanded[index]));
            index++;

            node.left = buildTree();
            node.right = buildTree();

            return node;
        }

        return buildTree();
    }
}

/**
 * Extended: Validate serialization/deserialization
 * @param {TreeNode} original - Original tree
 * @param {TreeNode} reconstructed - Reconstructed tree
 * @return {boolean} True if trees are identical
 */
function validateSerialization(original, reconstructed) {
    function areIdentical(node1, node2) {
        if (!node1 && !node2) return true;
        if (!node1 || !node2) return false;

        return node1.val === node2.val &&
               areIdentical(node1.left, node2.left) &&
               areIdentical(node1.right, node2.right);
    }

    return areIdentical(original, reconstructed);
}

/**
 * Extended: Benchmark different serialization methods
 * @param {TreeNode} root - Tree to benchmark
 * @return {Object} Performance comparison
 */
function benchmarkSerialization(root) {
    const codecs = {
        DFS: new Codec(),
        BFS: new CodecBFS(),
        Compact: new CodecCompact(),
        JSON: new CodecJSON(),
        Compressed: new CodecCompressed()
    };

    const results = {};

    for (const [name, codec] of Object.entries(codecs)) {
        const startTime = performance.now();

        const serialized = codec.serialize(root);
        const deserialized = codec.deserialize(serialized);

        const endTime = performance.now();

        results[name] = {
            serializedLength: serialized.length,
            executionTime: endTime - startTime,
            isValid: validateSerialization(root, deserialized),
            serializedData: serialized
        };
    }

    return results;
}

export default Codec;