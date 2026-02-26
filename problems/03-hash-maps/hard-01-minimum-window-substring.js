/*
Problem: Minimum Window Substring
Difficulty: Hard
Category: Strings, Hash Map, Sliding Window
LeetCode: #76
Pattern: Hash Map + Sliding Window

Given two strings s and t of lengths m and n respectively, return the minimum
window substring of s such that every character in t (including duplicates) is
included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

Example 1:
  Input: s = "ADOBECODEBANC", t = "ABC"
  Output: "BANC"
  Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C'
  from string t.

Example 2:
  Input: s = "a", t = "a"
  Output: "a"
  Explanation: The entire string s is the minimum window.

Example 3:
  Input: s = "a", t = "aa"
  Output: ""
  Explanation: Both 'a's from t must be included in the window. Since the
  largest window of s only has one 'a', return empty string.

Constraints:
  - m == s.length
  - n == t.length
  - 1 <= m, n <= 10^5
  - s and t consist of uppercase and lowercase English letters.

Time Complexity: O(m + n) where m = s.length, n = t.length
Space Complexity: O(m + n)

Hash Map Pattern Notes:
  - Use a hash map to count required characters from t
  - Use a sliding window with two pointers on s
  - Expand right pointer to include characters, shrink left when window is valid
  - Track how many unique characters have met their required count
  - When all required characters are satisfied, try to shrink from the left
*/

export const functionName = 'minWindow';

export const tests = [
  // Classic example from LeetCode
  {
    input: ["ADOBECODEBANC", "ABC"],
    expected: "BANC"
  },
  // Single character match
  {
    input: ["a", "a"],
    expected: "a"
  },
  // Not enough characters in s to satisfy t
  {
    input: ["a", "aa"],
    expected: ""
  },
  // Both characters the same
  {
    input: ["aa", "aa"],
    expected: "aa"
  },
  // t is a single character found in the middle
  {
    input: ["ab", "b"],
    expected: "b"
  },
  // Longer example with optimal window not at the start
  // s = "cabwefgewcwaefgcf", t = "cae"
  // Optimal window: "cwae" (indices 9-12, length 4)
  {
    input: ["cabwefgewcwaefgcf", "cae"],
    expected: "cwae"
  },
  // No matching characters at all
  {
    input: ["xyz", "abc"],
    expected: ""
  },
  // Entire string is the minimum window
  {
    input: ["abc", "ac"],
    expected: "abc"
  }
];

/**
 * Returns the minimum window substring of s that contains all characters in t.
 * Uses a sliding window approach with hash maps to track character frequencies.
 *
 * @param {string} s - The source string to search within
 * @param {string} t - The target string whose characters must be present in the window
 * @returns {string} The minimum window substring, or "" if no valid window exists
 */
function minWindow(s, t) {
  if (s.length === 0 || t.length === 0 || s.length < t.length) return "";

  // Count required characters from t
  const required = new Map();
  for (const char of t) {
    required.set(char, (required.get(char) || 0) + 1);
  }

  // Number of unique characters in t that must be present in the window
  const requiredCount = required.size;
  // Number of unique characters in current window that match required frequency
  let formedCount = 0;

  // Current window character counts
  const windowCounts = new Map();

  // Result: [window length, left, right]
  let result = [Infinity, 0, 0];

  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

    // Check if current character's frequency matches the required frequency
    if (required.has(char) && windowCounts.get(char) === required.get(char)) {
      formedCount++;
    }

    // Try to shrink the window from the left
    while (left <= right && formedCount === requiredCount) {
      // Update result if this window is smaller
      if (right - left + 1 < result[0]) {
        result = [right - left + 1, left, right];
      }

      // Remove left character from window
      const leftChar = s[left];
      windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
      if (required.has(leftChar) && windowCounts.get(leftChar) < required.get(leftChar)) {
        formedCount--;
      }
      left++;
    }
  }

  return result[0] === Infinity ? "" : s.slice(result[1], result[2] + 1);
}

export default minWindow;
