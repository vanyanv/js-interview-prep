/*
Problem: Longest Common Prefix
Difficulty: Easy
Category: String, Array, Divide and Conquer
LeetCode: #14
Pattern: String Processing + Multiple Approaches
Mixed Patterns: String Comparison + Array Processing + Divide and Conquer

Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

Example 1:
  Input: strs = ["flower","flow","flight"]
  Output: "fl"
  Explanation: The longest common prefix is "fl".

Example 2:
  Input: strs = ["dog","racecar","car"]
  Output: ""
  Explanation: There is no common prefix among the input strings.

Example 3:
  Input: strs = ["interspecies","interstellar","interstate"]
  Output: "inters"
  Explanation: Common prefix is "inters".

Example 4:
  Input: strs = ["throne","throne"]
  Output: "throne"
  Explanation: All strings are identical.

Constraints:
  - 1 <= strs.length <= 200
  - 0 <= strs[i].length <= 200
  - strs[i] consists of only lowercase English letters

Time Complexity: O(S) where S is sum of all characters in all strings
Space Complexity: O(1) for horizontal scanning, O(m) for other approaches

Pattern Notes:
  - Multiple approaches: Horizontal scanning, Vertical scanning, Divide and conquer
  - Horizontal scanning: Compare prefix with each string sequentially
  - Vertical scanning: Compare character by character across all strings
  - Divide and conquer: Split array and find LCP of each half
  - Binary search: Binary search on prefix length

Interview Notes:
  - Follow-up: What if strings are very long but prefix is short?
  - Follow-up: What if we want to find longest common suffix?
  - Follow-up: How to handle Unicode characters?
  - Discuss trade-offs between different approaches
*/

export const functionName = 'longestCommonPrefix';

export const tests = [
  {
    input: [["flower","flow","flight"]],
    expected: "fl"
  },
  {
    input: [["dog","racecar","car"]],
    expected: ""
  },
  {
    input: [["interspecies","interstellar","interstate"]],
    expected: "inters"
  },
  {
    input: [["throne","throne"]],
    expected: "throne"
  },
  {
    input: [[""]],
    expected: ""
  },
  {
    input: [["a"]],
    expected: "a"
  },
  {
    input: [["ab", "a"]],
    expected: "a"
  },
  {
    input: [["abcdef", "abcxyz", "abc"]],
    expected: "abc"
  }
];

/**
 * Finds longest common prefix using horizontal scanning
 * @param {string[]} strs - Array of strings
 * @return {string} Longest common prefix
 */
function longestCommonPrefix(strs) {
    if (!strs || strs.length === 0) {
        return "";
    }

    // Start with first string as initial prefix
    let prefix = strs[0];

    // Compare prefix with each subsequent string
    for (let i = 1; i < strs.length; i++) {
        // Shrink prefix until it matches beginning of current string
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, prefix.length - 1);
            if (prefix === "") {
                return "";
            }
        }
    }

    return prefix;
}

/**
 * Alternative: Vertical scanning approach
 * @param {string[]} strs - Array of strings
 * @return {string} Longest common prefix
 */
function longestCommonPrefixVertical(strs) {
    if (!strs || strs.length === 0) {
        return "";
    }

    // Compare character by character across all strings
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];

        // Check if this character exists at position i in all strings
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].slice(0, i);
            }
        }
    }

    return strs[0];
}

/**
 * Alternative: Divide and conquer approach
 * @param {string[]} strs - Array of strings
 * @return {string} Longest common prefix
 */
function longestCommonPrefixDivideConquer(strs) {
    if (!strs || strs.length === 0) {
        return "";
    }

    return divideConquerHelper(strs, 0, strs.length - 1);
}

/**
 * Helper function for divide and conquer
 * @param {string[]} strs - Array of strings
 * @param {number} left - Left index
 * @param {number} right - Right index
 * @return {string} Longest common prefix in range
 */
function divideConquerHelper(strs, left, right) {
    if (left === right) {
        return strs[left];
    }

    const mid = Math.floor((left + right) / 2);
    const leftLCP = divideConquerHelper(strs, left, mid);
    const rightLCP = divideConquerHelper(strs, mid + 1, right);

    return commonPrefix(leftLCP, rightLCP);
}

/**
 * Helper function to find common prefix between two strings
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @return {string} Common prefix
 */
function commonPrefix(str1, str2) {
    const minLength = Math.min(str1.length, str2.length);

    for (let i = 0; i < minLength; i++) {
        if (str1[i] !== str2[i]) {
            return str1.slice(0, i);
        }
    }

    return str1.slice(0, minLength);
}

/**
 * Alternative: Binary search approach
 * @param {string[]} strs - Array of strings
 * @return {string} Longest common prefix
 */
function longestCommonPrefixBinarySearch(strs) {
    if (!strs || strs.length === 0) {
        return "";
    }

    // Find minimum length string
    const minLength = Math.min(...strs.map(str => str.length));

    let left = 0;
    let right = minLength;

    while (left < right) {
        const mid = Math.ceil((left + right) / 2);
        if (isCommonPrefix(strs, mid)) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }

    return strs[0].slice(0, left);
}

/**
 * Helper function to check if prefix of given length is common
 * @param {string[]} strs - Array of strings
 * @param {number} length - Prefix length to check
 * @return {boolean} True if prefix is common
 */
function isCommonPrefix(strs, length) {
    const prefix = strs[0].slice(0, length);
    return strs.every(str => str.startsWith(prefix));
}

export default longestCommonPrefix;