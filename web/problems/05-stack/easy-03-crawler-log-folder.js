/*
Problem: Crawler Log Folder
Difficulty: Easy
Category: Stack, Array, String
LeetCode: #1598
Pattern: Stack (Path Navigation)

The Leetcode file system keeps a log each time some user performs a change folder operation.

The operations are described below:
- "../" : Move to the parent folder of the current folder. (If you are already in the main folder, remain in the same folder).
- "./" : Remain in the same folder.
- "x/" : Move into a folder named x.

You are given a list of strings logs where logs[i] is the operation performed by the user at the ith step.

The file system starts in the main folder.

Return the minimum number of operations needed to go back to the main folder after the change folder operations.

Example 1:
  Input: logs = ["d1/","d2/","../","d21/","./"]
  Output: 2
  Explanation: Use this change folder operation "../" 2 times and go back to the main folder.

Example 2:
  Input: logs = ["d1/","d2/","./","d3/","../"]
  Output: 2

Example 3:
  Input: logs = ["d1/","../","../","../"]
  Output: 0

Example 4:
  Input: logs = ["./"]
  Output: 0

Example 5:
  Input: logs = ["d1/","d2/","d3/","d4/","d5/"]
  Output: 5

Constraints:
  - 1 <= logs.length <= 10^3
  - 2 <= logs[i].length <= 10
  - logs[i] contains lowercase English letters, digits, '.', and '/'.
  - logs[i] follows the format described in the statement.

Time Complexity: O(n)
Space Complexity: O(d) where d is the maximum depth

Pattern Notes:
  - Stack represents current path depth
  - "../" means go up one level (pop from stack)
  - "./" means stay in current folder (no change)
  - "folder/" means go into folder (push to stack)
  - Final stack size = minimum operations to return to main
  - Handle going up from main folder (can't go above root)
*/

export const functionName = 'minOperations';

export const tests = [
  {
    input: [["d1/","d2/","../","d21/","./"]],
    expected: 2
  },
  {
    input: [["d1/","d2/","./","d3/","../"]],
    expected: 2
  },
  {
    input: [["d1/","../","../","../"]],
    expected: 0
  },
  {
    input: [["./"]],
    expected: 0
  },
  {
    input: [["d1/","d2/","d3/","d4/","d5/"]],
    expected: 5
  },
  {
    input: [["../"]],
    expected: 0
  },
  {
    input: [["d1/","../"]],
    expected: 0
  },
  {
    input: [["d1/","d2/","../","../","d3/","d4/"]],
    expected: 2
  }
];

/**
 * Calculates minimum operations to return to main folder
 * @param {string[]} logs - Array of folder operations
 * @return {number} Minimum operations to return to main folder
 */
function minOperations(logs) {
    let depth = 0; // We can use a simple counter instead of a stack

    for (let operation of logs) {
        if (operation === "../") {
            // Go to parent folder (but can't go above main)
            depth = Math.max(0, depth - 1);
        } else if (operation === "./") {
            // Stay in current folder
            // No change needed
        } else {
            // Move into a folder
            depth++;
        }
    }

    return depth;
}

// Alternative implementation using actual stack for educational purposes
function minOperationsWithStack(logs) {
    const stack = [];

    for (let operation of logs) {
        if (operation === "../") {
            // Go to parent folder
            if (stack.length > 0) {
                stack.pop();
            }
        } else if (operation === "./") {
            // Stay in current folder
            // No change needed
        } else {
            // Move into a folder
            stack.push(operation);
        }
    }

    return stack.length;
}

export default minOperations;