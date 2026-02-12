/*
Problem: Simplify Path
Difficulty: Medium
Category: Stack, String
LeetCode: #71
Pattern: Stack (Path Navigation)

Given a string path, which is an absolute path (starting with a slash '/') to a file or directory
in a Unix-style file system, convert it to the simplified canonical path.

In a Unix-style file system, a period '.' refers to the current directory, a double period '..'
refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as
a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.

The canonical path should have the following format:
- The path starts with a single slash '/'.
- Any two directories are separated by a single slash '/'.
- The path does not end with a trailing '/' unless the path is the root directory.
- The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..').

Return the simplified canonical path.

Example 1:
  Input: path = "/home/"
  Output: "/home"
  Explanation: Note that there is no trailing slash after the last directory name.

Example 2:
  Input: path = "/../"
  Output: "/"
  Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.

Example 3:
  Input: path = "/home//foo/"
  Output: "/home/foo"
  Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.

Example 4:
  Input: path = "/a/./b/../../c/"
  Output: "/c"

Example 5:
  Input: path = "/a/../../b/../c//.//"
  Output: "/c"

Constraints:
  - 1 <= path.length <= 3000
  - path consists of English letters, digits, period '.', slash '/' or '_'.
  - path is a valid absolute Unix path.

Time Complexity: O(n)
Space Complexity: O(n) for the stack

Pattern Notes:
  - Stack maintains current directory path
  - Split by '/' to get directory components
  - '.': current directory, ignore
  - '..': parent directory, pop from stack if not empty
  - Regular name: push to stack
  - Empty string (multiple slashes): ignore
  - Join stack with '/' and prefix with '/'
*/

export const functionName = 'simplifyPath';

export const tests = [
  {
    input: ["/home/"],
    expected: "/home"
  },
  {
    input: ["/../"],
    expected: "/"
  },
  {
    input: ["/home//foo/"],
    expected: "/home/foo"
  },
  {
    input: ["/a/./b/../../c/"],
    expected: "/c"
  },
  {
    input: ["/a/../../b/../c//.//"],
    expected: "/c"
  },
  {
    input: ["/"],
    expected: "/"
  },
  {
    input: ["/..."],
    expected: "/..."
  },
  {
    input: ["/..hidden"],
    expected: "/..hidden"
  }
];

/**
 * Simplifies Unix-style file path
 * @param {string} path - Absolute Unix path
 * @return {string} Simplified canonical path
 */
function simplifyPath(path) {
    const stack = [];
    const components = path.split('/');

    for (let component of components) {
        if (component === '' || component === '.') {
            // Empty (multiple slashes) or current directory, ignore
            continue;
        } else if (component === '..') {
            // Parent directory, go up one level
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            // Regular directory name
            stack.push(component);
        }
    }

    // Build canonical path
    return '/' + stack.join('/');
}

export default simplifyPath;