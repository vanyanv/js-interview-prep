/*
Problem: Word Break (LeetCode #139)
Difficulty: Medium
Category: Dynamic Programming
Pattern: 1D DP, String DP

Given a string s and a dictionary of strings wordDict, return true if s can be segmented
into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:
  Input: s = "leetcode", wordDict = ["leet","code"]
  Output: true
  Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:
  Input: s = "applepenapple", wordDict = ["apple","pen"]
  Output: true
  Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".

Example 3:
  Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
  Output: false
  Explanation: Cannot segment into dictionary words.

Example 4:
  Input: s = "cars", wordDict = ["car","ca","rs"]
  Output: true
  Explanation: "cars" can be segmented as "car s" or "ca rs".

Example 5:
  Input: s = "aaaaaaa", wordDict = ["aaaa","aaa"]
  Output: true
  Explanation: "aaaaaaa" can be segmented as "aaaa aaa".

Constraints:
  - 1 <= s.length <= 300
  - 1 <= wordDict.length <= 1000
  - 1 <= wordDict[i].length <= 20
  - s and wordDict[i] consist of only lowercase English letters
  - All strings of wordDict are unique

Time Complexity: O(n^2 * m) where n is length of s, m is average length of words in wordDict
Space Complexity: O(n + k) where k is total length of all words in wordDict

Dynamic Programming Pattern Notes:
  - State: dp[i] represents whether s[0...i-1] can be segmented using wordDict
  - Recurrence: dp[i] = true if there exists j < i such that dp[j] = true AND s[j:i] is in wordDict
  - Base case: dp[0] = true (empty string can always be segmented)
  - Final answer: dp[n] where n is length of string s
  - Optimization: use Set for O(1) word lookup instead of array search
  - This is a variation of the "can we make target" DP pattern

Hints:
  - Think about building the solution incrementally from left to right
  - For each position, check if we can form a valid word ending at that position
  - Use a Set for fast word lookup instead of searching the array
  - The key insight: if we can segment s[0:j] and s[j:i] is a valid word, then we can segment s[0:i]
  - Consider both recursive (top-down) and iterative (bottom-up) approaches
  - Early termination: if current position cannot be reached, skip checking words ending there
*/

export const functionName = 'wordBreak';

export const tests = [
  {
    input: ["leetcode", ["leet","code"]],
    expected: true
  },
  {
    input: ["applepenapple", ["apple","pen"]],
    expected: true
  },
  {
    input: ["catsandog", ["cats","dog","sand","and","cat"]],
    expected: false
  },
  {
    input: ["cars", ["car","ca","rs"]],
    expected: true
  },
  {
    input: ["aaaaaaa", ["aaaa","aaa"]],
    expected: true
  },
  {
    input: ["a", ["a"]],
    expected: true
  },
  {
    input: ["ab", ["a","b"]],
    expected: true
  },
  {
    input: ["abcd", ["a","abc","b","cd"]],
    expected: true
  },
  // Cannot segment — leftover characters
  {
    input: ["abcdef", ["ab","cd"]],
    expected: false
  },
  // Single character not in dictionary
  {
    input: ["b", ["a","c"]],
    expected: false
  },
  // Entire string is one dictionary word
  {
    input: ["hello", ["hello"]],
    expected: true
  },
  // Overlapping words — must choose correct split (backtracking-heavy)
  {
    input: ["catsanddog", ["cats","cat","sand","and","dog"]],
    expected: true
  },
  // Worst-case pattern: many a's with no valid segmentation
  {
    input: ["aaaaaaaaab", ["a","aa","aaa","aaaa","aaaaa"]],
    expected: false
  }
];

/**
 * Determine if string can be segmented into dictionary words
 * @param {string} s - Input string to segment
 * @param {string[]} wordDict - Dictionary of valid words
 * @return {boolean} True if string can be segmented, false otherwise
 */
function wordBreak(s, wordDict) {
    if (!s || s.length === 0) return true;
    if (!wordDict || wordDict.length === 0) return false;

    const wordSet = new Set(wordDict); // For O(1) lookup
    const n = s.length;

    // dp[i] represents whether s[0...i-1] can be segmented
    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // Empty string can always be segmented

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            // If s[0...j-1] can be segmented AND s[j...i-1] is a valid word
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break; // Found one valid segmentation, no need to check further
            }
        }
    }

    return dp[n];
}

export default wordBreak;