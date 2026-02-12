/*
Problem: Longest Common Subsequence (LeetCode #1143)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 2D DP, String DP

Given two strings text1 and text2, return the length of their longest common subsequence.
If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some
characters (can be none) deleted without changing the relative order of the remaining characters.

A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:
  Input: text1 = "abcde", text2 = "ace"
  Output: 3
  Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:
  Input: text1 = "abc", text2 = "abc"
  Output: 3
  Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:
  Input: text1 = "abc", text2 = "def"
  Output: 0
  Explanation: There is no such common subsequence, so the result is 0.

Example 4:
  Input: text1 = "abcdgh", text2 = "aedfhr"
  Output: 3
  Explanation: The longest common subsequence is "adh" and its length is 3.

Example 5:
  Input: text1 = "bl", text2 = "yby"
  Output: 1
  Explanation: The longest common subsequence is "b" and its length is 1.

Constraints:
  - 1 <= text1.length, text2.length <= 1000
  - text1 and text2 consist of only lowercase English characters

Time Complexity: O(m * n) where m and n are lengths of the strings
Space Complexity: O(m * n) for 2D DP, can be optimized to O(min(m,n))

Dynamic Programming Pattern Notes:
  - State: dp[i][j] represents LCS length of text1[0...i-1] and text2[0...j-1]
  - Recurrence:
    - If text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
    - Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  - Base cases: dp[i][0] = 0, dp[0][j] = 0 (empty string has LCS 0 with any string)
  - Final answer: dp[m][n] where m, n are string lengths
  - Classic 2D DP problem, foundation for many string algorithms
  - Can be space optimized since we only need previous row

Hints:
  - Think about comparing characters from both strings one by one
  - When characters match, include them in LCS and add 1 to previous LCS length
  - When characters don't match, take the maximum of excluding current char from either string
  - This is a classic example of optimal substructure in DP
  - Consider both top-down (recursion + memoization) and bottom-up approaches
  - Space can be optimized to O(min(m,n)) by using only one or two rows
*/

export const functionName = 'longestCommonSubsequence';

export const tests = [
  {
    input: ["abcde", "ace"],
    expected: 3
  },
  {
    input: ["abc", "abc"],
    expected: 3
  },
  {
    input: ["abc", "def"],
    expected: 0
  },
  {
    input: ["abcdgh", "aedfhr"],
    expected: 3
  },
  {
    input: ["bl", "yby"],
    expected: 1
  },
  {
    input: ["", "abc"],
    expected: 0
  },
  {
    input: ["abc", ""],
    expected: 0
  },
  {
    input: ["ezupkr", "ubmrapg"],
    expected: 2
  },
  {
    input: ["a", "a"],
    expected: 1
  },
  {
    input: ["a", "b"],
    expected: 0
  },
  {
    input: ["oxcpqrsvwf", "shmtulqrypy"],
    expected: 2
  },
  {
    input: ["abcba", "abcbcba"],
    expected: 5
  }
];

/**
 * Find length of longest common subsequence between two strings
 * @param {string} text1 - First string
 * @param {string} text2 - Second string
 * @return {number} Length of longest common subsequence
 */
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // dp[i][j] represents LCS length of text1[0...i-1] and text2[0...j-1]
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Base cases are already handled by initialization to 0

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                // Characters match, include in LCS
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // Characters don't match, take max of excluding from either string
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

export default longestCommonSubsequence;