/*
Problem: Edit Distance (LeetCode #72)
Difficulty: Hard
Category: Dynamic Programming
Pattern: 2D DP, String DP

Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

Example 1:
  Input: word1 = "horse", word2 = "ros"
  Output: 3
  Explanation:
  horse -> rorse (replace 'h' with 'r')
  rorse -> rose (remove 'r')
  rose -> ros (remove 'e')

Example 2:
  Input: word1 = "intention", word2 = "execution"
  Output: 5
  Explanation:
  intention -> inention (remove 't')
  inention -> enention (replace 'i' with 'e')
  enention -> exention (replace 'n' with 'x')
  exention -> exection (replace 'n' with 'c')
  exection -> execution (insert 'u')

Example 3:
  Input: word1 = "abc", word2 = "def"
  Output: 3
  Explanation: Replace each character: a->d, b->e, c->f

Example 4:
  Input: word1 = "", word2 = "abc"
  Output: 3
  Explanation: Insert 3 characters

Example 5:
  Input: word1 = "abc", word2 = ""
  Output: 3
  Explanation: Delete 3 characters

Constraints:
  - 0 <= word1.length, word2.length <= 500
  - word1 and word2 consist of lowercase English letters

Time Complexity: O(m * n) where m and n are lengths of the strings
Space Complexity: O(m * n) for 2D DP, can be optimized to O(min(m,n))

Dynamic Programming Pattern Notes:
  - State: dp[i][j] represents minimum operations to convert word1[0...i-1] to word2[0...j-1]
  - Recurrence:
    - If word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1] (no operation needed)
    - Else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
      - dp[i-1][j] + 1: delete from word1
      - dp[i][j-1] + 1: insert into word1
      - dp[i-1][j-1] + 1: replace in word1
  - Base cases: dp[i][0] = i (delete all), dp[0][j] = j (insert all)
  - This is the classic Levenshtein distance algorithm

Hints:
  - Think about transforming prefixes of word1 to prefixes of word2
  - When characters match, no operation is needed for that position
  - When they don't match, consider all three operations and pick the minimum
  - Base cases: converting empty string to word2 requires |word2| insertions
  - Converting word1 to empty string requires |word1| deletions
  - This problem has optimal substructure and overlapping subproblems
*/

export const functionName = 'minDistance';

export const tests = [
  {
    input: ["horse", "ros"],
    expected: 3
  },
  {
    input: ["intention", "execution"],
    expected: 5
  },
  {
    input: ["abc", "def"],
    expected: 3
  },
  {
    input: ["", "abc"],
    expected: 3
  },
  {
    input: ["abc", ""],
    expected: 3
  },
  {
    input: ["same", "same"],
    expected: 0
  },
  {
    input: ["a", "ab"],
    expected: 1
  },
  {
    input: ["ab", "a"],
    expected: 1
  },
  // Both strings empty — zero operations
  {
    input: ["", ""],
    expected: 0
  },
  // All same characters vs completely different — all replacements
  {
    input: ["aaaa", "bbbb"],
    expected: 4
  },
  // Anagram — same letters, different order (requires swaps via replace/insert/delete)
  {
    input: ["abcde", "edcba"],
    expected: 4
  },
  // One string is a subsequence of the other — only insertions needed
  {
    input: ["ace", "abcde"],
    expected: 2
  },
  // Longer realistic example
  {
    input: ["saturday", "sunday"],
    expected: 3
  }
];

/**
 * Calculate minimum edit distance between two strings
 * @param {string} word1 - First string
 * @param {string} word2 - Second string
 * @return {number} Minimum number of operations to convert word1 to word2
 */
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;

    // dp[i][j] represents min operations to convert word1[0...i-1] to word2[0...j-1]
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Base cases
    // Converting empty string to word2[0...j-1] requires j insertions
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // Converting word1[0...i-1] to empty string requires i deletions
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                // Characters match, no operation needed
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Characters don't match, try all three operations
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // Delete from word1
                    dp[i][j - 1],     // Insert into word1
                    dp[i - 1][j - 1]  // Replace in word1
                );
            }
        }
    }

    return dp[m][n];
}

export default minDistance;